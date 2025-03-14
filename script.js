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
