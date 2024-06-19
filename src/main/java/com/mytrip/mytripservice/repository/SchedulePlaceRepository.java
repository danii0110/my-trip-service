package com.mytrip.mytripservice.repository;

import com.mytrip.mytripservice.entity.SchedulePlace;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchedulePlaceRepository extends JpaRepository<SchedulePlace, Long> {
}
