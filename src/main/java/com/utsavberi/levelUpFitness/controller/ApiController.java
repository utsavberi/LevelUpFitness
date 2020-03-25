package com.utsavberi.levelUpFitness.controller;

import com.utsavberi.levelUpFitness.model.Exercise;
import com.utsavberi.levelUpFitness.model.WorkoutLog;
import com.utsavberi.levelUpFitness.repository.ExerciseRepository;
import com.utsavberi.levelUpFitness.repository.WorkoutLogRepository;
import com.utsavberi.levelUpFitness.repository.WorkoutRepository;
import com.utsavberi.levelUpFitness.model.Workout;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ApiController {
    private final WorkoutRepository workoutRepository;
    private final ExerciseRepository exerciseRepository;
    private final WorkoutLogRepository workoutLogRepository;

    @Autowired
    public ApiController(
            WorkosutRepository workoutRepository,
            ExerciseRepository exerciseRepository,
            WorkoutLogRepository workoutLogRepository
    ) {
        this.workoutRepository = workoutRepository;
        this.exerciseRepository = exerciseRepository;
        this.workoutLogRepository = workoutLogRepository;

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

}
