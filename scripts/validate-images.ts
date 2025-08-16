import fs from 'node:fs';
import path from 'node:path';

type Img = { src: string };

// Import the real data from ImageStack component
const categories = [
  {
    key: 'rodeo',
    title: 'Rodeo',
    hasSubCategories: false,
    images: [
      { id: 1,  src: '/images/rodeo/tucson/tucson.png',  title: 'Tucson',   category: 'Rodeo' },
      { id: 2,  src: '/images/rodeo/tucson/tucson1.png', title: 'Tucson1',  category: 'Rodeo' },
      { id: 3,  src: '/images/rodeo/tucson/tucson10.png', title: 'Tucson10', category: 'Rodeo' },
      { id: 4,  src: '/images/rodeo/tucson/tucson11.png', title: 'Tucson11', category: 'Rodeo' },
      { id: 5,  src: '/images/rodeo/tucson/tucson12.png', title: 'Tucson12', category: 'Rodeo' },
      { id: 6,  src: '/images/rodeo/tucson/tucson13.png', title: 'Tucson13', category: 'Rodeo' },
      { id: 7,  src: '/images/rodeo/tucson/tucson14.png', title: 'Tucson14', category: 'Rodeo' },
      { id: 8,  src: '/images/rodeo/tucson/tucson15.png', title: 'Tucson15', category: 'Rodeo' },
      { id: 9,  src: '/images/rodeo/tucson/tucson2.png',  title: 'Tucson2',  category: 'Rodeo' },
      { id: 10, src: '/images/rodeo/tucson/tucson3.png',  title: 'Tucson3',  category: 'Rodeo' },
      { id: 11, src: '/images/rodeo/tucson/tucson4.png',  title: 'Tucson4',  category: 'Rodeo' },
      { id: 12, src: '/images/rodeo/tucson/tucson5.png',  title: 'Tucson5',  category: 'Rodeo' },
      { id: 13, src: '/images/rodeo/tucson/tucson6.png',  title: 'Tucson6',  category: 'Rodeo' },
      { id: 14, src: '/images/rodeo/tucson/tucson7.png',  title: 'Tucson7',  category: 'Rodeo' },
      { id: 15, src: '/images/rodeo/tucson/tucson8.png',  title: 'Tucson8',  category: 'Rodeo' },
      { id: 16, src: '/images/rodeo/tucson/tucson9.png',  title: 'Tucson9',  category: 'Rodeo' },
      { id: 17, src: '/images/rodeo/prescott/prescott.jpg',  title: 'Prescott',  category: 'Rodeo' },
      { id: 18, src: '/images/rodeo/prescott/prescott1.jpg', title: 'Prescott1', category: 'Rodeo' },
      { id: 19, src: '/images/rodeo/prescott/prescott10.jpg',title: 'Prescott10',category: 'Rodeo' },
      { id: 20, src: '/images/rodeo/prescott/prescott2.jpg', title: 'Prescott2', category: 'Rodeo' },
      { id: 21, src: '/images/rodeo/prescott/prescott3.jpg', title: 'Prescott3', category: 'Rodeo' },
      { id: 22, src: '/images/rodeo/prescott/prescott4.jpg', title: 'Prescott4', category: 'Rodeo' },
      { id: 23, src: '/images/rodeo/prescott/prescott5.jpg', title: 'Prescott5', category: 'Rodeo' },
      { id: 24, src: '/images/rodeo/prescott/prescott6.jpg', title: 'Prescott6', category: 'Rodeo' },
      { id: 25, src: '/images/rodeo/prescott/prescott7.jpg', title: 'Prescott7', category: 'Rodeo' },
      { id: 26, src: '/images/rodeo/prescott/prescott8.jpg', title: 'Prescott8', category: 'Rodeo' },
      { id: 27, src: '/images/rodeo/prescott/prescott9.jpg', title: 'Prescott9', category: 'Rodeo' }
    ]
  },
  { 
    key: 'portraiture', 
    title: 'Portraiture', 
    hasSubCategories: false, 
    images: [
      { id: 1, src: '/images/portraiture/cn.avif', title: 'CN', category: 'Portraiture' },
      { id: 2, src: '/images/portraiture/cndesert.jpg', title: 'Cndesert', category: 'Portraiture' },
      { id: 3, src: '/images/portraiture/cat1.avif', title: 'Cat1', category: 'Portraiture' },
      { id: 4, src: '/images/portraiture/cat2.avif', title: 'Cat2', category: 'Portraiture' },
      { id: 5, src: '/images/portraiture/cat3.avif', title: 'Cat3', category: 'Portraiture' },
      { id: 6, src: '/images/portraiture/cat.png', title: 'Cat', category: 'Portraiture' },
      { id: 7, src: '/images/portraiture/rach1.avif', title: 'Rach1', category: 'Portraiture' },
      { id: 8, src: '/images/portraiture/ally.png', title: 'Ally', category: 'Portraiture' },
            { id: 9, src: '/images/portraiture/ally2.png', title: 'Ally2', category: 'Portraiture' },
      { id: 10, src: '/images/portraiture/ally3.png', title: 'Ally3', category: 'Portraiture' },
      { id: 11, src: '/images/portraiture/car.jpg', title: 'Car', category: 'Portraiture' },
      { id: 12, src: '/images/portraiture/port1.jpg', title: 'Port1', category: 'Portraiture' },
      { id: 13, src: '/images/portraiture/port2.jpg', title: 'Port2', category: 'Portraiture' }
    ] 
  },
  { 
    key: 'brandwork', 
    title: 'Brand Work', 
    hasSubCategories: false, 
    images: [
      { id: 1, src: '/images/brandwork/arlierecess.jpg', title: 'Recess Mood Drinks', category: 'Brand Work' },
      { id: 2, src: '/images/brandwork/arlierecess2.jpg', title: 'Recess Mood Drinks', category: 'Brand Work' },
      { id: 3, src: '/images/brandwork/bbc.JPG', title: 'Blue Bottle Coffee x Samara Origins', category: 'Brand Work' },
      { id: 4, src: '/images/brandwork/bbc2.JPG', title: 'Blue Bottle Coffee x Samara Origins', category: 'Brand Work' },
      { id: 5, src: '/images/brandwork/savage.png', title: 'Savage x Fenty', category: 'Brand Work' }
    ] 
  }
];

// Gather all images from categories
function gatherAllImages(): Img[] {
  return categories.flatMap(cat => cat.images || []);
}

const imgs = gatherAllImages();
const missing: string[] = [];
const remoteHosts = new Set<string>();
const suspiciousCase: string[] = [];

function existsCaseInsensitive(absPath: string) {
  const dir = path.dirname(absPath);
  const base = path.basename(absPath);
  if (!fs.existsSync(dir)) return false;
  const entries = fs.readdirSync(dir);
  const hit = entries.find(e => e.toLowerCase() === base.toLowerCase());
  if (hit && hit !== base) suspiciousCase.push(path.join(dir, hit) + ' vs ' + base);
  return !!hit;
}

for (const { src } of imgs) {
  if (!src || typeof src !== 'string') continue;
  if (src.startsWith('http')) {
    try { remoteHosts.add(new URL(src).hostname); } catch {}
    continue;
  }
  const clean = src.startsWith('/') ? src.slice(1) : src;
  const abs = path.join(process.cwd(), 'public', clean);
  if (!existsCaseInsensitive(abs)) missing.push('/' + clean);
}

console.log('— Image Validation —');
console.table({ total: imgs.length, missing: missing.length, remoteHosts: remoteHosts.size });
if (missing.length) {
  console.log('\nMissing local files:');
  for (const m of missing) console.log('  ' + m);
}
if (suspiciousCase.length) {
  console.log('\nPossible case mismatches:');
  for (const s of suspiciousCase) console.log('  ' + s);
}
if (remoteHosts.size) {
  console.log('\nRemote hosts detected:');
  for (const h of remoteHosts) console.log('  ' + h);
}
