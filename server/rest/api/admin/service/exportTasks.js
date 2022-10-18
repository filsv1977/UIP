const exportTasks = async (req, res) => {
    res.download('./db/db.json');
};

export default exportTasks;
