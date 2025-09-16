// Import Sortable from node_modules
import Sortable from "./node_modules/sortablejs/modular/sortable.complete.esm.js";

function logOrder(groupId) {
    const items = Array.from(document.getElementById(groupId).children);
    const order = items.map(item => item.textContent.trim());
    const logDiv = document.getElementById("log");
    if (logDiv) {
        logDiv.innerHTML = `<div>Order in ${groupId}: [${order.join(", ")}]</div>`;
    }
}

new Sortable(document.getElementById("group1"), {
    swap: true,
    swapClass: "highlight",
    group: "shared",
    animation: 150,
    onEnd: function () {
        logOrder("group1");
        logOrder("group2");
    }
});

new Sortable(document.getElementById("group2"), {
    group: "shared",
    animation: 150,
    onEnd: function () {
        logOrder("group1");
        logOrder("group2");
    }
});

let groupCount = 2; // Start from 2 since group1 and group2 exist

document.getElementById("add-group").addEventListener("click", function () {
    groupCount++;
    const groupId = `group${groupCount}`;

    // Create group container
    const groupDiv = document.createElement("div");
    groupDiv.className = "group-container";
    groupDiv.innerHTML = `
        <h3>New Group</h3>
        <ul id="${groupId}" class="task-list">
            <li class="task-item">Task 1</li>
            <li class="task-item">Task 2</li>
        </ul>
    `;

    // Insert before the log div if it exists, otherwise append to body
    const logDiv = document.getElementById("log");
    if (logDiv) {
        logDiv.parentNode.insertBefore(groupDiv, logDiv);
    } else {
        document.body.appendChild(groupDiv);
    }

    // Make the new group sortable
    new Sortable(document.getElementById(groupId), {
        group: "shared",
        animation: 150,
        onEnd: function () {
            logOrder(groupId);
        }
    });
});


