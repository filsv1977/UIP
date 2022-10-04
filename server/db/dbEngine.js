import {TASK_TEMPLATE} from './consts.js';
import fs from 'fs';

class DbEngine {
    _db = [];
    _dbPath;

    constructor(path) {
        this._dbPath = path;
        this._load();
    }

    addWebTaskInDb(tasks) {
        tasks.forEach(elem => {
            if (!this._db.some(item => item.name === elem.name)) {
                this._insert({...TASK_TEMPLATE, ...elem});
            }
        });

        this._db.forEach(elem => {
            if (!tasks.some(item => item.name === elem.name)) {
                elem.deleted = true;
                this._save();
            }
        });
    }

    _getNewId() {
        return this._db.length ? this._db.at(-1).id + 1 : 0;
    }

    _getIndex(id) {
        return this._db.findIndex(item => +item.id === +id);
    }

    _insert(data) {
        try {
            data.id = this._getNewId();
            this._db.push(data);
            this._save();
            return true;
        } catch (error) {
            console.error(error);
            return {success: false, message: `Task not added`};
        }
    }

    select() {
        return {success: true, data: this._db};
    }

    _selectById(id) {
        let index = this._getIndex(id);
        if (index > -1) {
            return {success: true, data: this._db[index]};
        }
        return {success: false, message: `Task with id=${id} not found`};
    }

    update(id, data) {
        let index = this._getIndex(id);
        if (index > -1) {
            this._db[index] = {...this._db[index], ...data};
            this._save();
            return {success: true, data: this._db[index]};
        }
        return {success: false, message: `Task with id=${id} not found`};
    }

    _delete(id) {
        let index = this._getIndex(id);
        if (index > -1) {
            this._db.splice(index, 1);
            this._save();
            return {success: true};
        }
        return {success: false, message: `Task with id=${id} not found`};
    }

    _load() {
        fs.readFile(this._dbPath, 'utf8', (error, data) => {
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

    _save() {
        fs.writeFile(this._dbPath, JSON.stringify(this._db), error => {
            if (error) {
                console.error(error);
            }
        });
    }
}

export default DbEngine;
