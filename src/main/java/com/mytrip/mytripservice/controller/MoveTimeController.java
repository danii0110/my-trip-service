package com.mytrip.mytripservice.controller;

import com.mytrip.mytripservice.entity.MoveTime;
import com.mytrip.mytripservice.service.MoveTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/move-times")
public class MoveTimeController {

    private final MoveTimeService moveTimeService;

    @Autowired
    public MoveTimeController(MoveTimeService moveTimeService) {
        this.moveTimeService = moveTimeService;
    }

    @GetMapping
    public ResponseEntity<List<MoveTime>> getAllMoveTimes() {
        List<MoveTime> moveTimes = moveTimeService.getAllMoveTimes();
        return ResponseEntity.ok(moveTimes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MoveTime> getMoveTimeById(@PathVariable Long id) {
        Optional<MoveTime> moveTime = moveTimeService.getMoveTimeById(id);
        return moveTime.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<MoveTime> createMoveTime(@RequestBody MoveTime moveTime) {
        MoveTime createdMoveTime = moveTimeService.createMoveTime(moveTime);
        return ResponseEntity.ok(createdMoveTime);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MoveTime> updateMoveTime(@PathVariable Long id, @RequestBody MoveTime moveTimeDetails) {
        MoveTime updatedMoveTime = moveTimeService.updateMoveTime(id, moveTimeDetails);
        return ResponseEntity.ok(updatedMoveTime);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMoveTime(@PathVariable Long id) {
        moveTimeService.deleteMoveTime(id);
        return ResponseEntity.noContent().build();
    }
}
