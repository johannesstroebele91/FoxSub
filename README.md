### Run DEV docker (just mariaDB)
docker-compose -f docker-compose.dev.yml up


### Backend

#### Endpoints
``` /api/v1/signin ```
* POST {username: <username>, password: <password>}