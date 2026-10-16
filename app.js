const lessons = [
  { title: 'The Five Pillars', topic: 'Foundations', detail: 'A first look at the central acts of worship in Islam.', time: '8 MIN READ' },
  { title: 'How to approach the Qur’an', topic: 'Qur\'an', detail: 'Context, reflection, and a few ways to begin reading.', time: '10 MIN READ' },
  { title: 'A brief history of Islam', topic: 'History', detail: 'People, places, and ideas across fourteen centuries.', time: '12 MIN READ' },
  { title: 'Prayer: meaning and practice', topic: 'Practice', detail: 'Explore the rhythm and meaning of daily prayer.', time: '9 MIN READ' },
  { title: 'The life of the Prophet Muhammad', topic: 'History', detail: 'An introduction to the life and legacy of the Prophet.', time: '14 MIN READ' },
  { title: 'Mercy in the Qur’an', topic: 'Qur\'an', detail: 'Consider one of the tradition’s most recurring themes.', time: '7 MIN READ' }
];

const grid = document.querySelector('#lesson-grid');
const searchInput = document.querySelector('#lesson-search');
const emptyState = document.querySelector('#empty-state');
const filterButtons = [...document.querySelectorAll('.filter-button')];
let activeFilter = 'All';

function renderLessons() {
  const query = searchInput.value.trim().toLowerCase();
  const visibleLessons = lessons.filter((lesson) => {
    const matchesTopic = activeFilter === 'All' || lesson.topic === activeFilter;
    const matchesQuery = `${lesson.title} ${lesson.topic} ${lesson.detail}`.toLowerCase().includes(query);
    return matchesTopic && matchesQuery;
  });

  grid.innerHTML = visibleLessons.map((lesson, index) => `
    <article class="lesson-card" style="animation-delay: ${index * 45}ms">
      <div class="card-top"><span class="card-topic">${lesson.topic}</span><span class="card-number">0${lessons.indexOf(lesson) + 1}</span></div>
      <h3>${lesson.title}</h3>
      <p>${lesson.detail}</p>
      <div class="card-bottom"><span>${lesson.time}</span><a class="card-arrow" href="#reading" aria-label="Explore ${lesson.title}">↗</a></div>
    </article>
  `).join('');
  emptyState.hidden = visibleLessons.length > 0;
}

filterButtons.forEach((button) => {
  button.addEventListener('click', () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle('selected', item === button));
    renderLessons();
  });
});

searchInput.addEventListener('input', renderLessons);
renderLessons();
