package com.mytrip.mytripservice.repository;

import com.mytrip.mytripservice.entity.AreaCode;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AreaCodeRepository extends JpaRepository<AreaCode, Integer> {
    List<AreaCode> findBySigungucode(String sigungucode);
    List<AreaCode> findByAreacode(String areacode);
}
