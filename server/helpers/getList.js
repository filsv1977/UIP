import {omit} from 'ramda';
import {DB} from '../index.js';

export function getList(implemented, admin) {
    try {
        const answer = DB.select();
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
}
