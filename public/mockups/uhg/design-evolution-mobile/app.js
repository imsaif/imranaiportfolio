// Mobile Design Evolution JavaScript

// Version data with metrics
const versionData = {
    existing: {
        completionRate: '1.1%',
        avgTime: '18 minutes',
        satisfaction: '2.1/5',
        improvements: [
            '8+ complex form fields overwhelm users',
            'Medical codes confuse non-experts',
            'Generic error messages provide no guidance',
            'No visual feedback during upload',
            'Users abandon after first failure'
        ]
    },
    v2: {
        completionRate: '15%',
        avgTime: '12 minutes',
        satisfaction: '3.2/5',
        improvements: [
            'Reduced form complexity but still overwhelming',
            'Better upload interface with file type guidance',
            'Simplified language but medical terms remain',
            'Basic validation feedback',
            'Some users still struggle with categorization'
        ]
    },
    v3: {
        completionRate: '76%',
        avgTime: '4.5 minutes',
        satisfaction: '4.2/5',
        improvements: [
            '3-step guided process reduces cognitive load',
            'Smart detection auto-fills most fields',
            'Plain language explanations build confidence',
            'Real-time eligibility checking prevents errors',
            'Progressive disclosure shows relevant info only'
        ]
    }
};

// Initialize the prototype
document.addEventListener('DOMContentLoaded', function() {
    initializeVersionSelector();
    updateMetrics('existing');
    updateImprovements('existing');
});

// Version selector functionality
function initializeVersionSelector() {
    const versionButtons = document.querySelectorAll('.version-btn');

    versionButtons.forEach(button => {
        button.addEventListener('click', function() {
            const version = this.getAttribute('data-version');
            switchVersion(version);
        });
    });
}

function switchVersion(version) {
    // Update button states
    document.querySelectorAll('.version-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-version="${version}"]`).classList.add('active');

    // Update prototype display
    document.querySelectorAll('.prototype-version').forEach(prototype => {
        prototype.classList.remove('active');
    });
    document.getElementById(version).classList.add('active');

    // Update metrics and improvements
    updateMetrics(version);
    updateImprovements(version);

    // Reset V3 to step 1 when switching to it
    if (version === 'v3') {
        resetV3Flow();
    }
}

function updateMetrics(version) {
    const data = versionData[version];
    document.getElementById('completionRate').textContent = data.completionRate;
    document.getElementById('avgTime').textContent = data.avgTime;
    document.getElementById('satisfaction').textContent = data.satisfaction;

    // Add visual indicators for improvements
    const completionEl = document.getElementById('completionRate');
    completionEl.className = 'metric-value';

    if (version === 'existing') {
        completionEl.style.color = '#D32F2F';
    } else if (version === 'v2') {
        completionEl.style.color = '#FF8533';
    } else {
        completionEl.style.color = '#00A651';
    }
}

function updateImprovements(version) {
    const data = versionData[version];
    const improvementsList = document.getElementById('improvementsList');

    let title = '';
    let icon = '';

    if (version === 'existing') {
        title = 'Problems in V1:';
        icon = '⚠️';
    } else if (version === 'v2') {
        title = 'Improvements in V2:';
        icon = '🔄';
    } else {
        title = 'Achievements in V3:';
        icon = '✅';
    }

    improvementsList.innerHTML = `
        <h3>${title}</h3>
        <ul>
            ${data.improvements.map(item => `<li data-icon="${icon}">${item}</li>`).join('')}
        </ul>
    `;

    // Update list item icons
    const listItems = improvementsList.querySelectorAll('li');
    listItems.forEach(item => {
        const iconAttr = item.getAttribute('data-icon');
        item.style.setProperty('--list-icon', `"${iconAttr}"`);
    });
}

// V1 Error functionality
function showError() {
    document.getElementById('errorModal').style.display = 'flex';

    // Simulate loading then error
    setTimeout(() => {
        document.getElementById('errorModal').style.display = 'flex';
    }, 1000);
}

function hideError() {
    document.getElementById('errorModal').style.display = 'none';
}

// V3 Smart flow functionality
let currentStep = 1;

function nextStep(step) {
    // Hide current step
    document.getElementById(`step${currentStep}`).style.display = 'none';

    // Show next step
    document.getElementById(`step${step}`).style.display = 'block';

    // Update progress bar
    updateProgressBar(step);

    currentStep = step;
}

function updateProgressBar(step) {
    // Reset all steps
    document.querySelectorAll('.progress-step').forEach(stepEl => {
        stepEl.classList.remove('active');
    });

    // Activate steps up to current
    for (let i = 1; i <= step; i++) {
        const stepEl = document.querySelector(`.progress-step:nth-child(${i})`);
        if (stepEl) {
            stepEl.classList.add('active');
        }
    }
}

function resetV3Flow() {
    // Hide all steps
    document.querySelectorAll('.smart-content').forEach(content => {
        content.style.display = 'none';
    });

    // Show step 1
    document.getElementById('step1').style.display = 'block';

    // Reset progress bar
    updateProgressBar(1);
    currentStep = 1;

    // Hide success modal
    hideSuccess();
}

function showSuccess() {
    document.getElementById('successModal').style.display = 'flex';
}

function hideSuccess() {
    document.getElementById('successModal').style.display = 'none';
}

// Add visual feedback effects
function addVisualEffects() {
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll('.form-input, .upload-area, .smart-btn');

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-1px)';
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
}

// Simulate typing effect for smart detection
function simulateTypingEffect() {
    const detectedValues = document.querySelectorAll('.detected-value');

    detectedValues.forEach((value, index) => {
        setTimeout(() => {
            value.style.opacity = '0';
            setTimeout(() => {
                value.style.opacity = '1';
                value.style.transition = 'opacity 0.5s ease';
            }, 200);
        }, index * 300);
    });
}

// Add loading states
function addLoadingStates() {
    const submitButtons = document.querySelectorAll('.submit-btn, .smart-btn');

    submitButtons.forEach(button => {
        button.addEventListener('click', function() {
            const originalText = this.textContent;
            this.textContent = 'Loading...';
            this.disabled = true;

            setTimeout(() => {
                this.textContent = originalText;
                this.disabled = false;
            }, 2000);
        });
    });
}

// Initialize all interactions
document.addEventListener('DOMContentLoaded', function() {
    addVisualEffects();
    addLoadingStates();

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
            const currentButton = document.querySelector('.version-btn.active');
            const buttons = Array.from(document.querySelectorAll('.version-btn'));
            const currentIndex = buttons.indexOf(currentButton);

            let newIndex;
            if (e.key === 'ArrowLeft') {
                newIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
            } else {
                newIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
            }

            buttons[newIndex].click();
        }
    });
});

// Add touch gestures for mobile
let touchStartX = 0;
let touchEndX = 0;

document.addEventListener('touchstart', function(e) {
    touchStartX = e.changedTouches[0].screenX;
});

document.addEventListener('touchend', function(e) {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const swipeDistance = touchEndX - touchStartX;

    if (Math.abs(swipeDistance) > swipeThreshold) {
        const currentButton = document.querySelector('.version-btn.active');
        const buttons = Array.from(document.querySelectorAll('.version-btn'));
        const currentIndex = buttons.indexOf(currentButton);

        let newIndex;
        if (swipeDistance > 0) { // Swipe right
            newIndex = currentIndex > 0 ? currentIndex - 1 : buttons.length - 1;
        } else { // Swipe left
            newIndex = currentIndex < buttons.length - 1 ? currentIndex + 1 : 0;
        }

        buttons[newIndex].click();
    }
}