package com.utsavberi.levelUpFitness.model;

import javax.persistence.*;
import javax.validation.constraints.NotNull;

@Entity
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    @NotNull
    private String name;
    @Lob
    private String description;
    private String image;
    private String primaryMusclesUsed;
    private String secondaryMusclesUsed;
    private float basePointsPerRep;
    private float pointsPerRepPerLbs;

    public Exercise() {
    }

    public Exercise(
            String name,
            String image,
            float basePointsPerRep,
            float pointsPerRepPerLbs
    ) {
        this.name = name;
        this.image = image;
        this.basePointsPerRep = basePointsPerRep;
        this.pointsPerRepPerLbs = pointsPerRepPerLbs;
    }

    public String getPrimaryMusclesUsed() {
        return primaryMusclesUsed;
    }

    public void setPrimaryMusclesUsed(String primaryMusclesUsed) {
        this.primaryMusclesUsed = primaryMusclesUsed;
    }

    public String getSecondaryMusclesUsed() {
        return secondaryMusclesUsed;
    }

    public void setSecondaryMusclesUsed(String secondaryMusclesUsed) {
        this.secondaryMusclesUsed = secondaryMusclesUsed;
    }

    public float getBasePointsPerRep() {
        return basePointsPerRep;
    }

    public void setBasePointsPerRep(float basePointsPerRep) {
        this.basePointsPerRep = basePointsPerRep;
    }

    public String getPrimaryMuscleUsed() {
        return primaryMusclesUsed;
    }

    public void setPrimaryMuscleUsed(String primaryMuscleUsed) {
        this.primaryMusclesUsed = primaryMuscleUsed;
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

    public String getImage() {
        return image;
    }

    public void setImage(String imageId) {
        this.image = imageId;
    }

    public float getPointsPerRepPerLbs() {
        return pointsPerRepPerLbs;
    }

    public void setPointsPerRepPerLbs(float pointsPerRepPerLbs) {
        this.pointsPerRepPerLbs = pointsPerRepPerLbs;
    }
}