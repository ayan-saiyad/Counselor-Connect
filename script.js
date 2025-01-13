// script.js

// Sample counselor data in array
const counselors = [
    {
        name: "Jane Doe",
            rating: 95, // as a percentage
            experience: "5 years",
            sessions: [
                { duration: "30 mins", price: 30 },
                { duration: "1 hour", price: 45 },
                { duration: "2 hours", price: 75 },
            ],
    },
    {
        name: "John Smith",
        rating: 88,
        experience: "3 years",
        sessions: [
            { duration: "30 mins", price: 30 },
            { duration: "1 hour", price: 45 },
            { duration: "2 hours", price: 75 },
        ],
    },
    {
        name: "Emily Johnson",
        rating: 92,
        experience: "4 years",
        sessions: [
            { duration: "30 mins", price: 30 },
            { duration: "1 hour", price: 45 },
            { duration: "2 hours", price: 75 },
        ],
    },
];


// A function to create counselor cards
function renderCounselors() {
    const container = document.getElementById("counselors-container");

    // Clear container first (if we want to re-render or update)
    container.innerHTML = "";

    counselors.forEach((counselor, index) => {
      // Create a div for the card
        const card = document.createElement("div");
        card.classList.add("counselor-card");

      // Card content
        card.innerHTML = `
            <h3>${counselor.name}</h3>
            <p>Rating: ${counselor.rating}%</p>
            <p>Experience: ${counselor.experience}</p>
            <label for="session-select-${index}">Session:</label>
            <select id="session-select-${index}">
                ${counselor.sessions
                    .map((session) => {
                        return `
                            <option value="${session.duration}" data-price="${session.price}">
                            ${session.duration} - $${session.price}
                            </option>
                        `;
                    })
                .join("")}
            </select>
            <button data-index="${index}" class="book-now-btn">Book Now</button>
        `;

      // Append the card to the container
        container.appendChild(card);
    });
}


function setupBookNowButtons() {
    // Get all "Book Now" buttons
    const bookNowButtons = document.querySelectorAll(".book-now-btn");
    bookNowButtons.forEach((btn) => {
        btn.addEventListener("click", (e) => {
            const counselorIndex = e.target.getAttribute("data-index");
            const selectedCounselor = counselors[counselorIndex];
            
           // Get the session duration from the select menu
            const select = document.getElementById(`session-select-${counselorIndex}`);
            const sessionValue = select.value;
            const sessionPrice = select.options[select.selectedIndex].dataset.price;
            
            // Populate modal info
            const modalCounselorInfo = document.getElementById("modal-counselor-info");
            modalCounselorInfo.textContent = `
                You are booking ${selectedCounselor.name} for a ${sessionValue} session at $${sessionPrice}.
            `;
            
            // Show modal
            const bookingModal = document.getElementById("booking-modal");
            bookingModal.style.display = "flex";
        });
    });
}