package com.utsavberi.levelUpFitness.service;

import com.utsavberi.levelUpFitness.model.*;
import com.utsavberi.levelUpFitness.repository.WorkoutLogRepository;
import org.springframework.stereotype.Component;

@Component
public class LevelManager {
    private final float level1Points = 100;
    private final float levelUpFactor = 1.5f;
    private final WorkoutLogRepository workoutLogRepository;

    //points needed for level = level1Points * (level ^ levelUpFactor)
    //level = (points/level1Points) ^ 1/5
    // todo needs unit tests

    public LevelManager(WorkoutLogRepository workoutLogRepository) {
        this.workoutLogRepository = workoutLogRepository;
    }

    public Level getPointsInfo() {
        float points = getPoints();
        int currentLevel = getCurrentLevel(points);
        float nextLevelAt = getNextLevelAt(currentLevel);
        float prevLevelAt = getPrevLevelAt(currentLevel);

        return new Level(points, nextLevelAt, prevLevelAt, currentLevel);
    }

    private int getCurrentLevel(float points) {
        return (int) Math.floor((Math.pow(points / level1Points, 1 / levelUpFactor)));
    }

    private int getPrevLevelAt(int currentLevel) {
        return (int) Math.ceil((level1Points * Math.pow(currentLevel, levelUpFactor)));
    }

    private int getNextLevelAt(int currentLevel) {
        return (int) Math.ceil((level1Points * Math.pow(currentLevel + 1, levelUpFactor)));
    }

    private float getPoints() {
        float points = 0.f;

        WorkoutLog workoutLog = workoutLogRepository.findAll().get(0);
        for (WorkoutExerciseLog workoutExerciseLog : workoutLog.getWorkoutExerciseLogs()) {
            for (WorkoutExerciseSetLog workoutExerciseSetLog : workoutExerciseLog.getWorkoutExerciseSetLogs()) {
                Exercise exercise = workoutExerciseLog.getExercise();
                points += (exercise.getBasePointsPerRep() * workoutExerciseSetLog.getReps()) +
                        (exercise.getPointsPerRepPerLbs() * workoutExerciseSetLog.getReps() * workoutExerciseSetLog.getWeight());
            }
        }
        return points;
    }
}
