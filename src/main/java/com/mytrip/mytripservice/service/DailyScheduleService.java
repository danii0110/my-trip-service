package com.mytrip.mytripservice.service;

import com.mytrip.mytripservice.entity.DailySchedule;
import com.mytrip.mytripservice.repository.DailyScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DailyScheduleService {
    private final DailyScheduleRepository dailyScheduleRepository;

    @Autowired
    public DailyScheduleService(DailyScheduleRepository dailyScheduleRepository) {
        this.dailyScheduleRepository = dailyScheduleRepository;
    }

    public List<DailySchedule> getAllDailySchedules() {
        return dailyScheduleRepository.findAll();
    }

    public Optional<DailySchedule> getDailyScheduleById(Long id) {
        return dailyScheduleRepository.findById(id);
    }

    public DailySchedule createDailySchedule(DailySchedule dailySchedule) {
        return dailyScheduleRepository.save(dailySchedule);
    }

    public DailySchedule updateDailySchedule(Long id, DailySchedule dailyScheduleDetails) {
        return dailyScheduleRepository.findById(id).map(dailySchedule -> {
            dailySchedule.setDate(dailyScheduleDetails.getDate());
            dailySchedule.setStartTime(dailyScheduleDetails.getStartTime());
            dailySchedule.setEndTime(dailyScheduleDetails.getEndTime());
            dailySchedule.setDuration(dailyScheduleDetails.getDuration());

            // SchedulePlaces의 업데이트를 안전하게 처리
            if (dailyScheduleDetails.getSchedulePlaces() != null) {
                dailySchedule.getSchedulePlaces().clear();
                dailySchedule.getSchedulePlaces().addAll(dailyScheduleDetails.getSchedulePlaces());
            }

            return dailyScheduleRepository.save(dailySchedule);
        }).orElseThrow(() -> new RuntimeException("DailySchedule not found"));
    }

    public void deleteDailySchedule(Long id) {
        dailyScheduleRepository.deleteById(id);
    }
}
