let startTime;
let elapsedTime = 0;
let interval;
let running = false;
let laps = [];

const display = document.getElementById('stopwatch');
const startBtn = document.getElementById('start');
const pauseBtn = document.getElementById('pause');
const lapBtn = document.getElementById('lap');
const resetBtn = document.getElementById('reset');
const lapList = document.getElementById('lap-list');

function updateTime() {
    elapsedTime = Date.now() - startTime;
    let time = new Date(elapsedTime);
    let minutes = time.getUTCMinutes();
    let seconds = time.getUTCSeconds();
    let milliseconds = Math.floor(time.getUTCMilliseconds() / 10);
    
    display.textContent = 
        `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
}

function addLap() {
    if (running) {
        let time = new Date(elapsedTime);
        let minutes = time.getUTCMinutes();
        let seconds = time.getUTCSeconds();
        let milliseconds = Math.floor(time.getUTCMilliseconds() / 10);

        let lapTime = 
            `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds.toString().padStart(2, '0')}`;
        
        let lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${laps.length + 1}: ${lapTime} - ${new Date().toLocaleTimeString()}`;
        lapList.appendChild(lapItem);
        laps.push(lapTime);

        // Play lap sound
        document.getElementById('lap-sound').play();
    }
}

startBtn.addEventListener('click', function() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        interval = setInterval(updateTime, 10);
        running = true;
        startBtn.disabled = true;
        pauseBtn.disabled = false;
        document.getElementById('start-sound').play();
    }
});

pauseBtn.addEventListener('click', function() {
    if (running) {
        clearInterval(interval);
        running = false;
        startBtn.disabled = false;
        pauseBtn.disabled = true;
        document.getElementById('pause-sound').play();
    }
});

lapBtn.addEventListener('click', addLap);

resetBtn.addEventListener('click', function() {
    clearInterval(interval);
    running = false;
    elapsedTime = 0;
    display.textContent = '00:00:00';
    lapList.innerHTML = '';
    laps = [];
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    document.getElementById('reset-sound').play();
});
