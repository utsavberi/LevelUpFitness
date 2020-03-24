package com.utsavberi.levelUpFitness.controller;

import com.utsavberi.levelUpFitness.model.Exercise;
import com.utsavberi.levelUpFitness.model.Workout;
import com.utsavberi.levelUpFitness.repository.ExerciseRepository;
import com.utsavberi.levelUpFitness.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
@RequestMapping("/")
public class LevelUpFitnessController {
    private final WorkoutRepository workoutRepository;
    private ExerciseRepository exerciseRepository;

    @Autowired
    public LevelUpFitnessController(
            ExerciseRepository exerciseRepository,
            WorkoutRepository workoutRepository) {
        this.exerciseRepository = exerciseRepository;
        this.workoutRepository = workoutRepository;
    }


    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String index(Model model) {
        return "home";
    }

    @RequestMapping(value = "/workouts", method = RequestMethod.GET)
    public String workouts(Model model) {
        List<Workout> workouts =
                workoutRepository.findAll();
        if (workouts != null) {
            model.addAttribute("workouts", workouts);
        }
        return "workouts";
    }

    @RequestMapping(value = "/exercises", method = RequestMethod.GET)
    public String excercises(
            Model model) {
        List<Exercise> exercises =
                exerciseRepository.findAll();
        if (exercises != null) {
            model.addAttribute("exercises", exercises);
        }
        return "exercises";
    }

    @RequestMapping(value = "/add", method = RequestMethod.POST)
    public String addToReadingList(Exercise exercise) {
        exerciseRepository.save(exercise);
        return "redirect:/";
    }
}