package com.mytrip.mytripservice.repository;

import com.mytrip.mytripservice.entity.Plan;
import com.mytrip.mytripservice.entity.PlanType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface PlanRepository extends JpaRepository<Plan, Long> {
    //카트를 위해 추가
    List<Plan> findByUser_UserIdAndPlanType(Long userId, PlanType planType);

    //커뮤니티 포스트를 위해 추가
    @Query("SELECT p FROM Plan p " +
            "WHERE p.user.userId = :userId " +
            "AND p.planType <> 'CART' " +
            "AND p.planId NOT IN (SELECT c.plan.planId FROM Community c) " +
            "AND p.endDate < CURRENT_DATE " +
            "ORDER BY p.startDate DESC")
    List<Plan> findUnusedPlansByUserId(@Param("userId") Long userId);

    //메인페이지를 위해 추가
    Optional<Plan> findFirstByUser_UserIdOrderByStartDateDesc(@Param("userId") Long userId);

}
