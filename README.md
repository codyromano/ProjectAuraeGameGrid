# Project Aurae

Project Aurae (working title) is a game that gives you free coffee and dessert when it's raining. Our mission is to make people feel better about bad weather.

![](https://s3-us-west-2.amazonaws.com/codyromano/project-aurae/plant-evolution.gif)

## How it works

1. Plant items in your virtual garden.
2. Rain in real life makes your plants grow.
3. When a plant evolves, there's a chance you'll earn a treat. We partner with local businesses to offer you coffee and chocolate in bad weather.

## Getting started

First, set up the [simple-weather-service](https://github.com/codyromano/simple-weather-service), which provides current weather data.

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
- Delete localStorage items associated with the app, then reload the page.
