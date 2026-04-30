package com.iiitinsider.repository;

import com.iiitinsider.model.College;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CollegeRepository extends JpaRepository<College, Long> {
    List<College> findByIsActiveTrueOrderByNameAsc();
    List<College> findByRegionAndIsActiveTrueOrderByNameAsc(College.Region region);
    Optional<College> findBySlugIgnoreCase(String slug);
    Optional<College> findByNameIgnoreCase(String name);
    List<College> findByNameContainingIgnoreCaseAndIsActiveTrueOrderByNameAsc(String name);
}
