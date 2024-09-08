# A-Eggaw 🌤️

A production-grade single page app for weather forecasting.

## Table of content 📋

- [A-Eggaw 🌤️](#a-eggaw-️)
  - [Table of content 📋](#table-of-content-)
  - [Features 🚀](#features-)
  - [Getting Started 🚩](#getting-started-)
    - [Locally 🖥️](#locally-️)
      - [Development 👨‍💻](#development-)
      - [Production 🏭](#production-)
    - [Docker 🐋](#docker-)
      - [Development 👨‍💻](#development--1)
      - [Production 🏭](#production--1)
  - [Testing 🧪](#testing-)
  - [Project Structure 📂](#project-structure-)

## Features 🚀

Here is a [slides version](https://docs.google.com/presentation/d/1BhxiugWHq_NrVFlPmnR1rBMZF9b1vmJTj76LBA_iOqY/edit#slide=id.g2fcee10ece6_0_21213)!
- Dark / Light modes
- Auto location and time detection
- summary of the weather across the country
- daily forecast summary
- accurate weather forecating for the next 10 days
- historical weather info in the last 10 years
- iteractive charts

## Getting Started 🚩

We provide two ways one using docker with minimal setup or locally if you don't get comfortable with containers. both provide production and development environments.

> :warning: 
> This App is powered by the [World Weather API](https://www.worldweatheronline.com/weather-api/) so you need to get an API key first and then set your [environment variables](https://vitejs.dev/guide/env-and-mode) in the `.env` file.

### Locally 🖥️

Start by installing [nodejs](https://nodejs.org/en/learn/getting-started/how-to-install-nodejs)

#### Development 👨‍💻

1. run `npm install` at the root of the project
2. run `npm run dev`

#### Production 🏭

for a production build use

```bash
npm run build
npm run preview
```

### Docker 🐋

start by downloading [Docker](https://www.docker.com/get-started/)

#### Development 👨‍💻

```bash
docker compose -f .\docker-compose.dev.yml up --build --watch
```

#### Production 🏭

```bash
docker compose up 
```

## Testing 🧪

## Project Structure 📂

```
A-Eggaw
├── src
|   ├── App.jsx                      main react app
│   ├── assets
│   │   └── weather-icon.webp
│   ├── day                          components for daily forecast section
│   │   └── DailyBoard.jsx
│   ├── history                      components for historical weather trends section
│   │   ├── Graph.jsx
│   │   ├── GraphSelector.jsx
│   │   ├── HistoryDashboard.jsx
│   │   └── TimeSelector.jsx
│   ├── main.jsx                     React entry point
│   ├── month                        components for monthly forecast section
│   │   └── MonthlyBoard.jsx
│   ├── search                       search bar componets
│   │   ├── CitySelector.jsx
│   │   └── SearchBar.jsx
│   └── week                         components for weekly forecast section
│       ├── WeekCards.jsx
|       ├── WeekGraph
|       └── WeeklyBoard
├── dist                             static site built files (git ignored)
├── .gitignore
├── .dockerignore
├── Dockerfile                       The production built image of the server 
└── index.html
```
