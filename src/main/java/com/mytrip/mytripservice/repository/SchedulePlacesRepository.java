package com.mytrip.mytripservice.repository;

import com.mytrip.mytripservice.entity.SchedulePlaces;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SchedulePlacesRepository extends JpaRepository<SchedulePlaces, Long> {
}
