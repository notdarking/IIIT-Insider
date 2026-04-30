package com.iiitinsider.controller;

import com.iiitinsider.config.CorsConfig;
import com.iiitinsider.config.JwtAuthenticationFilter;
import com.iiitinsider.config.SecurityConfig;
import com.iiitinsider.repository.UserRepository;
import com.iiitinsider.service.AuthService;
import com.iiitinsider.service.JwtService;
import com.iiitinsider.service.UserDetailsServiceImpl;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.test.context.TestExecutionListeners;
import org.springframework.test.context.TestPropertySource;
import org.springframework.test.context.event.ApplicationEventsTestExecutionListener;
import org.springframework.test.context.event.EventPublishingTestExecutionListener;
import org.springframework.test.context.support.DependencyInjectionTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextBeforeModesTestExecutionListener;
import org.springframework.test.context.support.DirtiesContextTestExecutionListener;
import org.springframework.test.context.web.ServletTestExecutionListener;
import org.springframework.test.web.servlet.MockMvc;

import java.lang.reflect.Proxy;

import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

@WebMvcTest(controllers = AuthController.class)
@Import({
    SecurityConfig.class,
    CorsConfig.class,
    JwtAuthenticationFilter.class,
    AuthControllerIntegrationTest.TestBeans.class
})
@TestPropertySource(properties = {
    "app.cors.allowed-origins=http://localhost:5173",
    "jwt.secret=test-secret-that-is-at-least-thirty-two-characters"
})
@TestExecutionListeners(
    listeners = {
        ServletTestExecutionListener.class,
        DirtiesContextBeforeModesTestExecutionListener.class,
        ApplicationEventsTestExecutionListener.class,
        DependencyInjectionTestExecutionListener.class,
        DirtiesContextTestExecutionListener.class,
        EventPublishingTestExecutionListener.class
    },
    mergeMode = TestExecutionListeners.MergeMode.REPLACE_DEFAULTS
)
class AuthControllerIntegrationTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void unauthenticatedUserCannotAccessNotificationsEndpoint() throws Exception {
        mockMvc.perform(get("/notifications/devices"))
            .andExpect(result -> {
                int status = result.getResponse().getStatus();
                assertTrue(status == 401 || status == 403, "Expected 401 or 403 but got " + status);
            });
    }

    @TestConfiguration
    static class TestBeans {
        @Bean
        AuthService authService() {
            return new AuthService(null, null, null, null);
        }

        @Bean
        JwtService jwtService() {
            return new JwtService();
        }

        @Bean
        UserDetailsServiceImpl userDetailsService() {
            return new UserDetailsServiceImpl(null) {
                @Override
                public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(String username) {
                    throw new UsernameNotFoundException(username);
                }
            };
        }

        @Bean
        UserRepository userRepository() {
            return (UserRepository) Proxy.newProxyInstance(
                UserRepository.class.getClassLoader(),
                new Class<?>[] { UserRepository.class },
                (proxy, method, args) -> {
                    if (method.getName().equals("toString")) {
                        return "testUserRepository";
                    }
                    if (method.getName().equals("hashCode")) {
                        return System.identityHashCode(proxy);
                    }
                    if (method.getName().equals("equals")) {
                        return proxy == args[0];
                    }
                    throw new UnsupportedOperationException("UserRepository is not used in this security test");
                }
            );
        }
    }
}
