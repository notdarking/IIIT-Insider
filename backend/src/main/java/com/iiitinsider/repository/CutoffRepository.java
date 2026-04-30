package com.iiitinsider.repository;

import com.iiitinsider.model.Cutoff;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CutoffRepository extends JpaRepository<Cutoff, Long> {
    List<Cutoff> findByCollegeIdOrderByYearDescRoundAsc(Long collegeId);
    List<Cutoff> findByCollegeIdAndBranchIdOrderByYearDescRoundAsc(Long collegeId, Long branchId);
}
