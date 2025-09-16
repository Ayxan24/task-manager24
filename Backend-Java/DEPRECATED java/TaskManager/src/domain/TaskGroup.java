package domain;

import java.util.ArrayList;
import java.util.List;

public class TaskGroup implements ITaskGroup {
    private List<Task> group ;
    private String groupName ; 



    public TaskGroup(){
        groupName = "New Group";
        group = new ArrayList<>() ;
    }

    @Override
    public ITaskGroup cloneTaskGroup(){
        ITaskGroup clonedGroup = new TaskGroup() ;
        for (ITask task : this.group) {
            Task clonedTask = new Task(task.getTitle(), task.getDescription(), task.isCompleted(), task.getDueDate(), task.getPriority());
            clonedGroup.addTask(clonedTask);
        }
        clonedGroup.setGroupName(groupName);
        return clonedGroup ;
    }

    @Override
    public void addTask(Task task){
        group.add(task) ;
    }
    @SuppressWarnings("unused")
    private List<Task> getGroup(){ // This sould not be used
        return group ;
    }
    @Override
    public ITask getTask(int index) throws IndexOutOfBoundsException {
        if (index < 0 || index >= group.size()) {
            throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + group.size());
        }
        return group.get(index);
    }
    @Override
    public void removeTask(int index) {
        if (group.isEmpty()) return; // Nothing to remove
        if (index < 0 || index >= group.size()) {
            group.remove(group.size() - 1); // Remove last if index is invalid
        } else {
            group.remove(index);
        }
    }
    @Override
    public ITask popTask(int index) throws IndexOutOfBoundsException {
        if (index < 0 || index >= group.size()) {
            throw new IndexOutOfBoundsException("Index: " + index + ", Size: " + group.size());
        }
        return group.remove(index);
    }

    @Override
    public void sortByName(){
        group.sort((task1, task2) -> task1.getTitle().compareToIgnoreCase(task2.getTitle()));
    }
    @Override
    public void sortByPriority(){
        group.sort((task1, task2) -> Integer.compare(task1.getPriority(), task2.getPriority()));
    }
    @Override
    public void sortByDueDate(){
        group.sort((task1, task2) -> task1.getDueDate().compareTo(task2.getDueDate()));
    }
    public String toString(){
        StringBuilder sb= new StringBuilder();
        sb.append("|").append(groupName).append("|\n");
        for (ITask task : group){
            sb.append("|--").append(task.toString()).append("\n");
        }
        sb.append("~~~~~~~~~~~~~~");
        return sb.toString();
    }
    @Override
    public String getGroupName(){
        return groupName;
    }
    @Override
    public void setGroupName(String groupName){
        this.groupName = groupName;
    }



}
