import { updateTaskDetails, deleteTask, deleteGroup, editGroupTitle, addTask } from './api.js';
import { showToast } from './notifications.js';

// Helper function to convert date object to string for input field
function dateObjectToString(dateObj) {
  if (!dateObj || !dateObj.year || !dateObj.month || !dateObj.day) {
    return '';
  }
  const year = dateObj.year;
  const month = String(dateObj.month).padStart(2, '0');
  const day = String(dateObj.day).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

// Helper function to convert date string to object for backend
function stringToDateObject(dateString) {
  if (!dateString) {
    return null;
  }
  const [year, month, day] = dateString.split('-').map(Number);
  return {
    year: year,
    month: month,
    day: day
  };
}

// Helper function to format date for display
function formatDateForDisplay(dateObj) {
  if (!dateObj || !dateObj.year || !dateObj.month || !dateObj.day) {
    return 'Not set';
  }
  return `${dateObj.day}/${dateObj.month}/${dateObj.year}`;
}

// Creates one group element with title and tasks
export function createGroupElement(group) {
  const groupDiv = document.createElement("div");
  groupDiv.className = "group";

  const titleDiv = createGroupTitle(group.groupName);
  groupDiv.appendChild(titleDiv);

  const tasksContainer = createTasksContainer(group.tasksList);
  groupDiv.appendChild(tasksContainer);

  // Add group action buttons (add task, edit, delete)
  const groupActions = createGroupActions(groupDiv);
  groupDiv.appendChild(groupActions);

  return groupDiv;
}

// Creates the title part of a group
function createGroupTitle(groupName) {
  const titleDiv = document.createElement("div");
  titleDiv.className = "group-title";
  titleDiv.textContent = groupName;
  return titleDiv;
}

// Creates the container that holds all tasks in a group
function createTasksContainer(tasks) {
  const tasksContainer = document.createElement("div");
  tasksContainer.className = "tasks-container";

  tasks.forEach((task, index) => {
    const taskElement = createTaskElement(task, index);
    tasksContainer.appendChild(taskElement);
  });

  return tasksContainer;
}

// Creates group action buttons (add task, edit title, delete group)
function createGroupActions(groupDiv) {
  const actionsDiv = document.createElement("div");
  actionsDiv.className = "group-actions";

  // Add task button
  const addTaskBtn = document.createElement("button");
  addTaskBtn.className = "add-task-btn";
  addTaskBtn.textContent = "+ Add Task";
  addTaskBtn.onclick = () => openAddTaskModal(groupDiv);

  // Edit group button
  const editGroupBtn = document.createElement("button");
  editGroupBtn.className = "edit-group-btn";
  editGroupBtn.textContent = "Edit Title";
  editGroupBtn.onclick = () => openEditGroupModal(groupDiv);

  // Delete group button
  const deleteGroupBtn = document.createElement("button");
  deleteGroupBtn.className = "delete-group-btn";
  deleteGroupBtn.textContent = "Delete Group";
  deleteGroupBtn.onclick = () => handleDeleteGroup(groupDiv);

  actionsDiv.appendChild(addTaskBtn);
  actionsDiv.appendChild(editGroupBtn);
  actionsDiv.appendChild(deleteGroupBtn);

  return actionsDiv;
}

// Opens modal to add a new task
function openAddTaskModal(groupDiv) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";

  modal.innerHTML = `
    <div class="modal-content">
      <h2>Add New Task</h2>
      <form id="add-task-form">
        <div class="form-group">
          <label>Title:</label>
          <input type="text" id="add-task-title" required>
        </div>
        <div class="form-group">
          <label>Description:</label>
          <textarea id="add-task-description"></textarea>
        </div>
        <div class="form-group">
          <label>Due Date:</label>
          <input type="date" id="add-task-dueDate">
        </div>
        <div class="form-group">
          <label>Priority (1=High, 2=Normal, 3=Low):</label>
          <input type="number" id="add-task-priority" min="1" max="3" value="2" required>
        </div>
        <div class="modal-buttons">
          <button type="submit" class="confirm-btn">Add Task</button>
          <button type="button" class="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  const form = modal.querySelector("#add-task-form");
  form.onsubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      title: document.getElementById("add-task-title").value,
      description: document.getElementById("add-task-description").value,
      dueDate: stringToDateObject(document.getElementById("add-task-dueDate").value),
      priority: parseInt(document.getElementById("add-task-priority").value)
    };

    const groupsContainer = document.getElementById("groups-container");
    const groupIndex = Array.from(groupsContainer.children).indexOf(groupDiv);

    try {
      const addedTask = await addTask(groupIndex, newTask);
      
      // Add task to UI
      const tasksContainer = groupDiv.querySelector('.tasks-container');
      const taskElement = createTaskElement(addedTask, tasksContainer.children.length);
      tasksContainer.appendChild(taskElement);

      document.body.removeChild(modal);
      showToast('Task added successfully', 'success');
    } catch (error) {
      console.error("Failed to add task:", error);
      showToast('Failed to add task', 'error');
    }
  };

  const cancelBtn = modal.querySelector(".cancel-btn");
  cancelBtn.onclick = () => document.body.removeChild(modal);

  modal.onclick = (e) => {
    if (e.target === modal) document.body.removeChild(modal);
  };
}

// Opens modal to edit group title
function openEditGroupModal(groupDiv) {
  const currentTitle = groupDiv.querySelector('.group-title').textContent;
  const modal = document.createElement("div");
  modal.className = "modal-overlay";

  modal.innerHTML = `
    <div class="modal-content">
      <h2>Edit Group Title</h2>
      <form id="edit-group-form">
        <div class="form-group">
          <label>Group Title:</label>
          <input type="text" id="edit-group-title" value="${currentTitle}" required>
        </div>
        <div class="modal-buttons">
          <button type="submit" class="confirm-btn">Save</button>
          <button type="button" class="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  const form = modal.querySelector("#edit-group-form");
  form.onsubmit = async (e) => {
    e.preventDefault();

    const newTitle = document.getElementById("edit-group-title").value;
    const groupsContainer = document.getElementById("groups-container");
    const groupIndex = Array.from(groupsContainer.children).indexOf(groupDiv);

    try {
      await editGroupTitle(groupIndex, newTitle);
      groupDiv.querySelector('.group-title').textContent = newTitle;
      document.body.removeChild(modal);
      showToast('Group title updated', 'success');
    } catch (error) {
      console.error("Failed to edit group title:", error);
      showToast('Failed to edit group title', 'error');
    }
  };

  const cancelBtn = modal.querySelector(".cancel-btn");
  cancelBtn.onclick = () => document.body.removeChild(modal);

  modal.onclick = (e) => {
    if (e.target === modal) document.body.removeChild(modal);
  };
}

// Handles deleting a group
async function handleDeleteGroup(groupDiv) {
  const groupTitle = groupDiv.querySelector('.group-title').textContent;
  
  // Simple confirmation using native dialog
  const confirmed = confirm(`Are you sure you want to delete the group "${groupTitle}"?`);
  if (!confirmed) return;

  const groupsContainer = document.getElementById("groups-container");
  const groupIndex = Array.from(groupsContainer.children).indexOf(groupDiv);

  try {
    await deleteGroup(groupIndex);
    groupDiv.remove();
    showToast('Group deleted successfully', 'success');
  } catch (error) {
    console.error("Failed to delete group:", error);
    showToast('Failed to delete group', 'error');
  }
}

// Helper function to get priority display
function getPriorityDisplay(priority) {
  const priorityMap = {
    'High': 1,
    'Normal': 2,
    'Low': 3,
    1: 1,
    2: 2,
    3: 3
  };
  return priorityMap[priority] || 2;
}

// Creates one individual task
function createTaskElement(task, index) {
  const taskDiv = document.createElement("div");
  taskDiv.className = "task";
  
  const taskHeader = document.createElement("div");
  taskHeader.className = "task-header";
  
  const priorityBadge = document.createElement("span");
  priorityBadge.className = "priority-badge";
  const priorityNum = getPriorityDisplay(task.priority);
  priorityBadge.textContent = priorityNum;
  priorityBadge.setAttribute('data-priority', priorityNum);
  
  const taskTitle = document.createElement("span");
  taskTitle.className = "task-title";
  taskTitle.textContent = task.title || `Task ${index + 1}`;
  
  taskHeader.appendChild(priorityBadge);
  taskHeader.appendChild(taskTitle);
  taskDiv.appendChild(taskHeader);

  const detailsDiv = createTaskDetails(task);
  taskDiv.appendChild(detailsDiv);

  const buttonContainer = document.createElement("div");
  buttonContainer.className = "task-buttons";
  buttonContainer.style.display = "none";
  
  const editBtn = document.createElement("button");
  editBtn.className = "edit-btn";
  editBtn.textContent = "Edit";
  editBtn.onclick = (e) => {
    e.stopPropagation();
    openEditModal(task, taskDiv);
  };
  
  const removeBtn = document.createElement("button");
  removeBtn.className = "remove-btn";
  removeBtn.textContent = "Remove";
  removeBtn.onclick = (e) => {
    e.stopPropagation();
    removeTask(task, taskDiv);
  };
  
  const minimizeBtn = document.createElement("button");
  minimizeBtn.className = "minimize-btn";
  minimizeBtn.textContent = "Minimize";
  minimizeBtn.onclick = (e) => {
    e.stopPropagation();
    detailsDiv.style.display = "none";
    buttonContainer.style.display = "none";
    taskDiv.classList.remove("expanded");
  };
  
  buttonContainer.appendChild(editBtn);
  buttonContainer.appendChild(removeBtn);
  buttonContainer.appendChild(minimizeBtn);
  taskDiv.appendChild(buttonContainer);

  setupTaskClickHandlers(taskDiv, detailsDiv, buttonContainer);

  return taskDiv;
}

// Creates the hidden details section of a task
function createTaskDetails(task) {
  const detailsDiv = document.createElement("div");
  detailsDiv.className = "task-details";
  detailsDiv.style.display = "none";
  
  const priorityDisplay = {
    1: 'High',
    2: 'Normal',
    3: 'Low',
    'High': 'High',
    'Normal': 'Normal',
    'Low': 'Low'
  };
  
  detailsDiv.innerHTML = `
    <div><strong>Description:</strong> ${task.description || 'No description'}</div>
    <div><strong>Due:</strong> ${formatDateForDisplay(task.dueDate)}</div>
    <div><strong>Priority:</strong> ${priorityDisplay[task.priority] || 'Normal'}</div>
  `;
  return detailsDiv;
}

// Makes tasks clickable to expand/collapse
function setupTaskClickHandlers(taskDiv, detailsDiv, buttonContainer) {
  taskDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("minimize-btn") || 
        e.target.classList.contains("edit-btn") || 
        e.target.classList.contains("remove-btn") ||
        e.target.classList.contains("priority-badge")) return;
    
    const isExpanded = taskDiv.classList.contains("expanded");
    
    if (isExpanded) {
      detailsDiv.style.display = "none";
      buttonContainer.style.display = "none";
      taskDiv.classList.remove("expanded");
    } else {
      detailsDiv.style.display = "block";
      buttonContainer.style.display = "flex";
      taskDiv.classList.add("expanded");
    }
  });
}

// Opens edit modal for a task
function openEditModal(task, taskDiv) {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";
  
  const priorityValue = getPriorityDisplay(task.priority);
  const dateValue = dateObjectToString(task.dueDate);
  
  modal.innerHTML = `
    <div class="modal-content">
      <h2>Edit Task</h2>
      <form id="edit-task-form">
        <div class="form-group">
          <label>Title:</label>
          <input type="text" id="edit-title" value="${task.title || ''}" required>
        </div>
        <div class="form-group">
          <label>Description:</label>
          <textarea id="edit-description">${task.description || ''}</textarea>
        </div>
        <div class="form-group">
          <label>Due Date:</label>
          <input type="date" id="edit-dueDate" value="${dateValue}">
        </div>
        <div class="form-group">
          <label>Priority (1=High, 2=Normal, 3=Low):</label>
          <input type="number" id="edit-priority" min="1" max="3" value="${priorityValue}" required>
        </div>
        <div class="modal-buttons">
          <button type="submit" class="confirm-btn">Confirm</button>
          <button type="button" class="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  `;
  
  document.body.appendChild(modal);
  
  const form = modal.querySelector("#edit-task-form");
  form.onsubmit = async (e) => {
    e.preventDefault();
    
    const updatedTask = {
      ...task,
      title: document.getElementById("edit-title").value,
      description: document.getElementById("edit-description").value,
      dueDate: stringToDateObject(document.getElementById("edit-dueDate").value),
      priority: parseInt(document.getElementById("edit-priority").value)
    };
    
    const groupsContainer = document.getElementById("groups-container");
    const groupDiv = taskDiv.closest(".group");
    const groupIndex = Array.from(groupsContainer.children).indexOf(groupDiv);
    const taskIndex = Array.from(groupDiv.querySelector(".tasks-container").children).indexOf(taskDiv);
    
    try {
      await updateTaskDetails(updatedTask, groupIndex, taskIndex);
      
      taskDiv.querySelector(".task-title").textContent = updatedTask.title;
      
      const priorityBadge = taskDiv.querySelector(".priority-badge");
      const priorityNum = getPriorityDisplay(updatedTask.priority);
      priorityBadge.textContent = priorityNum;
      priorityBadge.setAttribute('data-priority', priorityNum);
      
      const priorityDisplay = {1: 'High', 2: 'Normal', 3: 'Low'};
      const detailsDiv = taskDiv.querySelector(".task-details");
      detailsDiv.innerHTML = `
        <div><strong>Description:</strong> ${updatedTask.description || 'No description'}</div>
        <div><strong>Due:</strong> ${formatDateForDisplay(updatedTask.dueDate)}</div>
        <div><strong>Priority:</strong> ${priorityDisplay[updatedTask.priority] || 'Normal'}</div>
      `;
      
      document.body.removeChild(modal);
      
    } catch (error) {
      console.error("Failed to update task:", error);
      showToast('Failed to update task', 'error');
    }
  };
  
  const cancelBtn = modal.querySelector(".cancel-btn");
  cancelBtn.onclick = () => document.body.removeChild(modal);

  modal.onclick = (e) => {
    if (e.target === modal) document.body.removeChild(modal);
  };
}

// Removes a task
async function removeTask(task, taskDiv) {
  const groupsContainer = document.getElementById("groups-container");
  const groupDiv = taskDiv.closest(".group");
  const groupIndex = Array.from(groupsContainer.children).indexOf(groupDiv);
  const taskIndex = Array.from(groupDiv.querySelector(".tasks-container").children).indexOf(taskDiv);
  
  try {
    await deleteTask(groupIndex, taskIndex);
    taskDiv.remove();
  } catch (error) {
    console.error("Failed to delete task:", error);
    showToast('Failed to delete task', 'error');
  }
}