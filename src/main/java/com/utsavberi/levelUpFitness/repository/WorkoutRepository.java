package com.utsavberi.levelUpFitness.repository;

import com.utsavberi.levelUpFitness.model.Workout;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutRepository extends JpaRepository<Workout, Long> {
}