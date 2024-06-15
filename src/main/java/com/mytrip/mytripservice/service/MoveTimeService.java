// MoveTimeService.java
package com.mytrip.mytripservice.service;

import com.mytrip.mytripservice.dto.MoveTimeDTO;
import com.mytrip.mytripservice.entity.MoveTime;
import com.mytrip.mytripservice.repository.MoveTimeRepository;
import com.mytrip.mytripservice.repository.PlaceRepository;
import com.mytrip.mytripservice.repository.PlanRepository;
import com.mytrip.mytripservice.repository.DailyScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MoveTimeService {

    private final MoveTimeRepository moveTimeRepository;
    private final PlanRepository planRepository;
    private final PlaceRepository placeRepository;
    private final DailyScheduleRepository dailyScheduleRepository;

    @Autowired
    public MoveTimeService(MoveTimeRepository moveTimeRepository, PlanRepository planRepository, PlaceRepository placeRepository, DailyScheduleRepository dailyScheduleRepository) {
        this.moveTimeRepository = moveTimeRepository;
        this.planRepository = planRepository;
        this.placeRepository = placeRepository;
        this.dailyScheduleRepository = dailyScheduleRepository;
    }

    public List<MoveTimeDTO> getAllMoveTimes() {
        return moveTimeRepository.findAll().stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public Optional<MoveTimeDTO> getMoveTimeById(Long id) {
        return moveTimeRepository.findById(id)
                .map(this::convertToDTO);
    }

    @Transactional
    public MoveTimeDTO createMoveTime(MoveTimeDTO moveTimeDTO) {
        MoveTime moveTime = convertToEntity(moveTimeDTO);
        MoveTime savedMoveTime = moveTimeRepository.save(moveTime);
        return convertToDTO(savedMoveTime);
    }

    @Transactional
    public MoveTimeDTO updateMoveTime(Long id, MoveTimeDTO moveTimeDTO) {
        return moveTimeRepository.findById(id).map(existingMoveTime -> {
            MoveTime moveTime = convertToEntity(moveTimeDTO);
            moveTime.setMoveTimeId(existingMoveTime.getMoveTimeId());
            MoveTime updatedMoveTime = moveTimeRepository.save(moveTime);
            return convertToDTO(updatedMoveTime);
        }).orElseThrow(() -> new RuntimeException("MoveTime not found"));
    }

    @Transactional
    public void deleteMoveTime(Long id) {
        moveTimeRepository.deleteById(id);
    }

    private MoveTime convertToEntity(MoveTimeDTO moveTimeDTO) {
        MoveTime moveTime = new MoveTime();
        moveTime.setPlan(planRepository.findById(moveTimeDTO.getPlanId()).orElseThrow(() -> new RuntimeException("Plan not found")));
        moveTime.setFromPlace(placeRepository.findById(moveTimeDTO.getFromPlaceId()).orElseThrow(() -> new RuntimeException("From Place not found")));
        moveTime.setToPlace(placeRepository.findById(moveTimeDTO.getToPlaceId()).orElseThrow(() -> new RuntimeException("To Place not found")));
        moveTime.setMoveTime(moveTimeDTO.getMoveTime());
        if (moveTimeDTO.getDailyScheduleId() != null) {
            moveTime.setDailySchedule(dailyScheduleRepository.findById(moveTimeDTO.getDailyScheduleId()).orElse(null));
        }
        return moveTime;
    }

    private MoveTimeDTO convertToDTO(MoveTime moveTime) {
        MoveTimeDTO moveTimeDTO = new MoveTimeDTO();
        moveTimeDTO.setMoveTimeId(moveTime.getMoveTimeId());
        moveTimeDTO.setPlanId(moveTime.getPlan().getPlanId());
        moveTimeDTO.setFromPlaceId(moveTime.getFromPlace().getPlaceId());
        moveTimeDTO.setToPlaceId(moveTime.getToPlace().getPlaceId());
        moveTimeDTO.setMoveTime(moveTime.getMoveTime());
        if (moveTime.getDailySchedule() != null) {
            moveTimeDTO.setDailyScheduleId(moveTime.getDailySchedule().getScheduleId());
        }
        return moveTimeDTO;
    }
}
