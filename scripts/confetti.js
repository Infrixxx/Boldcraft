function launchConfetti() {
  const end = Date.now() + 1 * 1000;
  (function frame() {
    const colors = ['#FF5C5C', '#4B3F72', '#FFD700'];
    confetti({
      particleCount: 3,
      angle: 60,
      spread: 55,
      origin: { x: 0 },
      colors
    });
    confetti({
      particleCount: 3,
      angle: 120,
      spread: 55,
      origin: { x: 1 },
      colors
    });
    if (Date.now() < end) requestAnimationFrame(frame);
  })();
}
