function triggerConfetti() {
    const confettiContainer = document.getElementById('confetti');
    confettiContainer.innerHTML = '';
    
    const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff'];
    const confettiCount = 100;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = `${Math.random() * 100}vw`;
        confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
        confetti.style.opacity = Math.random() + 0.5;
        confetti.style.transform = `scale(${Math.random() + 0.5})`;
        confettiContainer.appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}