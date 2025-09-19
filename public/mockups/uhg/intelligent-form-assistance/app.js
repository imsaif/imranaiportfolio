// Intelligent Form Assistance App JavaScript

class FormAssistanceApp {
    constructor() {
        this.currentScreen = 0;
        this.screens = [
            'receiptUploadScreen',
            'ocrProcessingScreen',
            'formPopulationScreen',
            'categoryScreen',
            'helpScreen',
            'validationScreen'
        ];
        this.progressSteps = [16.66, 33.33, 50, 66.66, 83.33, 100];

        this.init();
    }

    init() {
        this.bindEvents();
        this.updateProgress();
        this.showInitialScreen();
    }

    bindEvents() {
        // Screen 1: Receipt Upload
        const processReceiptBtn = document.getElementById('processReceiptBtn');
        if (processReceiptBtn) {
            processReceiptBtn.addEventListener('click', () => this.startOCRProcessing());
        }

        // Screen 3: Form Population
        const reviewFormBtn = document.getElementById('reviewFormBtn');
        if (reviewFormBtn) {
            reviewFormBtn.addEventListener('click', () => this.showCategoryScreen());
        }

        // Screen 4: Category Selection
        const continueWithCategoryBtn = document.getElementById('continueWithCategoryBtn');
        if (continueWithCategoryBtn) {
            continueWithCategoryBtn.addEventListener('click', () => this.showHelpScreen());
        }

        // Category options
        const categoryOptions = document.querySelectorAll('.category-option');
        categoryOptions.forEach(option => {
            option.addEventListener('click', (e) => this.selectCategory(option, e));
        });

        // Screen 5: Help tooltips
        const helpTooltips = document.querySelectorAll('.help-tooltip');
        helpTooltips.forEach(tooltip => {
            tooltip.addEventListener('click', (e) => this.toggleTooltip(e.target));
        });

        const finalizeFormBtn = document.getElementById('finalizeFormBtn');
        if (finalizeFormBtn) {
            finalizeFormBtn.addEventListener('click', () => this.showValidationScreen());
        }

        // Screen 6: Validation actions
        const trackStatusBtn = document.getElementById('trackStatusBtn');
        const newSubmissionBtn = document.getElementById('newSubmissionBtn');

        if (trackStatusBtn) {
            trackStatusBtn.addEventListener('click', () => this.trackStatus());
        }

        if (newSubmissionBtn) {
            newSubmissionBtn.addEventListener('click', () => this.startNewSubmission());
        }

        // Back button functionality
        const backButton = document.getElementById('backButton');
        if (backButton) {
            backButton.addEventListener('click', () => this.goBack());
        }
    }

    showInitialScreen() {
        // Ensure first screen is visible immediately
        const firstScreen = document.getElementById(this.screens[0]);
        if (firstScreen) {
            firstScreen.classList.add('active');
        }
        this.showScreen(0);
        this.updateHeaderTitle('Form Assistance');
    }

    showScreen(screenIndex) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        const targetScreen = document.getElementById(this.screens[screenIndex]);
        if (targetScreen) {
            targetScreen.classList.add('active');
            this.currentScreen = screenIndex;
            this.updateProgress();
        }
    }

    startOCRProcessing() {
        this.showScreen(1);
        this.updateHeaderTitle('Processing Receipt');
        this.animateOCRProcessing();
    }

    animateOCRProcessing() {
        const progressItems = [
            { id: 'progressProvider', delay: 1000 },
            { id: 'progressDate', delay: 2000 },
            { id: 'progressAmount', delay: 3000 },
            { id: 'progressCategory', delay: 4000 }
        ];

        progressItems.forEach((item, index) => {
            setTimeout(() => {
                const element = document.getElementById(item.id);
                if (element) {
                    element.classList.remove('active');
                    element.classList.add('completed');

                    const spinner = element.querySelector('.spinner');
                    const dot = element.querySelector('.dot');

                    if (spinner) {
                        spinner.innerHTML = '✓';
                        spinner.classList.remove('spinner');
                        spinner.classList.add('check');
                    }

                    if (dot) {
                        dot.innerHTML = '✓';
                        dot.classList.remove('dot');
                        dot.classList.add('check');
                    }

                    // Update text content
                    if (item.id === 'progressAmount') {
                        element.lastChild.textContent = 'Amount extracted: $150.00';
                    } else if (item.id === 'progressCategory') {
                        element.lastChild.textContent = 'Service type analyzed';
                    }
                }

                // Move to next item
                if (index < progressItems.length - 1) {
                    const nextElement = document.getElementById(progressItems[index + 1].id);
                    if (nextElement) {
                        nextElement.classList.add('active');
                    }
                }
            }, item.delay);
        });

        // Move to form population screen after processing
        setTimeout(() => {
            this.showFormPopulation();
        }, 5500);
    }

    showFormPopulation() {
        this.showScreen(2);
        this.updateHeaderTitle('Smart Form');
        this.animateFormFields();
    }

    animateFormFields() {
        const autoFilledGroups = document.querySelectorAll('.form-group.auto-filled');
        autoFilledGroups.forEach((group, index) => {
            setTimeout(() => {
                group.style.animation = 'slideUp 0.5s ease-out';
                group.classList.add('fade-in');
            }, index * 200);
        });

        const suggestedGroup = document.querySelector('.form-group.suggested');
        if (suggestedGroup) {
            setTimeout(() => {
                suggestedGroup.style.animation = 'slideUp 0.5s ease-out';
                suggestedGroup.classList.add('fade-in');
            }, autoFilledGroups.length * 200 + 500);
        }
    }

    showCategoryScreen() {
        this.showScreen(3);
        this.updateHeaderTitle('Category Selection');
    }

    selectCategory(selectedOption, event) {
        // Prevent event bubbling
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }

        // Remove selection from all options
        document.querySelectorAll('.category-option').forEach(option => {
            option.classList.remove('selected');
            const indicator = option.querySelector('.selection-indicator');
            if (indicator) {
                indicator.textContent = '○';
            }
        });

        // Add selection to clicked option
        selectedOption.classList.add('selected');
        const indicator = selectedOption.querySelector('.selection-indicator');
        if (indicator) {
            indicator.textContent = '●';
        }

        // Button text remains static as "Continue"

        // Add touch feedback
        selectedOption.classList.add('touch-feedback');
        setTimeout(() => {
            selectedOption.classList.remove('touch-feedback');
        }, 300);
    }

    showHelpScreen() {
        this.showScreen(4);
        this.updateHeaderTitle('Form Help');
        this.setupTooltipDemo();
    }

    setupTooltipDemo() {
        // Auto-show the CPT Code tooltip as a demo
        setTimeout(() => {
            const cptTooltip = document.querySelector('.help-tooltip.active');
            if (cptTooltip) {
                this.toggleTooltip(cptTooltip);
            }
        }, 1000);
    }

    toggleTooltip(tooltipButton) {
        // Hide all other tooltips
        document.querySelectorAll('.tooltip-content').forEach(content => {
            content.classList.remove('show');
        });

        document.querySelectorAll('.help-tooltip').forEach(button => {
            button.classList.remove('active');
        });

        // Show/hide the clicked tooltip
        tooltipButton.classList.add('active');
        const tooltipContent = tooltipButton.closest('.form-group').querySelector('.tooltip-content');

        if (tooltipContent) {
            tooltipContent.classList.add('show');

            // Auto-hide after a few seconds
            setTimeout(() => {
                tooltipContent.classList.remove('show');
                tooltipButton.classList.remove('active');
            }, 4000);
        }
    }

    showValidationScreen() {
        this.showScreen(5);
        this.updateHeaderTitle('Submission Complete');
        this.animateSuccess();
    }

    animateSuccess() {
        // The checkmark animation is handled by CSS, so we just need to trigger it
        const checkmarkCircle = document.querySelector('.checkmark-circle');
        const checkmarkCheck = document.querySelector('.checkmark-check');

        if (checkmarkCircle && checkmarkCheck) {
            // Reset animations to ensure they play from start
            checkmarkCircle.style.animation = 'none';
            checkmarkCheck.style.animation = 'none';

            // Trigger reflow to restart animations
            checkmarkCircle.offsetHeight;
            checkmarkCheck.offsetHeight;

            // Apply animations
            checkmarkCircle.style.animation = 'stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards';
            checkmarkCheck.style.animation = 'stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards';
        }

        // Animate summary items
        const summaryItems = document.querySelectorAll('.summary-item');
        summaryItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.animation = 'fadeIn 0.5s ease-out';
                item.classList.add('fade-in');
            }, index * 100);
        });

        // Animate progress steps
        const steps = document.querySelectorAll('.step');
        steps.forEach((step, index) => {
            setTimeout(() => {
                step.style.animation = 'fadeIn 0.5s ease-out';
                step.classList.add('fade-in');
            }, summaryItems.length * 100 + index * 200);
        });
    }

    trackStatus() {
        // Simulate tracking status action
        alert('Status tracking would open here. Your reimbursement request #HSA-2024-0915-001 is currently being processed.');
    }

    startNewSubmission() {
        // Reset to beginning
        this.currentScreen = 0;
        this.showScreen(0);
        this.updateHeaderTitle('Form Assistance');
        this.resetFormState();
    }

    resetFormState() {
        // Reset OCR processing animation
        const progressItems = document.querySelectorAll('.progress-item');
        progressItems.forEach(item => {
            item.classList.remove('completed', 'active');
            const check = item.querySelector('.check');
            const spinner = item.querySelector('.spinner');

            if (check && check.parentElement.id === 'progressAmount') {
                check.innerHTML = '';
                check.classList.remove('check');
                check.classList.add('spinner');
            }
        });

        // Reset category selection
        document.querySelectorAll('.category-option').forEach(option => {
            option.classList.remove('selected');
            const indicator = option.querySelector('.selection-indicator');
            if (indicator) {
                indicator.textContent = '○';
            }
        });

        // Reset first option as recommended
        const firstOption = document.querySelector('.category-option.recommended');
        if (firstOption) {
            firstOption.classList.add('selected');
            const indicator = firstOption.querySelector('.selection-indicator');
            if (indicator) {
                indicator.textContent = '●';
            }
        }

        // Hide all tooltips
        document.querySelectorAll('.tooltip-content').forEach(content => {
            content.classList.remove('show');
        });

        document.querySelectorAll('.help-tooltip').forEach(button => {
            button.classList.remove('active');
        });
    }

    goBack() {
        if (this.currentScreen > 0) {
            this.showScreen(this.currentScreen - 1);
            this.updateHeaderForScreen(this.currentScreen);
        }
    }

    updateHeaderForScreen(screenIndex) {
        const titles = [
            'Form Assistance',
            'Processing Receipt',
            'Smart Form',
            'Category Selection',
            'Form Help',
            'Submission Complete'
        ];

        this.updateHeaderTitle(titles[screenIndex] || 'Form Assistance');
    }

    updateHeaderTitle(title) {
        const headerTitle = document.getElementById('headerTitle');
        if (headerTitle) {
            headerTitle.textContent = title;
        }
    }

    updateProgress() {
        const progressFill = document.getElementById('progressFill');
        if (progressFill && this.progressSteps[this.currentScreen]) {
            progressFill.style.width = this.progressSteps[this.currentScreen] + '%';
        }
    }
}

// Utility functions for enhanced UX
function addTouchFeedback() {
    // Add touch feedback to all buttons
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.95)';
        });

        button.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

function setupFormValidation() {
    // Real-time form validation
    const inputs = document.querySelectorAll('input, select');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            validateField(this);
        });

        input.addEventListener('blur', function() {
            validateField(this);
        });
    });
}

function validateField(field) {
    const value = field.value.trim();
    const fieldGroup = field.closest('.form-group');

    if (!fieldGroup) return;

    // Remove existing validation classes
    fieldGroup.classList.remove('valid', 'invalid');

    // Basic validation
    if (value === '') {
        fieldGroup.classList.add('invalid');
        showFieldError(fieldGroup, 'This field is required');
    } else {
        fieldGroup.classList.add('valid');
        hideFieldError(fieldGroup);

        // Specific validations
        if (field.type === 'email' && !isValidEmail(value)) {
            fieldGroup.classList.remove('valid');
            fieldGroup.classList.add('invalid');
            showFieldError(fieldGroup, 'Please enter a valid email address');
        }

        if (field.id === 'amount' && !isValidAmount(value)) {
            fieldGroup.classList.remove('valid');
            fieldGroup.classList.add('invalid');
            showFieldError(fieldGroup, 'Please enter a valid amount');
        }
    }
}

function showFieldError(fieldGroup, message) {
    let errorElement = fieldGroup.querySelector('.field-error');
    if (!errorElement) {
        errorElement = document.createElement('div');
        errorElement.className = 'field-error';
        fieldGroup.appendChild(errorElement);
    }
    errorElement.textContent = message;
}

function hideFieldError(fieldGroup) {
    const errorElement = fieldGroup.querySelector('.field-error');
    if (errorElement) {
        errorElement.remove();
    }
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function isValidAmount(amount) {
    const amountRegex = /^\$?\d+(\.\d{2})?$/;
    return amountRegex.test(amount);
}

function setupAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            const focused = document.activeElement;
            if (focused && focused.classList.contains('category-option')) {
                e.preventDefault();
                focused.click();
            }
        }
    });

    // Add aria labels for screen readers
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        if (!button.getAttribute('aria-label') && button.textContent) {
            button.setAttribute('aria-label', button.textContent.trim());
        }
    });

    // Add role attributes
    const categoryOptions = document.querySelectorAll('.category-option');
    categoryOptions.forEach(option => {
        option.setAttribute('role', 'radio');
        option.setAttribute('tabindex', '0');
    });
}

function setupPerformanceOptimizations() {
    // Lazy load images
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize the main app
    window.formAssistanceApp = new FormAssistanceApp();

    // Setup additional features
    addTouchFeedback();
    setupFormValidation();
    setupAccessibility();
    setupPerformanceOptimizations();

    // Add loading state management
    document.body.classList.add('loaded');

    console.log('Intelligent Form Assistance App initialized successfully');
});

// Handle visibility changes for better performance
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Pause animations when tab is not visible
        document.querySelectorAll('.scan-line, .spinner').forEach(element => {
            element.style.animationPlayState = 'paused';
        });
    } else {
        // Resume animations when tab becomes visible
        document.querySelectorAll('.scan-line, .spinner').forEach(element => {
            element.style.animationPlayState = 'running';
        });
    }
});

// Export for testing purposes
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FormAssistanceApp;
}