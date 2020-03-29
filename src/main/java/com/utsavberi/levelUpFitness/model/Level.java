package com.utsavberi.levelUpFitness.model;

public class Level {
    private final int level;
    private final float points;
    private final float  nextLevelAt;
    private final float  previousLevelAt;

    public Level(float points, float nextLevelAt, float previousLevelAt, int level) {
        this.points = points;
        this.nextLevelAt = nextLevelAt;
        this.previousLevelAt = previousLevelAt;
        this.level = level;
    }

    public float getPoints() {
        return points;
    }

    public float getNextLevelAt() {
        return nextLevelAt;
    }

    public float getPreviousLevelAt() {
        return previousLevelAt;
    }

    public int getLevel(){
        return level;
    }
}
