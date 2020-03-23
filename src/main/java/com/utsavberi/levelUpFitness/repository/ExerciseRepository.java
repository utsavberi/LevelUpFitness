package com.utsavberi.levelUpFitness.repository;

import com.utsavberi.levelUpFitness.model.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExerciseRepository extends JpaRepository<Exercise, Long> {
}