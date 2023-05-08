$(document).ready(function () {
  var events = [];
  var currentEventIndex;
  var timerHandle;

  // Läs schemafilen som användaren valde
  function loadSchedule(filename) {
    $.getJSON(filename, function (data) {
      events = data.events;
      currentEventIndex = 0;
      scheduleNextEvent();
    });
  }

  // Loopa igenom händelserna och planera nästa händelse
  function scheduleNextEvent() {
    var today = new Date().getDay();
    var currentTime = new Date();
    for (var i = 0; i < events.length; i++) {
      if (
        events[i].startday == today &&
        currentTime >= getTimeFromString(events[i].StartTime) &&
        currentTime <= getTimeFromString(events[i].EndTime)
      ) {
        currentEventIndex = i;
        renderEvent();
        startCountdown(getTimeFromString(events[i].EndTime));
        return;
      }
    }

    // Om det inte finns någon händelse, visa nästa händelse för morgondagen
    currentEventIndex = 0;
    for (var i = 0; i < events.length; i++) {
      if (
        events[i].startday == today + 1 ||
        (today == 7 && events[i].startday == 1)
      ) {
        currentEventIndex = i;
        renderEvent();
        startCountdown(getTimeFromString(events[i].StartTime));
        return;
      }
    }
  }

  // Funktion för att starta nedräkningen
  function startCountdown(endTime) {
    clearInterval(timerHandle);
    timerHandle = setInterval(function () {
      updateCountdownTimer(endTime);
    }, 1000);
  }

  // Funktion för att uppdatera nedräkningstimer och progressbar
  function updateCountdownTimer(endTime) {
    var now = new Date().getTime();
    var diff = endTime - now;

    if (diff <= 0 || currentEventIndex >= events.length) {
      clearInterval(timerHandle);
      scheduleNextEvent();
      return;
    }

    var minutes = Math.floor(diff / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);
    $("#countdown-timer").text(
      minutes + " minuter, " + seconds + " sekunder kvar"
    );

    var totalDuration = getTimeDurationFromString(
      events[currentEventIndex].StartTime,
      events[currentEventIndex].EndTime
    );
    var progress = ((totalDuration - diff) / totalDuration) * 100;
    $(".progressbar").css("width", progress + "%");
  }

  // Funktion för att rendera nästa händelse
  function renderEvent() {
    $("#event-name").text(events[currentEventIndex].name);
    $("#countdown-timer").text("");
    $(".progressbar").css("width", "0%");
  }

  // Funktion för att konvertera en sträng som representerar tid till datumsobjekt
  function getTimeFromString(timeStr) {
    var timeParts = timeStr.split(":");
    return new Date().setHours(timeParts[0], timeParts[1], 0, 0);
  }

  // Funktion för att räkna ut längden av en händelse i millisekunder
  function getTimeDurationFromString(start, end) {
    var startTime = getTimeFromString(start);
    var endTime = getTimeFromString(end);
    if (endTime <= startTime) {
      endTime += 24 * 60 * 60 * 1000; // lägg till en dag om slutet är efter midnatt
    }
    return endTime - startTime;
  }

  // Uppdatera schema när användaren väljer ett annat schema från rullgardinsmenyn
  $("#schedule-selector").change(function () {
    loadSchedule($(this).val());
  });

  // Ladda schemat från den första filen vid start
  loadSchedule("9A.json");
});
