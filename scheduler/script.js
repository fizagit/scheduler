document.addEventListener("DOMContentLoaded", function() {
    loadEvents();
    loadDarkMode();
});

document.getElementById("event-form").addEventListener("submit", function(e) {
    e.preventDefault();

    let name = document.getElementById("event-name").value;
    let time = document.getElementById("event-time").value;

    if (name && time) {
        let event = { name, time };
        saveEvent(event);
        addEventToUI(event);
    }

    this.reset(); // Clear form after submission
});

// 🔹 Save Events to Local Storage
function saveEvent(event) {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    events.push(event);
    localStorage.setItem("events", JSON.stringify(events));
}

// 🔹 Load Events from Local Storage
function loadEvents() {
    let events = JSON.parse(localStorage.getItem("events")) || [];
    events.forEach(event => addEventToUI(event));
}

// 🔹 Add Event to UI
function addEventToUI(event) {
    let eventItem = document.createElement("li");
    eventItem.textContent = `${event.name} at ${new Date(event.time).toLocaleString()}`;
    document.getElementById("event-list").appendChild(eventItem);
}

// 🔹 Dark Mode Toggle
document.getElementById("dark-mode-toggle").addEventListener("click", function() {
    document.body.classList.toggle("dark-mode");
    localStorage.setItem("darkMode", document.body.classList.contains("dark-mode"));
});

// 🔹 Load Dark Mode Setting
function loadDarkMode() {
    if (localStorage.getItem("darkMode") === "true") {
        document.body.classList.add("dark-mode");
    }
}
