import axios from 'axios';
import axiosRetry from 'axios-retry';

axiosRetry(axios, {retries: 3});

class ExchangeUbx {
    constructor(reloadPrice = false) {
        if (!reloadPrice && typeof ExchangeUbx.instance === 'object') {
            return ExchangeUbx.instance;
        }

        this._ubx2usdt = 0;
        this._error = 'No upx2usdt price.';
        ExchangeUbx.instance = this;

        this.loadUbx2Usdt()
            .then(price => {
                this._ubx2usdt = price;
                this._error = '';
            })
            .catch(error => {
                this._error = error.message;
            });

        return this;
    }

    get error() {
        return this._error;
    }

    get ubx2usdt() {
        return this._ubx2usdt;
    }

    loadUbx2Usdt() {
        return axios.get(process.env.UBX_USDT_URL).then(result => result.data.price);
    }
}

export default ExchangeUbx;
