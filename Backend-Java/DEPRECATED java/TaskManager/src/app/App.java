package app;
import domain.*;


public class App {
    public static void main(String[] args) {
        ITaskGroup taskGroup = new TaskGroup();
        taskGroup.addTask(new Task("Task 1", "Description 1", false, new Date(10, 5, 2024), 2));
        taskGroup.addTask(new Task("Task 2", "Description 2", true, new Date(15, 6, 2024), 1));
        taskGroup.setGroupName("My Tasks");
        taskGroup.sortByPriority();
//        taskGroup.removeTask(5);
        System.out.println(taskGroup);

        IManager manager = new Manager();
        manager.addTaskGroup((TaskGroup) taskGroup);
        manager.setManagerName("Alice");
        System.out.println(manager);

        manager.addTaskGroup(new TaskGroup());
        manager.getTaskGroup(1).addTask(new Task("Task 3", "Description 3", false, new Date(20, 7, 2024), 3));
        manager.getTaskGroup(1).setGroupName("Work Tasks");

        System.out.println(manager);
    }
}

