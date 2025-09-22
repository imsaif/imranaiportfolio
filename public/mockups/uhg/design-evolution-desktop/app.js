// Desktop Design Evolution JavaScript

document.addEventListener('DOMContentLoaded', function() {
    initializeTabs();
    initializeInteractions();
});

// Tab functionality
function initializeTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');

    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const version = this.getAttribute('data-version');
            switchDesktopVersion(version);
        });
    });
}

function switchDesktopVersion(version) {
    // Update tab states
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-version="${version}"]`).classList.add('active');

    // Update version display
    document.querySelectorAll('.desktop-version').forEach(versionEl => {
        versionEl.classList.remove('active');
    });
    document.getElementById(`desktop-${version}`).classList.add('active');

    // Reset V3 to upload state when switching to it
    if (version === 'v3') {
        resetSmartFlow();
    }
}

// V1 Error functionality
function showDesktopError() {
    document.getElementById('desktopErrorModal').style.display = 'flex';
}

function hideDesktopError() {
    document.getElementById('desktopErrorModal').style.display = 'none';
}

// V3 Smart flow functionality
function continueFromMobile() {
    // Hide mobile continuation, show form section with mobile data
    document.getElementById('mobile-continuation').classList.remove('active');
    document.getElementById('smart-form').classList.add('active');

    // Update section header to show continuation
    const sectionHeader = document.querySelector('#smart-form .section-header h2');
    sectionHeader.textContent = '📱→💻 Continuing from Mobile Device';

    const sectionDesc = document.querySelector('#smart-form .section-header p');
    sectionDesc.textContent = 'Your mobile data has been synced and pre-filled below';

    // Simulate smart detection animation
    setTimeout(() => {
        animateDetection();
        showContinuationMessage();
    }, 500);
}

function startNewUpload() {
    // Hide mobile continuation, show upload section
    document.getElementById('mobile-continuation').classList.remove('active');
    document.getElementById('smart-upload').classList.add('active');
}

function loadRecentUpload() {
    // Load from recent uploads list
    startNewUpload();
    // Simulate loading the selected upload
    setTimeout(() => {
        showSmartForm();
    }, 1000);
}

function showSmartForm() {
    // Hide upload section, show form section
    document.getElementById('smart-upload').classList.remove('active');
    document.getElementById('smart-form').classList.add('active');

    // Reset header if coming from new upload
    const sectionHeader = document.querySelector('#smart-form .section-header h2');
    sectionHeader.textContent = '🤖 Smart Detection Results';

    const sectionDesc = document.querySelector('#smart-form .section-header p');
    sectionDesc.textContent = "We've automatically filled in the details from your receipt";

    // Simulate smart detection animation
    setTimeout(() => {
        animateDetection();
    }, 500);
}

function showContinuationMessage() {
    // Add a temporary message showing successful sync
    const formSection = document.getElementById('smart-form');
    const continuationBanner = document.createElement('div');
    continuationBanner.className = 'continuation-banner';
    continuationBanner.innerHTML = `
        <div class="banner-content">
            <span class="banner-icon">✅</span>
            <div class="banner-text">
                <strong>Successfully synced from mobile device</strong>
                <p>All your data has been preserved and is ready for review</p>
            </div>
        </div>
    `;

    formSection.insertBefore(continuationBanner, formSection.querySelector('.detected-fields'));

    // Remove banner after 5 seconds
    setTimeout(() => {
        continuationBanner.remove();
    }, 5000);
}

function showReview() {
    // Hide form section, show review section
    document.getElementById('smart-form').classList.remove('active');
    document.getElementById('smart-review').classList.add('active');
}

function backToUpload() {
    document.getElementById('smart-form').classList.remove('active');
    document.getElementById('smart-upload').classList.add('active');
}

function backToForm() {
    document.getElementById('smart-review').classList.remove('active');
    document.getElementById('smart-form').classList.add('active');
}

function resetSmartFlow() {
    // Hide all sections except mobile continuation
    document.querySelectorAll('.smart-section').forEach(section => {
        section.classList.remove('active');
    });
    document.getElementById('mobile-continuation').classList.add('active');

    // Reset form headers to default
    const sectionHeader = document.querySelector('#smart-form .section-header h2');
    if (sectionHeader) {
        sectionHeader.textContent = '🤖 Smart Detection Results';
    }

    const sectionDesc = document.querySelector('#smart-form .section-header p');
    if (sectionDesc) {
        sectionDesc.textContent = "We've automatically filled in the details from your receipt";
    }

    // Hide success modal
    hideSuccess();
}

function showSuccess() {
    document.getElementById('desktopSuccessModal').style.display = 'flex';
}

function hideSuccess() {
    document.getElementById('desktopSuccessModal').style.display = 'none';
}

function submitAnother() {
    hideSuccess();
    resetSmartFlow();
}

// Smart detection animation
function animateDetection() {
    const detectionCards = document.querySelectorAll('.detection-card');

    detectionCards.forEach((card, index) => {
        // Start with opacity 0
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        // Animate in with delay
        setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';

            // Add scanning effect
            const scanLine = document.createElement('div');
            scanLine.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                height: 2px;
                background: linear-gradient(90deg, transparent, #FF6900, transparent);
                animation: scan 1s ease-in-out;
            `;

            card.style.position = 'relative';
            card.appendChild(scanLine);

            // Remove scan line after animation
            setTimeout(() => {
                scanLine.remove();
            }, 1000);

        }, index * 300);
    });

    // Animate eligibility check
    setTimeout(() => {
        const eligibilityCheck = document.querySelector('.eligibility-check');
        eligibilityCheck.style.opacity = '0';
        eligibilityCheck.style.transform = 'scale(0.9)';

        setTimeout(() => {
            eligibilityCheck.style.transition = 'all 0.5s ease';
            eligibilityCheck.style.opacity = '1';
            eligibilityCheck.style.transform = 'scale(1)';
        }, 100);
    }, 1200);
}

// Add scan animation CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes scan {
        0% { transform: translateX(-100%); }
        100% { transform: translateX(100%); }
    }

    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .detection-card {
        animation: fadeInUp 0.5s ease forwards;
    }
`;
document.head.appendChild(style);

// Initialize interactions
function initializeInteractions() {
    // Add hover effects to interactive elements
    const interactiveElements = document.querySelectorAll(
        '.drag-drop-zone, .upload-btn, .detection-card, .summary-card'
    );

    interactiveElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        element.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Add loading states to buttons
    const submitButtons = document.querySelectorAll('.btn.primary');

    submitButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (this.classList.contains('loading')) return;

            const originalText = this.textContent;
            this.textContent = 'Processing...';
            this.classList.add('loading');
            this.disabled = true;

            setTimeout(() => {
                this.textContent = originalText;
                this.classList.remove('loading');
                this.disabled = false;
            }, 2000);
        });
    });

    // Drag and drop simulation
    const dragZone = document.querySelector('.drag-drop-zone');
    if (dragZone) {
        dragZone.addEventListener('dragover', function(e) {
            e.preventDefault();
            this.style.background = '#fff8f0';
            this.style.borderColor = '#FF6900';
        });

        dragZone.addEventListener('dragleave', function(e) {
            this.style.background = '';
            this.style.borderColor = '';
        });

        dragZone.addEventListener('drop', function(e) {
            e.preventDefault();
            this.style.background = '';
            this.style.borderColor = '';

            // Simulate file processing
            this.innerHTML = `
                <div class="drop-icon">⏳</div>
                <h3>Processing Receipt...</h3>
                <p>Analyzing document with AI</p>
            `;

            setTimeout(() => {
                showSmartForm();
            }, 2000);
        });
    }

    // Form validation simulation
    const formInputs = document.querySelectorAll('input, select, textarea');

    formInputs.forEach(input => {
        input.addEventListener('blur', function() {
            if (this.hasAttribute('required') && !this.value) {
                this.style.borderColor = '#D32F2F';
                this.style.boxShadow = '0 0 0 3px rgba(211, 47, 47, 0.1)';
            } else {
                this.style.borderColor = '#00A651';
                this.style.boxShadow = '0 0 0 3px rgba(0, 166, 81, 0.1)';
            }
        });

        input.addEventListener('focus', function() {
            this.style.borderColor = '#FF6900';
            this.style.boxShadow = '0 0 0 3px rgba(255, 105, 0, 0.1)';
        });
    });

    // Smart select interaction
    const smartSelect = document.querySelector('.smart-select');
    if (smartSelect) {
        smartSelect.addEventListener('change', function() {
            // Show confidence update animation
            const badge = this.closest('.detection-card').querySelector('.confidence-badge');
            badge.style.background = '#e8f5e8';
            badge.style.color = '#00A651';
            badge.textContent = '✓ Confirmed';
        });
    }

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            // Enhanced tab navigation
            const focusableElements = document.querySelectorAll(
                'button, input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );

            focusableElements.forEach(el => {
                el.addEventListener('focus', function() {
                    this.style.outline = '2px solid #FF6900';
                    this.style.outlineOffset = '2px';
                });

                el.addEventListener('blur', function() {
                    this.style.outline = '';
                    this.style.outlineOffset = '';
                });
            });
        }
    });

    // Progressive enhancement for file inputs
    const fileInputs = document.querySelectorAll('input[type="file"]');

    fileInputs.forEach(input => {
        input.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                // Show file preview
                const preview = document.createElement('div');
                preview.style.cssText = `
                    margin-top: 16px;
                    padding: 12px;
                    background: #e8f5e8;
                    border-radius: 8px;
                    border-left: 4px solid #00A651;
                `;
                preview.innerHTML = `
                    <strong>File Selected:</strong> ${file.name}<br>
                    <small>Size: ${(file.size / 1024).toFixed(1)} KB</small>
                `;

                // Remove existing preview
                const existingPreview = this.parentNode.querySelector('.file-preview');
                if (existingPreview) {
                    existingPreview.remove();
                }

                preview.className = 'file-preview';
                this.parentNode.appendChild(preview);
            }
        });
    });

    // Add tooltips to help icons
    const helpButtons = document.querySelectorAll('.help-btn');

    helpButtons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            const tooltip = document.createElement('div');
            tooltip.style.cssText = `
                position: absolute;
                background: #333;
                color: white;
                padding: 8px 12px;
                border-radius: 6px;
                font-size: 12px;
                white-space: nowrap;
                z-index: 1000;
                pointer-events: none;
                transform: translateX(-50%);
                margin-top: -40px;
            `;
            tooltip.textContent = 'Get help with this step';
            tooltip.className = 'tooltip';

            this.style.position = 'relative';
            this.appendChild(tooltip);
        });

        button.addEventListener('mouseleave', function() {
            const tooltip = this.querySelector('.tooltip');
            if (tooltip) {
                tooltip.remove();
            }
        });
    });

    // Removed auto-scroll functionality to prevent unwanted scrolling in V3
}

// Close modals when clicking outside
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal-overlay')) {
        e.target.style.display = 'none';
    }
});

// Add escape key support for modals
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        const openModal = document.querySelector('.modal-overlay[style*="flex"]');
        if (openModal) {
            openModal.style.display = 'none';
        }
    }
});

// Simulate real-time updates
function simulateRealTimeUpdates() {
    // Update balance periodically
    const balanceElements = document.querySelectorAll('.balance-item strong');

    setInterval(() => {
        balanceElements.forEach(element => {
            if (element.textContent.includes('$')) {
                // Small random fluctuation
                const currentValue = parseFloat(element.textContent.replace('$', '').replace(',', ''));
                const newValue = currentValue + (Math.random() - 0.5) * 0.10;
                element.textContent = `$${newValue.toFixed(2)}`;
            }
        });
    }, 30000); // Update every 30 seconds
}

// Initialize real-time updates
simulateRealTimeUpdates();