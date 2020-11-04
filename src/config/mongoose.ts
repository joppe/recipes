const user = <string>process.env.MONGO_USER;
const password = <string>process.env.MONGO_PASSWORD;

export const url = <string>process.env.MONGO_URL;

export const options = {
    authSource: 'admin',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
        user,
        password,
    },
};
