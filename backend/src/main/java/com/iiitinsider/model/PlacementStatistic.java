package com.iiitinsider.model;

import jakarta.persistence.*;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(
    name = "placement_statistics",
    uniqueConstraints = @UniqueConstraint(columnNames = {"college_id", "academic_year"})
)
public class PlacementStatistic {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "college_id", nullable = false)
    private College college;

    @Column(name = "academic_year", nullable = false, length = 20)
    private String academicYear;

    @Column(name = "average_package_lpa", precision = 10, scale = 2)
    private BigDecimal averagePackageLpa;

    @Column(name = "median_package_lpa", precision = 10, scale = 2)
    private BigDecimal medianPackageLpa;

    @Column(name = "highest_package_lpa", precision = 10, scale = 2)
    private BigDecimal highestPackageLpa;

    @Column(name = "placement_percentage", precision = 5, scale = 2)
    private BigDecimal placementPercentage;

    private Integer studentsPlaced;

    private Integer totalEligibleStudents;

    @Column(columnDefinition = "TEXT")
    private String topRecruiters;

    @Column(columnDefinition = "TEXT")
    private String sourceUrl;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Column(name = "updated_at")
    private LocalDateTime updatedAt = LocalDateTime.now();

    @PreUpdate
    public void preUpdate() {
        updatedAt = LocalDateTime.now();
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public College getCollege() {
        return college;
    }

    public void setCollege(College college) {
        this.college = college;
    }

    public String getAcademicYear() {
        return academicYear;
    }

    public void setAcademicYear(String academicYear) {
        this.academicYear = academicYear;
    }

    public BigDecimal getAveragePackageLpa() {
        return averagePackageLpa;
    }

    public void setAveragePackageLpa(BigDecimal averagePackageLpa) {
        this.averagePackageLpa = averagePackageLpa;
    }

    public BigDecimal getMedianPackageLpa() {
        return medianPackageLpa;
    }

    public void setMedianPackageLpa(BigDecimal medianPackageLpa) {
        this.medianPackageLpa = medianPackageLpa;
    }

    public BigDecimal getHighestPackageLpa() {
        return highestPackageLpa;
    }

    public void setHighestPackageLpa(BigDecimal highestPackageLpa) {
        this.highestPackageLpa = highestPackageLpa;
    }

    public BigDecimal getPlacementPercentage() {
        return placementPercentage;
    }

    public void setPlacementPercentage(BigDecimal placementPercentage) {
        this.placementPercentage = placementPercentage;
    }

    public Integer getStudentsPlaced() {
        return studentsPlaced;
    }

    public void setStudentsPlaced(Integer studentsPlaced) {
        this.studentsPlaced = studentsPlaced;
    }

    public Integer getTotalEligibleStudents() {
        return totalEligibleStudents;
    }

    public void setTotalEligibleStudents(Integer totalEligibleStudents) {
        this.totalEligibleStudents = totalEligibleStudents;
    }

    public String getTopRecruiters() {
        return topRecruiters;
    }

    public void setTopRecruiters(String topRecruiters) {
        this.topRecruiters = topRecruiters;
    }

    public String getSourceUrl() {
        return sourceUrl;
    }

    public void setSourceUrl(String sourceUrl) {
        this.sourceUrl = sourceUrl;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}
