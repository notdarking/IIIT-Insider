package com.iiitinsider.repository;

import com.iiitinsider.model.PlacementStatistic;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlacementStatisticRepository extends JpaRepository<PlacementStatistic, Long> {
    List<PlacementStatistic> findByCollegeIdOrderByAcademicYearDesc(Long collegeId);
    Optional<PlacementStatistic> findFirstByCollegeIdOrderByAcademicYearDesc(Long collegeId);
}
