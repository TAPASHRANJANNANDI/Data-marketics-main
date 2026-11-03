// Rasterises each blog hero SVG to a 1200x630 PNG.
//
// LinkedIn, Facebook and X do not render SVG, so an og:image pointing at an
// .svg shows no preview card at all. The SVGs stay the source of truth and
// the PNGs next to them are the generated share images.
//
// Not part of `npm run build`: the output is committed, so the build does not
// need a native image dependency. Re-run it after editing a hero SVG:
//
//   npm i -D sharp && node scripts/generate-share-images.mjs
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(fileURLToPath(new URL('..', import.meta.url)));
const IMAGES = path.join(ROOT, 'public', 'blog-images');

// Open Graph's recommended size; also what LinkedIn and X expect.
const WIDTH = 1200;
const HEIGHT = 630;

// The SVGs ask for Figtree, which the browser loads as a webfont but the
// rasteriser cannot see. Point it at faces that are actually installed so
// the headline renders in a sane sans instead of whatever librsvg picks.
const RASTER_FONTS = "'Segoe UI','DejaVu Sans',Arial,Helvetica,sans-serif";

let sharp;
try {
    ({ default: sharp } = await import('sharp'));
} catch {
    console.error(
        '\nsharp is not installed. It is only needed to regenerate these images:\n' +
        '  npm i -D sharp && node scripts/generate-share-images.mjs\n'
    );
    process.exit(1);
}

const svgs = fs.readdirSync(IMAGES).filter(name => name.endsWith('.svg'));
if (!svgs.length) {
    console.error('No hero SVGs found in public/blog-images');
    process.exit(1);
}

for (const name of svgs) {
    const source = fs.readFileSync(path.join(IMAGES, name), 'utf8');
    const forFonts = source.replace(/font-family="[^"]*"/g, `font-family="${RASTER_FONTS}"`);
    const output = path.join(IMAGES, name.replace(/\.svg$/, '.png'));

    await sharp(Buffer.from(forFonts), { density: 192 })
        .resize(WIDTH, HEIGHT, { fit: 'cover' })
        .png({ compressionLevel: 9 })
        .toFile(output);

    const { size } = fs.statSync(output);
    console.log(`${name} -> ${path.basename(output)} (${Math.round(size / 1024)} KB)`);
}

console.log(`\nGenerated ${svgs.length} share images at ${WIDTH}x${HEIGHT}.\n`);
