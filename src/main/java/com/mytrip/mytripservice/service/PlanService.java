package com.mytrip.mytripservice.service;

import com.mytrip.mytripservice.dto.CompletePlanDTO;
import com.mytrip.mytripservice.dto.DailyScheduleDTO;
import com.mytrip.mytripservice.dto.PlanDTO;
import com.mytrip.mytripservice.dto.SchedulePlaceDTO;
import com.mytrip.mytripservice.entity.*;
import com.mytrip.mytripservice.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PlanService {
    private final PlanRepository planRepository;
    private final UserRepository userRepository;
    private final DailyScheduleRepository dailyScheduleRepository;
    private final SchedulePlaceRepository schedulePlaceRepository;
    private final PlaceRepository placeRepository;

    @Autowired
    public PlanService(PlanRepository planRepository, UserRepository userRepository, DailyScheduleRepository dailyScheduleRepository, SchedulePlaceRepository schedulePlaceRepository, PlaceRepository placeRepository) {
        this.planRepository = planRepository;
        this.userRepository = userRepository;
        this.dailyScheduleRepository = dailyScheduleRepository;
        this.schedulePlaceRepository = schedulePlaceRepository;
        this.placeRepository = placeRepository;
    }

    @Transactional
    public void createCompletePlan(CompletePlanDTO completePlanDTO) {
        User user = userRepository.findById(completePlanDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Plan plan = new Plan();
        plan.setUser(user);
        plan.setTitle(completePlanDTO.getTitle());
        plan.setRegion(completePlanDTO.getRegion());
        plan.setStartDate(completePlanDTO.getStartDate());
        plan.setEndDate(completePlanDTO.getEndDate());
        plan.setTransportation(completePlanDTO.getTransportation());
        plan.setPlanType(completePlanDTO.getPlanType());

        Plan savedPlan = planRepository.save(plan);

        for (DailyScheduleDTO dailyScheduleDTO : completePlanDTO.getDailySchedules()) {
            DailySchedule dailySchedule = new DailySchedule();
            dailySchedule.setPlan(savedPlan);
            dailySchedule.setDate(dailyScheduleDTO.getDate());

            DailySchedule savedDailySchedule = dailyScheduleRepository.save(dailySchedule);

            for (SchedulePlaceDTO schedulePlaceDTO : dailyScheduleDTO.getSchedulePlaces()) {
                Place place = placeRepository.findById(schedulePlaceDTO.getPlaceId())
                        .orElseGet(() -> {
                            Place newPlace = new Place();
                            newPlace.setPlaceId(schedulePlaceDTO.getPlaceId());
                            newPlace.setName(schedulePlaceDTO.getPlace().getName());
                            newPlace.setAddress(schedulePlaceDTO.getPlace().getAddress());
                            newPlace.setCategory(schedulePlaceDTO.getPlace().getCategory());
                            newPlace.setImage(schedulePlaceDTO.getPlace().getImage());
                            newPlace.setXCoordinate(schedulePlaceDTO.getPlace().getXCoordinate());
                            newPlace.setYCoordinate(schedulePlaceDTO.getPlace().getYCoordinate());
                            return placeRepository.save(newPlace);
                        });

                SchedulePlace schedulePlace = new SchedulePlace();
                schedulePlace.setDailySchedule(savedDailySchedule);
                schedulePlace.setPlace(place);
                schedulePlace.setDuration(schedulePlaceDTO.getDuration());
                schedulePlace.setStartTime(schedulePlaceDTO.getStartTime() != null ? LocalTime.parse(schedulePlaceDTO.getStartTime()) : null);
                schedulePlace.setEndTime(schedulePlaceDTO.getEndTime() != null ? LocalTime.parse(schedulePlaceDTO.getEndTime()) : null);

                schedulePlaceRepository.save(schedulePlace);
            }
        }
    }

    public List<PlanDTO> getAllPlans() {
        return planRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<PlanDTO> getPlanById(Long id) {
        return planRepository.findById(id).map(this::toDTO);
    }

    @Transactional
    public PlanDTO createPlan(PlanDTO planDTO) {
        User user = userRepository.findById(planDTO.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));
        Plan plan = toEntity(planDTO);
        plan.setUser(user);
        return toDTO(planRepository.save(plan));
    }

    @Transactional
    public PlanDTO updatePlan(Long id, PlanDTO planDetails) {
        return planRepository.findById(id).map(plan -> {
            plan.setTitle(planDetails.getTitle());
            plan.setRegion(planDetails.getRegion());
            plan.setStartDate(planDetails.getStartDate());
            plan.setEndDate(planDetails.getEndDate());
            plan.setTransportation(Transportation.valueOf(planDetails.getTransportation()));
            plan.setPlanType(PlanType.valueOf(planDetails.getPlanType()));
            return toDTO(planRepository.save(plan));
        }).orElseThrow(() -> new RuntimeException("Plan not found"));
    }

    @Transactional
    public void deletePlan(Long id) {
        planRepository.deleteById(id);
    }

    private PlanDTO toDTO(Plan plan) {
        PlanDTO planDTO = new PlanDTO();
        planDTO.setPlanId(plan.getPlanId());
        planDTO.setUserId(plan.getUser().getUserId());
        planDTO.setTitle(plan.getTitle());
        planDTO.setRegion(plan.getRegion());
        planDTO.setStartDate(plan.getStartDate());
        planDTO.setEndDate(plan.getEndDate());
        planDTO.setTransportation(plan.getTransportation().name());
        planDTO.setPlanType(plan.getPlanType().name());
        return planDTO;
    }

    private Plan toEntity(PlanDTO planDTO) {
        Plan plan = new Plan();
        plan.setPlanId(planDTO.getPlanId());
        plan.setTitle(planDTO.getTitle());
        plan.setRegion(planDTO.getRegion());
        plan.setStartDate(planDTO.getStartDate());
        plan.setEndDate(planDTO.getEndDate());
        plan.setTransportation(Transportation.valueOf(planDTO.getTransportation()));
        plan.setPlanType(PlanType.valueOf(planDTO.getPlanType()));
        return plan;
    }
}
