package com.iiitinsider.repository;

import com.iiitinsider.model.Branch;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BranchRepository extends JpaRepository<Branch, Long> {
    List<Branch> findByCollegeIdOrderByNameAsc(Long collegeId);
}
