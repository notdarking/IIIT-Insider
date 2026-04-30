package com.iiitinsider.service;

import com.iiitinsider.model.Branch;
import com.iiitinsider.model.College;
import com.iiitinsider.model.Cutoff;
import com.iiitinsider.model.PlacementStatistic;
import com.iiitinsider.model.Program;
import com.iiitinsider.model.Review;
import com.iiitinsider.repository.BranchRepository;
import com.iiitinsider.repository.CollegeRepository;
import com.iiitinsider.repository.CutoffRepository;
import com.iiitinsider.repository.PlacementStatisticRepository;
import com.iiitinsider.repository.ProgramRepository;
import com.iiitinsider.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CollegeService {

    private final CollegeRepository collegeRepository;
    private final BranchRepository branchRepository;
    private final ProgramRepository programRepository;
    private final PlacementStatisticRepository placementStatisticRepository;
    private final CutoffRepository cutoffRepository;
    private final ReviewRepository reviewRepository;

    public CollegeService(CollegeRepository collegeRepository,
                          BranchRepository branchRepository,
                          ProgramRepository programRepository,
                          PlacementStatisticRepository placementStatisticRepository,
                          CutoffRepository cutoffRepository,
                          ReviewRepository reviewRepository) {
        this.collegeRepository = collegeRepository;
        this.branchRepository = branchRepository;
        this.programRepository = programRepository;
        this.placementStatisticRepository = placementStatisticRepository;
        this.cutoffRepository = cutoffRepository;
        this.reviewRepository = reviewRepository;
    }

    public List<Map<String, Object>> getColleges(String region) {
        List<College> colleges = parseRegion(region)
            .map(collegeRepository::findByRegionAndIsActiveTrueOrderByNameAsc)
            .orElseGet(collegeRepository::findByIsActiveTrueOrderByNameAsc);

        return colleges.stream()
            .map(this::toCollegeCard)
            .collect(Collectors.toList());
    }

    public List<Map<String, Object>> searchColleges(String query) {
        return collegeRepository.findByNameContainingIgnoreCaseAndIsActiveTrueOrderByNameAsc(query)
            .stream()
            .map(this::toCollegeCard)
            .collect(Collectors.toList());
    }

    public Map<String, Object> getCollegeDetails(String slug) {
        College college = findByNameOrSlug(slug)
            .orElseThrow(() -> new RuntimeException("College not found"));

        Map<String, Object> details = toCollegeCard(college);
        details.put("city", college.getCity());
        details.put("state", college.getState());
        details.put("campusArea", college.getCampusArea());
        details.put("instituteType", college.getInstituteType());
        details.put("establishedYear", college.getEstablishedYear());
        details.put("websiteUrl", college.getWebsiteUrl());
        details.put("mentorInstitute", college.getMentorInstitute());
        details.put("branches", branchRepository.findByCollegeIdOrderByNameAsc(college.getId()).stream()
            .map(this::toBranchMap)
            .collect(Collectors.toList()));
        details.put("programs", programRepository.findByCollegeIdOrderByNameAsc(college.getId()).stream()
            .map(this::toProgramMap)
            .collect(Collectors.toList()));
        details.put("placements", placementStatisticRepository.findByCollegeIdOrderByAcademicYearDesc(college.getId()).stream()
            .map(this::toPlacementMap)
            .collect(Collectors.toList()));
        details.put("cutoffs", cutoffRepository.findByCollegeIdOrderByYearDescRoundAsc(college.getId()).stream()
            .map(this::toCutoffMap)
            .collect(Collectors.toList()));
        details.put("reviews", reviewRepository.findByCollegeIdAndIsApprovedTrueOrderByCreatedAtDesc(college.getId()).stream()
            .map(this::toReviewMap)
            .collect(Collectors.toList()));

        return details;
    }

    public Map<String, Object> getCompareData(String nameOrSlug) {
        College college = findByNameOrSlug(nameOrSlug)
            .orElseThrow(() -> new RuntimeException("College not found"));

        Map<String, Object> data = new HashMap<>();
        data.put("name", college.getName());
        data.put("year", college.getEstablishedYear() == null ? "" : college.getEstablishedYear().toString());
        data.put("area", college.getCampusArea());
        data.put("type", college.getInstituteType());
        data.put("curr", programRepository.findByCollegeIdOrderByNameAsc(college.getId()).stream()
            .map(Program::getName)
            .collect(Collectors.joining(", ")));
        data.put("las", branchRepository.findByCollegeIdOrderByNameAsc(college.getId()).stream()
            .filter(branch -> Boolean.TRUE.equals(branch.getIsPopular()))
            .map(Branch::getName)
            .findFirst()
            .orElse(""));

        placementStatisticRepository.findFirstByCollegeIdOrderByAcademicYearDesc(college.getId())
            .ifPresent(placement -> {
                data.put("avg", formatLpa(placement.getAveragePackageLpa()));
                data.put("med", formatLpa(placement.getMedianPackageLpa()));
                data.put("mea", formatLpa(placement.getHighestPackageLpa()));
                data.put("placement", formatPercent(placement.getPlacementPercentage()));
            });

        reviewRepository.findByCollegeIdAndIsApprovedTrueOrderByCreatedAtDesc(college.getId())
            .stream()
            .findFirst()
            .ifPresent(review -> {
                data.put("pros", review.getPros());
                data.put("cons", review.getCons());
            });

        data.putIfAbsent("avg", "");
        data.putIfAbsent("med", "");
        data.putIfAbsent("mea", "");
        data.putIfAbsent("placement", "");
        data.putIfAbsent("pros", "");
        data.putIfAbsent("cons", "");

        return data;
    }

    private Optional<College> findByNameOrSlug(String value) {
        String normalized = value == null ? "" : value.trim();
        if (normalized.isEmpty()) {
            return Optional.empty();
        }

        Optional<College> bySlug = collegeRepository.findBySlugIgnoreCase(normalized);
        if (bySlug.isPresent()) {
            return bySlug;
        }

        return collegeRepository.findByNameIgnoreCase(normalized);
    }

    private Map<String, Object> toCollegeCard(College college) {
        Map<String, Object> data = new HashMap<>();
        data.put("id", college.getId());
        data.put("name", college.getName());
        data.put("slug", college.getSlug());
        data.put("description", college.getDescription());
        data.put("image", college.getImageUrl());
        data.put("region", college.getRegion().name().toLowerCase(Locale.ROOT));
        return data;
    }

    private Map<String, Object> toBranchMap(Branch branch) {
        Map<String, Object> data = new HashMap<>();
        data.put("id", branch.getId());
        data.put("name", branch.getName());
        data.put("code", branch.getCode());
        data.put("description", branch.getDescription());
        data.put("seats", branch.getSeats());
        data.put("isPopular", branch.getIsPopular());
        return data;
    }

    private Map<String, Object> toProgramMap(Program program) {
        Map<String, Object> data = new HashMap<>();
        data.put("id", program.getId());
        data.put("name", program.getName());
        data.put("degreeLevel", program.getDegreeLevel().name());
        data.put("durationYears", program.getDurationYears());
        data.put("description", program.getDescription());
        return data;
    }

    private Map<String, Object> toPlacementMap(PlacementStatistic placement) {
        Map<String, Object> data = new HashMap<>();
        data.put("id", placement.getId());
        data.put("academicYear", placement.getAcademicYear());
        data.put("averagePackageLpa", placement.getAveragePackageLpa());
        data.put("medianPackageLpa", placement.getMedianPackageLpa());
        data.put("highestPackageLpa", placement.getHighestPackageLpa());
        data.put("placementPercentage", placement.getPlacementPercentage());
        data.put("studentsPlaced", placement.getStudentsPlaced());
        data.put("totalEligibleStudents", placement.getTotalEligibleStudents());
        data.put("topRecruiters", placement.getTopRecruiters());
        data.put("sourceUrl", placement.getSourceUrl());
        return data;
    }

    private Map<String, Object> toCutoffMap(Cutoff cutoff) {
        Map<String, Object> data = new HashMap<>();
        data.put("id", cutoff.getId());
        data.put("branchId", cutoff.getBranch() == null ? null : cutoff.getBranch().getId());
        data.put("year", cutoff.getYear());
        data.put("round", cutoff.getRound());
        data.put("counsellingType", cutoff.getCounsellingType().name());
        data.put("category", cutoff.getCategory());
        data.put("quota", cutoff.getQuota());
        data.put("gender", cutoff.getGender());
        data.put("openingRank", cutoff.getOpeningRank());
        data.put("closingRank", cutoff.getClosingRank());
        return data;
    }

    private Map<String, Object> toReviewMap(Review review) {
        Map<String, Object> data = new HashMap<>();
        data.put("id", review.getId());
        data.put("title", review.getTitle());
        data.put("body", review.getBody());
        data.put("rating", review.getRating());
        data.put("pros", review.getPros());
        data.put("cons", review.getCons());
        data.put("createdAt", review.getCreatedAt());
        return data;
    }

    private Optional<College.Region> parseRegion(String region) {
        if (region == null || region.trim().isEmpty() || "all".equalsIgnoreCase(region.trim())) {
            return Optional.empty();
        }

        try {
            return Optional.of(College.Region.valueOf(region.trim().toUpperCase(Locale.ROOT)));
        } catch (IllegalArgumentException ignored) {
            return Optional.empty();
        }
    }

    private String formatLpa(BigDecimal value) {
        return value == null ? "" : value.stripTrailingZeros().toPlainString() + " LPA";
    }

    private String formatPercent(BigDecimal value) {
        return value == null ? "" : value.stripTrailingZeros().toPlainString() + "%";
    }
}
