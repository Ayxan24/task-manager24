package com.example.taskmanager.controller;

import java.util.List;
import java.util.ArrayList;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.taskmanager.model.*;



@RestController

public class ManagerController {

    private final Manager manager = new Manager();

    public ManagerController() {
        // some demo data for now
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

    @GetMapping("api/manager")
    public Manager getManager() {
        return manager;
    }

    @GetMapping("api/groups")
    public List<TaskGroup> getTaskGroups() {
        return manager.getAllTaskGroups();
    }

    
}
