import * as sharp from 'sharp';
import { promisify } from 'util';
import { createWriteStream, mkdir, mkdirSync, unlink } from 'fs';
import { dirname, join } from 'path';


interface CombineTilesOptions {
  outputDir: string;
  outputFilename: string;
}

interface CompositeImageTilesProps {
  tiles: TileData[],
  options: CombineTilesOptions
}

async function compositeImageTiles(props: CompositeImageTilesProps) {
  const { outputDir, outputFilename } = props.options;

  // Make sure the output directory exists
  mkdirSync(outputDir, { recursive: true })

  // Calculate the size of the final image
  const rows = Math.max(...props.tiles.map(t => t.rowID));
  const cols = Math.max(...props.tiles.map(t => t.colID));

  const { width, height } = await sharp(props.tiles[0].url).metadata()

  if (width === undefined || height === undefined) {
    console.error("invalid width or height");
    return;
  }

  const finalWidth = (cols + 1) * width;
  const finalHeight = (rows + 1) * height;

  // Load each tile and composite them into the final image
  const result = sharp({
    create: {
      width: finalWidth,
      height: finalHeight,
      channels: 4,
      background: { r: 0, g: 0, b: 0, alpha: 0 },
    },
  }).png();

  const tileBuffers = await Promise.all(
    props.tiles.map(async (tile) => {
      const buffer = await sharp(tile.url).resize(width, height).toBuffer();
      return {
        input: buffer,
        left: tile.colID * width,
        top: tile.rowID * height
      };
    })
  );

  await result.composite(tileBuffers)
  await result.toFile(join(outputDir, outputFilename));

  // Remove tile files
  for (const tile of props.tiles) {
    await unlink(tile.url, (err) => {
      if (err) {
        console.error(`Error deleting file ${tile.url}`)
      }
    })
  }

  console.log({finalWidth, finalHeight})
  return [finalWidth, finalHeight];
}



export default compositeImageTiles;