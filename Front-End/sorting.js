import Sortable from "../node_modules/sortablejs/modular/sortable.complete.esm.js";
import { updateTaskOrder, updateGroupOrder } from './api.js';
import { showToast } from './notifications.js';

// Makes tasks draggable between groups
export function initializeTaskSorting(tasksContainer, groupsContainer) {
  new Sortable(tasksContainer, {
    group: "shared",
    animation: 150,
    onEnd: (evt) => handleTaskMove(evt, groupsContainer)
  });
}

// Makes entire groups draggable (reorder groups)
export function initializeGroupSorting(container) {
  new Sortable(container, {
    animation: 200,
    handle: ".group-title",
    draggable: ".group",
    onEnd: (evt) => handleGroupMove(evt, container)
  });
}

// Handles when a task is moved
async function handleTaskMove(evt, groupsContainer) {
  const moveData = extractTaskMoveData(evt, groupsContainer);
  logTaskMove(moveData);
  
  try {
    await updateTaskOrder(moveData);
  } catch (error) {
    showToast('Failed to update task order', 'error');
  }
}

// Handles when a group is moved
async function handleGroupMove(evt, container) {
  const moveData = extractGroupMoveData(evt, container);
  logGroupMove(moveData);
  
  try {
    await updateGroupOrder(moveData);
  } catch (error) {
    showToast('Failed to update group order', 'error');
  }
}

// Extracts data when a task is moved
function extractTaskMoveData(evt, groupsContainer) {
  const fromGroupIndex = Array.from(groupsContainer.children).indexOf(evt.from.parentElement);
  const toGroupIndex = Array.from(groupsContainer.children).indexOf(evt.to.parentElement);
  
  // Get only the title text from the .task-title element
  const movedTask = evt.item.querySelector('.task-title').textContent.trim();
  
  // Get all task titles in destination group (not the entire header)
  const destinationTasks = Array.from(evt.to.children).map(
    el => el.querySelector('.task-title').textContent.trim()
  );

  return {
    fromGroupIndex,
    toGroupIndex,
    fromTaskIndex: evt.oldIndex,
    toTaskIndex: evt.newIndex,
    movedTask,
    tasks: destinationTasks
  };
}

// Extracts data when a group is moved
function extractGroupMoveData(evt, container) {
  const groupOrder = Array.from(container.children).map(
    groupEl => groupEl.querySelector('.group-title').textContent
  );

  return {
    groups: groupOrder,
    fromIndex: evt.oldIndex,
    toIndex: evt.newIndex
  };
}

// Logs task movement details (brief)
function logTaskMove(moveData) {
  const { fromGroupIndex, toGroupIndex, movedTask } = moveData;
  console.log(`Task "${movedTask}": group ${fromGroupIndex} → ${toGroupIndex}`);
}

// Logs group movement details (brief)
function logGroupMove(moveData) {
  const { fromIndex, toIndex } = moveData;
  console.log(`Group: ${fromIndex} → ${toIndex}`);
}