import taskModel from './taskModel.js';
import fs from 'fs';

class DbEngine {
    constructor(path) {
        if (typeof DbEngine.instance === 'object') {
            return DbEngine.instance;
        }

        DbEngine.instance = this;
        this._dbPath = path;
        this._error = '';
        this._load();
        return this;
    }

    loadUips(tasksList) {
        const tasks = [...tasksList];

        this._db.forEach((elem, i) => {
            const index = tasks.findIndex(item => elem.name === item.name);
            if (index > -1) {
                this._db[i] = {...elem, ...tasks[index]};
                tasks.splice(index, 1);
            } else {
                elem.deleted = true;
            }
        });

        tasks.forEach(elem => {
            this._db.push({...taskModel, ...elem, id: this._getNewId()});
        });

        this._sortBase();

        this._error = '';

        try {
            this._save();
        } catch (error) {
            this._error = 'Error save tasks from file';
        }
    }

    select() {
        let result = {success: false, message: this._error};
        if (!this._error) {
            result = {success: true, data: this._db.filter(item => !item.deleted)};
        }
        return result;
    }

    async update(id, data) {
        const index = this._getIndex(id);
        if (index > -1) {
            this._db[index] = {...this._db[index], ...data};

            try {
                await this._save();
            } catch (error) {
                return {success: false, message: error.message};
            }

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

    _sortBase() {
        return this._db.sort((a, b) => a.uipId - b.uipId);
    }

    setError(error) {
        this._error = error;
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
            return {success: false, message: `Task not added`};
        }
    }

    insertAll(data) {
        this._db = data;
        this._sortBase();

        try {
            this._save();
        } catch {
            return {success: false, message: `Tasks were not imported`};
        }

        return {success: true, data: this._db};
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

    _save = () => {
        return fs.promises.writeFile(this._dbPath, JSON.stringify(this._db, null, 4)).catch(() => {
            throw new Error('Error writing database to file');
        });
    };

    _load() {
        fs.promises
            .readFile(this._dbPath, 'utf8')
            .then(result => {
                this._db = JSON.parse(result);
            })
            .catch(() => {
                this._db = [];
                this._error = 'Error loading database from file';
            });
    }
}

export default DbEngine;
