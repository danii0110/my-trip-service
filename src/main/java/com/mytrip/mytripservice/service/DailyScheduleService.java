// DailyScheduleService.java
package com.mytrip.mytripservice.service;

import com.mytrip.mytripservice.dto.DailyScheduleDTO;
import com.mytrip.mytripservice.entity.DailySchedule;
import com.mytrip.mytripservice.entity.Plan;
import com.mytrip.mytripservice.repository.DailyScheduleRepository;
import com.mytrip.mytripservice.repository.PlanRepository;
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

    @Autowired
    public DailyScheduleService(DailyScheduleRepository dailyScheduleRepository, PlanRepository planRepository) {
        this.dailyScheduleRepository = dailyScheduleRepository;
        this.planRepository = planRepository;
    }

    public List<DailyScheduleDTO> getAllDailySchedules() {
        return dailyScheduleRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<DailyScheduleDTO> getDailyScheduleById(Long id) {
        return dailyScheduleRepository.findById(id).map(this::toDTO);
    }

    @Transactional
    public DailyScheduleDTO createDailySchedule(DailyScheduleDTO dailyScheduleDTO) {
        Plan plan = planRepository.findById(dailyScheduleDTO.getPlanId())
                .orElseThrow(() -> new RuntimeException("Plan not found"));
        DailySchedule dailySchedule = toEntity(dailyScheduleDTO);
        dailySchedule.setPlan(plan);
        return toDTO(dailyScheduleRepository.save(dailySchedule));
    }

    @Transactional
    public DailyScheduleDTO updateDailySchedule(Long id, DailyScheduleDTO dailyScheduleDetails) {
        return dailyScheduleRepository.findById(id).map(dailySchedule -> {
            dailySchedule.setDate(dailyScheduleDetails.getDate());
            dailySchedule.setStartTime(dailyScheduleDetails.getStartTime());
            dailySchedule.setEndTime(dailyScheduleDetails.getEndTime());
            dailySchedule.setDuration(dailyScheduleDetails.getDuration());
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
        dailyScheduleDTO.setStartTime(dailySchedule.getStartTime());
        dailyScheduleDTO.setEndTime(dailySchedule.getEndTime());
        dailyScheduleDTO.setDuration(dailySchedule.getDuration());
        return dailyScheduleDTO;
    }

    private DailySchedule toEntity(DailyScheduleDTO dailyScheduleDTO) {
        DailySchedule dailySchedule = new DailySchedule();
        dailySchedule.setScheduleId(dailyScheduleDTO.getScheduleId());
        dailySchedule.setDate(dailyScheduleDTO.getDate());
        dailySchedule.setStartTime(dailyScheduleDTO.getStartTime());
        dailySchedule.setEndTime(dailyScheduleDTO.getEndTime());
        dailySchedule.setDuration(dailyScheduleDTO.getDuration());
        return dailySchedule;
    }
}
