# Vad-har-vi-nu
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
4. Open the `index.html` file in your web browser and select the class you want to view the schedule for from the dropdown menu.
5. The schedule for the selected class will be displayed.

## Credits

Vad har vi nu? was created by [JagGillarVatten].

## License

Vad har vi nu? is licensed under the [MIT License](https://opensource.org/licenses/MIT).
