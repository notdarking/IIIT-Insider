package com.iiitinsider.controller;

import com.iiitinsider.service.SocialMediaService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/social")
public class SocialMediaController {

    private final SocialMediaService socialMediaService;

    public SocialMediaController(SocialMediaService socialMediaService) {
        this.socialMediaService = socialMediaService;
    }

    @GetMapping("/share-links")
    public ResponseEntity<?> getShareLinks(
        @RequestParam String url,
        @RequestParam(required = false, defaultValue = "") String title
    ) {
        try {
            Map<String, String> shareLinks = socialMediaService.getShareLinks(url, title);
            return ResponseEntity.ok(shareLinks);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(Map.of("error", e.getMessage()));
        }
    }

    @GetMapping("/share/facebook")
    public ResponseEntity<?> facebookShare(@RequestParam String url) {
        String shareUrl = socialMediaService.generateFacebookShareUrl(url);
        return ResponseEntity.ok(Map.of("url", shareUrl, "platform", "facebook"));
    }

    @GetMapping("/share/twitter")
    public ResponseEntity<?> twitterShare(
        @RequestParam String url,
        @RequestParam(required = false, defaultValue = "") String title
    ) {
        String shareUrl = socialMediaService.generateTwitterShareUrl(url, title);
        return ResponseEntity.ok(Map.of("url", shareUrl, "platform", "twitter"));
    }

    @GetMapping("/share/linkedin")
    public ResponseEntity<?> linkedinShare(@RequestParam String url) {
        String shareUrl = socialMediaService.generateLinkedInShareUrl(url);
        return ResponseEntity.ok(Map.of("url", shareUrl, "platform", "linkedin"));
    }

    @GetMapping("/share/whatsapp")
    public ResponseEntity<?> whatsappShare(
        @RequestParam String url,
        @RequestParam(required = false, defaultValue = "") String title
    ) {
        String shareUrl = socialMediaService.generateWhatsAppShareUrl(url, title);
        return ResponseEntity.ok(Map.of("url", shareUrl, "platform", "whatsapp"));
    }

    @GetMapping("/share/reddit")
    public ResponseEntity<?> redditShare(
        @RequestParam String url,
        @RequestParam(required = false, defaultValue = "") String title
    ) {
        String shareUrl = socialMediaService.generateRedditShareUrl(url, title);
        return ResponseEntity.ok(Map.of("url", shareUrl, "platform", "reddit"));
    }
}
