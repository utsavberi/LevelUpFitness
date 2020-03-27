package com.utsavberi.levelUpFitness.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Set;

@Entity
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    private String name;
    @Lob
    private String description;
    private String imageId;
    private float pointsPerRepPerLbs;
    private String primaryMuscleUsed;

    public Exercise() {
    }

    public String getPrimaryMuscleUsed() {
        return primaryMuscleUsed;
    }

    public void setPrimaryMuscleUsed(String primaryMuscleUsed) {
        this.primaryMuscleUsed = primaryMuscleUsed;
    }

    public Exercise(String name, String description, float pointsPerRepPerLbs, String primaryMuscleUsed) {
        this.name = name;
        this.description = description;
        this.pointsPerRepPerLbs = pointsPerRepPerLbs;
        this.primaryMuscleUsed = primaryMuscleUsed;
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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImageId() {
        return imageId;
    }

    public void setImageId(String imageId) {
        this.imageId = imageId;
    }

    public float getPointsPerRepPerLbs() {
        return pointsPerRepPerLbs;
    }

    public void setPointsPerRepPerLbs(float pointsPerRepPerLbs) {
        this.pointsPerRepPerLbs = pointsPerRepPerLbs;
    }
}