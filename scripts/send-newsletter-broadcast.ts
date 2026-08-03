import "dotenv/config";
import {
  broadcastLatestUnsentPost,
  broadcastNewsletterPost,
} from "../src/lib/newsletter-broadcast";

const slug = process.argv[2]?.trim();

async function main() {
  const result = slug
    ? await broadcastNewsletterPost(slug)
    : await broadcastLatestUnsentPost();

  if (!result.ok) {
    console.error("ERROR:", result.error);
    result.failures?.forEach((failure) => console.error(" -", failure));
    process.exit(1);
  }

  console.log(`Boletín enviado: ${result.title}`);
  console.log(`URL: ${result.url}`);
  console.log(`Enviados: ${result.sentCount}`);
  if (result.failedCount > 0) {
    console.log(`Fallidos: ${result.failedCount}`);
    result.failures.forEach((failure) => console.error(" -", failure));
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
