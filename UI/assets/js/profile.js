const params = (new URL(document.location)).searchParams;
const thread = params.get('thread');
console.log(thread)
// let params = (new URL(document.location)).searchParams;
// let name = params.get("name"); // is the string "Jonathan"
// let age = parseInt(params.get("age")); // is the number 18
const threadTitle = document.getElementById('thread-title')
const questionAsked = document.getElementById('question-asked');
const answersGiven = document.getElementById('answers-given');
const answered = document.getElementById('answered');
const all = document.getElementById('all');



if (thread === 'question-asked') {
  threadTitle.innerHTML = 'Questions Asked';
  questionAsked.style.display = 'display';
  answersGiven.style.display = 'none';
  answered.style.display = 'none';
  all.style.display = 'none';
} else if (thread === 'answers-given') {
  threadTitle.innerHTML = 'Your Answers';
  questionAsked.style.display = 'none';
  answersGiven.style.display = 'display';
  answered.style.display = 'none';
  all.style.display = 'none';
} else if (thread === 'all') {
  threadTitle.innerHTML = 'All Questions';
  questionAsked.style.display = 'none';
  answersGiven.style.display = 'none';
  answered.style.display = 'none';
  all.style.display = 'display';
} else if (thread === 'youranswer') {
  threadTitle.innerHTML = 'Your Answers';
  questionAsked.style.display = 'none';
  answersGiven.style.display = 'none';
  all.style.display = 'none';
  answered.style.display = 'display';

} else {
  threadTitle.innerHTML = 'All Questions';
  questionAsked.style.display = 'none';
  answersGiven.style.display = 'none';
  answered.style.display = 'none';
  all.style.display = 'display';

}
