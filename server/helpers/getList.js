import {omit} from 'ramda';
import DbEngine from '../db/dbEngine.js';

export const getList = (implemented, admin) => {
    const db = new DbEngine(process.env.DB_FILE_NAME);

    try {
        const answer = db.select();
        if (!answer.success) {
            return {...answer};
        }

        const filter = item => {
            if (implemented === undefined) return true;

            const closed = item.performer.nickname !== '' || item.implemented;
            if (+implemented) return closed;
            return !closed;
        };

        const filterData = answer.data.filter(filter);

        const delField = ['walletAddress', 'hasImplementedByUbixTeam'];
        const data = filterData.map(({performer, ...item}) => ({
            ...item,
            performer: admin ? performer : omit(delField, performer)
        }));

        return {success: answer.success, data};
    } catch (error) {
        return {success: false, message: 'DB is broken'};
    }
};
