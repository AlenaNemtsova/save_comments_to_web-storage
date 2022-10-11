const button = document.querySelector('.send-btn');
const nameField = document.querySelector('.name');
const commentField = document.querySelector('.comment-input');
const iconField = document.querySelector('.icon');

const comments = localStorage.getItem('comments') ? JSON.parse(localStorage.getItem('comments')) : [];

document.addEventListener('DOMContentLoaded', function () {
    //проверяем, есть ли уже в localStorage имя и аватар пользователя
    let showUserName = localStorage.getItem('user-name');
    let showAvatar = localStorage.getItem('avatar');

    //при загрузке страницы показываем сохранённое имя и аватар в инпутах
    if (showUserName !== null) {
        nameField.value = showUserName;
    }

    if (showAvatar !== null) {
        iconField.value = showAvatar;
    }

    generateChat(showUserName, showAvatar); //если имя и аватар есть в localStorage, отображаем все сообщения пользователя
});


function saveComment() {
    let userName = nameField.value.trim();
    let comment = commentField.value.trim();
    let avatar = iconField.value;
    console.log(avatar);

    if (userName !== '') {

        if (comment !== '') {
            const checkSpam = () => comment.replace(/viagra|xxx/gi, '***');
            comments.push(checkSpam());

            if (localStorage.getItem('user-name') == null) {
                localStorage.setItem('user-name', userName);
            }

            if (localStorage.getItem('avatar') == null) {
                localStorage.setItem('avatar', avatar);
            }

            localStorage.setItem('comments', JSON.stringify(comments)); //сохраняем весь массив комментов

            generateChat(userName, avatar);

            commentField.value = '';
            //очищаем текстовое поля после отправки комментария (почему comment = ''; не работает?)
        }


    } else {
        document.querySelector('#error').textContent = "Ну как же вас зовут?"
    }
}

function generateChat(userName, avatar) {
    let newComment = '';
    for (let comment of comments) {

        newComment += `<div class="chat-flex"><div class="chat__icon">
            <img class="icon-chat" src="${avatar}" alt="" />
          </div>
          <div class="chat__text">
            <p class="chat__name">${userName}</p>
            <p class="chat__comment">${comment}</p>
          </div></div>`;
        document.querySelector('.chat').innerHTML = newComment;
    }
}

//перезаписывает имя пользователя в localStorage, если пользователь хочет изменить имя
function changeName() {
    if (localStorage.getItem('user-name') !== null) {

        let answer = confirm("Хотите изменить имя?");
        if (answer) {
            let newUserName = nameField.value.trim();

            if (newUserName !== '') {
                localStorage.removeItem('user-name');
                localStorage.setItem('user-name', newUserName);
                nameField.value = newUserName; //показываем новое имя в поле Ваше имя:
                document.querySelector('#error').textContent = ''; //убираем сообщение об ошибке
            };
        };
    } return;
}


button.addEventListener('click', saveComment);
nameField.addEventListener('change', changeName);

