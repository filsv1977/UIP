import {saveFile} from '../utils/saveFile.js';
import {TABLES} from './consts.js';

class DbEngine {
    #db;

    constructor() {
        this.#db = {};
    }

    addWebTaskInDb = tasks => {
        const table = this.#db.tasks;

        tasks.forEach(elem => {
            if (!table.some(item => item.name === elem.name)) {
                this.insert(TABLES.TASKS, elem);
            }
        });
    };

    addTable = (name, data) => {
        this.#db[name] = data;
    };

    getNewId = tableName => {
        return this.#db[tableName].length;
    };

    getIndex = (table, id) => table.findIndex(item => +item.id === +id);

    insert = (tableName, data) => {
        try {
            const table = this.#db[tableName];
            data.id = this.getNewId(tableName);
            table.push(data);
            saveFile('db', tableName, table);
            return true;
        } catch (e) {
            return false;
        }
    };

    select = tableName => {
        try {
            return this.#db[tableName];
        } catch (e) {
            return false;
        }
    };

    selectById = (tableName, id) => {
        try {
            const table = this.#db[tableName];
            let index = this.getIndex(table, id);

            if (index > -1) {
                return table[index];
            }
            return false;
        } catch (e) {
            return false;
        }
    };

    update = (tableName, id, data) => {
        try {
            const table = this.#db[tableName];
            let index = this.getIndex(table, id);
            if (index > -1) {
                table[index] = {id: +id, ...data};
                saveFile('db', tableName, table);
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    };

    delete = (tableName, id) => {
        try {
            const table = this.#db[tableName];
            let index = this.getIndex(table, id);
            if (index > -1) {
                table.splice(index, 1);
                saveFile('db', tableName, table);
                return true;
            }
            return false;
        } catch (e) {
            return false;
        }
    };
}

export default DbEngine;
