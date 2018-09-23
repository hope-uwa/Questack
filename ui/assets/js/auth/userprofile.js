const userQuestionsUrl = '/api/v1/users/questions';
const userAnswersUrl = '/api/v1/users/answers';
const allQuestionUrl = '/api/v1/questions';
const questionD = document.querySelector('#question-asked');
const answersD = document.querySelector('#answers-given');
const questionDiv = document.querySelector('#all');
const messageBox = document.querySelector('.message');



// get all questions
const allquestions = () => {
  fetch(allQuestionUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    credentials: 'same-origin'
  }).then((response) => {
    response.json().then((message) => {
      if (response.status !== 200) {
        messageBox.classList.add('message-failure');
        messageBox.classList.remove('message-success');
        messageBox.innerHTML = message.message;
        messageBox.classList.remove('hide');
        // return null;
      }

      let questions = ''
      if (message.message.length === 0) {
        questions += 'No questions added yet';
      } else {

        let x;
        const allQuestions = document.getElementsByClassName('no-of-all-q');
        for (x = 0; x < allQuestions.length; x += 1) {
          allQuestions[x].innerHTML = message.message.length;

        }
        console.log(message.message)
        message.message.forEach((question) => {
          // console.log(question)
          questions += `<div class="questions-card">
                <div class="question__avatar">
                    <span class="unanswered question__avatar-img">${question.user_name.charAt(0)}</span>
                </div>
                <div class="question__content">
                    <h4 class="question__content-title "><a class="link-nostyle blckgrey-text" href="/questions/${question.id}">${question.question_title}</a></h4>
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
allquestions();



// get users questions
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
        messageBox.classList.add('message-failure');
        messageBox.classList.remove('message-success');
        messageBox.innerHTML = message.message;
        messageBox.classList.remove('hide');
        // return null;
      } else {
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
                      <span class="unanswered question__avatar-img">${username.charAt(0)}</span>
                  </div>
                  <div class="question__content">
                      <h4 class="question__content-title "><a class="link-nostyle blckgrey-text" href="/questions/${question.id}">${question.question_title}</a></h4>
                      <div class="question__content-description">
                          <span>${moment(question.created_at).fromNow()} by </span>
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
        questionD.innerHTML = questions;
      }

    });
  })
    .catch((err) => {
      console.log(err)
    });
  return null;

}
userQuestion();


// get users answers
const userAnswers = () => {
  fetch(userAnswersUrl, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`
    },
    credentials: 'same-origin'
  }).then((response) => {
    response.json().then((message) => {
      if (response.status !== 200) {
        messageBox.classList.add('message-failure');
        messageBox.classList.remove('message-success');
        messageBox.innerHTML = message.message;
        messageBox.classList.remove('hide');
        // return null;
      } else {
        let answers = ''
        if (typeof message.data === 'string') {
          answers += message.data;
        } else {
          console.log(message.data)

          let x;
          const answersGiven = document.getElementsByClassName('no-of-a');
          for (x = 0; x < answersGiven.length; x += 1) {
            answersGiven[x].innerHTML = message.data.length;
          }





          message.data.forEach((answer) => {
            console.log(answer)
            answers += `<div class="questions-card">
                      
                      <div class="question__content">
                          <h4 class="question__content-title ">Question: <a class="link-nostyle blckgrey-text" href="/questions/${answer.question_id}">${answer.question_title}</a></h4>
                          <div class="question__content-description">
                              <span>Answered ${moment(answer.created_at).fromNow()} by You  &nbsp; &nbsp;</span>
                              <span class="hide-md-show-sm answer-given" onclick="displayAnswerBox(${answer.id})"><i  class="fa fa-pencil" ></i> &nbsp; </span>
                          </div>
                          <div class="question__content-body">
                            <b>Your Answer:</b> <span id="a${answer.id}">${answer.answer_body}</span>
                          </div>
                          <div class="question__content-edit" id="e${answer.id}" >
                              <form id="edit-form${answer.id}">
                                  <textarea id="answer${answer.id}" name="" class="w100" placeholder="${answer.answer_body}" value="${answer.answer_body}" cols="30" rows="5"></textarea>
                                  <button type="button" onclick="edit(${answer.id}, ${answer.question_id})" class="btn-sm btn-success align-right" id="editButton${answer.id}" >Update Answer</button>
                                  <button>Cancel</button>
                                  </form>
                              

                          </div>
                      </div>
                      <div class="question__response">
                          
                          <span class="show-md-hide-sm toggle-answer" onclick="displayAnswerBox(${answer.id})" id="story"><i class="fa fa-pencil"></i> &nbsp; </span>
                      </div>
                  </div>
                `;

          })

        }
        answersD.innerHTML = answers;
      }


    });
  })
    .catch((err) => {
      console.log(err)
    });
  return null;

}
userAnswers();


const displayAnswerBox = (element) => {
  const answerContent = document.getElementById(`a${element}`);
  document.getElementById(`e${element}`).style.display = 'block'
  answerContent.style.display = 'none';
  document.getElementById(`answer${element}`).innerHTML = answerContent.textContent;

}

// editanswer
const edit = (aid, qid) => {
// const editAnswerForm = document.getElementById(`edit-form${answerId}`);
  const editAnswerUrl = `../api/v1/questions/${qid}/answers/${aid}`;
  const answerBody = document.getElementById(`answer${aid}`).value;
  const editBtn = document.getElementById(`editButton${aid}`);
  editBtn.innerHTML = 'Processing....'
  
  fetch(editAnswerUrl, {
    method: 'PUT',
    body: JSON.stringify({ body: answerBody }),
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`
    }

  }).then((response) => {
    response.json().then((message) => {
      if (response.status !== 201) {
        messageBox.classList.add('message-failure');
        messageBox.classList.remove('message-success');
        messageBox.innerHTML = message.message;
        messageBox.classList.remove('hide');
        editBtn.disabled = false;
        editBtn.innerHTML = 'Update Answer'
        // return null;
      } else {
        messageBox.classList.add('message-success');
        messageBox.classList.remove('message-failure');
        messageBox.innerHTML = message.message;
        messageBox.classList.remove('hide');

        window.setTimeout(() => { window.location.href = '/profile?thread=answers-given'; }, 1000);
        //   return null;
      }
    })
  })
    .catch((err) => {
      console.log(err)
    })

}



