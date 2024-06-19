package com.mytrip.mytripservice.repository;

import com.mytrip.mytripservice.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<Comment, Long> {
    List<Comment> findByCommunity_CommunityId(Long communityId);
}

