// Skill data structure
let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();
const skills = JSON.parse(localStorage.getItem('skills')) || [];

// DOM Elements
const streakCount = document.getElementById('streak-count');
const monthYearEl = document.getElementById('current-month-year');
const daysContainer = document.getElementById('calendar-days');
const badgeRack = document.getElementById('badge-rack');

// Initialize app
function initApp() {
    updateStreakDisplay();
    generateCalendar();
    renderBadges();
    setupMonthNavigation();
}

// Streak tracking
function updateStreak() {
    const today = new Date().toDateString();
    const lastDate = localStorage.getItem('lastSkillDate');
    
    if (!lastDate) {
        localStorage.setItem('streak', '1');
    } else if (lastDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        
        if (lastDate === yesterday.toDateString()) {
            const currentStreak = parseInt(localStorage.getItem('streak') || '0') + 1;
            localStorage.setItem('streak', currentStreak.toString());
            checkMilestones(currentStreak);
        } else {
            localStorage.setItem('streak', '1');
        }
    }
    
    localStorage.setItem('lastSkillDate', today);
    updateStreakDisplay();
}

function updateStreakDisplay() {
    const streak = localStorage.getItem('streak') || '0';
    streakCount.textContent = streak;
}

function checkMilestones(streak) {
    const milestones = [3, 7, 14, 21, 30, 60, 90];
    if (milestones.includes(streak)) {
        triggerConfetti();
        unlockBadge(`Streak Master ${streak}`, streak);
    }
}

// Calendar generator
function generateCalendar() {
    // Clear existing days
    daysContainer.innerHTML = '';

    // Set month/year header
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December'];
    monthYearEl.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    // Get first day of month and days in month
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Create empty slots for days before first day
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        emptyDay.className = 'calendar-day empty';
        daysContainer.appendChild(emptyDay);
    }
    
    // Create days of month
    for (let i = 1; i <= daysInMonth; i++) {
        const dayEl = document.createElement('div');
        dayEl.className = 'calendar-day';
        dayEl.textContent = i;
        
        // Highlight today
        const today = new Date();
        if (i === today.getDate() && 
            currentMonth === today.getMonth() && 
            currentYear === today.getFullYear()) {
            dayEl.classList.add('today');
        }
        
        // Mark if progress was logged
        const dateKey = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(i).padStart(2, '0')}`;
        if (localStorage.getItem(`progress-${dateKey}`)) {
            dayEl.classList.add('active');
        }
        
        daysContainer.appendChild(dayEl);
    }
}

// Month navigation
function setupMonthNavigation() {
    document.getElementById('prev-month').addEventListener('click', () => {
        currentMonth--;
        if (currentMonth < 0) {
            currentMonth = 11;
            currentYear--;
        }
        generateCalendar();
    });
    
    document.getElementById('next-month').addEventListener('click', () => {
        currentMonth++;
        if (currentMonth > 11) {
            currentMonth = 0;
            currentYear++;
        }
        generateCalendar();
    });
}

// Badge system
const badgeData = {
    beginner: { title: "Starter", threshold: 1 },
    intermediate: { title: "Builder", threshold: 5 },
    advanced: { title: "Master", threshold: 10 },
    streak3: { title: "Consistency", threshold: 3 },
    streak7: { title: "Dedication", threshold: 7 }
};

function unlockBadge(skill, level) {
    const badgeKey = `${skill}-${level}`.replace(/\s+/g, '-').toLowerCase();
    
    if (!skills.includes(badgeKey)) {
        skills.push(badgeKey);
        localStorage.setItem('skills', JSON.stringify(skills));
        renderBadges();
        return true;
    }
    return false;
}

function renderBadges() {
    badgeRack.innerHTML = '';
    skills.forEach(badge => {
        const badgeEl = document.createElement('div');
        badgeEl.className = 'badge';
        badgeEl.innerHTML = `
            <svg width="80" height="80" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="#FFD700" />
                <text x="50" y="55" text-anchor="middle" fill="#000">${badge.split('-')[0]}</text>
            </svg>
            <span>${badge.replace(/-/g, ' ')}</span>
        `;
        badgeRack.appendChild(badgeEl);
    });
}

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    if (streakCount) initApp();
});