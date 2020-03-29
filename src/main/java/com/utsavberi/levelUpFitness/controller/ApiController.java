package com.utsavberi.levelUpFitness.controller;

import com.utsavberi.levelUpFitness.model.*;
import com.utsavberi.levelUpFitness.repository.ExerciseRepository;
import com.utsavberi.levelUpFitness.repository.WorkoutLogRepository;
import com.utsavberi.levelUpFitness.repository.WorkoutRepository;
import com.utsavberi.levelUpFitness.service.LevelManager;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ApiController {
    private final WorkoutRepository workoutRepository;
    private final ExerciseRepository exerciseRepository;
    private final WorkoutLogRepository workoutLogRepository;
    private final LevelManager levelManager;

    @Autowired
    public ApiController(
            WorkoutRepository workoutRepository,
            ExerciseRepository exerciseRepository,
            WorkoutLogRepository workoutLogRepository,
            LevelManager levelManager
    ) {
        this.workoutRepository = workoutRepository;
        this.exerciseRepository = exerciseRepository;
        this.workoutLogRepository = workoutLogRepository;
        this.levelManager = levelManager;
    }

    @GetMapping("/workouts")
    public List<Workout> workouts() {
        return workoutRepository.findAll();
    }


    @GetMapping("/exercises")
    public List<Exercise> exercises() {
        return exerciseRepository.findAll();
    }

    @GetMapping("/workoutLogs")
    public List<WorkoutLog> workoutLog() {
        return workoutLogRepository.findAll();
    }

    @PostMapping("/addWorkoutLog")
    public String addWorkoutLog(@RequestBody WorkoutLog workoutLog) {
        workoutLogRepository.save(workoutLog);
        return "done";
    }

    @PostMapping("/addWorkout")
    public String addWorkout(@RequestBody Workout workout) {
        workoutRepository.save(workout);
        return "done";
    }

    @GetMapping("/level")
    public Level level() {
        return this.levelManager.getPointsInfo();
    }

}
