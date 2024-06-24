package com.mytrip.mytripservice.service;

import com.mytrip.mytripservice.dto.DailyScheduleDTO;
import com.mytrip.mytripservice.dto.DailyScheduleOtherDTO;
import com.mytrip.mytripservice.dto.SchedulePlaceDTO;
import com.mytrip.mytripservice.entity.DailySchedule;
import com.mytrip.mytripservice.entity.Plan;
import com.mytrip.mytripservice.entity.Place;
import com.mytrip.mytripservice.entity.SchedulePlace;
import com.mytrip.mytripservice.repository.DailyScheduleRepository;
import com.mytrip.mytripservice.repository.PlanRepository;
import com.mytrip.mytripservice.repository.PlaceRepository;
import com.mytrip.mytripservice.repository.SchedulePlaceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class DailyScheduleService {
    private final DailyScheduleRepository dailyScheduleRepository;
    private final PlanRepository planRepository;
    private final SchedulePlaceRepository schedulePlaceRepository;
    private final PlaceRepository placeRepository;

    @Autowired
    public DailyScheduleService(DailyScheduleRepository dailyScheduleRepository, PlanRepository planRepository, SchedulePlaceRepository schedulePlaceRepository, PlaceRepository placeRepository) {
        this.dailyScheduleRepository = dailyScheduleRepository;
        this.planRepository = planRepository;
        this.schedulePlaceRepository = schedulePlaceRepository;
        this.placeRepository = placeRepository;
    }

    public List<DailyScheduleDTO> getAllDailySchedules() {
        return dailyScheduleRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<DailyScheduleDTO> getDailyScheduleById(Long id) {
        return dailyScheduleRepository.findById(id).map(this::toDTO);
    }

    public List<DailyScheduleOtherDTO> getDailyScheduleByPlanId(Long id) {
        return dailyScheduleRepository.findByPlan_PlanId(id).stream()
                .map(this::toOtherDTO).collect(Collectors.toList());
    }

    @Transactional
    public DailyScheduleDTO createDailySchedule(DailyScheduleDTO dailyScheduleDTO) {
        Plan plan = planRepository.findById(dailyScheduleDTO.getPlanId())
                .orElseThrow(() -> new RuntimeException("Plan not found"));

        DailySchedule dailySchedule = new DailySchedule();
        dailySchedule.setPlan(plan);
        dailySchedule.setDate(dailyScheduleDTO.getDate());

        // 먼저 DailySchedule을 저장
        DailySchedule savedDailySchedule = dailyScheduleRepository.save(dailySchedule);

        // SchedulePlace 저장
        List<SchedulePlace> schedulePlaces = dailyScheduleDTO.getSchedulePlaces().stream()
                .map(dto -> {
                    Place place = placeRepository.findById(dto.getPlaceId())
                            .orElseThrow(() -> new RuntimeException("Place not found"));
                    SchedulePlace schedulePlace = new SchedulePlace();
                    schedulePlace.setDailySchedule(savedDailySchedule);
                    schedulePlace.setPlace(place);
                    schedulePlace.setDuration(dto.getDuration());
                    schedulePlace.setStartTime(dto.getStartTime());
                    schedulePlace.setEndTime(dto.getEndTime());
                    return schedulePlaceRepository.save(schedulePlace);
                })
                .collect(Collectors.toList());

        // SchedulePlace 리스트를 DailySchedule에 설정
        savedDailySchedule.setSchedulePlaces(schedulePlaces);

        return toDTO(dailyScheduleRepository.save(savedDailySchedule));
    }

    @Transactional
    public DailyScheduleDTO updateDailySchedule(Long id, DailyScheduleDTO dailyScheduleDetails) {
        return dailyScheduleRepository.findById(id).map(dailySchedule -> {
            dailySchedule.setDate(dailyScheduleDetails.getDate());
            return toDTO(dailyScheduleRepository.save(dailySchedule));
        }).orElseThrow(() -> new RuntimeException("DailySchedule not found"));
    }

    @Transactional
    public void deleteDailySchedule(Long id) {
        dailyScheduleRepository.deleteById(id);
    }

    private DailyScheduleDTO toDTO(DailySchedule dailySchedule) {
        DailyScheduleDTO dailyScheduleDTO = new DailyScheduleDTO();
        dailyScheduleDTO.setScheduleId(dailySchedule.getScheduleId());
        dailyScheduleDTO.setPlanId(dailySchedule.getPlan().getPlanId());
        dailyScheduleDTO.setDate(dailySchedule.getDate());
        dailyScheduleDTO.setSchedulePlaces(dailySchedule.getSchedulePlaces().stream()
                .map(schedulePlace -> {
                    SchedulePlaceDTO schedulePlaceDTO = new SchedulePlaceDTO();
                    schedulePlaceDTO.setSchedulePlaceId(schedulePlace.getSchedulePlaceId());
                    schedulePlaceDTO.setScheduleId(schedulePlace.getDailySchedule().getScheduleId());
                    schedulePlaceDTO.setPlaceId(schedulePlace.getPlace().getPlaceId());
                    schedulePlaceDTO.setDuration(schedulePlace.getDuration());
                    schedulePlaceDTO.setStartTime(schedulePlace.getStartTime());
                    schedulePlaceDTO.setEndTime(schedulePlace.getEndTime());
                    return schedulePlaceDTO;
                }).collect(Collectors.toList()));
        return dailyScheduleDTO;
    }

    private DailyScheduleOtherDTO toOtherDTO(DailySchedule dailySchedule) {
        DailyScheduleOtherDTO dailyScheduleOtherDTO = new DailyScheduleOtherDTO();
        dailyScheduleOtherDTO.setScheduleId(dailySchedule.getScheduleId());
        dailyScheduleOtherDTO.setPlanId(dailySchedule.getPlan().getPlanId());
        dailyScheduleOtherDTO.setDate(dailySchedule.getDate());
        dailyScheduleOtherDTO.setSchedulePlaces(dailySchedule.getSchedulePlaces()); // 엔티티 직접 설정
        return dailyScheduleOtherDTO;
    }

    private DailySchedule toEntity(DailyScheduleDTO dailyScheduleDTO) {
        DailySchedule dailySchedule = new DailySchedule();
        dailySchedule.setScheduleId(dailyScheduleDTO.getScheduleId());
        dailySchedule.setDate(dailyScheduleDTO.getDate());
        dailySchedule.setSchedulePlaces(dailyScheduleDTO.getSchedulePlaces().stream()
                .map(this::schedulePlaceToEntity)
                .collect(Collectors.toList()));
        return dailySchedule;
    }

    private SchedulePlace schedulePlaceToEntity(SchedulePlaceDTO schedulePlaceDTO) {
        SchedulePlace schedulePlace = new SchedulePlace();
        schedulePlace.setSchedulePlaceId(schedulePlaceDTO.getSchedulePlaceId());
        schedulePlace.setDuration(schedulePlaceDTO.getDuration());
        schedulePlace.setStartTime(schedulePlaceDTO.getStartTime());
        schedulePlace.setEndTime(schedulePlaceDTO.getEndTime());
        schedulePlace.setDailySchedule(new DailySchedule(schedulePlaceDTO.getScheduleId()));
        schedulePlace.setPlace(new Place(schedulePlaceDTO.getPlaceId()));
        return schedulePlace;
    }
}
