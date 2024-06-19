package com.mytrip.mytripservice.service;

import com.mytrip.mytripservice.entity.*;
import com.mytrip.mytripservice.model.CommunityModel;
import com.mytrip.mytripservice.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CommunityService {
    private final CommunityRepository communityRepository;
    private final CommentRepository commentRepository;
    private final ScrapRepository scrapRepository;
    private final CommunityImageRepository communityImageRepository;
    private final UserRepository userRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    @Autowired
    public CommunityService(CommunityRepository communityRepository,
                            CommentRepository commentRepository,
                            ScrapRepository scrapRepository,
                            CommunityImageRepository communityImageRepository,
                            UserRepository userRepository) {
        this.communityRepository = communityRepository;
        this.commentRepository = commentRepository;
        this.scrapRepository = scrapRepository;
        this.communityImageRepository = communityImageRepository;
        this.userRepository = userRepository;

    }

    // Community methods
    public List<CommunityModel> getAllCommunityData() {
        List<Community> communities = communityRepository.findAll();

        return communities.stream().map(community -> {
            String[] regionParts = community.getPlan().getRegion().split(" ");
            String areaCode = regionParts.length > 0 ? regionParts[0] : "";
            String sigunguCode = regionParts.length > 1 ? regionParts[1] : "";
            int year = community.getPlan().getStartDate().getYear();
            int month = community.getPlan().getStartDate().getMonthValue();
            String imagePath = community.getImage() != null ? community.getImage().getImagePath() : "defaultImage";

            return new CommunityModel(
                    community.getUser().getNickname(),
                    areaCode,
                    sigunguCode,
                    year,
                    month,
                    imagePath,
                    community.getTitle(),
                    community.getViewCount(),
                    community.getCommentCount(),
                    community.getScrapCount(),
                    community.getCommunityId()
            );
        }).collect(Collectors.toList());
    }

    public Optional<Community> getCommunityById(Long id) {
        return communityRepository.findById(id);
    }

    public List<Community> getCommunitiesByUserId(Long userId) {
        return communityRepository.findByUser_UserId(userId);
    }

    public Community createCommunity(Community community) {
        return communityRepository.save(community);
    }

    public Community updateCommunity(Long communityId, Community community) {
        Community existingCommunity = communityRepository.findById(communityId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid community Id: " + communityId));

        existingCommunity.setTitle(community.getTitle());
        existingCommunity.setContent(community.getContent());
        existingCommunity.setGender(community.getGender());
        existingCommunity.setAgeGroup(community.getAgeGroup());
        existingCommunity.setMates(community.getMates());
        existingCommunity.setImage(community.getImage());

        return communityRepository.save(existingCommunity);
    }

    public void deleteCommunity(Long id) {
        Community existingCommunity = communityRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid community Id: " + id));

        communityRepository.delete(existingCommunity);
    }

    // Comment methods
    public List<Comment> getAllComments() {
        return commentRepository.findAll();
    }

    public Optional<Comment> getCommentById(Long id) {
        return commentRepository.findById(id);
    }

    public List<Comment> getCommentsByCommunityId(Long communityId) {
        return commentRepository.findByCommunity_CommunityId(communityId);
    }

    public Comment createComment(Long communityId, Long userId, Comment comment) {
        Community community = communityRepository.findById(communityId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid community Id: " + communityId));

        User user = userRepository.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid user Id: " + userId));

        Comment newComment = new Comment(community, user, comment.getContent());
        return commentRepository.save(newComment);
    }

    public Comment updateComment(Long commentId, Comment updatedComment) {
        Comment existingComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new IllegalArgumentException("Invalid comment Id: " + commentId));
        existingComment.setContent(updatedComment.getContent());
        return commentRepository.save(existingComment);
    }

    public void deleteComment(Long id) {
        Comment existingComment = commentRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Invalid comment Id: " + id));
        commentRepository.delete(existingComment);
    }

    // Scrap methods
    public Scrap addScrap(Long communityId, Long userId) {
        Community community = communityRepository.findById(communityId).orElseThrow(() -> new RuntimeException("Community not found"));
        User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        Plan plan = community.getPlan();

        Scrap scrap = new Scrap(community, user, plan);
        return scrapRepository.save(scrap);
    }

    public void deleteScrap(Long scrapId) {
        scrapRepository.deleteById(scrapId);
    }

    public List<Scrap> getScrapsByUserId(Long userId) {
        return scrapRepository.findByUser_UserId(userId);
    }

    public Scrap getScrapByCommunityIdAndUserId(Long communityId, Long userId) {
        return scrapRepository.findByCommunity_CommunityIdAndUser_UserId(communityId, userId);
    }

    // CommunityImage methods
    public List<CommunityImage> getAllCommunityImages() {
        return communityImageRepository.findAll();
    }

    public Optional<CommunityImage> getCommunityImageById(Long id) {
        return communityImageRepository.findById(id);
    }

    public CommunityImage createCommunityImage(CommunityImage communityImage) {
        return communityImageRepository.save(communityImage);
    }

    public void deleteCommunityImage(Long id) {
        communityImageRepository.deleteById(id);
    }

    public Long uploadImage(MultipartFile file) {
        try {
            String fileName = file.getOriginalFilename();
            File targetFile = new File(uploadDir, fileName);
            try (FileOutputStream fos = new FileOutputStream(targetFile)) {
                fos.write(file.getBytes());
            }

            CommunityImage image = CommunityImage.create(fileName);
            image = communityImageRepository.save(image);
            return image.getImageId();
        } catch (IOException e) {
            throw new RuntimeException("Failed to store image", e);
        }
    }

    //update
    public Community incrementViewCount(Long communityId) {
        Community community = communityRepository.findById(communityId).orElseThrow(() -> new RuntimeException("Community not found"));
        community.setViewCount(community.getViewCount() + 1);
        return communityRepository.save(community);
    }

    public Community incrementCommentCount(Long communityId) {
        Community community = communityRepository.findById(communityId).orElseThrow(() -> new RuntimeException("Community not found"));
        community.setCommentCount(community.getCommentCount() + 1);
        return communityRepository.save(community);
    }

    public Community decrementCommentCount(Long communityId) {
        Community community = communityRepository.findById(communityId).orElseThrow(() -> new RuntimeException("Community not found"));
        community.setCommentCount(community.getCommentCount() - 1);
        return communityRepository.save(community);
    }

    public Community incrementScrapCount(Long communityId) {
        Community community = communityRepository.findById(communityId).orElseThrow(() -> new RuntimeException("Community not found"));
        community.setScrapCount(community.getScrapCount() + 1);
        return communityRepository.save(community);
    }

    public Community decrementScrapCount(Long communityId) {
        Community community = communityRepository.findById(communityId).orElseThrow(() -> new RuntimeException("Community not found"));
        community.setScrapCount(community.getScrapCount() - 1);
        return communityRepository.save(community);
    }
}

