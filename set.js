const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib0RPOXBaNDJIbFJWZ0hHOCtlbTlJSE9IRHJ4RDF2NEhEUVUyN0wwQ0wzcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoicHBiK1cxWVRPR3NuWGl1MHZ4SlhuNEpUK1p2QUFQd3FMZm1SRzRRMmFrZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJjRnZkS0UyMUFPdWxqUFdhcHd2NmVZSjFOQ0VXa1pVL0JBLyt2dGF4Qkc0PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1T2JaT09lRm9XMzNLVE5QSVJtU2p1dm1DYWJkKzAyTThSSXpwcnpCeXcwPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IldON3hMWkdUczNPdU5rSXpmRW5GZE5WYmZTcm5Ddmh0UkF4S2RZdS9RVlk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJzYUN2V2grM2tCbmkvTGk0Wkc3MitDWnBRaitmTVlSYnlEY0x0VWlOMjQ9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYU82WGExTStXQ0RMZXZQb0dsNEh4MExXMjB3amtUS2ZhdTlYd1Uxa3dtRT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidnhJQXgyYVc4bysrTHI2MVpndEU3MW50REVUeG1TVG5BaE5rZjcwdnRqOD0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjIybzhCNENGU3U1eXFFZFo3U3h4VWc2N3ZobERyVDdHOFFrejlkN3VuZGJsaWpoR01naTZTeFVURU9rRjU4YWhKSVpMWldpRjRSMEd1c0h2V2pUc0J3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6ODgsImFkdlNlY3JldEtleSI6InNrMU9ycHdSK2tXYlZzdTlRVzdnTHd4S3JYRnRLaEtRQlhrUnBoNVA4Umc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjo2MSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjYxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IllXLWgwSzNJUjNlaFlyMlJ5bXMwaFEiLCJwaG9uZUlkIjoiZDcxNDhlMjEtODlhMS00MGIyLWFkZTEtMjBlYzY2OTAyOGM0IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik9iVlhRbVMrRjBRS1BoWTVqdVl0ME85U3Z5bz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJ0cEtSV0JoR1Irb0FaMEkyNmxWRjJSckxkbkE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiMTE0UVZTNVkiLCJtZSI6eyJpZCI6IjI1MjY1NDMyMjc0NTo5QHMud2hhdHNhcHAubmV0In0sImFjY291bnQiOnsiZGV0YWlscyI6IkNPN0tzVzhRbCsrWXRRWVlBU0FBS0FBPSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJ1RU5nZERrNHpsMXJqOXlNY3R6WnBaV00vYzh2WEQ1NXNxd3lXUzAxM2k0PSIsImFjY291bnRTaWduYXR1cmUiOiJ5WkNJTGdpaFFSMzFjWUJUaXp0bUR6QmRNRkFHZENWSkorcENvNEFOV3VVV2ZQZFVsbS9GYTZIbHFsTi9lb0w3Q2lLUURoZ05zRVU2MWxPTmFNSXVEZz09IiwiZGV2aWNlU2lnbmF0dXJlIjoibTB5aDNrR0VCU2J6MU8rNmpKRWd2dit3SVNtdHJMdmk3OU9Rbk16UUxqNC9UOEI4N21sYXNCMUk0MlpOaFhFU2g3VkQzUjJKcXlGWGYxSDE1azlmRFE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyNTI2NTQzMjI3NDU6OUBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJiaERZSFE1T001ZGE0L2NqSExjMmFXVmpQM1BMMXcrZWJLc01sa3ROZDR1In19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIyMTY5MjUyLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU1HNSJ9',
    PREFIXE: process.env.PREFIX || "+",
    OWNER_NAME: process.env.OWNER_NAME || "Keith Keizzah",
    NUMERO_OWNER : process.env.OWNER_NUMBER || "",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'non',
    BOT : process.env.BOT_NAME || 'HUNCHO MD',
    OPENAI_API_KEY : process.env.OPENAI_API_KEY || '',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/e18441d126f37be8efbfa.jpg',
    MODE: process.env.PUBLIC_MODE || "yes",
    PM_PERMIT: process.env.PM_PERMIT || 'no',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_API_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    //GPT : process.env.OPENAI_API_KEY || '',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'no',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
