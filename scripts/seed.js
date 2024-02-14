const { db } = require('@vercel/postgres');

async function seedData(client) {
  try {
    await client.sql`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`;
    const createTable = await client.sql`
      CREATE TABLE IF NOT EXISTS unial (
        id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email TEXT NOT NULL UNIQUE,
        country TEXT NOT NULL
      );
    `;
    console.log(`Created table`);

    return {
      createTable,
    };
  } catch (error) {
    console.log(error);
  }
}

async function main() {
  const client = await db.connect();
  await seedData(client);
}

main().catch((err) => {
  console.error(
    'An error occurred while attempting to seed the database:',
    err
  );
});
