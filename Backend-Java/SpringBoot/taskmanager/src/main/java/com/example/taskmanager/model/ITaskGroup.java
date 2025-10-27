package com.example.taskmanager.model;

import java.util.List;

/**
 * Interface representing a group of tasks, providing methods for
 * cloning, adding, accessing, removing, sorting tasks, and managing group name.
 */
public interface ITaskGroup {

    /**
     * Creates and returns a deep copy of this task group.
     * @return a cloned ITaskGroup instance
     */
    ITaskGroup cloneTaskGroup();

    /**
     * Adds a task to the group.
     * @param task the Task to add
     */
    void addTask(Task task);

    



    void addTaskTo(Task task, int index);


    /**
     * Gets the task at the specified index.
     * @param index the index of the task
     * @return the Task at the given index
     * @throws IndexOutOfBoundsException if the index is invalid
     */
    Task getTask(int index) throws IndexOutOfBoundsException;

    /**
     * Removes the task at the specified index.
     * If the index is invalid, implementation will round or remove the last task.
     * @param index the index of the task to remove
     */
    void removeTask(int index);

    /**
     * Removes and returns the task at the specified index.
     * If the index is invalid, implementation will throw an exception.
     * @param index the index of the task to pop
     * @return the removed Task
     */
    Task popTask(int index) throws IndexOutOfBoundsException;


    /**
     * Sorts the tasks in the group by their names.
     */
    void sortByName();

    /**
     * Sorts the tasks in the group by their priority values.
     */
    void sortByPriority();

    /**
     * Sorts the tasks in the group by their due dates.
     */
    void sortByDueDate();

    /**
     * Gets the name of the task group.
     * @return the group name
     */
    String getGroupName();

    /**
     * Sets the name of the task group.
     * @param groupName the new name for the group
     */
    void setGroupName(String groupName);

    List<Task> getTasksList();

}