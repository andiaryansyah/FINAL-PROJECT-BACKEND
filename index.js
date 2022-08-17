const app = require('./server/app');
const db = require('./storage/definers');
require('dotenv').config();

const PORT = process.env.PORT;

async function assertDatabaseConnectionOk() {
    console.log(`Checking database connection...`);
    try {
        await db.authenticate();
        console.log('Database connection OK!');
        await db.sync()
    } catch (error) {
        console.log('Unable to connect to the database:');
        console.log(error.message);
        process.exit(1);
    }
}

async function init() {
    await assertDatabaseConnectionOk();

    console.log(`Starting server on port ${PORT}...`);

    app.listen(PORT, () => {
        console.log(`Server started on port ${PORT}.`);
    });
}

init();