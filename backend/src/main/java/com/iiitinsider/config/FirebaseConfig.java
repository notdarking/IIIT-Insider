package com.iiitinsider.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.ByteArrayInputStream;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;

@Configuration
public class FirebaseConfig {

    @Value("${firebase.credentials.path}")
    private String credentialsPath;

    @Value("${firebase.service-account-json:}")
    private String serviceAccountJson;

    @Value("${firebase.database.url:}")
    private String databaseUrl;

    @Bean
    @ConditionalOnExpression("'${firebase.credentials.path:}' != '' || '${firebase.service-account-json:}' != ''")
    public FirebaseMessaging firebaseMessaging() throws IOException {
        FirebaseOptions.Builder optionsBuilder = FirebaseOptions.builder()
            .setCredentials(GoogleCredentials.fromStream(credentialsStream()));

        if (databaseUrl != null && !databaseUrl.isBlank()) {
            optionsBuilder.setDatabaseUrl(databaseUrl);
        }

        FirebaseApp app = FirebaseApp.getApps().isEmpty()
            ? FirebaseApp.initializeApp(optionsBuilder.build())
            : FirebaseApp.getInstance();

        return FirebaseMessaging.getInstance(app);
    }

    private InputStream credentialsStream() throws IOException {
        if (serviceAccountJson != null && !serviceAccountJson.isBlank()) {
            return new ByteArrayInputStream(serviceAccountJson.getBytes(StandardCharsets.UTF_8));
        }

        return new FileInputStream(credentialsPath);
    }
}
