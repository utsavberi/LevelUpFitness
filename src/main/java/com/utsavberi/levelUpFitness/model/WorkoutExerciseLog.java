package com.utsavberi.levelUpFitness.model;

import javax.persistence.*;
import java.sql.Timestamp;
import java.util.*;

@Entity
public class WorkoutExerciseLog {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @OneToMany(cascade = CascadeType.PERSIST)
    private Set<WorkoutExerciseSetLog> workoutExerciseSetLogs;
    @OneToOne(cascade={CascadeType.DETACH,CascadeType.REFRESH})
    private Exercise exercise;
    private Timestamp startDateTime;
    private Timestamp endDateTime;

    public Exercise getExercise() {
        return exercise;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }

    public Set<WorkoutExerciseSetLog> getWorkoutExerciseSetLogs() {
        return workoutExerciseSetLogs;
    }

    public void addWorkoutExerciseSetLog(WorkoutExerciseSetLog workoutExerciseSetLog) {
        if (workoutExerciseSetLogs == null) {
            workoutExerciseSetLogs = new LinkedHashSet<>();
        }
        workoutExerciseSetLogs.add(workoutExerciseSetLog);
    }

    public void setWorkoutExerciseSetLogs(Set<WorkoutExerciseSetLog> workoutExerciseSetLogs) {
        this.workoutExerciseSetLogs = workoutExerciseSetLogs;
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

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }
}
