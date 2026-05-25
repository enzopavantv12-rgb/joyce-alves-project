import fs from 'fs';
import path from 'path';

const dir = 'public/placeholders';
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const svgs = [
  { name: 'joyce-portrait.jpg', text: 'Joyce Alves Portrait' },
  { name: 'treatment-luminapele.jpg', text: 'Método Luminapele 360' },
  { name: 'treatment-peeling.jpg', text: 'Peeling Renovador' },
  { name: 'treatment-exo-harmony.jpg', text: 'EXO Harmony' },
  { name: 'treatment-microagulhamento.jpg', text: 'Microagulhamento' },
  { name: 'treatment-jato-plasma.jpg', text: 'Jato de Plasma' },
  { name: 'treatment-limpeza-premium.jpg', text: 'Limpeza Premium' },
  { name: 'treatment-limpeza-plus.jpg', text: 'Limpeza Plus' },
  { name: 'treatment-limpeza-basica.jpg', text: 'Limpeza Básica' },
  { name: 'treatment-psicanalise.jpg', text: 'Psicanálise' },
  { name: 'treatment-caminho-cura.jpg', text: 'Caminho de Cura' },
  { name: 'treatment-reiki.jpg', text: 'Reiki' },
  { name: 'treatment-apometria.jpg', text: 'Apometria' },
];

for (let i = 1; i <= 8; i++) {
  svgs.push({ name: `before-after-${i}-before.jpg`, text: `Antes ${i}` });
  svgs.push({ name: `before-after-${i}-after.jpg`, text: `Depois ${i}` });
}

for (let i = 1; i <= 4; i++) {
  svgs.push({ name: `environment-${i}.jpg`, text: `Ambiente ${i}` });
}

const template = (text) => `<svg width="800" height="800" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="#E8CDBC" />
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24px" fill="#5C4A3F">${text}</text>
</svg>`;

svgs.forEach(({name, text}) => {
  fs.writeFileSync(path.join(dir, name), template(text));
});

// Empty video
fs.writeFileSync(path.join(dir, 'hero-video.mp4'), '');

console.log('Placeholders created.');
