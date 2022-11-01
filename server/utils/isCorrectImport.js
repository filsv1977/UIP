import * as R from 'ramda';
import taskModel from '../db/taskModel.js';

export function isCorrectImport(tasks) {
    try {
        let t1 = Object.keys(taskModel);
        let t2 = Object.keys(taskModel.performer);

        return tasks.every(item => {
            let a1 = Object.keys(item);
            let a2 = Object.keys(item.performer);
            return isEq(a1, t1) && isEq(a2, t2);
        });
    } catch {
        return false;
    }
}

function isEq(obj1, obj2) {
    return R.length(obj1) === R.length(obj2) && R.isEmpty(R.symmetricDifference(obj1, obj2));
}
