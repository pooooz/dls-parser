import { promises as fs } from 'fs';
import path from 'path';

export const getFileNames = async (directoryPath) => {
  const files = await fs.readdir(directoryPath);
  return files.filter((filename) => path.extname(filename) === '.html');
};
