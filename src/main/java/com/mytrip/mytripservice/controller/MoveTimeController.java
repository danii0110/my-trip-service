package com.mytrip.mytripservice.controller;

import com.mytrip.mytripservice.dto.DailyScheduleOtherDTO;
import com.mytrip.mytripservice.dto.MoveTimeDTO;
import com.mytrip.mytripservice.service.DailyScheduleService;
import com.mytrip.mytripservice.service.MoveTimeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/move-times")
public class MoveTimeController {

    private final MoveTimeService moveTimeService;
    private final DailyScheduleService dailyScheduleService;

    @Autowired
    public MoveTimeController(MoveTimeService moveTimeService, DailyScheduleService dailyScheduleService) {
        this.moveTimeService = moveTimeService;
        this.dailyScheduleService = dailyScheduleService;
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

    //추가했어요
    @PostMapping("/calculate/{planId}")
    public ResponseEntity<List<MoveTimeDTO>> calculateMoveTimes(@PathVariable Long planId) {
        List<DailyScheduleOtherDTO> schedules = dailyScheduleService.getDailyScheduleByPlanId(planId);
        List<MoveTimeDTO> moveTimes = moveTimeService.calculateMoveTimes(schedules);
        moveTimeService.saveMoveTimes(moveTimes);
        return ResponseEntity.ok(moveTimes);
    }

    @PatchMapping("/{id}")
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
