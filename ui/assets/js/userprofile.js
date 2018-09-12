const userQuestionsUrl = '/api/v1/users/questions';
const questionDiv = document.getElementById('all');
const token = localStorage['ascii-mt-token'];
const username = localStorage['ascii-mt-username'];
console.log(username)

let i;
const elements = document.getElementsByClassName('user');
for (i = 0; i < elements.length; i += 1) {
  elements[i].innerHTML = username;
}

const userQuestion = () => {
  fetch(userQuestionsUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`
    },
    credentials: 'same-origin'
  }).then((response) => {
    response.json().then((message) => {
      if (response.status !== 200) {

        return null;
      }

      let questions = ''
      if (typeof message.data === 'string') {
        questions += message.data;
      } else {
        console.log(message.data)
        
        let x;
        const questionAsked = document.getElementsByClassName('no-of-q');
        for (x = 0; x < questionAsked.length; x += 1) {
          questionAsked[x].innerHTML = message.data.length;
        }

        message.data.forEach((question) => {
          console.log(question)
          questions += `<div class="questions-card">
                  <div class="question__avatar">
                      <span class="unanswered question__avatar-img"><i class="fa fa-exclamation"></i></span>
                  </div>
                  <div class="question__content">
                      <h4 class="question__content-title "><a class="link-nostyle blckgrey-text" href="/questions/${question.id}">${question.question_title}</a></h4>
                      <div class="question__content-description">
                          <span>7 days ago by </span>
                          <span class=""><a class="green-text mr2" href="">You</a></span><span class="hide-md-show-sm answer-given"><i class="fa fa-comments-o"></i> &nbsp; 5</span>
                      </div>
                      <div class="question__content-body">
                          <span>${question.question_body.substring(0, 150)}</span>
                      </div>
                  </div>
                  <div class="question__response">
                      
                      <span class="show-md-hide-sm"><i class="fa fa-comments-o"></i> &nbsp; 5</span>
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
userQuestion();

const logout = () => {
  localStorage.removeItem('ascii-mt-token');
  window.location.href = '/';
};
