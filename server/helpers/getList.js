import * as R from 'ramda';
import {DB} from '../index.js';

export function getList(implemented, admin) {
    try {
        const answer = DB.select();
        if (!answer.success) {
            return {...answer};
        }

        let filter = item => {
            if (implemented === undefined) return true;

            let closed = item.performer.nickname !== '' || item.implemented;
            if (+implemented) return closed;
            return !closed;
        };

        let filterData = answer.data.filter(filter);

        let data = filterData.map(item => {
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
