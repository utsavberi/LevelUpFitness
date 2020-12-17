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

        /*
        db reset scripts:
        /usr/local/mysql/bin $ ./mysql -u root -p dbLevelUpFitness
        password: password
        drop database dbLevelUpfitness;
        create database dblevelupfitness;
        use dblevelupfitness;
        */
    }

    @Override
    public void run(String... args) throws Exception {
        if (exerciseRepository.count() == 0L) {
            //name, description, points per lb
            exerciseRepository.save(addExercise("push up",
                    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/pushup-1462808858.gif",
                    1f,
                    .005f
            ));
            exerciseRepository.save(addExercise("two arm dumbell row",
                    "https://qph.fs.quoracdn.net/main-qimg-1067d611d07d42a4b8ac2ede85056dfa",
                    .2f,
                    .005f
            ));
            exerciseRepository.save(addExercise("shoulder press",
                    "https://thumbs.gfycat.com/ExcitableOblongFluke-small.gif",
                    .1f,
                    .005f
            ));
            exerciseRepository.save(addExercise("bench dip",
                    "https://hips.hearstapps.com/ame-prod-menshealth-assets.s3.amazonaws.com/main/assets/bdip.gif?resize=480:*",
                    .5f,
                    .005f
            ));
            exerciseRepository.save(addExercise("squats",
                    "https://hips.hearstapps.com/ame-prod-menshealth-assets.s3.amazonaws.com/main/assets/barbell-squat.gif?resize=480:*",
                    1.2f,
                    .005f
            ));
            exerciseRepository.save(addExercise("deadlifts",
                    "https://hips.hearstapps.com/hmg-prod.s3.amazonaws.com/images/workouts/2016/03/dumbbelldeadlift-1457044319.gif",
                    1.2f,
                    .005f
            ));
            exerciseRepository.save(addExercise("lunges",
                    "https://i0.wp.com/post.greatist.com/wp-content/uploads/sites/2/2019/05/PERFECT-SERIES_LUNGE-HORIZONTAL_GRAIN.gif?w=1155&h=812",
                    1.2f,
                    .005f
            ));
        }
        //Push Exercise
//        addPushExercise();
//        addPullExercise();
//        addLegsExercise();
    }

    private void addLegsExercise() {
        Set<WorkoutExercise> list = new HashSet<>();

        list.add(addWorkoutExercise("Squats", "upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.", 100));
        list.add(addWorkoutExercise("RDL", "upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.", 100));
        list.add(addWorkoutExercise("Extensions", "upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.", 100));

        Workout workout = new Workout("Legs", false);
        workout.setWorkoutExercises(list);
        workoutRepository.save(workout);
    }

    private void addPullExercise() {
        Set<WorkoutExercise> list = new HashSet<>();

        list.add(addWorkoutExercise("Squats", "upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.", 100));
        list.add(addWorkoutExercise("RDL", "upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.", 100));
        list.add(addWorkoutExercise("Extensions", "upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.", 100));

        Workout workout = new Workout("Pull", false);
        workout.setWorkoutExercises(list);
        workoutRepository.save(workout);
    }

    private void addPushExercise() {
        Set<WorkoutExercise> list = new HashSet<>();

        list.add(addWorkoutExercise("Squats", "upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.", 100));
//        list.add(addExercise("RDL", "upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.", 100));
//        list.add(addExercise("Extensions", "upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.", 100));

        Workout workout = new Workout("Push", false);
        workout.setWorkoutExercises(list);
        workoutRepository.save(workout);
    }

    private WorkoutExercise addWorkoutExercise(String name, String description, float pointsPerRepPerLbs) {
        return new WorkoutExercise(addExercise(
                        name,
                        "",
                        1,pointsPerRepPerLbs), 3 , 10, 60);
    }

    private Exercise addExercise(
            String name,
            String image,
            float basePointsPerRep,
            float pointsPerRepPerLbs
    ) {
        return new Exercise(
                name,
                image,
                basePointsPerRep,
                pointsPerRepPerLbs
        );
    }
}
