require('dotenv').config();

const dbUrl = process.env.DATABASE_URL;
const jwtSecret = process.env.JWT_SECRET;

console.log(`Database URL: ${dbUrl}`);
console.log(`JWT Secret: ${jwtSecret}`);