import path from 'path';
import { promises as fs } from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

export const generateAnswers = async (directoryPath, answers) => {
  console.log('Writing ', directoryPath);
  const jsonPath = path.resolve(directoryPath, 'results.json');
  const scriptPath = path.resolve(directoryPath, 'script.js');

  const script = await fs.readFile(path.resolve(__dirname, 'template.js'));

  try {
    await fs.stat(path.resolve(directoryPath));
  } catch (error) {
    await fs.mkdir(path.resolve(directoryPath));
  }

  try {
    await fs.stat(jsonPath);
    await fs.unlink(jsonPath);
    await fs.writeFile(jsonPath, JSON.stringify(Object.fromEntries(answers), null, '\n'));
  } catch (error) {
    await fs.writeFile(jsonPath, JSON.stringify(Object.fromEntries(answers), null, '\n'));
  }

  try {
    await fs.stat(scriptPath);
    await fs.unlink(scriptPath);
    await fs.writeFile(scriptPath, `const data = ${JSON.stringify(Object.fromEntries(answers))}`);
    await fs.appendFile(scriptPath, script.toString());
  } catch (error) {
    await fs.writeFile(scriptPath, `const data = ${JSON.stringify(Object.fromEntries(answers))}`);
    await fs.appendFile(scriptPath, script.toString());
  }
};
