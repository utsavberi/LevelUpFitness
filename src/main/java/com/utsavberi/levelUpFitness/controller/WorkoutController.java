package com.utsavberi.levelUpFitness.controller;

import com.utsavberi.levelUpFitness.repository.WorkoutRepository;
import com.utsavberi.levelUpFitness.model.Workout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class WorkoutController {
    private final WorkoutRepository workoutRepository;

    @Autowired
    public WorkoutController(WorkoutRepository workoutRepository) {
        this.workoutRepository = workoutRepository;
    }

    @GetMapping("/workouts")
    public List<Workout> workouts() {
        return workoutRepository.findAll();
    }
}
