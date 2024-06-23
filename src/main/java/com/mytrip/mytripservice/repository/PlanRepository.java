package com.mytrip.mytripservice.repository;

import com.mytrip.mytripservice.entity.Plan;
import com.mytrip.mytripservice.entity.PlanType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanRepository extends JpaRepository<Plan, Long> {
    //카트를 위해 추가
    List<Plan> findByUser_UserIdAndPlanType(Long userId, PlanType planType);
}
