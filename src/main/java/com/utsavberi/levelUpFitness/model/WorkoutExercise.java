package com.utsavberi.levelUpFitness.model;

import org.hibernate.jdbc.Work;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
public class WorkoutExercise {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @ManyToOne(cascade={CascadeType.DETACH,CascadeType.REFRESH})
    private Exercise exercise;
    @NotNull
    private int sets;
    @NotNull
    private int reps;

    private int restInSeconds;

    public WorkoutExercise(){}
    public WorkoutExercise(Exercise exercise, int sets, int reps, int restInSeconds) {
        this.exercise = exercise;
        this.sets = sets;
        this.reps = reps;
        this.restInSeconds = restInSeconds;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Exercise getExercise() {
        return exercise;
    }

    public void setExercise(Exercise exercise) {
        this.exercise = exercise;
    }

    public int getSets() {
        return sets;
    }

    public void setSets(int sets) {
        this.sets = sets;
    }

    public int getReps() {
        return reps;
    }

    public void setReps(int reps) {
        this.reps = reps;
    }

    public int getRestInSeconds() {
        return restInSeconds;
    }

    public void setRestInSeconds(int restInSeconds) {
        this.restInSeconds = restInSeconds;
    }
}