package com.mytrip.mytripservice.repository;

import com.mytrip.mytripservice.entity.MoveTime;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MoveTimeRepository extends JpaRepository<MoveTime, Long> {
}
