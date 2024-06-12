package com.mytrip.mytripservice.service;

import com.mytrip.mytripservice.entity.MoveTime;
import com.mytrip.mytripservice.repository.MoveTimeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MoveTimeService {
    private final MoveTimeRepository moveTimeRepository;

    @Autowired
    public MoveTimeService(MoveTimeRepository moveTimeRepository) {
        this.moveTimeRepository = moveTimeRepository;
    }

    public List<MoveTime> getAllMoveTimes() {
        return moveTimeRepository.findAll();
    }

    public Optional<MoveTime> getMoveTimeById(Long id) {
        return moveTimeRepository.findById(id);
    }

    public MoveTime createMoveTime(MoveTime moveTime) {
        return moveTimeRepository.save(moveTime);
    }

    public MoveTime updateMoveTime(Long id, MoveTime moveTimeDetails) {
        return moveTimeRepository.findById(id).map(moveTime -> {
            moveTime.setFromPlace(moveTimeDetails.getFromPlace());
            moveTime.setToPlace(moveTimeDetails.getToPlace());
            moveTime.setMoveTime(moveTimeDetails.getMoveTime());
            return moveTimeRepository.save(moveTime);
        }).orElseThrow(() -> new RuntimeException("MoveTime not found"));
    }

    public void deleteMoveTime(Long id) {
        moveTimeRepository.deleteById(id);
    }
}
