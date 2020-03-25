package com.utsavberi.levelUpFitness.component;

import com.utsavberi.levelUpFitness.model.Exercise;
import com.utsavberi.levelUpFitness.model.Workout;
import com.utsavberi.levelUpFitness.model.WorkoutExercise;
import com.utsavberi.levelUpFitness.repository.ExerciseRepository;
import com.utsavberi.levelUpFitness.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.HashSet;
import java.util.Set;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final ExerciseRepository exerciseRepository;
    private final WorkoutRepository workoutRepository;


    @Autowired
    public DatabaseLoader(ExerciseRepository exerciseRepository, WorkoutRepository workoutRepository) {
        this.exerciseRepository = exerciseRepository;
        this.workoutRepository = workoutRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        //Push Exercise
        addPushExercise();
        addPullExercise();
        addLegsExercise();
    }

    private void addLegsExercise() {
        Set<WorkoutExercise> list = new HashSet<>();

        list.add(addExercise("Squats", "upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.", 100));
        list.add(addExercise("RDL", "upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.", 100));
        list.add(addExercise("Extensions", "upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.", 100));

        Workout workout = new Workout("Legs", false);
        workout.setWorkoutExercises(list);
        workoutRepository.save(workout);
    }

    private void addPullExercise() {
        Set<WorkoutExercise> list = new HashSet<>();

        list.add(addExercise("Squats", "upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.", 100));
        list.add(addExercise("RDL", "upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.", 100));
        list.add(addExercise("Extensions", "upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.", 100));

        Workout workout = new Workout("Pull", false);
        workout.setWorkoutExercises(list);
        workoutRepository.save(workout);
    }

    private void addPushExercise() {
        Set<WorkoutExercise> list = new HashSet<>();

        list.add(addExercise("Squats", "upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.", 100));
//        list.add(addExercise("RDL", "upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.", 100));
//        list.add(addExercise("Extensions", "upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.", 100));

        Workout workout = new Workout("Push", false);
        workout.setWorkoutExercises(list);
        workoutRepository.save(workout);
    }

    private WorkoutExercise addExercise(String name, String description, float pointsPerRepPerLbs) {
        return
                new WorkoutExercise(new Exercise(
                        name,
                        description,
                        pointsPerRepPerLbs), 3, 10, 60);
    }
}
