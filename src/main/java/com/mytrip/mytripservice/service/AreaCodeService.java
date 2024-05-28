package com.mytrip.mytripservice.service;

import com.mytrip.mytripservice.entity.AreaCode;
import com.mytrip.mytripservice.model.AreaCodeModel;
import com.mytrip.mytripservice.repository.AreaCodeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.io.UnsupportedEncodingException;
import java.util.List;

@Service
public class AreaCodeService {
    @Autowired
    private AreaCodeRepository areaCodeRepository;

    @Autowired
    private DataPortalService dataPortalService;

    public void fetchSaveData(String areaCode) throws UnsupportedEncodingException {
        String url = dataPortalService.makeSaveUrl(areaCode);
        dataPortalService.fetchData(url, AreaCodeModel.class).subscribe(response -> {
            if ("0000".equals(response.getResponse().getHeader().getResultCode())) {
                List<AreaCodeModel.Item> items = response.getResponse().getBody().getItems().getItem();
                if (areaCode.isEmpty()){
                    for (AreaCodeModel.Item item : items) {
                        AreaCode areaCodeEntity = new AreaCode(item.getCode(), "", item.getName());
                        areaCodeRepository.save(areaCodeEntity);
                    }
                } else {
                    for (AreaCodeModel.Item item : items) {
                        AreaCode areaCodeEntity = new AreaCode(areaCode, item.getCode(), item.getName());
                        areaCodeRepository.save(areaCodeEntity);
                    }
                }
            } else {
                System.err.println("Failed to fetch data: " + response.getResponse().getHeader().getResultMsg());
            }
        });


    }

    public void fetchSaveAll() throws UnsupportedEncodingException {
        List<AreaCode> areaCodes = areaCodeRepository.findBySigungucode("");
        for (AreaCode areaCode : areaCodes) {
            fetchSaveData(areaCode.getAreacode());
        }
    }

    public List<AreaCode> getAll() {
        Sort sort = Sort.by(Sort.Direction.ASC, "areacode");
        return areaCodeRepository.findAll(sort);
    }


    public List<AreaCode> getAreaCode(String areacode) {
        return areaCodeRepository.findByAreacode(areacode);
    }
}
