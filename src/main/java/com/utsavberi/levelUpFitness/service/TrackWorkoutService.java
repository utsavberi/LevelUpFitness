package com.utsavberi.levelUpFitness.service;

import com.utsavberi.levelUpFitness.model.*;

import java.sql.Timestamp;

public class TrackWorkoutService {

    private final Workout workout;

    private WorkoutLog workoutLog;

    private WorkoutExerciseLog currentExerciseLog;

    private WorkoutExerciseSetLog currentSetLog;

    public TrackWorkoutService(Workout workout) {
        this.workout = workout;
    }

    public void startWorkout() {
        workoutLog = new WorkoutLog();
        workoutLog.setStartDateTime(new Timestamp(System.currentTimeMillis()));
    }

    public void startExercise(Exercise exercise) {
        currentExerciseLog = new WorkoutExerciseLog();
        currentExerciseLog.setStartDateTime(new Timestamp(System.currentTimeMillis()));

    }

    public void startSet() {
        currentSetLog = new WorkoutExerciseSetLog();
        currentSetLog.setStartDateTime(new Timestamp(System.currentTimeMillis()));
    }

    public void endSet(int reps, float weight) {
        currentSetLog.setReps(reps);
        currentSetLog.setWeight(weight);
        currentSetLog.setEndDateTime(new Timestamp(System.currentTimeMillis()));

        currentExerciseLog.addWorkoutExerciseSetLog(currentSetLog);
    }

    public void endExercise() {
        currentExerciseLog.setEndDateTime(new Timestamp(System.currentTimeMillis()));
        workoutLog.addWorkoutExerciseLog(currentExerciseLog);
    }

    public WorkoutLog endWorkout() {
        workoutLog.setEndDateTime(new Timestamp(System.currentTimeMillis()));
        return workoutLog;
    }
}
