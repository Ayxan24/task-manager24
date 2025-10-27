import { API_BASE_URL } from './config.js';

// Fetch manager data from backend
export async function fetchManagerData() {
  const response = await fetch(`${API_BASE_URL}/manager`);
  if (!response.ok) throw new Error('Failed to fetch manager data');
  return await response.json();
}

// Update task order on backend
export async function updateTaskOrder(orderData) {
  const response = await fetch(`${API_BASE_URL}/update-tasks-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData)
  });
  if (!response.ok) {
    throw new Error("Failed to update task order");
  }
}

// Update group order on backend
export async function updateGroupOrder(orderData) {
  const response = await fetch(`${API_BASE_URL}/update-groups-order`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(orderData)
  });
  if (!response.ok) {
    throw new Error("Failed to update group order");
  }
}

// Save current manager state to database
export async function saveManagerState() {
  const response = await fetch(`${API_BASE_URL}/save`, {
    method: "POST",
    headers: { "Content-Type": "application/json" }
  });
  
  if (!response.ok) {
    throw new Error('Failed to save manager state');
  }
  
  return response;
}

// Update task details
export async function updateTaskDetails(task, groupIndex, taskIndex) {
  const response = await fetch(`${API_BASE_URL}/update-task`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      task: task,
      groupIndex: groupIndex,
      taskIndex: taskIndex
    })
  });
  
  if (!response.ok) {
    throw new Error("Failed to update task");
  }
}

// Delete a task
export async function deleteTask(groupIndex, taskIndex) {
  const response = await fetch(`${API_BASE_URL}/delete-task`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      groupIndex: groupIndex,
      taskIndex: taskIndex
    })
  });
  
  if (!response.ok) {
    throw new Error("Failed to delete task");
  }
}

// Add a new group
export async function addGroup(groupName) {
  const response = await fetch(`${API_BASE_URL}/add-group`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ groupName: groupName })
  });
  
  if (!response.ok) {
    throw new Error("Failed to add group");
  }
  
  return await response.json();
}

// Delete a group
export async function deleteGroup(groupIndex) {
  const response = await fetch(`${API_BASE_URL}/delete-group`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ groupIndex: groupIndex })
  });
  
  if (!response.ok) {
    throw new Error("Failed to delete group");
  }
}

// Edit group title
export async function editGroupTitle(groupIndex, newTitle) {
  const response = await fetch(`${API_BASE_URL}/edit-group-title`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      groupIndex: groupIndex,
      newTitle: newTitle
    })
  });
  
  if (!response.ok) {
    throw new Error("Failed to edit group title");
  }
}

// Add a new task to a group
export async function addTask(groupIndex, task) {
  const response = await fetch(`${API_BASE_URL}/add-task`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      groupIndex: groupIndex,
      task: task
    })
  });
  
  if (!response.ok) {
    throw new Error("Failed to add task");
  }
  
  return await response.json();
}