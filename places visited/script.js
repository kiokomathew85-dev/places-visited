// --- BUSINESS LOGIC ---
function TravelLog() {
    this.destinations = {};
    this.currentId = 0;
}

// Prototype method to add a destination
TravelLog.prototype.addDestination = function(place) {
    place.id = ++this.currentId;
    this.destinations[place.id] = place;
};

// Prototype method to delete a destination
TravelLog.prototype.deleteDestination = function(id) {
    delete this.destinations[id];
};

// Constructor for the Place object
function Place(location, landmarks, time, notes) {
    this.location = location;
    this.landmarks = landmarks;
    this.time = time;
    this.notes = notes;
}

// --- UI LOGIC ---
let myLog = new TravelLog();

function displayList() {
    const output = document.getElementById("display-area");
    output.innerHTML = "";

    Object.keys(myLog.destinations).forEach(id => {
        const item = myLog.destinations[id];
        const card = document.createElement("div");
        card.className = "card";
        
        card.innerHTML = `
            <h3 onclick="toggle(${item.id})">📍 ${item.location}</h3>
            <p class="hint">Click location name for details</p>
            <button class="delete-btn" onclick="handleDelete(${item.id})">Delete</button>
            <div id="info-${item.id}" class="details">
                <p><strong>🏛 Landmarks:</strong> ${item.landmarks}</p>
                <p><strong>📅 Best Time:</strong> ${item.time}</p>
                <p><strong>📝 Memories:</strong> ${item.notes || 'No notes added.'}</p>
            </div>
        `;
        output.appendChild(card);
    });
}

function toggle(id) {
    const box = document.getElementById("info-" + id);
    box.classList.toggle("active");
}

function handleDelete(id) {
    if (confirm("Delete this destination?")) {
        myLog.deleteDestination(id);
        displayList();
    }
}

// Initialize when page loads
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("travel-form");
    
    form.addEventListener("submit", (e) => {
        e.preventDefault(); // Stop page refresh
        
        const newPlace = new Place(
            document.getElementById("loc").value,
            document.getElementById("land").value,
            document.getElementById("time").value,
            document.getElementById("notes").value
        );

        myLog.addDestination(newPlace);
        displayList();
        form.reset();
    });
});
