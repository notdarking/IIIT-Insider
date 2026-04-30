package com.iiitinsider.service;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.util.HashMap;
import java.util.Map;

@Service
public class SocialMediaService {

    private static final Logger log = LoggerFactory.getLogger(SocialMediaService.class);

    private static final String FACEBOOK_SHARE_URL = "https://www.facebook.com/sharer/sharer.php?u=";
    private static final String TWITTER_SHARE_URL = "https://twitter.com/intent/tweet?text=";
    private static final String LINKEDIN_SHARE_URL = "https://www.linkedin.com/sharing/share-offsite/?url=";
    private static final String WHATSAPP_SHARE_URL = "https://wa.me/?text=";
    private static final String REDDIT_SHARE_URL = "https://reddit.com/submit?url=";

    public Map<String, String> getShareLinks(String url, String title) {
        Map<String, String> shareLinks = new HashMap<>();

        String encodedUrl = URLEncoder.encode(url, StandardCharsets.UTF_8);
        String encodedTitle = URLEncoder.encode(title, StandardCharsets.UTF_8);

        shareLinks.put("facebook", FACEBOOK_SHARE_URL + encodedUrl);
        shareLinks.put("twitter", TWITTER_SHARE_URL + encodedTitle + "&url=" + encodedUrl);
        shareLinks.put("linkedin", LINKEDIN_SHARE_URL + encodedUrl);
        shareLinks.put("whatsapp", WHATSAPP_SHARE_URL + encodedTitle + "%20" + encodedUrl);
        shareLinks.put("reddit", REDDIT_SHARE_URL + encodedUrl + "&title=" + encodedTitle);

        log.info("Generated share links for URL: {}", url);
        return shareLinks;
    }

    public String generateFacebookShareUrl(String url) {
        return FACEBOOK_SHARE_URL + URLEncoder.encode(url, StandardCharsets.UTF_8);
    }

    public String generateTwitterShareUrl(String url, String title) {
        String encodedUrl = URLEncoder.encode(url, StandardCharsets.UTF_8);
        String encodedTitle = URLEncoder.encode(title, StandardCharsets.UTF_8);
        return TWITTER_SHARE_URL + encodedTitle + "&url=" + encodedUrl;
    }

    public String generateLinkedInShareUrl(String url) {
        return LINKEDIN_SHARE_URL + URLEncoder.encode(url, StandardCharsets.UTF_8);
    }

    public String generateWhatsAppShareUrl(String url, String title) {
        String encodedUrl = URLEncoder.encode(url, StandardCharsets.UTF_8);
        String encodedTitle = URLEncoder.encode(title, StandardCharsets.UTF_8);
        return WHATSAPP_SHARE_URL + encodedTitle + "%20" + encodedUrl;
    }

    public String generateRedditShareUrl(String url, String title) {
        String encodedUrl = URLEncoder.encode(url, StandardCharsets.UTF_8);
        String encodedTitle = URLEncoder.encode(title, StandardCharsets.UTF_8);
        return REDDIT_SHARE_URL + encodedUrl + "&title=" + encodedTitle;
    }
}
