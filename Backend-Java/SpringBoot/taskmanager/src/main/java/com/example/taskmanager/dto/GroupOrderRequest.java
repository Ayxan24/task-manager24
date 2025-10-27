package com.example.taskmanager.dto;
import java.util.List;


public class GroupOrderRequest {
    private List<String> groups;
    private int fromIndex;
    private int toIndex;
    // Getters and Setters
    public List<String> getGroups() {
        return groups;
    }
    public void setGroups(List<String> groups) {
        this.groups = groups;
    }
    public int getFromIndex() {
        return fromIndex;
    }
    public void setFromIndex(int fromIndex) {
        this.fromIndex = fromIndex;
    }
    public int getToIndex() {
        return toIndex;
    }
    public void setToIndex(int toIndex) {
        this.toIndex = toIndex;
    }




}


