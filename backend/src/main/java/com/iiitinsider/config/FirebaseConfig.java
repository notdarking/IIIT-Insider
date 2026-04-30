package com.iiitinsider.config;

import com.google.auth.oauth2.GoogleCredentials;
import com.google.firebase.FirebaseApp;
import com.google.firebase.FirebaseOptions;
import com.google.firebase.messaging.FirebaseMessaging;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.condition.ConditionalOnExpression;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.FileInputStream;
import java.io.IOException;

@Configuration
public class FirebaseConfig {

    @Value("${firebase.credentials.path}")
    private String credentialsPath;

    @Value("${firebase.database.url:}")
    private String databaseUrl;

    @Bean
    @ConditionalOnExpression("'${firebase.credentials.path:}' != ''")
    public FirebaseMessaging firebaseMessaging() throws IOException {
        FirebaseOptions.Builder optionsBuilder = FirebaseOptions.builder()
            .setCredentials(GoogleCredentials.fromStream(new FileInputStream(credentialsPath)));

        if (databaseUrl != null && !databaseUrl.isBlank()) {
            optionsBuilder.setDatabaseUrl(databaseUrl);
        }

        FirebaseApp app = FirebaseApp.getApps().isEmpty()
            ? FirebaseApp.initializeApp(optionsBuilder.build())
            : FirebaseApp.getInstance();

        return FirebaseMessaging.getInstance(app);
    }
}
