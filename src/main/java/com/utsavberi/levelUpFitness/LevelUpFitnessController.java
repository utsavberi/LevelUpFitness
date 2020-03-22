package com.utsavberi.levelUpFitness;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import java.util.List;

@Controller
@RequestMapping("/")
public class LevelUpFitnessController {
    private ExerciseRepository exerciseRepository;

    @Autowired
    public LevelUpFitnessController(
            ExerciseRepository exerciseRepository) {
        this.exerciseRepository = exerciseRepository;
    }

    @RequestMapping(value = "/", method = RequestMethod.GET)
    public String excercises(
            Model model) {
        List<Exercise> exercises =
                exerciseRepository.findAll();
        if (exercises != null) {
            model.addAttribute("exercises", exercises);
        }
        return "exercises";
    }

    @RequestMapping(value = "", method = RequestMethod.POST)
    public String addToReadingList( Exercise exercise) {
        exerciseRepository.save(exercise);
        return "redirect:/";
    }
}