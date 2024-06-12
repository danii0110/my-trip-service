package com.mytrip.mytripservice.controller;

import com.mytrip.mytripservice.dto.MoveTimeDTO;
import com.mytrip.mytripservice.service.MoveTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/move-times")
public class MoveTimeController {

    private final MoveTimeService moveTimeService;

    @Autowired
    public MoveTimeController(MoveTimeService moveTimeService) {
        this.moveTimeService = moveTimeService;
    }

    @GetMapping
    public ResponseEntity<List<MoveTimeDTO>> getAllMoveTimes() {
        List<MoveTimeDTO> moveTimes = moveTimeService.getAllMoveTimes();
        return ResponseEntity.ok(moveTimes);
    }

    @GetMapping("/{id}")
    public ResponseEntity<MoveTimeDTO> getMoveTimeById(@PathVariable Long id) {
        return moveTimeService.getMoveTimeById(id)
                .map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @PostMapping
    public ResponseEntity<MoveTimeDTO> createMoveTime(@RequestBody MoveTimeDTO moveTimeDTO) {
        MoveTimeDTO createdMoveTime = moveTimeService.createMoveTime(moveTimeDTO);
        return ResponseEntity.ok(createdMoveTime);
    }

    @PutMapping("/{id}")
    public ResponseEntity<MoveTimeDTO> updateMoveTime(@PathVariable Long id, @RequestBody MoveTimeDTO moveTimeDTO) {
        MoveTimeDTO updatedMoveTime = moveTimeService.updateMoveTime(id, moveTimeDTO);
        return ResponseEntity.ok(updatedMoveTime);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMoveTime(@PathVariable Long id) {
        moveTimeService.deleteMoveTime(id);
        return ResponseEntity.noContent().build();
    }
}
