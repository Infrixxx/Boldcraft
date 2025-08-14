document.addEventListener('DOMContentLoaded', () => {
    const gallery = document.getElementById('badge-gallery');
    const skills = JSON.parse(localStorage.getItem('skills')) || [];
    
    skills.forEach(badge => {
        const badgeEl = document.createElement('div');
        badgeEl.className = 'gallery-badge';
        badgeEl.innerHTML = `
            <svg width="120" height="120" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="#FFD700" />
                <text x="50" y="55" text-anchor="middle" fill="#000">${badge.split('-')[0]}</text>
            </svg>
            <h3>${badge.replace(/-/g, ' ')}</h3>
            <button class="share-btn" data-badge="${badge}">Share</button>
        `;
        gallery.appendChild(badgeEl);
    });
    
    document.getElementById('export-all').addEventListener('click', () => {
        alert('All badges exported as image! Implement your screenshot logic here');
    });
    
    document.querySelectorAll('.share-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const badgeName = e.target.dataset.badge;
            prompt('Share this badge URL:', `${window.location.origin}/gallery.html?badge=${badgeName}`);
        });
    });
});