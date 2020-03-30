package com.utsavberi.levelUpFitness.controller;

import com.utsavberi.levelUpFitness.model.Exercise;
import com.utsavberi.levelUpFitness.model.Workout;
import com.utsavberi.levelUpFitness.repository.ExerciseRepository;
import com.utsavberi.levelUpFitness.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
import java.util.Optional;

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
        return "template";
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

    @RequestMapping(value = "/startWorkout", method = RequestMethod.GET)
    public String startWorkout(@RequestParam("id") Long id, Model model) {
        Optional<Workout> workout =
                workoutRepository.findById(id);
        workout.ifPresent(value -> model.addAttribute("workout", value));
        return "startWorkout";
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

    @RequestMapping(value = "/addWorkout", method = RequestMethod.GET)
    public String addWorkout(
            Model model) {
        List<Exercise> exercises =
                exerciseRepository.findAll();
        if (exercises != null) {
            model.addAttribute("exercises", exercises);
        }
        return "addWorkout";
    }

    @RequestMapping(value = "/home", method = RequestMethod.GET)
    public String home(
            Model model) {

        return "home";
    }

}