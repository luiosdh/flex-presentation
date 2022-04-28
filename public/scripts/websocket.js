document.addEventListener('DOMContentLoaded', function () {
    let websocket;
    let connected = false;

    setUserName();
    initWebSocket();
    activateFinishTaskNotificationListener();

    function setUserName() {
        const nameInput = document.querySelector('#nameInput');
        const setNameButton = document.querySelector('#setName');
        const name = localStorage.getItem('name');
        if (!name) localStorage.setItem('name', 'Invitado');
        if (setNameButton) {
            setNameButtonListener();
            displayStoredName();
        }
    }

    function setNameButtonListener() {
        setNameButton.addEventListener('click', function () {
            const name = nameInput.value;
            localStorage.setItem('name', name);
            localStorage.setItem('task', 'home');
            sendTaskFinishedNotification();
            location.reload();
        });
    }

    function displayStoredName() {
        if (localStorage.getItem('name') !== 'Invitado') {
            nameInput.style.display = 'none';
            setNameButton.style.display = 'none';
            const welcome = document.querySelector('#welcome');
            const logout = document.querySelector('#logout');
            welcome.textContent = `Bienvenido ${localStorage.getItem('name')}`;
            logout.addEventListener('click', function () {
                localStorage.removeItem('name');
                location.reload();
            });
            document.querySelector('.userNameContainer').style.display = 'flex';
        }
    }

    function initWebSocket(evt) {
        websocket = new WebSocket(
            'wss://b3mksp4plj.execute-api.sa-east-1.amazonaws.com/production'
        );
        initWebSocketsEvents();
    }

    async function initWebSocketsEvents() {
        websocket.onopen = function (evtOpen) {
            console.log('WebSocket connection opened');
            connected = true;
            sendTaskFinishedNotification();
        };

        websocket.onmessage = function (evt) {
            console.log('WebSocket message received:');
            const { info: userList } = JSON.parse(evt.data);
            if (userList) populateSidebar(userList);
        };

        websocket.onclose = function () {
            connected = false;
            console.log('WebSocket connection closed');
        };

        websocket.onerror = function (error) {
            console.error(error);
        };
    }

    function activateFinishTaskNotificationListener() {
        const finishTaskNotification = document.querySelector(
            '#finishTaskNotification'
        );
        if (finishTaskNotification) {
            finishTaskNotification.addEventListener('click', () => {
                const taskName = document.querySelector(
                    '#finishTaskNotification'
                )?.attributes['data-task'].value;
                localStorage.setItem('task', taskName);
                finishTaskNotification.textContent = '¡Terminé! (enviado)';

                sendTaskFinishedNotification();
            });
        }
    }

    async function sendTaskFinishedNotification() {
        const name = localStorage.getItem('name');
        const task = localStorage.getItem('task');
        if (connected) {
            await websocket.send(
                JSON.stringify({
                    action: 'onMessage',
                    name: name,
                    task: task,
                })
            );
        }
    }

    function populateSidebar(userList) {
        const namesList = document.querySelector('#namesList');
        namesList.innerHTML = '';
        const currentTask = document.querySelector('#finishTaskNotification')
            ?.attributes['data-task'].value;
        let finished = 0;
        let working = 0;
        userList.forEach((user) => {
            console.log('user', user);
            const li = document.createElement('li');
            li.textContent = user.name;
            if (user.task === currentTask) {
                li.classList.add('ready');
                finished++;
            } else {
                li.classList.add('working');
                working++;
            }
            namesList.appendChild(li);
        });
        document.querySelector('#finished').textContent = finished;
    }
});
