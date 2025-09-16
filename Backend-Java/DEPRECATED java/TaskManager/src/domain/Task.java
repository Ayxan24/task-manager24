package domain;

public class Task implements ITask {
    private String title;
    private String description;
    private boolean isCompleted;
    private Date dueDate;
    private int priority;
    
    public Task() {
        this("EMPTY TASK", "EMPTY DESCRIPTION", false, new Date(), 0); // Assign sensible defaults
    }

    public Task(String title, String description, boolean isCompleted, Date dueDate, int priority) {
        this.title = title;
        this.description = description;
        this.isCompleted = isCompleted;
        this.dueDate= new Date(dueDate);
        this.priority = priority;
    }




    @Override
    public String getTitle() {
        return title;
    }
    @Override
    public void setTitle(String title) {
        this.title = title;
    }
    @Override
    public String getDescription(){
        return description;
    }
    @Override
    public void setDescription(String description){
        this.description = description;
    }
    @Override
    public boolean isCompleted() {
        return isCompleted;
    }
    @Override
    public void setCompleted(boolean isCompleted) {
        this.isCompleted = isCompleted;
    }
    @Override
    public Date getDueDate() {
        return dueDate;
    }
    @Override
    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }
    @Override
    public int getPriority() {
        return priority;
    }
    @Override
    public void setPriority(int priority) {
        this.priority = priority;
    }
    public String toString() {
        return "Task [title=" + title + ", description=" + description + ", isCompleted=" + isCompleted + ", dueDate="
                + dueDate + ", priority=" + priority + "]";
    }

}
