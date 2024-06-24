package com.mytrip.mytripservice.service;

import com.mytrip.mytripservice.dto.*;
import com.mytrip.mytripservice.entity.*;
import com.mytrip.mytripservice.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
        User user = userRepository.findByKakaoId(completePlanDTO.getUserId().toString())
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
                schedulePlace.setStartTime(schedulePlaceDTO.getStartTime());
                schedulePlace.setEndTime(schedulePlaceDTO.getEndTime());

                schedulePlaceRepository.save(schedulePlace);
            }
        }
    }

    public List<PlanDTO> getAllPlans() {
        return planRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<Plan> getPlanByPlanId(Long id) {
        return planRepository.findById(id);
    }

    public Optional<PlanDTO> getPlanById(Long id) {
        return planRepository.findById(id).map(this::toDTO);
    }

    public Optional<PlanDTO> getOnePlanById(Long id) {
        return planRepository.findFirstByUser_UserIdOrderByStartDateDesc(id).map(this::toDTO);
    }

    public List<PlanDTO> getUnusedPlansByUserId(Long userId) {
        return planRepository.findUnusedPlansByUserId(userId).stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional
    public PlanDTO createPlan(PlanDTO planDTO) {
        User user = userRepository.findByKakaoId(planDTO.getUserId().toString())
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
            plan.setTransportation(planDetails.getTransportation());
            plan.setPlanType(planDetails.getPlanType());
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
        planDTO.setTransportation(plan.getTransportation());
        planDTO.setPlanType(plan.getPlanType());
        planDTO.setDailySchedules(plan.getDailySchedules().stream()
                .map(this::toDailyScheduleDTO)
                .collect(Collectors.toList()));
        return planDTO;
    }

    private DailyScheduleDTO toDailyScheduleDTO(DailySchedule dailySchedule) {
        DailyScheduleDTO dailyScheduleDTO = new DailyScheduleDTO();
        dailyScheduleDTO.setScheduleId(dailySchedule.getScheduleId());
        dailyScheduleDTO.setPlanId(dailySchedule.getPlan().getPlanId());
        dailyScheduleDTO.setDate(dailySchedule.getDate());
        dailyScheduleDTO.setSchedulePlaces(dailySchedule.getSchedulePlaces().stream()
                .map(this::toSchedulePlaceDTO)
                .collect(Collectors.toList()));
        return dailyScheduleDTO;
    }

    private SchedulePlaceDTO toSchedulePlaceDTO(SchedulePlace schedulePlace) {
        SchedulePlaceDTO schedulePlaceDTO = new SchedulePlaceDTO();
        schedulePlaceDTO.setPlaceId(schedulePlace.getPlace().getPlaceId());
        schedulePlaceDTO.setSchedulePlaceId(schedulePlace.getSchedulePlaceId());
        schedulePlaceDTO.setScheduleId(schedulePlace.getDailySchedule().getScheduleId());
        schedulePlaceDTO.setPlace(toPlaceDTO(schedulePlace.getPlace()));
        schedulePlaceDTO.setDuration(schedulePlace.getDuration());
        schedulePlaceDTO.setStartTime(schedulePlace.getStartTime());
        schedulePlaceDTO.setEndTime(schedulePlace.getEndTime());
        return schedulePlaceDTO;
    }

    private PlaceDTO toPlaceDTO(Place place) {
        PlaceDTO placeDTO = new PlaceDTO();
        placeDTO.setPlaceId(place.getPlaceId());
        placeDTO.setName(place.getName());
        placeDTO.setAddress(place.getAddress());
        placeDTO.setCategory(place.getCategory());
        placeDTO.setImage(place.getImage());
        placeDTO.setXCoordinate(place.getXCoordinate());
        placeDTO.setYCoordinate(place.getYCoordinate());
        return placeDTO;
    }

    private Plan toEntity(PlanDTO planDTO) {
        Plan plan = new Plan();
        plan.setPlanId(planDTO.getPlanId());
        plan.setTitle(planDTO.getTitle());
        plan.setRegion(planDTO.getRegion());
        plan.setStartDate(planDTO.getStartDate());
        plan.setEndDate(planDTO.getEndDate());
        plan.setTransportation(planDTO.getTransportation());
        plan.setPlanType(planDTO.getPlanType());
        plan.setDailySchedules(planDTO.getDailySchedules().stream()
                .map(this::toDailyScheduleEntity)
                .collect(Collectors.toList()));
        return plan;
    }

    private DailySchedule toDailyScheduleEntity(DailyScheduleDTO dailyScheduleDTO) {
        DailySchedule dailySchedule = new DailySchedule();
        dailySchedule.setScheduleId(dailyScheduleDTO.getScheduleId());
        dailySchedule.setDate(dailyScheduleDTO.getDate());
        dailySchedule.setSchedulePlaces(dailyScheduleDTO.getSchedulePlaces().stream()
                .map(this::toSchedulePlaceEntity)
                .collect(Collectors.toList()));
        return dailySchedule;
    }

    private SchedulePlace toSchedulePlaceEntity(SchedulePlaceDTO schedulePlaceDTO) {
        SchedulePlace schedulePlace = new SchedulePlace();
        schedulePlace.setSchedulePlaceId(schedulePlaceDTO.getSchedulePlaceId());
        schedulePlace.setPlace(toPlaceEntity(schedulePlaceDTO.getPlace()));
        schedulePlace.setDuration(schedulePlaceDTO.getDuration());
        schedulePlace.setStartTime(schedulePlaceDTO.getStartTime());
        schedulePlace.setEndTime(schedulePlaceDTO.getEndTime());
        return schedulePlace;
    }

    private Place toPlaceEntity(PlaceDTO placeDTO) {
        Place place = new Place();
        place.setPlaceId(placeDTO.getPlaceId());
        place.setName(placeDTO.getName());
        place.setAddress(placeDTO.getAddress());
        place.setCategory(placeDTO.getCategory());
        place.setImage(placeDTO.getImage());
        place.setXCoordinate(placeDTO.getXCoordinate());
        place.setYCoordinate(placeDTO.getYCoordinate());
        return place;
    }

    //카트
    @Transactional
    public void createCartPlan(CompletePlanDTO completePlanDTO) {
        User user = userRepository.findByKakaoId(completePlanDTO.getUserId().toString())
                .orElseThrow(() -> new RuntimeException("User not found"));

        Plan plan = new Plan();
        plan.setUser(user);
        plan.setTitle(completePlanDTO.getTitle());
        plan.setRegion(completePlanDTO.getRegion());
        plan.setStartDate(completePlanDTO.getStartDate());
        plan.setEndDate(completePlanDTO.getEndDate());
        plan.setTransportation(null); // 교통수단은 null로 설정
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
                schedulePlace.setStartTime(schedulePlaceDTO.getStartTime());
                schedulePlace.setEndTime(schedulePlaceDTO.getEndTime());

                schedulePlaceRepository.save(schedulePlace);
            }
        }
    }

    public List<PlanDTO> getCartPlans(Long userId) {
        List<Plan> plans = planRepository.findByUser_UserIdAndPlanType(userId, PlanType.CART);
        return plans.stream().map(this::toDTO).collect(Collectors.toList());
    }
}
