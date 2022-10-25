## Create .env

Create .env file in root folder.

Use the online service https://www.md5online.org/md5-encrypt.html
to get hash for your password.

Add login and password to .env file.
For example: login - admin, password - admin

```
USER=admin
PASSWORD=21232f297a57a5a743894a0e4a801fc3

DB_FILE_NAME='./db/db.json'
HOURLY_RATE=431965

UBX_USDT_URL='https://ubix.exchange/api/v1/tickers/UBX-USDT'
```

Create .env file in `/client`:

REACT_APP_BASENAME - application url  
REACT_APP_API_BASE - API endpoint

```
REACT_APP_BASENAME=/uip-dev
REACT_APP_API_BASE=https://uip-app.herokuapp.com/
```

## package.json

set `"homepage"` to be the location of the app, example:

```
"homepage": "https://ubix.network/uip-dev/"
```