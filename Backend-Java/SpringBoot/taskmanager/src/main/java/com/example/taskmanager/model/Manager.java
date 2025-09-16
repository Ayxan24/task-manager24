package com.example.taskmanager.model;
import java.util.ArrayList;
import java.util.List;


public class Manager implements IManager {
    private List<TaskGroup> taskGroups;
    private String managerName;

    public Manager() {
        managerName = "Default Manager";
        this.taskGroups = new ArrayList<>();
    }

    @Override
    public void addTaskGroup(TaskGroup taskGroup) {
        taskGroups.add(taskGroup);
    }
    // ROUNDING ALERT NO EXEPTION
    @Override
    public void removeTaskGroup(int index) {
        if (taskGroups.isEmpty()) return; // Nothing to remove
        if (index < 0 || index >= taskGroups.size()) {
            // Remove last if index is invalid
            taskGroups.remove(taskGroups.size() - 1);
        } else {
            taskGroups.remove(index);
        }
    }

    @Override
    public ITaskGroup popTaskGroup(int index) throws IndexOutOfBoundsException {
        if (index < 0 || index >= taskGroups.size()) {
            throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + taskGroups.size());
        }
        return taskGroups.remove(index);
    }

    @Override
    public ITaskGroup getTaskGroup(int index) throws IndexOutOfBoundsException {
        if (index < 0 || index >= taskGroups.size()) {
            throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + taskGroups.size());
        }
        return taskGroups.get(index);
    }

    @Override
    public int getNumberOfTaskGroups() {
        return taskGroups.size();
    }

    @Override
    public String getManagerName() {
        return managerName;
    }

    @Override
    public void setManagerName(String managerName) {
        this.managerName = managerName;
    }

    @Override
    public List<TaskGroup> getAllTaskGroups(){
        return taskGroups;
    }





    @Override
    public String toString() {
        StringBuilder sb = new StringBuilder();
        sb.append("Manager with ").append(taskGroups.size()).append(" Task Groups:\n");
        for (int i = 0; i < taskGroups.size(); i++) {
            sb.append("Task Group ").append(i).append(":\n").append(taskGroups.get(i).toString()).append("\n");
        }
        return sb.toString();
    }

    
}

