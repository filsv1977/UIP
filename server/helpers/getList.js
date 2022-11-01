import * as R from 'ramda';
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

        const data = filterData.map(item => {
            let {performer} = item;
            if (!admin) {
                performer = R.omit(['walletAddress', 'hasImplementedByUbixTeam'], item.performer);
            }

            return {...item, performer: {...performer}};
        });

        return {success: answer.success, data};
    } catch (error) {
        return {success: false, message: 'DB is broken'};
    }
}
