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
        ws.onopen = function () {
            connected = true;
        };

        ws.onmessage = function (evt) {
            const data = JSON.parse(evt.data);
            switch (data.type) {
                case 'names':
                    namesToSidebar(data.data);
                    break;
                default:
                    console.log('Unknown message type:', data.type);
            }
        };

        ws.onclose = function () {
            connected = false;
        };

        ws.onerror = function (error) {
            console.error(error);
        };
    }

    // Populate sidebar with names
    function namesToSidebar(data) {
        const task = localStorage.getItem('task');
        const namesList = document.querySelector('#namesList');
        let ready = 0;
        namesList.innerHTML = '';
        data.forEach((data) => {
            if (data[0] === task) {
                const li = document.createElement('li');
                li.textContent = data[1];
                namesList.appendChild(li);
                ready++;
            }
        });
        document.querySelector('#ready').innerHTML = ready;
    }

    // Save name in LocalStorage
    const nameInput = document.querySelector('#nameInput');
    const setNameButton = document.querySelector('#setName');
    const name = localStorage.getItem('name');
    const taskName = document.querySelector('#taskName');
    localStorage.setItem('task', taskName.textContent);
    if (!name) localStorage.setItem('name', 'Invitado');
    if (setNameButton) {
        setNameButton.addEventListener('click', function () {
            const name = nameInput.value;
            localStorage.setItem('name', name);
            sendTaskFinished();
        });
    }

    // Send task finished flag to server
    const taskFinished = document.querySelector('#taskFinished');
    if (taskFinished) {
        taskFinished.addEventListener('click', sendTaskFinished);
    }
    function sendTaskFinished() {
        const task = localStorage.getItem('task');
        const name = localStorage.getItem('name');
        if (connected) {
            ws.send(
                JSON.stringify({
                    action: 'onMessage',
                    name: name,
                    task: task,
                })
            );
        }
    }
});
