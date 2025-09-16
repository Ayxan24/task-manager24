package com.example.taskmanager.model;

import java.util.List;

/**
 * Interface for managing groups of tasks.
 */
public interface IManager {

    /**
     * Adds a new TaskGroup to the manager.
     * @param taskGroup the TaskGroup to add
     */
    void addTaskGroup(TaskGroup taskGroup);

    
    /**
     * Retrieves all TaskGroups managed.
     * @return a list of all TaskGroups
     */
    List<TaskGroup> getAllTaskGroups();



    /**
     * Removes the TaskGroup at the specified index.
     * If the index is invalid, implementation will round or remove last task.
     * @param index the index of the TaskGroup to remove
     */
    void removeTaskGroup(int index);

    /**
     * Pops the TaskGroup at the specified index.
     * If the index is invalid, implementation will throw an exception.
     * @param index the index of the TaskGroup to pop
     * @return the removed TaskGroup
     */
    ITaskGroup popTaskGroup(int index) throws IndexOutOfBoundsException;

    /**
     * Gets the TaskGroup at the specified index.
     * @param index the index of the TaskGroup
     * @return the TaskGroup at the given index
     * @throws IndexOutOfBoundsException if the index is invalid
     */
    ITaskGroup getTaskGroup(int index) throws IndexOutOfBoundsException;

    /**
     * Returns the number of TaskGroups managed.
     * @return the number of TaskGroups
     */
    int getNumberOfTaskGroups();

    /**
     * Gets the manager's name.
     * @return the manager's name
     */
    String getManagerName();

    /**
     * Sets the manager's name.
     * @param managerName the new name for the manager
     */
    void setManagerName(String managerName);


}