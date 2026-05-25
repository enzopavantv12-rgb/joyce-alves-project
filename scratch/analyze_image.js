import { Jimp } from 'jimp';

async function run() {
  const imagePath = 'public/depoimentos/depoimento-insta-3-imagem.png';
  const image = await Jimp.read(imagePath);
  
  // Crop precisely the story photo card with refined coordinates:
  // x: 220, y: 450, w: 250, h: 480
  const cropped = image.clone().crop({
    x: 220,
    y: 450,
    w: 250,
    h: 480
  });
  
  const outputPath = 'public/depoimentos/graciele-foto.jpg';
  await cropped.write(outputPath);
  console.log('Saved cropped photo to:', outputPath);
}

run().catch(console.error);
