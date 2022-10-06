
const templateAnswer = () => {
  const questionBlocks = document.querySelectorAll('.formulation');
  console.log(questionBlocks);

  const questions = Object.keys(data);

  questionBlocks.forEach((block) => {
    const blockHTML = block.innerHTML;
    questions.forEach((question) => {
      if (new RegExp(question, 'gi').test(blockHTML)) {
        const answers = block.querySelectorAll('.flex-fill.ml-1');
        const rightAnswer = [...answers].filter((answer) => new RegExp(answer.innerText, 'gi').test(data[question]))[0];
        rightAnswer.parentElement.parentElement.querySelector('input').checked = true;
      }
    });
  });
}