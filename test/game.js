let currentRoom = 0;
let rabbitsCaught = 0;
let rabbits = [];
let gameInterval;

function startGame() {
    document.getElementById('intro').classList.remove('active');
    document.getElementById('room1').classList.add('active');
    currentRoom = 1;
}

function nextRoom(roomNumber) {
    document.getElementById(`room${roomNumber}`).classList.remove('active');
    document.getElementById(`room${roomNumber + 1}`).classList.add('active');
    currentRoom = roomNumber + 1;

    if (currentRoom === 3) {
        createGayDoors();
    } else if (currentRoom === 4) {
        startMinigame();
    }
}

function createGayDoors() {
    const container = document.getElementById('gay-doors');
    for (let i = 0; i < 10; i++) {
        const door = document.createElement('button');
        door.className = 'door';
        door.textContent = 'Yes';
        door.onclick = () => nextRoom(3);
        container.appendChild(door);
    }
}

function startMinigame() {
    const minigame = document.getElementById('minigame');
    const bat = document.getElementById('bat');
    const rabbitCount = document.getElementById('rabbit-count');
    
    // Create rabbits
    for (let i = 0; i < 10; i++) {
        const rabbit = document.createElement('div');
        rabbit.className = 'rabbit';
        rabbit.style.left = Math.random() * (minigame.offsetWidth - 40) + 'px';
        rabbit.style.top = Math.random() * (minigame.offsetHeight - 40) + 'px';
        rabbit.onclick = () => catchRabbit(rabbit);
        minigame.appendChild(rabbit);
        rabbits.push(rabbit);
    }

    // Bat movement
    minigame.addEventListener('mousemove', (e) => {
        const rect = minigame.getBoundingClientRect();
        const x = e.clientX - rect.left;
        bat.style.left = (x - 30) + 'px';
    });

    // Start rabbit movement
    gameInterval = setInterval(moveRabbits, 1000);
}

function catchRabbit(rabbit) {
    if (rabbit.style.display !== 'none') {
        rabbit.style.display = 'none';
        rabbitsCaught++;
        document.getElementById('rabbit-count').textContent = `Rabbits caught: ${rabbitsCaught}/10`;
        
        if (rabbitsCaught === 10) {
            clearInterval(gameInterval);
            setTimeout(() => nextRoom(4), 1000);
        }
    }
}

function moveRabbits() {
    rabbits.forEach(rabbit => {
        if (rabbit.style.display !== 'none') {
            const minigame = document.getElementById('minigame');
            const newX = Math.random() * (minigame.offsetWidth - 40);
            const newY = Math.random() * (minigame.offsetHeight - 40);
            rabbit.style.left = newX + 'px';
            rabbit.style.top = newY + 'px';
        }
    });
} 