package com.utsavberi.levelUpFitness.controller;

import com.utsavberi.levelUpFitness.repository.ExerciseRepository;
import com.utsavberi.levelUpFitness.model.Exercise;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ExerciseController {
    private final ExerciseRepository exerciseRepository;

    @Autowired
    public ExerciseController(ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    @GetMapping("/exercises")
    public List<Exercise> exercises() {
        return exerciseRepository.findAll();
    }
}
