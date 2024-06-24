package com.mytrip.mytripservice.repository;

import com.mytrip.mytripservice.entity.DailySchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DailyScheduleRepository extends JpaRepository<DailySchedule, Long> {
    List<DailySchedule> findByPlan_PlanId(Long planId);
}
