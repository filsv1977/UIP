let admin = false;

export const setAdmin = param => {
    admin = param;
};

export const isAdmin = () => {
    return admin;
};

export const foldAdminByPath = path => {
    if (path.search(/\/admin$/i) === -1) {
        admin = false;
    }
};
