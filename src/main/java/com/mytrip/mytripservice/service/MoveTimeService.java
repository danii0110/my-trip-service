package com.mytrip.mytripservice.service;

import com.mytrip.mytripservice.dto.DailyScheduleOtherDTO;
import com.mytrip.mytripservice.dto.MoveTimeDTO;
import com.mytrip.mytripservice.entity.MoveTime;
import com.mytrip.mytripservice.entity.Place;
import com.mytrip.mytripservice.entity.Plan;
import com.mytrip.mytripservice.entity.SchedulePlace;
import com.mytrip.mytripservice.repository.MoveTimeRepository;
import com.mytrip.mytripservice.repository.PlaceRepository;
import com.mytrip.mytripservice.repository.PlanRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.Duration;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Comparator;
import java.util.stream.Collectors;

@Service
public class MoveTimeService {

    private final MoveTimeRepository moveTimeRepository;
    private final PlanRepository planRepository;
    private final PlaceRepository placeRepository;

    @Autowired
    public MoveTimeService(MoveTimeRepository moveTimeRepository, PlanRepository planRepository, PlaceRepository placeRepository) {
        this.moveTimeRepository = moveTimeRepository;
        this.planRepository = planRepository;
        this.placeRepository = placeRepository;
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
        return moveTime;
    }

    private MoveTimeDTO convertToDTO(MoveTime moveTime) {
        MoveTimeDTO moveTimeDTO = new MoveTimeDTO();
        moveTimeDTO.setMoveTimeId(moveTime.getMoveTimeId());
        moveTimeDTO.setPlanId(moveTime.getPlan().getPlanId());
        moveTimeDTO.setFromPlaceId(moveTime.getFromPlace().getPlaceId());
        moveTimeDTO.setToPlaceId(moveTime.getToPlace().getPlaceId());
        moveTimeDTO.setMoveTime(moveTime.getMoveTime());
        return moveTimeDTO;
    }

    public void saveMoveTimes(List<MoveTimeDTO> moveTimes) {
        List<MoveTime> moveTimeEntities = new ArrayList<>();

        for (MoveTimeDTO dto : moveTimes) {
            Plan plan = planRepository.findById(dto.getPlanId())
                    .orElseThrow(() -> new RuntimeException("Plan not found with id: " + dto.getPlanId()));
            Place fromPlace = placeRepository.findById(dto.getFromPlaceId())
                    .orElseThrow(() -> new RuntimeException("Place not found with id: " + dto.getFromPlaceId()));
            Place toPlace = placeRepository.findById(dto.getToPlaceId())
                    .orElseThrow(() -> new RuntimeException("Place not found with id: " + dto.getToPlaceId()));

            MoveTime moveTimeEntity = MoveTime.builder()
                    .plan(plan)
                    .fromPlace(fromPlace)
                    .toPlace(toPlace)
                    .moveTime(dto.getMoveTime())
                    .build();

            moveTimeEntities.add(moveTimeEntity);
        }

        moveTimeRepository.saveAll(moveTimeEntities);
    }

    public List<MoveTimeDTO> calculateMoveTimes(List<DailyScheduleOtherDTO> schedules) {
        List<MoveTimeDTO> moveTimes = new ArrayList<>();

        for (DailyScheduleOtherDTO schedule : schedules) {
            List<SchedulePlace> schedulePlaces = schedule.getSchedulePlaces();
            schedulePlaces.sort(Comparator.comparing(SchedulePlace::getStartTime));

            for (int i = 0; i < schedulePlaces.size() - 1; i++) {
                SchedulePlace currentPlace = schedulePlaces.get(i);
                SchedulePlace nextPlace = schedulePlaces.get(i + 1);

                int moveTime = calculateMoveTime(
                        currentPlace.getEndTime(),
                        nextPlace.getStartTime()
                );

                MoveTimeDTO moveTimeDTO = new MoveTimeDTO();
                moveTimeDTO.setPlanId(schedule.getPlanId());
                moveTimeDTO.setFromPlaceId(currentPlace.getPlace().getPlaceId());
                moveTimeDTO.setToPlaceId(nextPlace.getPlace().getPlaceId());
                moveTimeDTO.setMoveTime(moveTime);

                moveTimes.add(moveTimeDTO);
            }
        }

        return moveTimes;
    }

    private int calculateMoveTime(LocalTime endTime, LocalTime startTime) {
        Duration duration = Duration.between(endTime, startTime);
        return (int) duration.toMinutes();
    }
}
