# FoxSub

## Summary

This project was developed for the course "Mobile Web Application" of the Stuttgart Media University by Rafail Antoniadis, Fabian Cuntz, and Johannes Ströbele. Subscriptions (e.g. Netflix, Spotify) can be managed using FoxSub. Each user can add, edit, and delet its subscriptions. Further, users have a dashboard which shows their monthly subscription costs and a profile where they can edit their cost goal.

## HowToRun
``` $ docker-compose build && $ docker-compose up ```

Fronend: Terminal "npm start"
Dev Docker (just mariaDB): Terminal 1) Navigate to root 2) "docker-compose -f docker-compose.dev.yml up"
Backend: Terminal 1) Navigate to server 2) "go build fabulous-fox" 3) "./fabulous-fox"

## Important

#### Endpoints
``` /api/signin ```
* POST {username: 'username', password: 'password'}

``` /api/v1/subscriptions ```
* POST - create
  * Body takes subscription object without uuid
* PUT - update `/api/v1/subscriptions/:uuid`
  * Body takes subscription object with uuid
* DELETE - remove

``` /api/v1/subscriptions/general ```
``` /api/login ```
``` /api/register ```
``` /api/v1/user ```
``` /api/v1/user/goal ```
``` /api/v1/services ```

## Lessons Learned

* Using Angular for building the frontend (e.g. routing, resolver, interceptor)
* Buidling Frontend UI tests with Karma and Jasmin
* Using Go the backend
* Database with MariaDB
