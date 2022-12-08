## Create .env

Create .env file in root folder.

Use the online service https://www.md5online.org/md5-encrypt.html
to get hash for your password.

Add login and password to .env file.
For example: login - admin, password - admin

also you can create password via cli md5sum 
$ echo "admin" |md5sum
```
LOGIN=admin
PASSWORD=21232f297a57a5a743894a0e4a801fc3

DB_FILE_NAME='./db/db.json'
HOURLY_RATE=973236

UBX_USDT_URL='https://ubix.exchange/api/v1/tickers/UBX-USDT'
```
Create .env file in `client` folder.

```
REACT_APP_BASENAME - application url  
REACT_APP_API_BASE - API endpoint
REACT_APP_BOT_ID = "ubix_nw_bot"
REACT_APP_BOT_NAME="UBIX Network Bot"
REACT_APP_EMAIL="uip@ubix.network"

REACT_APP_BASENAME=/uip
# REACT_APP_BASENAME=/  
REACT_APP_API_BASE=https://api-uip.ubix.network/
```

## client/package.json

set `"homepage"` to be the location of the app, example:

```
"homepage": "https://ubix.network/uip/"
"homepage": "https://uip.ubix.network/"
```