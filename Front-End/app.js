import { fetchManagerData, saveManagerState, addGroup } from './api.js';
import { createGroupElement } from './ui-renderer.js';
import { initializeTaskSorting, initializeGroupSorting } from './sorting.js';
import { showToast } from './notifications.js';

// Main initialization - runs when page loads
document.addEventListener('DOMContentLoaded', () => {
  loadAndRenderManager();
  initializeSaveButton();
  initializeAddGroupButton();
});

// Load data from backend and render UI
async function loadAndRenderManager() {
  try {
    const manager = await fetchManagerData();
    renderTaskManager(manager);
  } catch (error) {
    console.error("Failed to load task manager:", error);
  }
}

// Builds the entire task manager interface
function renderTaskManager(manager) {
  const container = document.getElementById("groups-container");
  container.innerHTML = "";

  manager.allTaskGroups.forEach((group) => {
    const groupElement = createGroupElement(group);
    container.appendChild(groupElement);
    initializeTaskSorting(groupElement.querySelector('.tasks-container'), container);
  });

  initializeGroupSorting(container);
}

// Initialize the save button
function initializeSaveButton() {
  const saveBtn = document.getElementById('save-btn');
  if (saveBtn) {
    saveBtn.addEventListener('click', handleSave);
  }
}

// Initialize the add group button
function initializeAddGroupButton() {
  const addGroupBtn = document.getElementById('add-group-btn');
  if (addGroupBtn) {
    addGroupBtn.addEventListener('click', openAddGroupModal);
  }
}

// Handle save button click
async function handleSave() {
  const saveBtn = document.getElementById('save-btn');
  
  saveBtn.textContent = 'Saving...';
  saveBtn.classList.add('saving');
  saveBtn.disabled = true;
  
  try {
    await saveManagerState();
    
    saveBtn.textContent = 'Saved!';
    saveBtn.classList.remove('saving');
    saveBtn.classList.add('saved');
    console.log('Manager state saved successfully');
    
  } catch (error) {
    console.error('Failed to save:', error);
    saveBtn.textContent = 'Failed!';
    saveBtn.classList.remove('saving');
    saveBtn.classList.add('failed');
  } finally {
    saveBtn.disabled = false;
  }
}

// Opens modal to add a new group
function openAddGroupModal() {
  const modal = document.createElement("div");
  modal.className = "modal-overlay";

  modal.innerHTML = `
    <div class="modal-content">
      <h2>Add New Group</h2>
      <form id="add-group-form">
        <div class="form-group">
          <label>Group Name:</label>
          <input type="text" id="add-group-name" required>
        </div>
        <div class="modal-buttons">
          <button type="submit" class="confirm-btn">Add Group</button>
          <button type="button" class="cancel-btn">Cancel</button>
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(modal);

  const form = modal.querySelector("#add-group-form");
  form.onsubmit = async (e) => {
    e.preventDefault();

    const groupName = document.getElementById("add-group-name").value;

    try {
      const newGroup = await addGroup(groupName);
      
      // Add group to UI
      const container = document.getElementById("groups-container");
      const groupElement = createGroupElement(newGroup);
      container.appendChild(groupElement);
      
      // Initialize sorting for the new group
      initializeTaskSorting(groupElement.querySelector('.tasks-container'), container);

      document.body.removeChild(modal);
      showToast('Group added successfully', 'success');
    } catch (error) {
      console.error("Failed to add group:", error);
      showToast('Failed to add group', 'error');
    }
  };

  const cancelBtn = modal.querySelector(".cancel-btn");
  cancelBtn.onclick = () => document.body.removeChild(modal);

  modal.onclick = (e) => {
    if (e.target === modal) document.body.removeChild(modal);
  };
}