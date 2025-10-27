package com.example.taskmanager.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;


import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import com.example.taskmanager.dto.*;
import com.example.taskmanager.model.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.SerializationFeature;

import io.micrometer.core.ipc.http.HttpSender.Response;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://127.0.0.1:5500")
public class ManagerController {

    private static final String DATA_FILE_PATH = "data/manager.json";
    private final ObjectMapper objectMapper;
    private final Manager manager;

    public ManagerController() {
        this.objectMapper = new ObjectMapper();
        this.objectMapper.enable(SerializationFeature.INDENT_OUTPUT);
        
        // Try to load existing data, otherwise create demo data
        Manager loadedManager = loadManager();
        if (loadedManager != null) {
            this.manager = loadedManager;
        } else {
            this.manager = new Manager();
            initializeDemoData();
            saveManager(this.manager);
        }
    }
    
    private void initializeDemoData() {
        TaskGroup group1 = new TaskGroup();
        group1.setGroupName("Group 1");
        group1.addTask(new Task("title","descripton",false,new Date(1,2,1233),1));
        group1.addTask(new Task("title2","descripton2",true,new Date(1,2,1233),2));
        manager.addTaskGroup(group1);
        
        TaskGroup group2 = new TaskGroup();
        group2.setGroupName("Group 2");
        group2.addTask(new Task("title3","descripton3",false,new Date(1,2,1233),3));
        group2.addTask(new Task("title4","descripton4",true,new Date(1,2,1233),4));
        manager.addTaskGroup(group2);
        
    }
    
    private Manager loadManager(){
        try {
            File file = new File(DATA_FILE_PATH);
            if (file.exists()) {
                return objectMapper.readValue(file, Manager.class);
            }
        } catch (IOException e) {
            System.err.println("Error loading manager data: " + e.getMessage());
        }
        return null;
    }

    @PostMapping("/save")
    public ResponseEntity<String> saveManager() {
        saveManager(manager);
        return ResponseEntity.ok("Manager data saved successfully");
    }

    private void saveManager(Manager manager){
        try {
            File file = new File(DATA_FILE_PATH);
            file.getParentFile().mkdirs(); // Create directory if it doesn't exist
            objectMapper.writeValue(file, manager);
            System.out.println("Manager data saved to " + DATA_FILE_PATH);
        } catch (IOException e) {
            System.err.println("Error saving manager data: " + e.getMessage());
        }
    }

    @GetMapping("/manager")
    public Manager getManager() {
        return manager;
    }

    @GetMapping("/groups")
    public List<TaskGroup> getTaskGroups() {
        return manager.getAllTaskGroups();
    }

    @PostMapping("/update-tasks-order")
    public ResponseEntity<String> updateTasksOrder(@RequestBody TaskOrderUpdateRequest request) {


        Task temptask = manager.getTaskGroup(request.getFromGroupIndex()).getTask(request.getFromTaskIndex());
        if (!request.getMovedTask().equals(temptask.getTitle())) {
            return ResponseEntity.badRequest().body("Moved task does not match the expected task");
        }
        manager.getTaskGroup(request.getFromGroupIndex()).removeTask(request.getFromTaskIndex());
        manager.getTaskGroup(request.getToGroupIndex()).addTaskTo(temptask, request.getToTaskIndex());
        
        //saveManager(manager); // Save after update
        return ResponseEntity.ok("Tasks order updated successfully");
    }

    @PostMapping("/update-groups-order")
    public ResponseEntity<String> updateGroupsOrder(@RequestBody GroupOrderRequest request) {
        TaskGroup tempGroup = manager.popTaskGroup(request.getFromIndex());
        manager.addTaskGroupTo(tempGroup, request.getToIndex());
        
        //saveManager(manager); // Save after update
        return ResponseEntity.ok("Groups order updated successfully");
    }

    @PostMapping("/update-task")
    public ResponseEntity<String> updateTask(@RequestBody TaskUpdateRequest request) {
        return ResponseEntity.ok("Task updated successfully");
    }
    @PostMapping("/delete-task")
    public ResponseEntity<String> deleteTask(@RequestBody TaskDeleteRequest request) {
        return ResponseEntity.ok("Task deleted successfully");
    }
    @PostMapping("/add-group")
    public ResponseEntity<String> addGroup(@RequestBody AddGroupRequest request) {
        return ResponseEntity.ok("Group added successfully"); //ACTUALLY NEEDS TO SEND A NEW GROUP OBJECT AS RESPONSE
    }
    @PostMapping("/delete-group")
    public ResponseEntity<String> deleteGroup(@RequestBody DeleteGroupRequest request) {
        return ResponseEntity.ok("Group deleted successfully");
    }
    @PostMapping("/edit-group-title")
    public ResponseEntity<String> editGroupTitle(@RequestBody EditGroupTitleRequest request) {
        return ResponseEntity.ok("Group title updated successfully");
    }
    @PostMapping("/add-task")
    public ResponseEntity<String> addTask(@RequestBody AddTaskRequest request) {
        return ResponseEntity.ok("Task added successfully"); //ACTUALLY NEEDS TO SEND A NEW TASK OBJECT AS RESPONSE
    }

}
