// Пример с использованием Promises без async/await
function getRandomActivityWithPromise() {
  fetch('https://jsonplaceholder.typicode.com/posts')
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const randomIndex = Math.floor(Math.random() * data.length);
      const activityElement = document.getElementById('activity');
      const activity = data[randomIndex].title;
      activityElement.textContent = activity;
    })
    .catch(error => {
      console.error('Error fetching activity:', error);
      return 'К сожалению, произошла ошибка';
    });
}


async function getRandomActivity() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.length);
    return data[randomIndex].title;  // Например, используем заголовок поста как активность
  } catch (error) {
    console.error('Error fetching activity:', error);
    return 'К сожалению, произошла ошибка';
  }
}

async function updateActivity() {
  const activity = await getRandomActivity();
  const activityElement = document.getElementById('activity');
  activityElement.textContent = activity;
}


// Асинхронная функция, которая сразу вставляет данные в элемент
async function insertActivityDirectly() {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    const randomIndex = Math.floor(Math.random() * data.length);
    const activity = data[randomIndex].title;
    const activityElement = document.getElementById('activity');
    activityElement.textContent = activity;
  } catch (error) {
    console.error('Error fetching activity:', error);
    const activityElement = document.getElementById('activity');
    activityElement.textContent = 'К сожалению, произошла ошибка';
  }
}

// Initial call to display an activity on page load
// updateActivity();

// setInterval(updateActivity, 60000);

getRandomActivityWithPromise();

// insertActivityDirectly();