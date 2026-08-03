if (!process.env.DATABASE_URL) {
  require("dotenv").config({ path: process.argv[2] || ".env.local" });
  require("dotenv").config();
}

const { Client } = require("pg");

async function main() {
  const connectionString =
    process.env.DATABASE_PUBLIC_URL ?? process.env.DATABASE_URL;

  if (!connectionString) {
    console.error("DATABASE_URL not set");
    process.exit(1);
  }

  const client = new Client({ connectionString });
  await client.connect();

  const result = await client.query(`
    SELECT email, name, "createdAt"
    FROM "NewsletterSubscriber"
    ORDER BY "createdAt" DESC
  `);

  console.log(`COUNT: ${result.rowCount}`);
  result.rows.forEach((row, index) => {
    const name = row.name ? row.name : "(sin nombre)";
    const date = new Date(row.createdAt).toLocaleString("es-MX");
    console.log(`${index + 1}. ${row.email} | ${name} | ${date}`);
  });

  await client.end();
}

main().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
