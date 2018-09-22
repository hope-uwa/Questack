const questionUrl = '/api/v1/questions';
const questionDiv = document.querySelector('.allquestion')


const allquestion = () => {
  fetch(questionUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  }).then((response) => {
    response.json().then((message) => {
      if (response.status !== 200) {
        return null;
      }
      let questions = ''
      if (message.message.length === 0 || message.status === '204-No Content') {
        questions += 'No questions added yet';
      } else {
        
        message.message.forEach((question) => {
          
          questions += `<div class="questions-card">
                <div class="question__avatar">
                    <span class="unanswered question__avatar-img">${question.user_name.charAt(0)}</span>
                </div>
                <div class="question__content">
                    <h4 class="question__content-title "><a class="link-nostyle blckgrey-text" href="/question/${question.id}">${question.question_title}</a></h4>
                    <div class="question__content-description">
                        <span>${moment(question.created_at).fromNow()}</span> by 
                        <span class="mr2"><a class="green-text" href=""> ${question.user_name}</a></span><span class="hide-md-show-sm answer-given"><i class="fa "></i> &nbsp; </span>
                    </div>
                    <div class="question__content-body">
                        <span>${question.question_body.substring(0, 150)}</span>
                    </div>
                </div>
                <div class="question__response">
                    
                    <span class="show-md-hide-sm"><i class="fa "></i> &nbsp; </span>
                </div>
                </div>
                `;
        })

      }
      questionDiv.innerHTML = questions;
    });
  })
    .catch((err) => {
      console.log(err)
    });
  return null;
}
allquestion();
