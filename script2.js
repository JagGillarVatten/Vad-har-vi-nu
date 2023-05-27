const selectElem = document.getElementById("json-select");
const dayHeaderElem = document.getElementById("day-header");
const mapElem = document.getElementById("map");
const progressElem = document.getElementById("progress");
const classNameElem = document.getElementById("class-name");
const timeLeftElem = document.getElementById("time-left");

let data; // Store JSON data
let currentDate; // Store current date

// Fetch JSON data
function fetchData(url) {
  return axios.get(url).then((response) => response.data);
}

// Populate dropdown menu with available JSON files
fetchData("json-files.json").then((jsonData) => {
  const optionsHTML = jsonData
    .map(
      (option, index) =>
        `<option value="${option.file}"${index === 0 ? " selected" : ""}>${
          option.name
        }</option>`
    )
    .join("");
  selectElem.innerHTML = optionsHTML;
  loadJSON(jsonData[0].file);
});

// When a new JSON file is selected from the dropdown menu
selectElem.addEventListener("change", (event) => {
  loadJSON(event.target.value);
});

// Load JSON file and update the webpage accordingly
function loadJSON(filename) {
  fetchData(filename).then((jsonData) => {
    data = jsonData;

    // Update the current date
    currentDate = moment();

    // Update the day header
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const currentDayIndex = parseInt(currentDate.format("d"));
    dayHeaderElem.textContent = `${days[currentDayIndex]} (${currentDate.format(
      "MMMM Do"
    )})`;

    // Filter events based on the current day of the week
    const filteredData = _.filter(data, { day: `${currentDayIndex}` });

    // Sort events by their start time
    filteredData.sort((a, b) => (a.start_time > b.start_time ? 1 : -1));

    // Generate the map
    let mapHTML = "";
    const mapWidth = 1000;
    const mapHeight = 500;
    let totalDuration = 0;
    let currentEvent = null;

    filteredData.forEach((event, index) => {
      const startTime = moment(event.start_time, "HH:mm");
      const endTime = moment(event.end_time, "HH:mm");
      const duration = moment.duration(endTime.diff(startTime)).asMinutes();
      const xPos =
        (mapWidth *
          startTime.diff(moment(startTime).startOf("day"), "minutes")) /
        1440;
      const yPos = (mapHeight / filteredData.length) * index;
      const width = (mapWidth * duration) / 1440;
      const height = mapHeight / filteredData.length;

      mapHTML += `<rect x="${xPos}" y="${yPos}" width="${width}" height="${height}" fill="#AAAAAA"/>`;

      if (currentDate.isBetween(startTime, endTime, null, "[]")) {
        const progressWidth =
          (mapWidth * currentDate.diff(startTime, "minutes")) / duration;
        progressElem.style.width = `${progressWidth}px`;
        progressElem.style.left = `${xPos + progressWidth}px`;
        currentEvent = event;
      }

      totalDuration += duration;
    });

    mapElem.innerHTML = `` + mapHTML + ``;

    // Display information about the current event
    if (currentEvent) {
      classNameElem.textContent = currentEvent.class;
      const endTime = moment(currentEvent.end_time, "HH:mm");
      const timeLeft = moment.duration(endTime.diff(currentDate)).asMinutes();
      if (timeLeft > 1) {
        timeLeftElem.textContent = `${Math.floor(
          timeLeft
        )} minutes left in class`;
      } else if (timeLeft > 0) {
        timeLeftElem.textContent = `Less than a minute left in class`;
      } else {
        timeLeftElem.textContent = `Class is over`;
      }
    } else {
      classNameElem.textContent = "No classes currently in session";
      timeLeftElem.textContent = "";
    }
  });
}
