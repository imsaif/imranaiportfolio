// Smart Receipt Capture App - Interactive Functionality
class SmartReceiptApp {
    constructor() {
        this.currentScreen = 'dashboard';
        this.capturedImage = null;
        this.formData = {};
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.showScreen('dashboard');
        this.updateHeaderTitle();
        this.simulateExistingSession();
    }

    setupEventListeners() {
        // Navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.addEventListener('click', (e) => {
                const screen = e.currentTarget.dataset.screen || 'dashboard';
                this.showScreen(screen);
            });
        });

        // Back button
        document.getElementById('backButton').addEventListener('click', () => {
            this.goBack();
        });

        // Reimbursement button on dashboard
        document.getElementById('reimbursementBtn').addEventListener('click', () => {
            this.showScreen('capture');
        });

        // Capture screen buttons
        document.getElementById('uploadBtn').addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });

        document.getElementById('cameraBtn').addEventListener('click', () => {
            this.simulatePhotoCapture();
        });

        // Camera preview click
        document.getElementById('cameraPreview').addEventListener('click', () => {
            document.getElementById('fileInput').click();
        });

        // File input change
        document.getElementById('fileInput').addEventListener('change', (e) => {
            this.handleFileUpload(e);
        });

        // Preview screen buttons
        document.getElementById('retakeBtn').addEventListener('click', () => {
            this.showScreen('capture');
        });

        document.getElementById('continueBtn').addEventListener('click', () => {
            this.showScreen('form');
        });

        // Form screen buttons
        document.getElementById('saveBtn').addEventListener('click', () => {
            this.saveDraft();
        });

        document.getElementById('submitBtn').addEventListener('click', () => {
            this.submitForm();
        });

        // Form input changes
        document.getElementById('expenseForm').addEventListener('input', (e) => {
            this.updateFormData(e.target.id, e.target.value);
        });

        // Touch gestures for mobile
        this.setupTouchGestures();
    }

    setupTouchGestures() {
        let startX = 0;
        let startY = 0;
        let currentX = 0;
        let currentY = 0;

        document.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            startY = e.touches[0].clientY;
        });

        document.addEventListener('touchmove', (e) => {
            currentX = e.touches[0].clientX;
            currentY = e.touches[0].clientY;
        });

        document.addEventListener('touchend', () => {
            const diffX = startX - currentX;
            const diffY = startY - currentY;

            // Swipe right to go back (only if horizontal swipe is dominant)
            if (diffX < -50 && Math.abs(diffX) > Math.abs(diffY)) {
                if (this.currentScreen !== 'dashboard') {
                    this.goBack();
                }
            }
        });
    }

    showScreen(screenName) {
        // Hide all screens
        document.querySelectorAll('.screen').forEach(screen => {
            screen.classList.remove('active');
        });

        // Show target screen
        const targetScreen = document.getElementById(screenName + 'Screen') ||
                            document.getElementById('dashboardScreen');
        targetScreen.classList.add('active');

        // Update navigation
        document.querySelectorAll('.nav-item').forEach(item => {
            item.classList.remove('active');
        });

        const navItem = document.querySelector(`[data-screen="${screenName}"]`) ||
                       document.querySelector('.nav-item');
        if (navItem) {
            navItem.classList.add('active');
        }

        this.currentScreen = screenName;
        this.updateHeaderTitle();
        this.updateBackButton();

        // Screen-specific initialization
        this.initializeScreen(screenName);
    }

    initializeScreen(screenName) {
        switch(screenName) {
            case 'capture':
                this.resetCaptureScreen();
                break;
            case 'form':
                this.initializeForm();
                break;
            case 'status':
                this.updateStatusScreen();
                break;
        }
    }

    updateHeaderTitle() {
        const titles = {
            'dashboard': 'HSA Reimbursement',
            'capture': 'Capture Receipt',
            'preview': 'Review Receipt',
            'form': 'Expense Details',
            'status': 'Submission Status'
        };

        document.getElementById('headerTitle').textContent = titles[this.currentScreen] || 'HSA Reimbursement';
    }

    updateBackButton() {
        const backButton = document.getElementById('backButton');
        if (this.currentScreen === 'dashboard') {
            backButton.classList.add('hidden');
        } else {
            backButton.classList.remove('hidden');
        }
    }

    goBack() {
        const backFlow = {
            'capture': 'dashboard',
            'preview': 'capture',
            'form': 'preview',
            'status': 'dashboard'
        };

        const previousScreen = backFlow[this.currentScreen] || 'dashboard';
        this.showScreen(previousScreen);
    }

    simulatePhotoCapture() {
        // Show loading state
        this.showToast('Taking photo...', 'info');

        // Simulate camera capture delay
        setTimeout(() => {
            // Create a sample receipt image
            this.createSampleReceipt();
            this.showScreen('preview');
            this.showToast('Photo captured successfully!', 'success');
        }, 1500);
    }

    createSampleReceipt() {
        // Create a canvas with sample receipt data
        const canvas = document.createElement('canvas');
        canvas.width = 400;
        canvas.height = 600;
        const ctx = canvas.getContext('2d');

        // Background
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        // Receipt content
        ctx.fillStyle = '#000000';
        ctx.font = 'bold 24px Arial';
        ctx.textAlign = 'center';
        ctx.fillText('WALGREENS', canvas.width / 2, 60);

        ctx.font = '16px Arial';
        ctx.fillText('Store #1234', canvas.width / 2, 90);
        ctx.fillText('123 Main St, City, ST 12345', canvas.width / 2, 110);

        // Items
        ctx.textAlign = 'left';
        ctx.font = '14px Arial';
        ctx.fillText('PRESCRIPTION MEDICATION', 40, 180);
        ctx.textAlign = 'right';
        ctx.fillText('$24.99', canvas.width - 40, 180);

        // Total
        ctx.font = 'bold 16px Arial';
        ctx.fillText('TOTAL: $24.99', canvas.width - 40, 220);

        // Date
        ctx.textAlign = 'center';
        ctx.font = '12px Arial';
        ctx.fillText('Sep 16, 2025  2:45 PM', canvas.width / 2, 280);

        // Convert to data URL
        this.capturedImage = canvas.toDataURL('image/png');

        // Update preview image
        const previewImage = document.getElementById('previewImage');
        previewImage.src = this.capturedImage;
        previewImage.style.display = 'block';
    }

    handleFileUpload(event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                this.capturedImage = e.target.result;
                const previewImage = document.getElementById('previewImage');
                previewImage.src = this.capturedImage;
                previewImage.style.display = 'block';

                this.showScreen('preview');
                this.showToast('Image uploaded successfully!', 'success');
            };
            reader.readAsDataURL(file);
        }
    }

    resetCaptureScreen() {
        // Reset file input
        document.getElementById('fileInput').value = '';
        this.capturedImage = null;
    }

    initializeForm() {
        // Pre-populate form with detected data
        if (this.capturedImage) {
            document.getElementById('provider').value = 'Walgreens Pharmacy';
            document.getElementById('amount').value = '24.99';
            document.getElementById('date').value = '2025-09-16';
            document.getElementById('category').value = 'pharmacy';

            // Update progress bar
            this.updateProgressBar(60);
        }
    }

    updateFormData(fieldId, value) {
        this.formData[fieldId] = value;

        // Update progress based on filled fields
        const requiredFields = ['category', 'amount', 'date', 'provider'];
        const filledFields = requiredFields.filter(field => {
            const element = document.getElementById(field);
            return element && element.value.trim() !== '';
        });

        const progress = Math.min((filledFields.length / requiredFields.length) * 100, 100);
        this.updateProgressBar(progress);
    }

    updateProgressBar(percentage) {
        const progressFill = document.querySelector('.progress-fill');
        if (progressFill) {
            progressFill.style.width = percentage + '%';
        }
    }

    saveDraft() {
        // Simulate saving draft
        this.showToast('Draft saved successfully!', 'success');

        // Store data in localStorage for demo
        localStorage.setItem('receiptDraft', JSON.stringify({
            ...this.formData,
            image: this.capturedImage,
            timestamp: new Date().toISOString()
        }));
    }

    submitForm() {
        // Basic validation
        const requiredFields = ['category', 'amount', 'date', 'provider'];
        const missingFields = requiredFields.filter(field => {
            const element = document.getElementById(field);
            return !element || element.value.trim() === '';
        });

        if (missingFields.length > 0) {
            this.showToast('Please fill in all required fields', 'error');
            return;
        }

        // Show loading
        this.showToast('Submitting reimbursement request...', 'info');

        // Simulate submission
        setTimeout(() => {
            this.showScreen('status');
            this.showToast('Reimbursement submitted successfully!', 'success');

            // Clear form data
            this.formData = {};
            this.capturedImage = null;

            // Start status simulation
            this.simulateStatusUpdates();
        }, 2000);
    }

    simulateStatusUpdates() {
        // Simulate real-time status updates
        setTimeout(() => {
            this.updateStatusStep('completed', 1);
        }, 3000);

        setTimeout(() => {
            this.updateStatusStep('completed', 2);
            this.updateStatusStep('active', 3);
        }, 8000);
    }

    updateStatusStep(status, stepIndex) {
        const steps = document.querySelectorAll('.status-step');
        if (steps[stepIndex - 1]) {
            steps[stepIndex - 1].className = `status-step ${status}`;
        }
    }

    updateStatusScreen() {
        // Reset all steps to initial state for demo
        const steps = document.querySelectorAll('.status-step');
        steps.forEach((step, index) => {
            if (index < 2) {
                step.className = 'status-step completed';
            } else if (index === 2) {
                step.className = 'status-step active';
            } else {
                step.className = 'status-step';
            }
        });
    }

    simulateExistingSession() {
        // Check for existing draft
        const draft = localStorage.getItem('receiptDraft');
        if (draft) {
            try {
                const draftData = JSON.parse(draft);
                this.formData = draftData;
                if (draftData.image) {
                    this.capturedImage = draftData.image;
                }
            } catch (e) {
                console.error('Error loading draft:', e);
            }
        }

        // Simulate some existing data for demo purposes
        this.addDemoTransactions();
    }

    addDemoTransactions() {
        // Add more demo transactions dynamically
        const additionalTransactions = [
            { name: 'CVS Pharmacy', date: 'Sep 12, 2025', amount: '$45.30' },
            { name: 'Dr. Johnson', date: 'Sep 8, 2025', amount: '$125.00' }
        ];

        // This is just for demo - in a real app, this would come from the backend
    }

    showToast(message, type = 'info') {
        // Remove existing toasts
        document.querySelectorAll('.toast').forEach(toast => {
            toast.remove();
        });

        // Create new toast
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        toast.textContent = message;

        document.body.appendChild(toast);

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 3000);
    }

    // Utility methods for enhanced interactivity
    formatCurrency(amount) {
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD'
        }).format(amount);
    }

    formatDate(date) {
        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    // Simulate smart categorization
    smartCategorizeReceipt(imageData) {
        // In a real app, this would use OCR and ML
        const categories = {
            'walgreens': 'pharmacy',
            'cvs': 'pharmacy',
            'doctor': 'medical',
            'dental': 'dental',
            'vision': 'vision'
        };

        // Simple mock based on detected vendor
        return 'pharmacy';
    }

    // Simulate real-time validation
    validateReceiptQuality(imageData) {
        // In a real app, this would analyze image quality
        return {
            quality: 'good',
            confidence: 0.95,
            issues: []
        };
    }
}

// Initialize the app when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SmartReceiptApp();
});

// Add some enhanced mobile interactions
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for better mobile experience
    document.documentElement.style.scrollBehavior = 'smooth';

    // Prevent zoom on input focus for iOS
    const metaViewport = document.querySelector('meta[name="viewport"]');
    if (metaViewport) {
        const inputs = document.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('focus', () => {
                metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0');
            });

            input.addEventListener('blur', () => {
                metaViewport.setAttribute('content', 'width=device-width, initial-scale=1.0, user-scalable=no');
            });
        });
    }

    // Add haptic feedback simulation for buttons (if supported)
    if ('vibrate' in navigator) {
        document.querySelectorAll('button, .action-button').forEach(button => {
            button.addEventListener('click', () => {
                navigator.vibrate(50); // Short vibration
            });
        });
    }

    // Add visual feedback for touch interactions
    document.querySelectorAll('button, .action-button, .account-card').forEach(element => {
        element.addEventListener('touchstart', () => {
            element.style.transform = 'scale(0.98)';
        });

        element.addEventListener('touchend', () => {
            element.style.transform = 'scale(1)';
        });

        element.addEventListener('touchcancel', () => {
            element.style.transform = 'scale(1)';
        });
    });
});

// Service Worker registration for offline capability (basic)
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        // In a production app, you would register a service worker here
        console.log('Service Worker support detected');
    });
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    // Escape key to go back
    if (e.key === 'Escape') {
        const backButton = document.getElementById('backButton');
        if (!backButton.classList.contains('hidden')) {
            backButton.click();
        }
    }

    // Tab navigation enhancements
    if (e.key === 'Tab') {
        // Add visible focus indicators for keyboard navigation
        document.body.classList.add('keyboard-nav');
    }
});

// Remove keyboard nav class on mouse interaction
document.addEventListener('mousedown', () => {
    document.body.classList.remove('keyboard-nav');
});

// Add CSS for keyboard navigation
const keyboardNavCSS = `
    .keyboard-nav button:focus,
    .keyboard-nav .action-button:focus,
    .keyboard-nav input:focus,
    .keyboard-nav select:focus,
    .keyboard-nav textarea:focus {
        outline: 2px solid var(--primary-orange);
        outline-offset: 2px;
    }
`;

const style = document.createElement('style');
style.textContent = keyboardNavCSS;
document.head.appendChild(style);