module.exports = {
    pgDs: {
        defaultForType: 'postgresql',
        connector: 'postgresql',
        url: process.env.DATABASE_URL
    }
};