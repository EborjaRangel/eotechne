import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import pngToIco from "png-to-ico";

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const source = path.join(root, "public/logos/eotechne-logo.png");
const appDir = path.join(root, "src/app");
const publicDir = path.join(root, "public");

async function pngBuffer(size) {
  return sharp(source)
    .resize(size, size, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png()
    .toBuffer();
}

async function main() {
  const faviconSizes = [16, 32, 48];
  const faviconPaths = [];

  for (const size of faviconSizes) {
    const tempPath = path.join(appDir, `favicon-${size}.png`);
    await fs.writeFile(tempPath, await pngBuffer(size));
    faviconPaths.push(tempPath);
  }

  const ico = await pngToIco(faviconPaths);
  await fs.writeFile(path.join(appDir, "favicon.ico"), ico);
  await fs.writeFile(path.join(publicDir, "favicon.ico"), ico);

  for (const tempPath of faviconPaths) {
    await fs.unlink(tempPath);
  }

  await fs.writeFile(path.join(appDir, "icon.png"), await pngBuffer(32));
  await sharp(source)
    .resize(180, 180, {
      fit: "contain",
      background: { r: 255, g: 255, b: 255, alpha: 0 },
    })
    .png()
    .toFile(path.join(appDir, "apple-icon.png"));

  console.log("Favicon assets generated from EOTECHNE logo.");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
