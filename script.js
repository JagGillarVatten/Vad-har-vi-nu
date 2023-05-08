// JavaScript code

let events = [];
let eventDuration = 0;
const eventFiles = [
  {
    name: "9B",
    url: "9B.json",
  },
  {
    name: "9A",
    url: "9A.json",
  },
  {
    name: "9C",
    url: "9C.json",
  },
];

const loadJSON = (callback, url) =>
  fetch(url)
    .then((response) => response.json())
    .then(callback);

const getTodaysEvents = () =>
  events.filter((event) => event.startDay === new Date().getDay());

const getNextEvent = () => {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const todaysEvents = getTodaysEvents();
  for (let i = 0; i < todaysEvents.length; i++) {
    const start = new Date(
      `${today.toDateString()} ${todaysEvents[i].startTime}`
    );
    const end = new Date(`${today.toDateString()} ${todaysEvents[i].endTime}`);
    if (now >= start && now < end) {
      // We're currently in this event
      return { name: todaysEvents[i].name, start: start, end: end };
    } else if (now < start) {
      // This event hasn't started yet
      return { name: todaysEvents[i].name, start: start, end: end };
    }
  }
  // There are no events left today
  return null;
};

const updateCountdown = () => {
  if (events.length === 0) {
    // JSON hasn't loaded yet, try again later
    setTimeout(updateCountdown, 1000);
    return;
  }

  const now = new Date();
  const nextEvent = getNextEvent();

  if (nextEvent === null) {
    // No events left today
    document.getElementById("countdown").innerHTML = "Inga lektioner just nu.";
    document.getElementById("progress-bar").style.display = "none";
    return;
  }

  const eventName = nextEvent.name;
  const start = nextEvent.start;
  const end = nextEvent.end;

  if (now < start) {
    // Event hasn't started yet
    const timeUntilStart = (start - now) / 1000; // Convert to seconds
    const totalTimeUntilStart =
      (start -
        new Date(today.getFullYear(), today.getMonth(), today.getDate())) /
      1000; // Convert to seconds
    const progressPercentage =
      ((totalTimeUntilStart - timeUntilStart) / totalTimeUntilStart) * 100;
    const countdown = `${eventName} börjar om: ${formatSeconds(
      timeUntilStart
    )}`;
    document.getElementById("countdown").innerHTML = countdown;
    document.getElementById("countdown").style.color = "#fdd5d5";

    document.getElementById("progress").style.width = `${progressPercentage}%`;
    document.getElementById("progress").style.backgroundColor = "#a3d47a";
    document.getElementById("progress-bar").style.display = "block";
    return;
  }

  // Event is ongoing or already finished
  const totalDuration = (end - start) / 1000; // Convert to seconds
  const timeElapsed = (now - start) / 1000; // Convert to seconds
  const timeRemaining = (end - now) / 1000; // Convert to seconds
  const eventDuration = (end - start) / 1000; // convert to seconds

  if (timeRemaining < 60) {
    // Change color to red when there's less than 1 minute left
    document.getElementById("countdown").style.color = "#f36868";
    document.getElementById("progress").style.animation = "shake infinite 10s";
    document.getElementById("progress").style.animation = "none";
    document.getElementById("progress").style.backgroundColor = "#f26868";
  } else if (timeRemaining < 300) {
    // Change color to yellow when there's less than 5 minutes left
    document.getElementById("countdown").style.color = "#fdd5d5";
    document.getElementById("progress").style.animation = "none";
    document.getElementById("progress").style.backgroundColor = "#f7d26f";
  } else if (timeRemaining < 600) {
    // Change color to orange when there's more than 5 minutes but less than 10 minutes left
    document.getElementById("countdown").style.color = "#fdd5d5";
    document.getElementById("progress").style.backgroundColor = "#119e9e";
    document.getElementById("progress").style.animation = "none";
  } else {
    // Change color to green when there's more than 10 minutes left
    document.getElementById("countdown").style.color = "#fdd5d5";
    document.getElementById("progress").style.backgroundColor = "#a3e376";
  }

  const countdown = `Tid kvar för ${eventName}: ${formatSeconds(
    timeRemaining
  )}`;
  document.getElementById("countdown").innerHTML = countdown;

  const percentElapsed = (timeElapsed / eventDuration) * 100;
  const width =
    (percentElapsed / 100) *
    document.getElementById("progress-bar").offsetWidth;
  document.getElementById("progress").style.width = `${width}px`;

  document.getElementById("progress-bar").style.display = "block";
};

const formatSeconds = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const paddedSeconds = pad(Math.floor(seconds) % 60, 2);
  if (hours > 0) {
    return `${hours}:${pad(minutes % 60, 2)}:${paddedSeconds}`;
  }
  return `${pad(minutes, 2)}:${paddedSeconds}`;
};

const pad = (num, size) => {
  return ("000000000" + num).substr(-size);
};

const loadEventFile = (url) =>
  loadJSON((response) => {
    events = response;
    updateCountdown();
  }, url);

const init = () => {
  const dropdownContent = document.querySelector(".dropdown-content");
  const dropdownButton = document.querySelector(".dropdown-button");
  eventFiles.forEach((eventFile) => {
    const eventButton = document.createElement("a");
    eventButton.innerText = eventFile.name;
    eventButton.onclick = () => {
      loadEventFile(eventFile.url);
    };
    dropdownContent.appendChild(eventButton);
  });
  loadEventFile(eventFiles[0].url);
};

setInterval(updateCountdown, 100);
