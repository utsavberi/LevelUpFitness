package com.utsavberi.levelUpFitness.model;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Exercise {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;
    private String name;
    @Lob
    private String description;
    private String imageId;
    private float pointsPerRepPerLbs;

    public Exercise() {
    }

    public Exercise(String name, String description, float pointsPerRepPerLbs) {
        this.name = name;
        this.description = description;
        this.pointsPerRepPerLbs = pointsPerRepPerLbs;
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