package com.mytrip.mytripservice.controller;

import com.mytrip.mytripservice.entity.AreaCode;
import com.mytrip.mytripservice.service.AreaCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.UnsupportedEncodingException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/area")
public class AreaCodeController {

    @Autowired
    private AreaCodeService areaCodeService;

    @GetMapping("/dataSave")
    public String saveData(@RequestParam(defaultValue = "") String areacode) throws UnsupportedEncodingException {
        areaCodeService.fetchSaveData(areacode);
        return "Area codes fetching and saving initiated";
    }

    @GetMapping("/dataSaveAll")
    public String saveDataAll() throws UnsupportedEncodingException {
        areaCodeService.fetchSaveAll();
        return "Area codes All fetching and saving initiated";
    }

    @GetMapping("/areaCode")
    public List<AreaCode> getAreaCode(
            @RequestParam(defaultValue = "") String areaCode) {

        if (areaCode.isEmpty()) {
            return areaCodeService.getAll(); //search
        } else {
            return areaCodeService.getAreaCode(areaCode); //location
        }
    }
}
