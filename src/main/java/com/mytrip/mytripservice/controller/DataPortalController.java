package com.mytrip.mytripservice.controller;

import com.mytrip.mytripservice.model.DataRequest;
import com.mytrip.mytripservice.model.LocationDetail;
import com.mytrip.mytripservice.model.LocationOverview;
import com.mytrip.mytripservice.service.DataPortalService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.io.UnsupportedEncodingException;

@RestController
@RequiredArgsConstructor
@RequestMapping("/data")
public class DataPortalController {

    private final DataPortalService dataPortalService;

    @GetMapping("/list")
    public Object getListData(@ModelAttribute DataRequest request) throws UnsupportedEncodingException {
        String url = dataPortalService.makeDataUrl(request);
        Object data = dataPortalService.fetchData(url, LocationOverview.class);
        return data;
    }

    @GetMapping("/dataDetail")
    public Object getDataDetail(@ModelAttribute DataRequest request) throws UnsupportedEncodingException {
        String url = dataPortalService.makeDataUrl(request);
        Object data = dataPortalService.fetchData(url, LocationDetail.class);
        return data;
    }

}
