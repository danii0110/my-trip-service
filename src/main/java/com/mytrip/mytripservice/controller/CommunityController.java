package com.mytrip.mytripservice.controller;

import com.mytrip.mytripservice.entity.Comment;
import com.mytrip.mytripservice.entity.Community;
import com.mytrip.mytripservice.entity.CommunityImage;
import com.mytrip.mytripservice.entity.Scrap;
import com.mytrip.mytripservice.model.CommunityModel;
import com.mytrip.mytripservice.service.CommunityService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/community")
public class CommunityController {

    @Autowired
    private CommunityService communityService;

    // Community endpoints
    //전체 커뮤니티 조회
    @GetMapping("/communities")
    public ResponseEntity<PageImpl<CommunityModel>> getCommunities(
            @RequestParam int page,
            @RequestParam int size,
            @RequestParam(required = false) String order,
            @RequestParam(required = false) Integer month,
            @RequestParam(required = false) String region,
            @RequestParam(required = false) String subRegion) {

        String sortBy = switch (order) {
            case "최신순" -> "createdAt";
            case "인기순" -> "scrapCount";
            case "조회순" -> "viewCount";
            case "댓글순" -> "commentCount";
            default -> "communityId";
        };

        System.out.println("o/m/r/s: " + order + " " + month + " " + region + " " + subRegion);


        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        List<CommunityModel> data = communityService.getAllCommunityData();

        // 필터링 로직 (Optional)
        List<CommunityModel> filteredData = data.stream()
                .filter(cm -> (month == null || cm.getMonth() == month) &&
                        (region == null || "모든 지역".equals(region) || cm.getAreaCode().equals(region)) &&
                        (subRegion == null || cm.getSigunguCode().equals(subRegion)))
                .collect(Collectors.toList());

        int start = Math.min((int)pageable.getOffset(), filteredData.size());
        int end = Math.min((start + pageable.getPageSize()), filteredData.size());
        PageImpl<CommunityModel> pageData = new PageImpl<>(filteredData.subList(start, end), pageable, filteredData.size());

        return ResponseEntity.ok(pageData);
    }


    //커뮤니티 게시글 조회
    @GetMapping("/community/{id}")
    public Optional<Community> getCommunityById(@PathVariable Long id) {
        Optional<Community> community = communityService.getCommunityById(id);
        return community;
    }

    //작성자 조회
    @GetMapping("/communities/user/{userId}")
    public List<Community> getCommunitiesByUserId(@PathVariable Long userId) {
        return communityService.getCommunitiesByUserId(userId);
    }

    //게시글 업로드
    @PostMapping("/community")
    public Community createCommunity(@RequestBody Community community) {
        return communityService.createCommunity(community);
    }

    @PatchMapping("/{communityId}")
    public Community updateCommunityPost(@PathVariable Long communityId, @RequestBody Community community) {
        return communityService.updateCommunity(communityId, community);
    }

    //게시글 삭제
    @DeleteMapping("/community/{id}")
    public void deleteCommunity(@PathVariable Long id) {
        communityService.deleteCommunity(id);
    }

    // Comment endpoints
    @GetMapping("/comments")
    public List<Comment> getAllComments() {
        return communityService.getAllComments();
    }

    @GetMapping("/comment/{id}")
    public ResponseEntity<Comment> getCommentById(@PathVariable Long id) {
        Optional<Comment> comment = communityService.getCommentById(id);
        return comment.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    //댓글 조회
    @GetMapping("/comments/{communityId}")
    public List<Comment> getCommentsByCommunityId(@PathVariable Long communityId) {
        return communityService.getCommentsByCommunityId(communityId);
    }

    //댓글 업로드
    @PostMapping("/{communityId}/{userId}/comment")
    public Comment createComment(@PathVariable Long communityId, @PathVariable Long userId, @RequestBody Comment comment) {
        return communityService.createComment(communityId, userId, comment);
    }

    //댓글 편집
    @PatchMapping("/comment/{commentId}")
    public Comment updateComment(@PathVariable Long commentId, @RequestBody Comment comment) {
        return communityService.updateComment(commentId, comment);
    }

    //댓글 삭제
    @DeleteMapping("/comment/{id}")
    public void deleteComment(@PathVariable Long id) {
        communityService.deleteComment(id);
    }

    // Scrap endpoints
    //유저 아이디로 스크랩 조회
    @GetMapping("/scraps/{userId}")
    public List<Scrap> getScrapsByUserId(@PathVariable Long userId) {
        return communityService.getScrapsByUserId(userId);
    }

    //스크랩 생성
    @PostMapping("/scrap")
    public Scrap addScrap(@RequestParam Long communityId, @RequestParam Long userId) {
        return communityService.addScrap(communityId, userId);
    }

    //스크랩 삭제
    @DeleteMapping("/scrap/{scrapId}")
    public void deleteScrap(@PathVariable Long scrapId) {
        communityService.deleteScrap(scrapId);
    }

    @GetMapping("/{communityId}/user/{userId}")
    public Scrap getScrapByCommunityIdAndUserId(@PathVariable Long communityId, @PathVariable Long userId) {
        return communityService.getScrapByCommunityIdAndUserId(communityId, userId);
    }

    // CommunityImage endpoints
    @GetMapping("/images")
    public List<CommunityImage> getAllCommunityImages() {
        return communityService.getAllCommunityImages();
    }

    //게시글 이미지 조회
    @GetMapping("/image/{id}")
    public ResponseEntity<CommunityImage> getCommunityImageById(@PathVariable Long id) {
        Optional<CommunityImage> communityImage = communityService.getCommunityImageById(id);
        return communityImage.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    //게시글 이미지 생성
    @PostMapping("/image")
    public CommunityImage createCommunityImage(@RequestBody CommunityImage communityImage) {
        return communityService.createCommunityImage(communityImage);
    }

    @PostMapping("/upload")
    public Long uploadImage(@RequestParam("file") MultipartFile file) {
        return communityService.uploadImage(file);
    }

    @DeleteMapping("/image/{id}")
    public ResponseEntity<Void> deleteCommunityImage(@PathVariable Long id) {
        communityService.deleteCommunityImage(id);
        return ResponseEntity.ok().build();
    }

    //update
    @PatchMapping("/incrementView/{communityId}")
    public Community incrementViewCount(@PathVariable Long communityId) {
        return communityService.incrementViewCount(communityId);
    }

    @PatchMapping("/incrementComment/{communityId}")
    public Community incrementCommentCount(@PathVariable Long communityId) {
        return communityService.incrementCommentCount(communityId);
    }

    @PatchMapping("/decrementComment/{communityId}")
    public Community decrementCommentCount(@PathVariable Long communityId) {
        return communityService.decrementCommentCount(communityId);
    }

    @PatchMapping("/incrementScrap/{communityId}")
    public Community incrementScrapCount(@PathVariable Long communityId) {
        return communityService.incrementScrapCount(communityId);
    }

    @PatchMapping("/decrementScrap/{communityId}")
    public Community decrementScrapCount(@PathVariable Long communityId) {
        return communityService.decrementScrapCount(communityId);
    }


}

