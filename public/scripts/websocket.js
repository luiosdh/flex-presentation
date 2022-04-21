document.addEventListener('DOMContentLoaded', function () {
    let ws;
    let connected = false;

    function initWebSocket(evt) {
        ws = new WebSocket(
            'wss://b3mksp4plj.execute-api.sa-east-1.amazonaws.com/production'
        );
        initWebSocketsEvents();
    }

    initWebSocket();

    async function initWebSocketsEvents() {
        ws.onopen = function (evtOpen) {
            console.log('WebSocket connection opened');
            connected = true;
            sendTaskFinished();
        };

        ws.onmessage = function (evt) {
            console.log('WebSocket message received:');
            const { info } = JSON.parse(evt.data);
            console.log('data', info);
            addToList(info);
        };

        ws.onclose = function () {
            connected = false;
            console.log('WebSocket connection closed');
        };

        ws.onerror = function (error) {
            console.error(error);
        };
    }

    // Populate sidebar with names
    const list = [];
    function addToList(info) {
        const user = list.find((user) => user.id === info.id);
        if (!user) {
            list.push(info);
        }
        namesToSidebar(list);
    }

    function namesToSidebar(list) {
        console.log('list', list);
        const namesList = document.querySelector('#namesList');
        namesList.innerHTML = '';
        const currTask =
            document.querySelector('#taskFinished')?.attributes['data-task']
                .value;
        console.log('currTask', currTask);
        let ready = 0;
        let working = 0;
        list.forEach((item) => {
            console.log('item', item);
            const li = document.createElement('li');
            li.textContent = item.name;
            if (item.task === currTask) {
                li.classList.add('ready');
                ready++;
            } else {
                li.classList.add('working');
                working++;
            }
            namesList.appendChild(li);
        });
        document.querySelector('#ready').innerHTML = ready;
    }

    // Save name in LocalStorage
    const nameInput = document.querySelector('#nameInput');
    const setNameButton = document.querySelector('#setName');
    const name = localStorage.getItem('name');
    if (!name) localStorage.setItem('name', 'Invitado');
    if (setNameButton) {
        setNameButton.addEventListener('click', function () {
            const name = nameInput.value;
            localStorage.setItem('name', name);
            localStorage.setItem('task', 'home');
            sendTaskFinished();
            location.reload();
        });
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

    // Send task finished flag to server
    const taskFinished = document.querySelector('#taskFinished');
    if (taskFinished) {
        taskFinished.addEventListener('click', () => {
            const taskName =
                document.querySelector('#taskFinished')?.attributes['data-task']
                    .value;
            localStorage.setItem('task', taskName);

            sendTaskFinished();
        });
    }
    async function sendTaskFinished() {
        const name = localStorage.getItem('name');
        const task = localStorage.getItem('task');
        if (connected) {
            await ws.send(
                JSON.stringify({
                    action: 'onMessage',
                    name: name,
                    task: task,
                })
            );
        }
    }
});
