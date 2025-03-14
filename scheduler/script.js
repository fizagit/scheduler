// Function to handle RSVP
function rsvp(eventName) {
    let rsvps = JSON.parse(localStorage.getItem("rsvps")) || [];
    
    if (!rsvps.includes(eventName)) {
        rsvps.push(eventName);
        localStorage.setItem("rsvps", JSON.stringify(rsvps));
        alert("RSVP Confirmed for " + eventName);
        displayRsvps();
    } else {
        alert("You have already RSVP'd for this event.");
    }
}

// Function to display saved RSVPs
function displayRsvps() {
    let rsvps = JSON.parse(localStorage.getItem("rsvps")) || [];
    let rsvpList = document.getElementById("rsvp-list");
    rsvpList.innerHTML = "";
    
    rsvps.forEach(event => {
        let li = document.createElement("li");
        li.textContent = event;
        rsvpList.appendChild(li);
    });
}

// Load RSVPs on page load
document.addEventListener("DOMContentLoaded", displayRsvps);
// Dark Mode Toggle
const darkModeToggle = document.getElementById("dark-mode-toggle");
darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const mode = document.body.classList.contains("dark-mode") ? "dark" : "light";
    localStorage.setItem("mode", mode); // Save user preference
});

// Load dark mode preference
window.onload = () => {
    if (localStorage.getItem("mode") === "dark") {
        document.body.classList.add("dark-mode");
    }
};
document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("event-form");
    const eventList = document.getElementById("event-list");

    // Load saved events
    const events = JSON.parse(localStorage.getItem("events")) || [];

    function displayEvents() {
        eventList.innerHTML = "";
        events.forEach((event, index) => {
            const li = document.createElement("li");
            li.classList.add("event-item");
            li.innerHTML = `<strong>${event.name}</strong> - ${event.time} 
                            <button onclick="deleteEvent(${index})">❌</button>`;
            eventList.appendChild(li);
        });
    }

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const eventName = document.getElementById("event-name").value;
        const eventTime = document.getElementById("event-time").value;

        if (eventName && eventTime) {
            events.push({ name: eventName, time: eventTime });
            localStorage.setItem("events", JSON.stringify(events));
            displayEvents();
            form.reset();
        }
    });

    window.deleteEvent = function (index) {
        events.splice(index, 1);
        localStorage.setItem("events", JSON.stringify(events));
        displayEvents();
    };

    displayEvents();
});
document.getElementById("eventForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form refresh

    // Get input values
    let eventName = document.getElementById("eventName").value;
    let eventDate = document.getElementById("eventDate").value;
    let eventTime = document.getElementById("eventTime").value;

    // Check if inputs are empty
    if (!eventName || !eventDate || !eventTime) {
        alert("Please fill all fields!");
        return;
    }

    // Create event item
    let eventItem = document.createElement("li");
    eventItem.innerHTML = `<strong>${eventName}</strong> - ${eventDate} at ${eventTime} 
                           <button onclick="deleteEvent(this)">Delete</button>`;

    // Add to event list
    document.getElementById("eventList").appendChild(eventItem);

    // Clear input fields
    document.getElementById("eventForm").reset();
});

// Function to delete event
function deleteEvent(button) {
    button.parentElement.remove();
}
