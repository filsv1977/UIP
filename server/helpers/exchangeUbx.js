import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, {retries: 3});

class ExchangeUbx {
    constructor() {
        if (typeof ExchangeUbx.instance === 'object') {
            return ExchangeUbx.instance;
        }

        ExchangeUbx.instance = this;
        this.loadUbx2Usdt();
        this._ubx2usdt = null;
        this._error = 'No upx2usdt price.';
        return this;
    }

    get error() {
        return this._error;
    }

    get ubx2usdt() {
        return this._ubx2usdt;
    }

    resetUbx2usdt() {
        this._ubx2usdt = 0;
    }

    loadUbx2Usdt() {
        axios
            .get(process.env.UBX_USDT_URL)
            .then(result => {
                this._ubx2usdt = result.data.price;
                this._error = '';
            })
            .catch(error => {
                this._error = error.message;
            });
    }
}

let exchangeUbx = new ExchangeUbx();
export default exchangeUbx;
