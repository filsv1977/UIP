import {DB} from '../index.js';

export function getList(implemented, admin) {
    try {
        console.log('@@@@ getList', implemented, admin);
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
            let performer = {};
            performer.nickname = item.performer.nickname;
            if (admin) {
                performer.walletAddress = item.performer.walletAddress;
                performer.hasImplementedByUbixTeam = item.performer.hasImplementedByUbixTeam;
            }

            return {...item, performer: {...performer}};
        });

        return {success: answer.success, data};
    } catch (error) {
        return {success: false, message: 'DB is broken'};
    }
}
