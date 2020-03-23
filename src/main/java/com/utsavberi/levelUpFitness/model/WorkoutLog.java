package com.utsavberi.levelUpFitness.model;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
public class WorkoutLog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @OneToMany
    private Set<WorkoutExerciseLog> workoutExerciseLogs;
    @OneToOne
    private Workout workout;
    private Timestamp startDateTime;
    private Timestamp endDateTime;

    public Workout getWorkout() {
        return workout;
    }

    public void setWorkout(Workout workout) {
        this.workout = workout;
    }

    public Set<WorkoutExerciseLog> getWorkoutExerciseLogs() {
        return workoutExerciseLogs;
    }

    public void setWorkoutExerciseLogs(Set<WorkoutExerciseLog> workoutExerciseLogs) {
        this.workoutExerciseLogs = workoutExerciseLogs;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Timestamp getStartDateTime() {
        return startDateTime;
    }

    public void setStartDateTime(Timestamp startDateTime) {
        this.startDateTime = startDateTime;
    }

    public Timestamp getEndDateTime() {
        return endDateTime;
    }

    public void setEndDateTime(Timestamp endDateTime) {
        this.endDateTime = endDateTime;
    }

    public void addWorkoutExerciseLog(WorkoutExerciseLog exerciseLog) {
        if(workoutExerciseLogs == null){
            workoutExerciseLogs = new LinkedHashSet<>();
        }
        workoutExerciseLogs.add(exerciseLog);
    }
}