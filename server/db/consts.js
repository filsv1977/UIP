export const TABLES = {
    TASKS: 'tasks',
    USERS: 'users'
};

export const getTablesList = () => {
    return Object.values(TABLES);
};

export const TASK_TEMPLATE = {
    id: 0,
    url: '',
    name: '',
    estimationHours: 0,
    performer: {
        nickname: '',
        walletAddress: ''
    }
};
