import axios from 'axios';

class ExchangeUbx {
    constructor() {
        if (typeof ExchangeUbx.instance === 'object') {
            return ExchangeUbx.instance;
        }

        ExchangeUbx.instance = this;
        this.loadUbx2Usdt();
        return this;
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
            })
            .catch(error => console.log(error));
    }
}

let exchangeUbx = new ExchangeUbx();
export default exchangeUbx;
