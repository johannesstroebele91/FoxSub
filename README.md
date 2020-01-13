### Run DEV docker (just mariaDB)
docker-compose -f docker-compose.dev.yml up


### Backend

#### Endpoints
``` /api/signin ```
* POST {username: 'username', password: 'password'}

``` /api/v1/subscriptions ```
* POST - create
  * Body takes subscription object without uuid
* PUT - update `/api/v1/subscriptions/:uuid`
  * Body takes subscription object with uuid
* DELETE - remove
