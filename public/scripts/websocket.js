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

    function initWebSocketsEvents() {
        ws.onopen = function (evtOpen) {
            console.log('WebSocket connection opened');
            console.log('evtOpen', evtOpen);
            connected = true;
        };

        ws.onmessage = function (evt) {
            console.log('WebSocket message received:');
            console.log('evt', evt);
            const data = JSON.parse(evt.data);
            console.log('data', data);
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
    const namesList = document.querySelector('#namesList');
    namesList.innerHTML = '';

    function namesToSidebar(data) {
        const currTask = localStorage.getItem('task');
        let ready = 0;
        // data.forEach((data) => {
        //     if (data.task === currTask) {
        //         const li = document.createElement('li');
        //         li.textContent = data[1];
        //         namesList.appendChild(li);
        //         ready++;
        //     }
        // });
        document.querySelector('#ready').innerHTML = ready;
    }

    // Save name in LocalStorage
    const nameInput = document.querySelector('#nameInput');
    const setNameButton = document.querySelector('#setName');
    const name = localStorage.getItem('name');
    const taskName =
        document.querySelector('#taskFinished')?.attributes['data-task'].value;
    localStorage.setItem('task', taskName);
    if (!name) localStorage.setItem('name', 'Invitado');
    if (setNameButton) {
        setNameButton.addEventListener('click', function () {
            const name = nameInput.value;
            localStorage.setItem('name', name);
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
        taskFinished.addEventListener('click', sendTaskFinished);
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
