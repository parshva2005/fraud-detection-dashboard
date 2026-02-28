let audioCtx: AudioContext | null = null;

const initAudio = () => {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
            audioCtx = new AudioContextClass();
        }
    }
    if (audioCtx?.state === 'suspended') {
        audioCtx.resume();
    }
    return audioCtx;
};

// Unlock AudioContext globally on first user interaction for Mobile Safari/Chrome
let audioUnlocked = false;
const unlockAudio = () => {
    if (audioUnlocked) return;
    const ctx = initAudio();
    if (ctx) {
        const _osc = ctx.createOscillator();
        const _gain = ctx.createGain();
        _gain.gain.value = 0;
        _osc.connect(_gain);
        _gain.connect(ctx.destination);
        _osc.start(0);
        _osc.stop(0);
        audioUnlocked = true;
    }
    window.removeEventListener('touchstart', unlockAudio);
    window.removeEventListener('click', unlockAudio);
};

if (typeof window !== 'undefined') {
    window.addEventListener('touchstart', unlockAudio, { once: true });
    window.addEventListener('click', unlockAudio, { once: true });
}

export const playClickSound = () => {
    try {
        const ctx = initAudio();
        if (!ctx) return;

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        // A short, subtle "tick/pop" sound suitable for UI clicks
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.05);

        gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.05);
    } catch (e) {
        // Ignore errors (e.g., strict browser autoplay policies before user interaction)
    }
};

export const playSwooshSound = () => {
    try {
        const ctx = initAudio();
        if (!ctx) return;

        const oscillator = ctx.createOscillator();
        const gainNode = ctx.createGain();

        oscillator.connect(gainNode);
        gainNode.connect(ctx.destination);

        // A deeper, longer sound for transitions or important actions
        oscillator.type = 'triangle';
        oscillator.frequency.setValueAtTime(150, ctx.currentTime);
        oscillator.frequency.exponentialRampToValueAtTime(50, ctx.currentTime + 0.15);

        gainNode.gain.setValueAtTime(0.15, ctx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

        oscillator.start(ctx.currentTime);
        oscillator.stop(ctx.currentTime + 0.15);
    } catch (e) {
    }
};
