const skillNameInput = document.getElementById('skillName');
const addSkillBtn = document.getElementById('addSkillBtn');
const skillsList = document.getElementById('skillsList');

let skills = JSON.parse(localStorage.getItem('skills')) || [];

function renderSkills() {
  skillsList.innerHTML = '';
  skills.forEach((skill, index) => {
    const skillDiv = document.createElement('div');
    skillDiv.className = 'skill-card';
    skillDiv.innerHTML = `
      <span>${skill.name}</span>
      <button onclick="toggleComplete(${index})">${skill.completed ? '✅' : '❌'}</button>
    `;
    skillsList.appendChild(skillDiv);
  });
}

function toggleComplete(index) {
  skills[index].completed = !skills[index].completed;
  localStorage.setItem('skills', JSON.stringify(skills));
  renderSkills();
  if (skills[index].completed) launchConfetti();
}

addSkillBtn.addEventListener('click', () => {
  if (skillNameInput.value.trim() !== '') {
    skills.push({ name: skillNameInput.value, completed: false });
    skillNameInput.value = '';
    localStorage.setItem('skills', JSON.stringify(skills));
    renderSkills();
  }
});

renderSkills();
