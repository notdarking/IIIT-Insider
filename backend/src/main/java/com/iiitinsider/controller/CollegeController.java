package com.iiitinsider.controller;

import com.iiitinsider.service.CollegeService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/colleges")
public class CollegeController {

    private final CollegeService collegeService;

    public CollegeController(CollegeService collegeService) {
        this.collegeService = collegeService;
    }

    @GetMapping
    public ResponseEntity<?> getColleges(@RequestParam(required = false) String region) {
        return ResponseEntity.ok(collegeService.getColleges(region));
    }

    @GetMapping("/search")
    public ResponseEntity<?> searchColleges(@RequestParam String query) {
        return ResponseEntity.ok(collegeService.searchColleges(query));
    }

    @GetMapping("/compare")
    public ResponseEntity<?> compareCollege(@RequestParam String name) {
        try {
            return ResponseEntity.ok(collegeService.getCompareData(name));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/{slug}")
    public ResponseEntity<?> getCollegeDetails(@PathVariable String slug) {
        try {
            return ResponseEntity.ok(collegeService.getCollegeDetails(slug));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }
}
