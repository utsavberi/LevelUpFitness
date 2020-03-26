package com.utsavberi.levelUpFitness.repository;

import com.utsavberi.levelUpFitness.model.Workout;
import com.utsavberi.levelUpFitness.model.WorkoutLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkoutLogRepository extends JpaRepository<WorkoutLog, Long> {
}