import {TASK_TEMPLATE} from './consts.js';
import {saveDB} from '../helpers/db.js';

class DbEngine {
    _db;

    constructor() {
        this._db = [];
    }

    initDbFromFile(data) {
        this._db = data;
    }

    addWebTaskInDb(tasks) {
        tasks.forEach(elem => {
            if (!this._db.some(item => item.name === elem.name)) {
                this.insert({...TASK_TEMPLATE, ...elem});
            }
        });
    }

    getNewId() {
        return this._db.length ? this._db.at(-1).id + 1 : 0;
    }

    getIndex(id) {
        return this._db.findIndex(item => +item.id === +id);
    }

    insert(data) {
        try {
            data.id = this.getNewId();
            this._db.push(data);
            saveDB(this._db);
            return true;
        } catch (e) {
            return false;
        }
    }

    select() {
        try {
            return this._db;
        } catch (e) {
            return false;
        }
    }

    selectById = id => {
        let index = this.getIndex(id);
        if (index > -1) {
            return this._db[index];
        }
        return false;
    };

    update = (id, data) => {
        let index = this.getIndex(id);
        if (index > -1) {
            this._db[index] = {id, ...data};
            saveDB(this._db);
            return true;
        }
        return false;
    };

    delete = id => {
        let index = this.getIndex(id);
        if (index > -1) {
            this._db.splice(index, 1);
            saveDB(this._db);
            return true;
        }
        return false;
    };
}

export default DbEngine;
