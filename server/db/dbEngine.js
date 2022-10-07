import {TASK_TEMPLATE} from './consts.js';
import fs from 'fs';

class DbEngine {
    _db = [];
    _dbPath;

    constructor(path) {
        this._dbPath = path;
        this._load();
    }

    addWebTaskInDb(tasksList) {
        const tasks = [...tasksList];

        this._db.forEach(elem => {
            const index = tasks.findIndex(item => elem.name === item.name);
            if (index > -1) {
                elem = {...elem, ...tasks[index]};
                tasks.splice(index, 1);
            } else {
                elem.deleted = true;
            }
        });

        tasks.forEach(elem => {
            this._db.push({...TASK_TEMPLATE, ...elem, id: this._getNewId()});
        });

        this._save();
    }

    _getNewId() {
        return this._db.length ? this._db.at(-1).id + 1 : 0;
    }

    _getIndex(id) {
        return this._db.findIndex(item => +item.id === +id);
    }

    _getIndexByTaskName(name) {
        return this._db.findIndex(item => item.name === name);
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
        return {success: true, data: this._db.filter(item => !item.deleted)}; //.filter(item => !item.deleted)
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
