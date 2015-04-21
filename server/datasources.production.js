var postgresURI = process.env.DATABASE_URL;
module.exports = {
    db: {
        defaultForType: 'postgresql',
        connector: 'postgresql',
        url: postgresURI}
};