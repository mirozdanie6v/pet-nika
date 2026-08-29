import { access, copyFile, mkdir, readFile } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { resolve } from 'node:path';

const source = resolve('uxui-source/pet-nika-uxui-source.html');
const target = resolve('public/index.html');

try {
  await access(source);
} catch {
  console.error(`Missing canonical UX/UI source: ${source}`);
  process.exit(1);
}

const sourceBytes = await readFile(source);
const start = sourceBytes.subarray(0, 256).toString('utf8').trimStart().toLowerCase();

if (!start.startsWith('<!doctype html') && !start.startsWith('<html')) {
  console.error('Canonical UX/UI source does not look like an HTML document.');
  process.exit(1);
}

await mkdir(resolve('public'), { recursive: true });
await copyFile(source, target);

const targetBytes = await readFile(target);
if (!sourceBytes.equals(targetBytes)) {
  console.error('UX/UI sync failed: public/index.html is not byte-identical to the source.');
  process.exit(1);
}

const sha256 = createHash('sha256').update(sourceBytes).digest('hex');
console.log(`PET NIKA UX/UI synced byte-for-byte to public/index.html`);
console.log(`bytes: ${sourceBytes.length}`);
console.log(`sha256: ${sha256}`);
