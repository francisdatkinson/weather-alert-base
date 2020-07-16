## Features

- Search for a location by city/country and it will be addedd to favourites
- Stylish presentation of key weather data including wind speed and direction, temperature and weather conditions.
  - animated wind vein, clouds and counting number.
- Detailed information on weather upon expansion of different sections, e.g. more precise readings for windspeed, bearing and temperature; written description of weather conditions and placeholders for min/max values of forecasted data. (forecasted data could not be obtained and presented).
- The ability to remove locations from the list, with a safeguard and indicator that remove-mode is active. (iOS style jiggle).
- Ability to set preferred units for temperature and windspeed. (This updates in the state but not in the display).
- View the current time and the time of the last weather data update.
- View the local time of each favourite location

## Known bugs

- Adding an invalid location (anything that isn't a city/country/area name) will crash the site. Thisw can only be recovered by clearing browser cookies then refreshing the site. This is due to an incomplete attempt to validate names on input, rejecting invalid values.
- When removing locations, the final item from the list will be removed regardless of which remove button is clicked. This is some core functionality that I upset and didn't have time to fix.
- Forecast data is not loaded. Instead, placeholders using the current weather data are displayed to show what it will look like.
- Although the current location can be obtained, I didn't have time to fully implement adding a location based on this data. This will cause an error which can be fixed by refreshing the page.
- Location local time does not account for daylight saving in the hours, but does in the days(?!).
- The units and values are updated in the state but this change does not propagate to the page. Any new locations added will be in the unit saved in the state.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `serve -s build`

\*Run `npm install -g serve` before attempting this<br />
Runs the bundled version of the application from `npm run build`.

Your app will serve locally on [http://localhost:5000](http://localhost:5000).

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
