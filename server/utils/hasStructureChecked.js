import {length, isEmpty, symmetricDifference} from 'ramda';

import taskModel from '../db/taskModel.js';

export default tasks => {
    try {
        let t1 = Object.keys(taskModel);
        let t2 = Object.keys(taskModel.performer);

        return tasks.every(item => {
            let a1 = Object.keys(item);
            let a2 = Object.keys(item.performer);
            return isEqual(a1, t1) && isEqual(a2, t2);
        });
    } catch {
        return false;
    }
};

const isEqual = (obj1, obj2) => length(obj1) === length(obj2) && isEmpty(symmetricDifference(obj1, obj2));
