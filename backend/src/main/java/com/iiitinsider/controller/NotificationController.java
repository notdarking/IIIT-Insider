package com.iiitinsider.controller;

import com.iiitinsider.model.DeviceToken;
import com.iiitinsider.model.User;
import com.iiitinsider.repository.UserRepository;
import com.iiitinsider.service.FirebaseNotificationService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/notifications")
public class NotificationController {

    private final FirebaseNotificationService notificationService;
    private final UserRepository userRepository;

    public NotificationController(FirebaseNotificationService notificationService, UserRepository userRepository) {
        this.notificationService = notificationService;
        this.userRepository = userRepository;
    }

    @PostMapping("/register-device")
    public ResponseEntity<?> registerDevice(
        @RequestBody DeviceRegisterRequest request,
        @AuthenticationPrincipal UserDetails userDetails
    ) {
        try {
            User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

            notificationService.registerDevice(
                user,
                request.getToken(),
                request.getDeviceType(),
                request.getDeviceName()
            );

            Map<String, String> response = new HashMap<>();
            response.put("message", "Device registered successfully");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @PostMapping("/unregister-device")
    public ResponseEntity<?> unregisterDevice(@RequestBody UnregisterDeviceRequest request) {
        try {
            notificationService.unregisterDevice(request.getToken());

            Map<String, String> response = new HashMap<>();
            response.put("message", "Device unregistered successfully");

            return ResponseEntity.ok(response);
        } catch (Exception e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(error);
        }
    }

    @GetMapping("/devices")
    public ResponseEntity<?> getUserDevices(@AuthenticationPrincipal UserDetails userDetails) {
        try {
            User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

            List<DeviceToken> devices = notificationService.getUserDevices(user.getId());

            List<Map<String, Object>> deviceList = devices.stream()
                .map(device -> {
                    Map<String, Object> deviceMap = new HashMap<>();
                    deviceMap.put("id", device.getId());
                    deviceMap.put("deviceType", device.getDeviceType());
                    deviceMap.put("deviceName", device.getDeviceName());
                    deviceMap.put("isActive", device.getIsActive());
                    deviceMap.put("createdAt", device.getCreatedAt().toString());
                    return deviceMap;
                })
                .collect(Collectors.toList());

            return ResponseEntity.ok(Map.of("devices", deviceList));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @PostMapping("/send")
    public ResponseEntity<?> sendNotification(
        @RequestBody SendNotificationRequest request,
        @AuthenticationPrincipal UserDetails userDetails
    ) {
        try {
            User user = userRepository.findByUsername(userDetails.getUsername())
                .orElseThrow(() -> new RuntimeException("User not found"));

            String result = notificationService.sendNotificationToUser(
                user.getId(),
                request.getTitle(),
                request.getBody(),
                request.getImageUrl()
            );

            return ResponseEntity.ok(Map.of("message", "Notification sent", "result", result));
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    public static class DeviceRegisterRequest {
        private String token;
        private String deviceType;
        private String deviceName;

        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }
        public String getDeviceType() { return deviceType; }
        public void setDeviceType(String deviceType) { this.deviceType = deviceType; }
        public String getDeviceName() { return deviceName; }
        public void setDeviceName(String deviceName) { this.deviceName = deviceName; }
    }

    public static class UnregisterDeviceRequest {
        private String token;

        public String getToken() { return token; }
        public void setToken(String token) { this.token = token; }
    }

    public static class SendNotificationRequest {
        private String title;
        private String body;
        private String imageUrl;

        public String getTitle() { return title; }
        public void setTitle(String title) { this.title = title; }
        public String getBody() { return body; }
        public void setBody(String body) { this.body = body; }
        public String getImageUrl() { return imageUrl; }
        public void setImageUrl(String imageUrl) { this.imageUrl = imageUrl; }
    }
}
