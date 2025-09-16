package com.example.taskmanager.model;

/**
 * Interface representing a task with a title, description, completion status,
 * due date, and priority.
 */
public interface ITask {

    /**
     * Gets the title of the task.
     * @return the task title
     */
    String getTitle();

    /**
     * Sets the title of the task.
     * @param title the new title for the task
     */
    void setTitle(String title);

    /**
     * Gets the description of the task.
     * @return the task description
     */
    String getDescription();

    /**
     * Sets the description of the task.
     * @param description the new description for the task
     */
    void setDescription(String description);

    /**
     * Checks if the task is completed.
     * @return true if completed, false otherwise
     */
    boolean isCompleted();

    /**
     * Sets the completion status of the task.
     * @param isCompleted true if completed, false otherwise
     */
    void setCompleted(boolean isCompleted);

    /**
     * Gets the due date of the task.
     * @return the due date
     */
    Date getDueDate();

    /**
     * Sets the due date of the task.
     * @param dueDate the new due date
     */
    void setDueDate(Date dueDate);

    /**
     * Gets the priority of the task.
     * @return the priority value
     */
    int getPriority();

    /**
     * Sets the priority of the task.
     * @param priority the new priority value
     */
    void setPriority(int priority);

}