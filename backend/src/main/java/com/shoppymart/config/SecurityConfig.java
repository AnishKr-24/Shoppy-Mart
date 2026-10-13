package com.shoppymart.config;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;
import java.util.Map;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .csrf(AbstractHttpConfigurer::disable)
                .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        // Preflight requests
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Health and static files
                        .requestMatchers("/", "/uploads/**").permitAll()

                        // Public Auth endpoints
                        .requestMatchers(HttpMethod.POST, "/api/auth/login", "/api/auth/register", "/api/auth/signup").permitAll()

                        // Public Product endpoints
                        .requestMatchers(HttpMethod.GET, "/api/products", "/api/products/**").permitAll()

                        // Admin Only endpoints
                        .requestMatchers(HttpMethod.POST, "/api/products", "/api/products/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/products/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/products/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/api/auth/users", "/api/auth/users/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/auth/users/**").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.DELETE, "/api/auth/users/**").hasRole("ADMIN")

                        .requestMatchers(HttpMethod.GET, "/api/orders").hasRole("ADMIN")
                        .requestMatchers(HttpMethod.PUT, "/api/orders/**").hasRole("ADMIN")

                        .requestMatchers("/api/analytics", "/api/analytics/**").hasRole("ADMIN")

                        // Authenticated User endpoints
                        .requestMatchers("/api/auth/profile").authenticated()
                        .requestMatchers("/api/orders/myorders").authenticated()
                        .requestMatchers(HttpMethod.POST, "/api/orders").authenticated()
                        .requestMatchers(HttpMethod.GET, "/api/orders/**").authenticated()
                        .requestMatchers("/api/payment/**").authenticated()

                        // Any other request
                        .anyRequest().authenticated()
                )
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint((request, response, authException) -> {
                            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                            response.setStatus(401);
                            objectMapper.writeValue(response.getOutputStream(),
                                    Map.of("message", "Not authorized, token failed"));
                        })
                        .accessDeniedHandler((request, response, accessDeniedException) -> {
                            response.setContentType(MediaType.APPLICATION_JSON_VALUE);
                            response.setStatus(403);
                            objectMapper.writeValue(response.getOutputStream(),
                                    Map.of("message", "Access denied, admin only"));
                        })
                )
                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOriginPatterns(Collections.singletonList("*"));
        configuration.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"));
        configuration.setAllowedHeaders(Arrays.asList("Authorization", "Content-Type", "Accept", "X-Requested-With", "Origin"));
        configuration.setExposedHeaders(Collections.singletonList("Authorization"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
