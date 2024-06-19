package com.mytrip.mytripservice.repository;

import com.mytrip.mytripservice.entity.Community;
import com.mytrip.mytripservice.model.CommunityModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommunityRepository extends JpaRepository<Community, Long> {
    List<Community> findByUser_UserId(Long userId);

    @Query("SELECT new com.mytrip.mytripservice.model.CommunityModel(" +
            "u.nickname, " +
            "p.region, " +  // region 전체를 가져와서 서비스 레이어에서 나누기
            "YEAR(p.startDate), " +
            "MONTH(p.startDate), " +
            "ci.imagePath, " +
            "c.title, " +
            "c.viewCount, " +
            "c.commentCount, " +
            "c.scrapCount, " +
            "c.communityId) " +
            "FROM Community c " +
            "JOIN c.user u " +
            "JOIN c.plan p " +
            "LEFT JOIN c.image ci")
    List<CommunityModel> findAllCommunityData();


}


