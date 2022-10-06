import path from 'path';
import { promises as fs } from 'fs';
import { parse } from 'node-html-parser';

import { BLOCK_CLASSNAME, QUERY_CLASSNAME, STATE_CLASSNAME } from './constants.js';

export const parseAnswers = async (directoryPath, filenames) => {
  let questionCount = 0;
  const successfulQuestions = [];
  for (let i = 0; i < filenames.length; i++) {
    console.log(`Processing file ${path.resolve(directoryPath, filenames[i])}`);

    const data = await fs.readFile(path.resolve(directoryPath, filenames[i]));

    const root = parse(data.toString());

    const queryBlocks = root.querySelectorAll(`.${BLOCK_CLASSNAME}`);
    questionCount += queryBlocks.length;

    const successful = queryBlocks
      .filter((block) => {
        const state = block.querySelector(`.${STATE_CLASSNAME}`).innerHTML.toLowerCase();
        return (!state.includes('неверно') && state.includes('верно')) || state.includes('выполнен');
      });

    const questions = successful.map((block) => ({
      question: block.querySelector(`.${QUERY_CLASSNAME}`).innerText,
      answer: block.querySelectorAll('input')
        .filter((elem) => elem.attributes.checked)
        .map((elem) => block.getElementById(`${elem.id}_label`).innerText)[0],
    }));

    successfulQuestions.push(...questions);
  }

  console.log('\n');
  console.log('Questions received: ', questionCount);
  console.log('Successful: ', successfulQuestions.length);

  const uniqueSet = new Set(successfulQuestions.map((elem) => elem.question));
  console.log('Unique: ', uniqueSet.size);

  const questionsMap = new Map();
  uniqueSet.forEach((question) => {
    questionsMap.set(question, successfulQuestions
      .find((elem) => elem.question === question).answer);
  });
  console.log(questionsMap);
};
