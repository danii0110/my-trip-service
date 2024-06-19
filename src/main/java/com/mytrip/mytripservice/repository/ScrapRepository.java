package com.mytrip.mytripservice.repository;

import com.mytrip.mytripservice.entity.Scrap;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ScrapRepository extends JpaRepository<Scrap, Long> {
    List<Scrap> findByUser_UserId(Long userId);
    Scrap findByCommunity_CommunityIdAndUser_UserId(Long communityId, Long userId);
}
