// Просте API з тестовими користувачами
const API_URL = 'https://jsonplaceholder.typicode.com/users';

const loadBtn = document.getElementById('load-users-btn');
const usersList = document.getElementById('users-list');
const statusText = document.getElementById('status-text');

// Обробник натискання кнопки
loadBtn.addEventListener('click', () => {
  // Показуємо статус
  statusText.textContent = 'Завантажую дані...';
  statusText.style.color = '#e5e7eb';

  // fetch повертає Promise
  fetchUsers()
    .then(users => {
      renderUsers(users);
      statusText.textContent = `Завантажено ${users.length} користувачів ✅`;
    })
    .catch(error => {
      console.error(error);
      statusText.textContent = 'Сталася помилка при завантаженні 😢';
      statusText.style.color = '#f97373';
    });
});

// Функція, яка повертає Promise (через fetch)
function fetchUsers() {
  // fetch сам повертає Promise, але ми ще раз показуємо ланцюжок then/catch
  return fetch(API_URL).then(response => {
    if (!response.ok) {
      // Якщо код не 200–299 — кидаємо помилку
      return Promise.reject(new Error('HTTP error: ' + response.status));
    }
    // перетворюємо JSON → JS об'єкт (це теж Promise)
    return response.json();
  });
}

// Рендер карток користувачів
function renderUsers(users) {
  usersList.innerHTML = '';

  users.forEach(user => {
    const card = document.createElement('article');
    card.className = 'user-card';

    card.innerHTML = `
      <h3 class="user-card__name">${user.name}</h3>
      <p class="user-card__email">${user.email}</p>
      <p class="user-card__meta">
        Компанія: ${user.company.name}<br>
        Місто: ${user.address.city}
      </p>
    `;

    usersList.appendChild(card);
  });
}
