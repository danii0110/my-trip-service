package com.mytrip.mytripservice.repository;

import com.mytrip.mytripservice.entity.Community;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Long> {
    List<Community> findByUser_UserId(Long userId);

    List<Community> findAll(Sort sort);


}


