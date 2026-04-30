package com.iiitinsider.repository;

import com.iiitinsider.model.DeviceToken;
import com.iiitinsider.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface DeviceTokenRepository extends JpaRepository<DeviceToken, Long> {
    List<DeviceToken> findByUserId(Long userId);
    List<DeviceToken> findByUser(User user);
    Optional<DeviceToken> findByToken(String token);

    @Modifying
    @Query("DELETE FROM DeviceToken dt WHERE dt.user.id = :userId AND dt.isActive = false")
    void deleteInactiveTokens(Long userId);

    long countByUserIdAndIsActive(Long userId, Boolean isActive);
}
