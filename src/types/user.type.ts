export type Role = 'admin' | 'user' | 'anonymous';

export type User = {
    _id?: string;
    name: string;
    email: string;
    password: string;
    role: Role;
};

export type Anonymous = {
    role: 'anonymous';
};

export type LoggedInUser = {
    _id?: string;
    name: string;
    email: string;
    role: Role;
};

export type UserInfo = Anonymous | LoggedInUser;

export function isAnonymous(user: UserInfo): user is Anonymous {
    return user.role === 'anonymous';
}

export function isLoggedInUser(user: UserInfo): user is LoggedInUser {
    return user.role === 'user' || user.role === 'admin';
}
