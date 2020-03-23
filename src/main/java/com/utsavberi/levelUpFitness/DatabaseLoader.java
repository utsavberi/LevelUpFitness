package com.utsavberi.levelUpFitness;

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
        Set<Exercise> list = new HashSet<>();

        list.add(addExercise("Squats", "upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.", 100));
        list.add(addExercise("RDL", "upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.", 100));
        addExercise("Lunges", "typically performed while standing, in which a weight is pressed straight upwards from racking position until the arms are locked out overhead, while the legs, lower back and abs maintain balance.[1] The exercise helps build muscular shoulders with bigger arms, and is one of the most difficult compound upper-body exercises.", 100);
        addExercise("Hip Thrusts", "Lifting dumbbells to sides, abducting away from bodt.\n" +
                "\n" +
                "Doing them standing with vertical torso targets middle delt. Doing them bent over with prone torso targets back delt.\n" +
                "\n" +
                "Bending elbow shortens lever and makes it easier. Also adds extenal rotation component to his teres kinor and infraspinatus, also posterior delt.", 100);
        addExercise("Extensions", "strength training exercise used for strengthening the triceps muscles in the back of the arm. The exercise is completed by pushing an object downward against resistance. This exercise is an example of the primary function of the triceps, extension of the elbow joint.", 100);
        addExercise("Ham Curls", "The overhead triceps extension is a strength move that targets the back of your upper arm, where your triceps brachii muscles are located. The three heads of the triceps muscles all come together to help extend the elbow, so it's a really effective move", 100);

        Workout workout = new Workout("Legs", false);
        workout.setExercises(list);
        workoutRepository.save(workout);
    }

    private void addPullExercise() {
        addExercise("Pull Ups", "upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.", 100);
        addExercise("Pulldowns", "upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.", 100);
        addExercise("Barbell Row", "typically performed while standing, in which a weight is pressed straight upwards from racking position until the arms are locked out overhead, while the legs, lower back and abs maintain balance.[1] The exercise helps build muscular shoulders with bigger arms, and is one of the most difficult compound upper-body exercises.", 100);
        addExercise("Seated Cable Row", "Lifting dumbbells to sides, abducting away from bodt.\n" +
                "\n" +
                "Doing them standing with vertical torso targets middle delt. Doing them bent over with prone torso targets back delt.\n" +
                "\n" +
                "Bending elbow shortens lever and makes it easier. Also adds extenal rotation component to his teres kinor and infraspinatus, also posterior delt.", 100);
        addExercise("Shrugs", "strength training exercise used for strengthening the triceps muscles in the back of the arm. The exercise is completed by pushing an object downward against resistance. This exercise is an example of the primary function of the triceps, extension of the elbow joint.", 100);
        addExercise("Bicep Curls", "The overhead triceps extension is a strength move that targets the back of your upper arm, where your triceps brachii muscles are located. The three heads of the triceps muscles all come together to help extend the elbow, so it's a really effective move", 100);
    }

    private void addPushExercise() {
        addExercise("Flat Benchpress", "upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.", 100);
        addExercise("Incline Benchpress", "upper-body weight training exercise in which the trainee presses a weight upwards while lying on a weight training bench. The exercise uses the pectoralis major, the anterior deltoids, and the triceps, among other stabilizing muscles. A barbell is generally used to hold the weight, but a pair of dumbbells can also be used.", 100);
        addExercise("Overhead Press", "typically performed while standing, in which a weight is pressed straight upwards from racking position until the arms are locked out overhead, while the legs, lower back and abs maintain balance.[1] The exercise helps build muscular shoulders with bigger arms, and is one of the most difficult compound upper-body exercises.", 100);
        addExercise("Lateral Raise", "Lifting dumbbells to sides, abducting away from bodt.\n" +
                "\n" +
                "Doing them standing with vertical torso targets middle delt. Doing them bent over with prone torso targets back delt.\n" +
                "\n" +
                "Bending elbow shortens lever and makes it easier. Also adds extenal rotation component to his teres kinor and infraspinatus, also posterior delt.", 100);
        addExercise("Pushdowns", "strength training exercise used for strengthening the triceps muscles in the back of the arm. The exercise is completed by pushing an object downward against resistance. This exercise is an example of the primary function of the triceps, extension of the elbow joint.", 100);
        addExercise("Overhead Ext.", "The overhead triceps extension is a strength move that targets the back of your upper arm, where your triceps brachii muscles are located. The three heads of the triceps muscles all come together to help extend the elbow, so it's a really effective move", 100);
    }

    private Exercise addExercise(String name, String description, float pointsPerRepPerLbs) {
        return exerciseRepository.save(
                new Exercise(
                        name,
                        description,
                        pointsPerRepPerLbs)
        );
    }
}
