package com.iiitinsider.service;

import com.google.firebase.messaging.*;
import com.iiitinsider.model.DeviceToken;
import com.iiitinsider.model.User;
import com.iiitinsider.repository.DeviceTokenRepository;
import org.springframework.beans.factory.ObjectProvider;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.List;

@Service
public class FirebaseNotificationService {

    private static final Logger log = LoggerFactory.getLogger(FirebaseNotificationService.class);

    private final DeviceTokenRepository deviceTokenRepository;
    private final FirebaseMessaging firebaseMessaging;

    public FirebaseNotificationService(DeviceTokenRepository deviceTokenRepository,
                                       ObjectProvider<FirebaseMessaging> firebaseMessagingProvider) {
        this.deviceTokenRepository = deviceTokenRepository;
        this.firebaseMessaging = firebaseMessagingProvider.getIfAvailable();
    }

    public void registerDevice(User user, String token, String deviceType, String deviceName) {
        long activeDeviceCount = deviceTokenRepository.countByUserIdAndIsActive(user.getId(), true);

        DeviceToken existingToken = deviceTokenRepository.findByToken(token).orElse(null);
        if (existingToken != null) {
            existingToken.setLastUsedAt(java.time.LocalDateTime.now());
            deviceTokenRepository.save(existingToken);
            return;
        }

        if (activeDeviceCount >= 5) {
            DeviceToken oldestToken = deviceTokenRepository.findByUserId(user.getId())
                .stream()
                .filter(DeviceToken::getIsActive)
                .min((a, b) -> a.getCreatedAt().compareTo(b.getCreatedAt()))
                .orElse(null);

            if (oldestToken != null) {
                deviceTokenRepository.delete(oldestToken);
            }
        }

        DeviceToken deviceToken = new DeviceToken();
        deviceToken.setUser(user);
        deviceToken.setToken(token);
        deviceToken.setDeviceType(deviceType != null ? deviceType : "WEB");
        deviceToken.setDeviceName(normalizeDeviceName(deviceName));
        deviceToken.setIsActive(true);

        deviceTokenRepository.save(deviceToken);
        log.info("Registered device token for user: {}", user.getUsername());
    }

    public String sendNotificationToDevice(String deviceToken, String title, String body, String imageUrl) {
        if (firebaseMessaging == null) {
            log.warn("Firebase Messaging is not configured");
            return "Firebase not initialized";
        }

        Notification notification = Notification.builder()
            .setTitle(title)
            .setBody(body)
            .setImage(imageUrl)
            .build();

        Message message = Message.builder()
            .setNotification(notification)
            .setToken(deviceToken)
            .putData("type", "notification")
            .build();

        try {
            String response = firebaseMessaging.send(message);
            log.info("Successfully sent notification: {}", response);
            return response;
        } catch (FirebaseMessagingException e) {
            log.error("Error sending notification: {}", e.getMessage());
            return "Error: " + e.getMessage();
        }
    }

    public String sendNotificationToUser(Long userId, String title, String body, String imageUrl) {
        List<DeviceToken> tokens = deviceTokenRepository.findByUserId(userId);

        if (tokens.isEmpty()) {
            return "No devices registered for user";
        }

        String results = "";
        for (DeviceToken deviceToken : tokens) {
            if (deviceToken.getIsActive()) {
                results += sendNotificationToDevice(deviceToken.getToken(), title, body, imageUrl) + "; ";
            }
        }

        return results;
    }

    public void unregisterDevice(String token) {
        deviceTokenRepository.findByToken(token).ifPresent(deviceToken -> {
            deviceToken.setIsActive(false);
            deviceTokenRepository.save(deviceToken);
            log.info("Unregistered device token");
        });
    }

    public List<DeviceToken> getUserDevices(Long userId) {
        return deviceTokenRepository.findByUserId(userId);
    }

    private String normalizeDeviceName(String deviceName) {
        if (deviceName == null || deviceName.isBlank()) {
            return "Web browser";
        }

        return deviceName.length() > 100 ? deviceName.substring(0, 100) : deviceName;
    }
}
