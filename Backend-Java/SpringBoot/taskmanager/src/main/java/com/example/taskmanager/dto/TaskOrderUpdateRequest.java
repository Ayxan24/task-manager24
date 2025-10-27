package com.example.taskmanager.dto;

import java.util.List;

public class TaskOrderUpdateRequest {
    private int fromGroupIndex;
    private int toGroupIndex;
    private int fromTaskIndex;
    private int toTaskIndex;
    private String movedTask;
    private List<String> tasks; 

    // Getters and Setters
    public int getFromGroupIndex() {
        return fromGroupIndex;
    }

    public void setFromGroupIndex(int fromGroupIndex) {
        this.fromGroupIndex = fromGroupIndex;
    }

    public int getFromTaskIndex() {
        return fromTaskIndex;
    }
    public void setFromTaskIndex(int fromTaskIndex) {
        this.fromTaskIndex = fromTaskIndex;
    }
    public int getToTaskIndex() {
        return toTaskIndex;
    }
    public void setToTaskIndex(int toTaskIndex) {
        this.toTaskIndex = toTaskIndex;
    }


    public int getToGroupIndex() {
        return toGroupIndex;
    }

    public void setToGroupIndex(int toGroupIndex) {
        this.toGroupIndex = toGroupIndex;
    }

    public String getMovedTask() {
        return movedTask;
    }

    public void setMovedTask(String movedTask) {
        this.movedTask = movedTask;
    }

    public List<String> getTasks() {
        return tasks;
    }

    public void setTasks(List<String> tasks) {
        this.tasks = tasks;
    }
}
