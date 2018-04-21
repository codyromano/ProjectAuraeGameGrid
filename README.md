# Project Aurae Gameplay

Prototype for core gameplay
![Beta view of selecting plant resources](https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/project-aurae.gif)

## Getting started

First set up the [simple-weather-service](https://github.com/codyromano/simple-weather-service), which provides current weather data.

After you have the service running, run this repo, which focuses on the UI:

```
npm install
npm start
```
## Testing
Start the test server (auto-watch all tests)
```
npm test
```
## Troubleshooting
- Try `brew uninstall watchman`, then `brew install watchman`. (Fixes [an issue in react-scripts](https://github.com/facebook/create-react-app/issues/2393))
- Try upgrading to Node v.9.9.0 if you're using a lower version.
