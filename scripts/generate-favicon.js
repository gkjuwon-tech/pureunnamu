const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

// ICO 파일 포맷 생성 함수
function createIco(pngBuffers) {
  // ICO header: 6 bytes
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // reserved
  header.writeUInt16LE(1, 2); // type: 1 = ICO
  header.writeUInt16LE(pngBuffers.length, 4); // number of images

  const dirEntries = [];
  const imageDataParts = [];
  let offset = 6 + pngBuffers.length * 16; // header + directory entries

  for (const { size, buffer } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry.writeUInt8(size >= 256 ? 0 : size, 0); // width (0 = 256)
    entry.writeUInt8(size >= 256 ? 0 : size, 1); // height (0 = 256)
    entry.writeUInt8(0, 2); // color palette
    entry.writeUInt8(0, 3); // reserved
    entry.writeUInt16LE(1, 4); // color planes
    entry.writeUInt16LE(32, 6); // bits per pixel
    entry.writeUInt32LE(buffer.length, 8); // image data size
    entry.writeUInt32LE(offset, 12); // offset to image data
    dirEntries.push(entry);
    imageDataParts.push(buffer);
    offset += buffer.length;
  }

  return Buffer.concat([header, ...dirEntries, ...imageDataParts]);
}

async function main() {
  const svgPath = path.join(__dirname, "tree-logo.svg");
  const svgBuffer = fs.readFileSync(svgPath);

  const sizes = [16, 32, 48];
  const pngBuffers = [];

  for (const size of sizes) {
    const pngBuffer = await sharp(svgBuffer, { density: 300 })
      .resize(size, size, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toBuffer();
    pngBuffers.push({ size, buffer: pngBuffer });
    console.log(`  Generated ${size}x${size} PNG (${pngBuffer.length} bytes)`);
  }

  // favicon.ico 생성
  const icoBuffer = createIco(pngBuffers);
  const outPath = path.join(__dirname, "..", "src", "app", "favicon.ico");
  fs.writeFileSync(outPath, icoBuffer);
  console.log(`\n  favicon.ico saved to ${outPath} (${icoBuffer.length} bytes)`);

  // 추가: 192x192 PNG for web manifest / general use
  const png192 = await sharp(svgBuffer, { density: 300 })
    .resize(192, 192, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const png192Path = path.join(__dirname, "..", "src", "app", "icon.png");
  fs.writeFileSync(png192Path, png192);
  console.log(`  icon.png (192x192) saved (${png192.length} bytes)`);

  // 추가: 180x180 Apple Touch Icon
  const png180 = await sharp(svgBuffer, { density: 300 })
    .resize(180, 180, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  const appleIconPath = path.join(__dirname, "..", "src", "app", "apple-icon.png");
  fs.writeFileSync(appleIconPath, png180);
  console.log(`  apple-icon.png (180x180) saved (${png180.length} bytes)`);
}

main().catch(console.error);
