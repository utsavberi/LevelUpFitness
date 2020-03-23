package com.utsavberi.levelUpFitness.model;

import com.utsavberi.levelUpFitness.model.Exercise;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    private boolean isCircuit;
    @ManyToMany
    private Set<Exercise> exercises;

    public Set<Exercise> getExercises() {
        return exercises;
    }

    public void setExercises(Set<Exercise> exercises) {
        this.exercises = exercises;
    }


    public boolean isCircuit() {
        return isCircuit;
    }

    public void setCircuit(boolean circuit) {
        isCircuit = circuit;
    }

    public Workout() {
    }

    public Workout(String name, boolean isCircuit) {
        this.name = name;
        this.isCircuit = isCircuit;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

}