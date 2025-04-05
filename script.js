const currentDate = document.querySelector(".current-date .month-name");
const daysContainer = document.querySelector(".calendar .days");
const prevBtn = document.querySelector(".prev-btn");
const nextBtn = document.querySelector(".next-btn");
const monthInfo = document.querySelector(".month-info");

let date = new Date();
let currentMonth = date.getMonth();
let currentYear = date.getFullYear();

const months = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

// Month-specific information
const monthDetails = {
  0: {
    about: "January is the first month of the year, marking the start of new beginnings.",
    events: [
      "January 1: New Year's Day",
      "January 14: Maghe Sankranti (Nepal)"
    ]
  },
  1: {
    about: "February is the shortest month of the year and often associated with love.",
    events: [
      "February 14: Valentine's Day",
      "February 19: Democracy Day (Nepal)"
    ]
  },
  2: {
    about: "March marks the arrival of spring and is a time of renewal.",
    events: [
      "March 8: International Women's Day",
      "March 29: Holi (Festival of Colors in Nepal)"
    ]
  },
  3: {
    about: "April is known for its pleasant spring weather and renewal.",
    events: [
      "April 14: Nepali New Year (Bikram Sambat 2082)",
      "April 22: Earth Day",
      "April 25: Anniversary of the 2015 Nepal Earthquake"
    ]
  },
  9: {
    about: "October is a festive month in Nepal, celebrated with Dashain and Tihar.",
    events: [
      "October 20: Dashain (Vijaya Dashami)",
      "October 28: Tihar (Festival of Lights)"
    ]
  },
  11: {
    about: "December marks the end of the year and is celebrated with Christmas.",
    events: [
      "December 25: Christmas Day",
      "December 31: New Year's Eve"
    ]
  }
};

// Function to render the calendar
function renderCalendar() {
  const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();
  const lastDateOfMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
  const lastDayOfMonth = new Date(currentYear, currentMonth, lastDateOfMonth).getDay();
  const lastDateOfPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

  let days = "";

  // Add previous month's days
  for (let i = firstDayOfMonth; i > 0; i--) {
    days += `<li class="inactive">${lastDateOfPrevMonth - i + 1}</li>`;
  }

  // Add current month's days
  for (let i = 1; i <= lastDateOfMonth; i++) {
    const isToday =
      i === date.getDate() &&
      currentMonth === date.getMonth() &&
      currentYear === date.getFullYear()
        ? "active"
        : "";
    days += `<li class="${isToday}">${i}</li>`;
  }

  // Add next month's days
  for (let i = 1; i < 7 - lastDayOfMonth; i++) {
    days += `<li class="inactive">${i}</li>`;
  }

  // Update the calendar
  currentDate.textContent = `${months[currentMonth]} ${currentYear}`;
  daysContainer.innerHTML = days;

  // Update month information
  const details = monthDetails[currentMonth] || {
    about: "No information available for this month.",
    events: []
  };
  monthInfo.innerHTML = `
    <h3>About ${months[currentMonth]} ${currentYear}</h3>
    <p>${details.about}</p>
    <h4>Special Events in Nepal:</h4>
    <ul>
      ${details.events.map(event => `<li>${event}</li>`).join("")}
    </ul>
  `;
}

// Event listeners for navigation buttons
prevBtn.addEventListener("click", () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar();
});

nextBtn.addEventListener("click", () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar();
});

// Initial render
renderCalendar();