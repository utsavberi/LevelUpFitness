package com.utsavberi.levelUpFitness.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    private String name;
    private boolean isCircuit;
    @OneToMany(cascade = CascadeType.PERSIST)
    private Set<WorkoutExercise> workoutExercises;

    @ManyToOne
    private User user;

    public Set<WorkoutExercise> getWorkoutExercises() {
        return workoutExercises;
    }

    public void setWorkoutExercises(Set<WorkoutExercise> exercises) {
        this.workoutExercises = exercises;
    }


    public boolean isCircuit() {
        return isCircuit;
    }

    public void setCircuit(boolean circuit) {
        isCircuit = circuit;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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