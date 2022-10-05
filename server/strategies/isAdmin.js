let admin = false;

export const setAdmin = param => {
    admin = param;
};

export const isAdmin = () => {
    return admin;
};
