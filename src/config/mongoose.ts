const host = process.env.MONGO_HOST;
const port = process.env.MONGO_PORT;
const user = <string>process.env.MONGO_USER;
const password = <string>process.env.MONGO_PASSWORD;
const dbName = 'recipes';

export const url = `mongodb+srv://${user}:${password}@${host}${
    port ? `:${port}` : ''
}/${dbName}?retryWrites=true&w=majority`;

export const options = {
    authSource: 'admin',
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
        user,
        password,
    },
};
