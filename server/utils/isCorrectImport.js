import * as R from 'ramda';
import taskModel from '../db/taskModel.js';

export function isCorrectImport(tasks) {
    try {
        const taskTemplate = Object.keys(taskModel);
        const performerTemplate = Object.keys(taskModel.performer);

        return tasks.every(item => {
            const task = Object.keys(item);
            const performer = Object.keys(item.performer);
            return isEq(task, taskTemplate) && isEq(performer, performerTemplate);
        });
    } catch {
        return false;
    }
}

function isEq(obj, objTemplate) {
    return R.length(obj) === R.length(objTemplate) && R.isEmpty(R.symmetricDifference(obj, objTemplate));
}
