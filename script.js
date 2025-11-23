const sections = document.querySelectorAll('.section');

const sectionBackgrounds = {
    'intro': 'var(--section-bg-1)',
    'process': 'var(--section-bg-1)',
    'quiz': 'var(--section-bg-2)',
    'comparison': 'var(--section-bg-3)',
    'guidelines': 'var(--section-bg-4)',
    'protection': 'var(--section-bg-5)'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');

            const sectionId = entry.target.id;
            if (sectionBackgrounds[sectionId]) {
                document.body.style.backgroundColor = sectionBackgrounds[sectionId];
            }

            if (entry.target.id === 'process') {
                animateTimeline();
            }
        }
    });
}, { threshold: 0.2 });

sections.forEach(section => observer.observe(section));

function animateTimeline() {
    const steps = document.querySelectorAll('.timeline-step');
    const progress = document.getElementById('timelineProgress');

    steps.forEach((step, index) => {
        setTimeout(() => {
            step.classList.add('active');
            const progressPercent = ((index + 1) / steps.length) * 100;
            progress.style.height = progressPercent + '%';
        }, index * 300);
    });
}

let quizAnswered = false;

function checkAnswer(element, isCorrect) {
    if (quizAnswered) return;

    quizAnswered = true;
    const feedback = document.getElementById('quizFeedback');
    const allOptions = document.querySelectorAll('.quiz-option');

    allOptions.forEach(opt => opt.style.pointerEvents = 'none');

    if (isCorrect) {
        element.classList.add('correct');
        feedback.className = 'quiz-feedback show correct';
        feedback.innerHTML = '<strong>Riktig!</strong> Dette er et klassisk phishing-forsøk. Røde flagg: kort URL (bit.ly), hastemelding, og mistenkelig avsender. En ekte bank vil aldri sende slike meldinger.';
    } else {
        element.classList.add('wrong');
        feedback.className = 'quiz-feedback show wrong';
        feedback.innerHTML = '<strong>Feil.</strong> Dette er faktisk svindel. Banker sender aldri lenker i SMS for innlogging, og bruker ikke kortlenketjenester som bit.ly. Vær alltid skeptisk!';
    }
}

function toggleTip(header) {
    header.parentElement.classList.toggle('expanded');
}

const slider = document.getElementById('comparisonSlider');
const handle = document.getElementById('sliderHandle');
const realImage = document.getElementById('realImage');
let isDragging = false;

function updateSliderPosition(x) {
    const rect = slider.getBoundingClientRect();
    let position = x - rect.left;

    position = Math.max(0, Math.min(position, rect.width));

    const percentage = (position / rect.width) * 100;
    handle.style.left = percentage + '%';
    realImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
}

handle.addEventListener('mousedown', () => isDragging = true);
document.addEventListener('mouseup', () => isDragging = false);
document.addEventListener('mousemove', (e) => {
    if (isDragging) updateSliderPosition(e.clientX);
});

handle.addEventListener('touchstart', () => isDragging = true);
document.addEventListener('touchend', () => isDragging = false);
document.addEventListener('touchmove', (e) => {
    if (isDragging) updateSliderPosition(e.touches[0].clientX);
});