import {TASK_TEMPLATE} from './taskModel.js';
import fs from 'fs';

class DbEngine {
    constructor(path) {
        if (typeof DbEngine.instance === 'object') {
            return DbEngine.instance;
        }

        DbEngine.instance = this;
        this._dbPath = path;
        this._load();
        return this;
    }

    loadUips(tasksList) {
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

    select() {
        return {success: true, data: this._db.filter(item => !item.deleted)};
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

    _selectById(id) {
        let index = this._getIndex(id);
        if (index > -1) {
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

    _save() {
        fs.promises.writeFile(this._dbPath, JSON.stringify(this._db, null, 4)).catch(error => {
            console.log(error);
        });
    }

    _load() {
        fs.promises
            .readFile(this._dbPath, 'utf8')
            .then(result => {
                this._db = JSON.parse(result);
            })
            .catch(error => {
                this._db = [];
                console.log(error);
            });
    }
}

export default DbEngine;
