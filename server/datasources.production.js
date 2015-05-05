module.exports = {
    postgres: {
        defaultForType: 'postgresql',
        connector: 'postgresql',
        url: process.env.DATABASE_URL
    }
};
