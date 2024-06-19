package com.mytrip.mytripservice.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ServiceKeyController {

    private static final Logger logger = LoggerFactory.getLogger(ServiceKeyController.class);

    @Value("${public-data.korservice.key.decoding}")
    private String serviceKey;

    @GetMapping("/api/serviceKey")
    public String getServiceKey() {
        logger.debug("ServiceKey endpoint hit");
        return serviceKey;
    }
}
