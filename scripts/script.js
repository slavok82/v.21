const xhr = new XMLHttpRequest();
const URL = 'https://reqres.in/api';
const userTemplate = document.getElementById('user').innerHTML;
const cardList = document.getElementById('cards');
const prev = document.getElementById('prev');
const next = document.getElementById('next');
const newUser = document.getElementById('create');
const getUsers = (page = 1) => {
  xhr.open('GET', `${URL}/users?page=${page}`, false)
  xhr.send();
  return JSON.parse(xhr.response);
}
const addUserCardList = (users, template) => {
  let result = '';
  users
    .map((user) => {
      return {
        ...user,
        name: `${user.first_name} ${user.last_name}`
      }    
    })
    .forEach(user => {
      result += template
        .replaceAll('{{name}}', user.name)
        .replaceAll('{{email}}', user.email)
        .replaceAll('{{avatar}}', user.avatar)
    });          
  cardList.innerHTML = result;
}
(() => {
  let currentPage = 1;
  const {data: users} = getUsers(currentPage);    
  addUserCardList(users, userTemplate);  
  next.addEventListener('click', () => {
    const {data: users} = getUsers(++currentPage);
    addUserCardList(users, userTemplate);
  });
  prev.addEventListener('click', () => {
    const {data: users} = getUsers(--currentPage);
    addUserCardList(users, userTemplate);
  });
  newUser.addEventListener('click', () => {
    createUser();
  });
})();