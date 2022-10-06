
const templateAnswer = () => {
  const questionBlocks = document.querySelectorAll('.formulation');

  let solutionsCount = 0;

  const questions = Object.keys(data);

  questionBlocks.forEach((block) => {
    const blockHTML = block.innerHTML;
    questions.forEach((question) => {
      if (new RegExp(question, 'gi').test(blockHTML)) {
        const answers = block.querySelectorAll('.flex-fill.ml-1');
        const rightAnswer = [...answers].filter((answer) => new RegExp(answer.innerText, 'gi').test(data[question]))[0];
        rightAnswer.parentElement.parentElement.querySelector('input').checked = true;

        solutionsCount++;
      }
    });
  });

  console.log('Разработчики постарались 🥴');
  console.log('Всего вопросов на странице: ', questionBlocks.length);
  console.log('Заполнено вопросов: ', solutionsCount);
}