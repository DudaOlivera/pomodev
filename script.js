const FOCUS_TIME_MINUTES = 25;
const BREAK_TIME_MINUTES = 5;
const RING_CIRCUMFERENCE = 880; 

const body = document.body;
const btnFoco = document.getElementById('btn-foco');
const btnDescanso = document.getElementById('btn-descanso');

const timerDisplay = document.querySelector('.timer-display');
const progressRing = document.querySelector('.timer-progress-ring');

const playPauseBtn = document.getElementById('btn-play-pause');
const iconPlay = document.getElementById('icon-play');
const iconPause = document.getElementById('icon-pause');
const resetBtn = document.getElementById('btn-reset');

const cycleCounter = document.querySelector('.cycle-counter');
const alertSound = document.getElementById('timer-alert-sound');

// NOVO: Referência ao elemento <link> do favicon
const faviconLink = document.getElementById('favicon');

let state = {
    mode: 'foco',
    timeLeftInSeconds: FOCUS_TIME_MINUTES * 60,
    totalTimeInSeconds: FOCUS_TIME_MINUTES * 60,
    isRunning: false,
    completedCycles: 0,
    timerIntervalId: null
};

function switchMode(newMode) {
    stopTimer();
    
    state.mode = newMode;
    state.isRunning = false;

    if (newMode === 'foco') {
        body.classList.remove('descanso');
        body.classList.add('foco');
        btnFoco.classList.add('active');
        btnDescanso.classList.remove('active');
        
        state.totalTimeInSeconds = FOCUS_TIME_MINUTES * 60;
    } else { 
        body.classList.remove('foco');
        body.classList.add('descanso');
        btnDescanso.classList.add('active');
        btnFoco.classList.remove('active');
        
        state.totalTimeInSeconds = BREAK_TIME_MINUTES * 60;
    }
    
    state.timeLeftInSeconds = state.totalTimeInSeconds;
    updateDisplay(); // Esta chamada agora também atualiza o favicon
    updatePlayPauseIcon();
}

function timerTick() {
    state.timeLeftInSeconds--;

    updateDisplay(); // Esta chamada agora também atualiza o favicon

    if (state.timeLeftInSeconds <= 0) {
        stopTimer();
        
        alertSound.play(); 

        if (state.mode === 'foco') {
            state.completedCycles++;
            updateCycleCounter();
            switchMode('descanso');
        } else {
            switchMode('foco');
        }
    }
}

function startTimer() {
    if (state.isRunning) return; 

    state.isRunning = true;
    updatePlayPauseIcon();
    
    state.timerIntervalId = setInterval(timerTick, 1000);
}

function stopTimer() {
    state.isRunning = false;
    updatePlayPauseIcon();
    
    if (state.timerIntervalId) {
        clearInterval(state.timerIntervalId);
        state.timerIntervalId = null;
    }
}

function resetTimer() {
    stopTimer();
    state.timeLeftInSeconds = state.totalTimeInSeconds;
    updateDisplay(); // Esta chamada agora também atualiza o favicon
}

function updateDisplay() {
    const minutes = Math.floor(state.timeLeftInSeconds / 60);
    const seconds = state.timeLeftInSeconds % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    timerDisplay.textContent = formattedTime;
    
    document.title = `${formattedTime} - ${state.mode === 'foco' ? 'Foco' : 'Descanso'}`;
    
    const progressOffset = (1 - (state.timeLeftInSeconds / state.totalTimeInSeconds)) * RING_CIRCUMFERENCE;
    progressRing.style.strokeDashoffset = progressOffset;

    // NOVO: Chama a função para atualizar o favicon
    updateFavicon();
}

function updatePlayPauseIcon() {
    iconPlay.style.display = state.isRunning ? 'none' : 'block';
    iconPause.style.display = state.isRunning ? 'block' : 'none';
}

function updateCycleCounter() {
    // Corrigido para "Ciclos Completos" como estava no HTML
    cycleCounter.textContent = `Ciclos completos: ${state.completedCycles}`;
}

// NOVO: Função para gerar e atualizar o favicon dinamicamente
function updateFavicon() {
    // Mostra minutos no favicon, não segundos
    const minutes = Math.floor(state.timeLeftInSeconds / 60);
    const text = String(minutes).padStart(2, '0');
    
    const progressOffset = (1 - (state.timeLeftInSeconds / state.totalTimeInSeconds)) * RING_CIRCUMFERENCE;

    // Cores baseadas nas suas variáveis CSS
    const color = state.mode === 'foco' ? '#8b5cf6' : '#14b8a6'; 
    const bgColor = '#1f2937'; 

    // Template do SVG
    const svgContent = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 300">
            <circle cx="150" cy="150" r="140" fill="none" stroke="${bgColor}" stroke-width="25" />
            <circle
                cx="150" cy="150" r="140"
                fill="none"
                stroke="${color}"
                stroke-width="25"
                stroke-linecap="round"
                stroke-dasharray="880"
                stroke-dashoffset="${progressOffset}"
                transform="rotate(-90 150 150)" />
            <text x="50%" y="55%" dominant-baseline="middle" text-anchor="middle"
                fill="${color}" font-size="140px" font-family="Inter, sans-serif" font-weight="700">
                ${text}
            </text>
        </svg>
    `;

    // Converte o SVG para Base64 e define como href
    const dataUri = `data:image/svg+xml;base64,${btoa(svgContent)}`;
    faviconLink.href = dataUri;
}


// --- Event Listeners ---

btnFoco.addEventListener('click', () => switchMode('foco'));

btnDescanso.addEventListener('click', () => switchMode('descanso'));

resetBtn.addEventListener('click', resetTimer);

playPauseBtn.addEventListener('click', () => {
    if (state.isRunning) {
        stopTimer();
    } else {
        startTimer();
    }
});

// Inicializa a aplicação
switchMode('foco');