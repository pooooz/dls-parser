import path from 'path';
import { fileURLToPath } from 'url';

import { getFileNames } from './getFileNames/index.js';
import { parseAnswers } from './parseAnswers/index.js';
import { generateAnswers } from './generateAnswers/index.js';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const questionPath = path.resolve(__dirname, '../pages');

const fileNames = await getFileNames(questionPath);

const answers = await parseAnswers(questionPath, fileNames);

await generateAnswers(path.resolve(__dirname, '../results'), answers);
