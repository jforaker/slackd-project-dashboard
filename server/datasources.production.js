module.exports = {
    postgres: {
        connector: 'postgresql',
        // hostname: process.env.DB_HOST || 'localhost',
        // port: process.env.DB_PORT || 27017,
        //user: process.env.DB_USER,
        // password: process.env.DB_PASSWORD,
        url: process.env.DATABASE_URL
    }
};