// DailyScheduleRepository.java
package com.mytrip.mytripservice.repository;

import com.mytrip.mytripservice.entity.DailySchedule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DailyScheduleRepository extends JpaRepository<DailySchedule, Long> {
}
