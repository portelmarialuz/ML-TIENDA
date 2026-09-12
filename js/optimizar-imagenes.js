/**
 * optimizar-imagenes.js
 * ----------------------------------------------------
 * Recorre la carpeta "img" del proyecto, redimensiona cada
 * imagen a un ancho máximo razonable para web y la convierte
 * a formato WebP (mucho más liviano que JPG/PNG).
 *
 * NO borra ni sobreescribe tus imágenes originales: crea una
 * carpeta nueva "img-optimizadas" con la misma estructura de
 * subcarpetas (delineador, labiales, etc).
 *
 * INSTALACIÓN (una sola vez):
 *   npm install sharp
 *
 * USO:
 *   node optimizar-imagenes.js
 *
 * Opcional, para ajustar ancho o calidad:
 *   node optimizar-imagenes.js --width=1000 --quality=75
 * ----------------------------------------------------
 */

const fs = require("fs");
const path = require("path");
const sharp = require("sharp");

// ---------- CONFIGURACIÓN ----------
const CARPETA_ORIGEN = path.join(__dirname, "img");
const CARPETA_DESTINO = path.join(__dirname, "img-optimizadas");
const EXTENSIONES_VALIDAS = [".jpg", ".jpeg", ".png"];

// Se pueden pasar por línea de comandos: --width=800 --quality=80
const args = Object.fromEntries(
  process.argv.slice(2).map(arg => {
    const [key, value] = arg.replace(/^--/, "").split("=");
    return [key, value];
  })
);

const ANCHO_MAXIMO = parseInt(args.width) || 800;   // px
const CALIDAD_WEBP = parseInt(args.quality) || 80;  // 0-100
// ------------------------------------

let totalOriginal = 0;
let totalOptimizado = 0;
let contadorArchivos = 0;

function formatearKB(bytes) {
  return (bytes / 1024).toFixed(1) + " KB";
}

async function procesarImagen(rutaOrigen, rutaDestino) {
  const pesoOriginal = fs.statSync(rutaOrigen).size;

  await sharp(rutaOrigen)
    .resize({ width: ANCHO_MAXIMO, withoutEnlargement: true })
    .webp({ quality: CALIDAD_WEBP })
    .toFile(rutaDestino);

  const pesoNuevo = fs.statSync(rutaDestino).size;

  totalOriginal += pesoOriginal;
  totalOptimizado += pesoNuevo;
  contadorArchivos++;

  const reduccion = (100 - (pesoNuevo / pesoOriginal) * 100).toFixed(1);
  console.log(
    `✔ ${path.relative(CARPETA_ORIGEN, rutaOrigen)}  ` +
    `${formatearKB(pesoOriginal)} → ${formatearKB(pesoNuevo)}  (-${reduccion}%)`
  );
}

async function recorrerCarpeta(carpetaActual, carpetaDestinoActual) {
  const items = fs.readdirSync(carpetaActual, { withFileTypes: true });

  if (!fs.existsSync(carpetaDestinoActual)) {
    fs.mkdirSync(carpetaDestinoActual, { recursive: true });
  }

  for (const item of items) {
    const rutaCompleta = path.join(carpetaActual, item.name);
    const rutaDestino = path.join(carpetaDestinoActual, item.name);

    if (item.isDirectory()) {
      await recorrerCarpeta(rutaCompleta, rutaDestino);
    } else {
      const ext = path.extname(item.name).toLowerCase();
      if (EXTENSIONES_VALIDAS.includes(ext)) {
        const nombreSalida = item.name.replace(ext, ".webp");
        const rutaSalida = path.join(carpetaDestinoActual, nombreSalida);
        try {
          await procesarImagen(rutaCompleta, rutaSalida);
        } catch (err) {
          console.error(`✘ Error procesando ${rutaCompleta}:`, err.message);
        }
      }
    }
  }
}

async function main() {
  if (!fs.existsSync(CARPETA_ORIGEN)) {
    console.error(`No se encontró la carpeta "img" en: ${CARPETA_ORIGEN}`);
    console.error("Ejecutá este script desde la raíz del proyecto (ML TIENDA).");
    process.exit(1);
  }

  console.log(`Optimizando imágenes (ancho máx: ${ANCHO_MAXIMO}px, calidad: ${CALIDAD_WEBP})...\n`);

  await recorrerCarpeta(CARPETA_ORIGEN, CARPETA_DESTINO);

  console.log("\n---------------------------------------------");
  console.log(`Archivos procesados: ${contadorArchivos}`);
  console.log(`Peso original total:    ${(totalOriginal / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Peso optimizado total:  ${(totalOptimizado / 1024 / 1024).toFixed(2)} MB`);
  console.log(`Reducción total: ${(100 - (totalOptimizado / totalOriginal) * 100).toFixed(1)}%`);
  console.log("---------------------------------------------");
  console.log(`\nListo. Revisá la carpeta "img-optimizadas".`);
  console.log(`Si te gusta el resultado, reemplazá la carpeta "img" por esta`);
  console.log(`y actualizá las extensiones ".jpg"/".png" a ".webp" en main.js.`);
}

main();