import fs from 'node:fs';
import path from 'node:path';
import { generateProducts } from '../lib/mock/generateProducts';

const OUT_FILE = path.join(process.cwd(), 'lib', 'mock', 'products.data.json');

const products = generateProducts(100);

fs.writeFileSync(OUT_FILE, JSON.stringify(products, null, 2), 'utf-8');

console.log(`Generated ${products.length} products → ${OUT_FILE}`);
