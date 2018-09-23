const questionForm = document.getElementById('question-form');
const postQuestionUrl = '../api/v1/questions';
const askBtn = document.getElementById('submitQuestion');
const cancelBtn = document.getElementById('cancel-question')


questionForm.addEventListener('submit', (event) => {
  event.preventDefault();
  askBtn.disabled = true;
  askBtn.innerHTML = 'Processing..';
  cancelBtn.style.display = 'none'
  const title = document.getElementById('title').value;
  const body = document.getElementById('body').value;
  // add conditonal statements here

  console.log(title)
  console.log(title)
  fetch(postQuestionUrl, {
    method: 'POST',
    body: JSON.stringify({ title: title, body: body }),
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
        askBtn.disabled = false;
        cancelBtn.style.display = 'inline-block'
        askBtn.innerHTML = 'Publish'
        // return null;
      } else {
        messageBox.classList.add('message-success');
        messageBox.classList.remove('message-failure');
        messageBox.innerHTML = message.message;
        messageBox.classList.remove('hide');
        document.getElementById('questionBanner').style.display = 'none';
        window.setTimeout(() => { window.location.href = '/profile'; }, 1000);
        //   return null;
      }




    })
  })
    .catch((err) => {
      console.log(err)
    })



})
