package com.mytrip.mytripservice.controller;

import com.mytrip.mytripservice.model.DataRequest;
import com.mytrip.mytripservice.model.LocationOverview;
import com.mytrip.mytripservice.service.DataPortalRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.io.UnsupportedEncodingException;

@RestController
@RequiredArgsConstructor
public class DataPortalController {

    @Autowired
    private DataPortalRequest dataPortalRequest;

    @GetMapping("/data")
    public Object getListData(@ModelAttribute DataRequest request) throws UnsupportedEncodingException {
        String url = dataPortalRequest.makeDataUrl(request);
        Object data = dataPortalRequest.fetchData(url, LocationOverview.class);
        return data;
    }
}
