import {TASK_TEMPLATE} from './consts.js';
import fs from 'fs';

class DbEngine {
    _db = [];
    _db_path;

    constructor(path) {
        this._db_path = path;
        this.load();
    }

    addWebTaskInDb(tasks) {
        tasks.forEach(elem => {
            if (!this._db.some(item => item.name === elem.name)) {
                this.insert({...TASK_TEMPLATE, ...elem});
            }
        });

        this._db.forEach(elem => {
            if (!tasks.some(item => item.name === elem.name)) {
                elem.deleted = true;
                this.save();
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
            this.save();
            return true;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    select() {
        try {
            return this._db;
        } catch (error) {
            console.error(error);
            return false;
        }
    }

    selectById(id) {
        let index = this.getIndex(id);
        if (index > -1) {
            return this._db[index];
        }
        return false;
    }

    update(id, data) {
        let index = this.getIndex(id);
        if (index > -1) {
            this._db[index] = {...this._db[index], ...data};
            this.save();
            return true;
        }
        return false;
    }

    delete(id) {
        let index = this.getIndex(id);
        if (index > -1) {
            this._db.splice(index, 1);
            this.save();
            return true;
        }
        return false;
    }

    load() {
        fs.readFile(this._db_path, 'utf8', (error, data) => {
            if (error) {
                console.error(error);
                return;
            }

            try {
                this.addWebTaskInDb(JSON.parse(data));
            } catch (error) {
                this._db = [];
                console.error(error);
            }
        });
    }

    save() {
        fs.writeFile(this._db_path, JSON.stringify(this._db), error => {
            if (error) {
                console.error(error);
            }
        });
    }
}

export default DbEngine;
