package com.ptithcm.foodapp.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@RestController
@RequestMapping("/api/v1")
public class LocationController {
    private final RestTemplate restTemplate = new RestTemplate();

    // geocode openstreetmap
    @RequestMapping("/geocode")
    public Map<String, Object> getAddress(@RequestParam double lat, @RequestParam double lon) {
        String url = "https://nominatim.openstreetmap.org/reverse?format=json&lat=" + lat + "&lon=" + lon;
        return restTemplate.getForObject(url, Map.class);
    }
}
