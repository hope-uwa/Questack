// delete

const deleteBtn = document.getElementById('deleteButton')
const deleteUrl = `../api/v1/questions/${pageUrl}`
deleteBtn.addEventListener('click', (event) => {
  event.preventDefault();

  prompt('Are You Sure You want Delete it?')


  fetch(deleteUrl, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `${token}`
    }

  }).then((response) => {
    response.json().then((message) => {
      if (response.status !== 200) {
        alert(message.message);
        return null;
      }

      alert(message.message)
      window.setTimeout(() => { window.location.href = 'profile'; }, 1000);
      return null;
    })
  })
    .catch((err) => {
      console.log(err)
    })



})
