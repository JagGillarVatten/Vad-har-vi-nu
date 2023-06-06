# Vad har vi nu?

Vad har vi nu? är en applikation som är designad för att hjälpa studenter att hålla koll på sin skolschema. Det tillåter användare att visa schemat för olika klasser och läser schemana från JSON-filer.

## Funktioner

- Visa schemat för olika klasser.
- Läs scheman från JSON-filer.
- Responsiv design för olika skärmstorlekar.

## Användning

För att använda Vad har vi nu?, följ dessa steg:

1. Klona eller ladda ner filerna till din dator
2. Öppna `index.html`-filen i din webbläsare.
3. Välj den klass du vill se schemat för från rullgardinsmenyn.
4. Schemat för den valda klassen visas.

## Anpassning

För att anpassa Vad har vi nu? efter dina egna behov, följ dessa steg:

1. Skapa en JSON-fil för varje klasschema du vill visa. Filen ska namnges `KLASSNAMN.json`, där KLASSNAMN är namnet på klassen.
2. JSON-filen ska ha följande format:

   ```json
   [
     {
       "name": "Engelska",
       "startDay": 1,
       "startTime": "09:20",
       "endTime": "10:20"
     },
     {
       "name": "Biologi",
       "startDay": 1,
       "startTime": "10:30",
       "endTime": "11:10"
     },
     {
       "name": "Historia",
       "startDay": 1,
       "startTime": "11:15",
       "endTime": "12:10"
     },
     {
       "name": "Spanska",
       "startDay": 1,
       "startTime": "12:15",
       "endTime": "13:00"
     },
     {
       "name": "Lunch",
       "startDay": 1,
       "startTime": "12:10",
       "endTime": "12:40"
     },
     {
       "name": "Matematik",
       "startDay": 1,
       "startTime": "13:15",
       "endTime": "14:15"
     }
   ```

  startday är en variabel där 1 står för måndag och 5 är fredag.

3. Byt ut de befintliga JSON-filerna i rotmappen med dina anpassade JSON-filer.
4. Gå till script.js och lägg till JSON-data till arrayen. Denna array håller reda på vilka alternativ som finns att välja mellan:

```js
let events = [];

let eventDuration = 0;

const eventFiles = [
  {
    name: "Namnet på ditt schema",
    url: "Filnamn för din JSON.json", // GLÖM INTE ATT SKRIVA , EFTER } OM DET FINNS YTTERLIGARE ALTERNATIV EFTER
  },
  {
    name: "Ett annat schema",
    url: "Ett annat schema.json",
  },
  {
    name: "Ett tredje schema",
    url: "Ett tredje schema.json",
  },
];
```

5. Öppna `index.html`-filen i din webbläsare och välj den klass du vill visa schemat för från rullgardinsmenyn.
6. Schemat för den valda klassen visas.

## Nedladdning

Ladda ner Vad har vi nu? för Android från [här](https://github.com/JagGillarVatten/Vad-har-vi-nu/releases/download/v.1.5/Vad.har.vi.nu_1_1.0.apk).

## Credits

Vad har vi nu? skapades av JagGillarVatten.

## Licens

Vad har vi nu? licensieras under [MIT License](https://opensource.org/licenses/MIT).


### English Translation

# Vad har vi nu?

Vad har vi nu? is an application designed to help students keep track of their school schedule. It allows users to view their schedule for different classes, and it reads the schedules from JSON files.

## Features

- View the schedule for different classes
- Read schedules from JSON files
- Responsive design for different screen sizes

## Usage

To use Vad har vi nu?, follow these steps:

1. Clone the repository to your local machine or download the files.
2. Open the `index.html` file in your web browser.
3. Select the class you want to view the schedule for from the dropdown menu.
4. The schedule for the selected class will be displayed.

## Customization

To customize Vad har vi nu? for your own needs, follow these steps:

1. Create a JSON file for each class schedule you want to display. The file should be named `CLASSNAME.json`, where CLASSNAME is the name of the class.
2. The JSON file should have the following format:

```json
[
  {
    "name": "English",
    "startDay": 1,
    "startTime": "09:20",
    "endTime": "10:20"
  },
  {
    "name": "Biologi",
    "startDay": 1,
    "startTime": "10:30",
    "endTime": "11:10"
  },
  {
    "name": "History",
    "startDay": 1,
    "startTime": "11:15",
    "endTime": "12:10"
  },
  {
    "name": "Spanish",
    "startDay": 1,
    "startTime": "12:15",
    "endTime": "13:00"
  },
  {
    "name": "Lunch",
    "startDay": 1,
    "startTime": "12:10",
    "endTime": "12:40"
  },
  {
    "name": "Math",
    "startDay": 1,
    "startTime": "13:15",
    "endTime": "14:15"
  }
```

1 means monday and 5 is friday and so on.

3. Replace the existing JSON files in the root folder with your custom JSON files.
4. Go to the script.js and add the JSON to the array. This array keeps track of what options are selectable:
```js
let events = [];

let eventDuration = 0;

const eventFiles = [
  {
    name: "The name for your schedule",
    url: "Filename for your JSON.json", // DON'T FORGET THE , AFTER } if there are more options after it.
  },
  {
    name: "Another one",
    url: "Another one.json",
  },
  {
    name: "Yet another one",
    url: "Yet another one.json",
  },
];
```
5. Open the `index.html` file in your web browser and select the class you want to view the schedule for from the dropdown menu.
6. The schedule for the selected class will be displayed.

## Download

Download Vad har vi nu? for Android from [here](https://github.com/JagGillarVatten/Vad-har-vi-nu/releases/download/v.1.5/Vad.har.vi.nu_1_1.0.apk).

## Credits

Vad har vi nu? was created by JagGillarVatten

## License

Vad har vi nu? is licensed under the [MIT License](https://opensource.org/licenses/MIT). 


