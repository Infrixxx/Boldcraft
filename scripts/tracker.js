document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('skill-form');
    const history = document.getElementById('progress-history');
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const skill = {
            name: document.getElementById('skill-name').value,
            time: document.getElementById('skill-time').value,
            notes: document.getElementById('skill-notes').value,
            date: new Date().toISOString()
        };
        
        saveSkill(skill);
        updateHistory();
        form.reset();
    });
    
    function saveSkill(skill) {
        const skills = JSON.parse(localStorage.getItem('skills-log')) || [];
        skills.push(skill);
        localStorage.setItem('skills-log', JSON.stringify(skills));
        showNotification('Progress saved!', 'success');
        
        // Mark calendar day
        const day = new Date().getDate();
        localStorage.setItem(`day-${day}`, 'true');
    }
    
    function updateHistory() {
        history.innerHTML = '<h2>Your Progress</h2>';
        const skills = JSON.parse(localStorage.getItem('skills-log')) || [];
        
        if (skills.length === 0) {
            history.innerHTML += '<p>No progress tracked yet</p>';
            return;
        }
        
        const historyList = document.createElement('ul');
        historyList.className = 'history-list';
        
        skills.slice().reverse().forEach(skill => {
            const item = document.createElement('li');
            item.innerHTML = `
                <strong>${skill.name}</strong>
                <span>${skill.time} minutes</span>
                <p>${skill.notes || 'No notes'}</p>
                <small>${formatDate(skill.date)}</small>
            `;
            historyList.appendChild(item);
        });
        
        history.appendChild(historyList);
    }
    
    updateHistory();
});