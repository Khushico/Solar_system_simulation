// main.js - Updated to work with existing solar-system.js
class SolarSystemApp {
    constructor() {
        this.solarSystem = null;
        this.controls = null;
        this.isAnimating = true;
        this.animationId = null;
        
        // Wait for DOM and existing solar system to be ready
        this.initWhenReady();
    }

    initWhenReady() {
        // Wait for the existing solar system to be available
        const checkForSolarSystem = () => {
            // Check for globally available solar system
            if (window.solarSystem || window.getSolarSystem?.()) {
                this.solarSystem = window.solarSystem || window.getSolarSystem();
                console.log('Found existing solar system, initializing app...');
                this.init();
            } else {
                console.log('Waiting for solar system...');
                setTimeout(checkForSolarSystem, 100);
            }
        };

        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', checkForSolarSystem);
        } else {
            checkForSolarSystem();
        }
    }

    init() {
        try {
            // Hide loading screen
            this.showLoading(false);
            
            // Initialize controls
            this.initializeControls();
            
            // Add event listeners
            this.addEventListeners();
            
            console.log('Solar System App initialized successfully');
            
        } catch (error) {
            console.error('Error initializing solar system app:', error);
            this.showError('Failed to initialize controls. Solar system is still functional.');
        }
    }

    initializeControls() {
        // Enhanced master speed control
        const masterSpeed = document.getElementById('master-speed');
        const masterSpeedValue = document.getElementById('master-speed-value');
        
        if (masterSpeed && masterSpeedValue) {
            masterSpeed.addEventListener('input', (e) => {
                const speed = parseFloat(e.target.value);
                masterSpeedValue.textContent = `${speed.toFixed(1)}x`;
                this.updateGlobalSpeed(speed);
            });
        }

        // Enhanced pause/resume functionality
        const pauseBtn = document.getElementById('pause-all-btn');
        if (pauseBtn) {
            pauseBtn.addEventListener('click', () => {
                this.toggleAnimation();
                pauseBtn.textContent = this.solarSystem?.paused ? '▶️ Resume All' : '⏸️ Pause All';
            });
        }

        // Reset functionality
        const resetBtn = document.getElementById('reset-all-btn');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                this.resetSolarSystem();
            });
        }

        // Preset buttons
        this.setupPresetButtons();
        
        // Camera controls
        this.setupCameraControls();
    }

    setupPresetButtons() {
        const presets = {
            'preset-slow-btn': 0.3,
            'preset-normal-btn': 1.0,
            'preset-fast-btn': 2.5
        };

        Object.entries(presets).forEach(([buttonId, speed]) => {
            const button = document.getElementById(buttonId);
            if (button) {
                button.addEventListener('click', () => {
                    this.setPresetSpeed(speed);
                });
            }
        });
    }

    setupCameraControls() {
        const cameraControls = {
            'camera-reset-btn': () => this.resetCamera(),
            'camera-top-btn': () => this.setCameraView('top'),
            'camera-side-btn': () => this.setCameraView('side')
        };

        Object.entries(cameraControls).forEach(([buttonId, action]) => {
            const button = document.getElementById(buttonId);
            if (button) {
                button.addEventListener('click', action);
            }
        });

        // Camera speed control
        const cameraSpeed = document.getElementById('camera-speed');
        const cameraSpeedValue = document.getElementById('camera-speed-value');
        
        if (cameraSpeed && cameraSpeedValue) {
            cameraSpeed.addEventListener('input', (e) => {
                const speed = parseFloat(e.target.value);
                cameraSpeedValue.textContent = `${speed.toFixed(1)}x`;
                // You can implement camera movement speed here if needed
            });
        }
    }

    addEventListeners() {
        // Keyboard shortcuts
        document.addEventListener('keydown', (event) => {
            this.handleKeyboardShortcuts(event);
        });

        // Window resize (if not already handled by solar system)
        if (!this.solarSystem?.onWindowResize) {
            window.addEventListener('resize', () => this.onWindowResize());
        }

        // Theme toggle
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle && !themeToggle.hasAttribute('data-initialized')) {
            themeToggle.setAttribute('data-initialized', 'true');
            themeToggle.addEventListener('click', () => this.toggleTheme());
        }
    }

    handleKeyboardShortcuts(event) {
        // Don't interfere if user is typing in an input
        if (event.target.tagName === 'INPUT') return;

        switch(event.code) {
            case 'Space':
                event.preventDefault();
                this.toggleAnimation();
                break;
            case 'KeyR':
                if (!event.ctrlKey && !event.metaKey) {
                    event.preventDefault();
                    this.resetSolarSystem();
                }
                break;
            case 'KeyS':
                if (event.ctrlKey || event.metaKey) {
                    event.preventDefault();
                    this.toggleSidebar();
                }
                break;
        }
    }

    // Solar System Control Methods
    updateGlobalSpeed(speed) {
        if (this.solarSystem) {
            if (this.solarSystem.setSpeed) {
                this.solarSystem.setSpeed(speed);
            } else if (this.solarSystem.setGlobalSpeed) {
                this.solarSystem.setGlobalSpeed(speed);
            } else {
                this.solarSystem.animationSpeed = speed;
            }
        }
    }

    toggleAnimation() {
        if (this.solarSystem) {
            if (this.solarSystem.togglePause) {
                this.solarSystem.togglePause();
            } else {
                this.solarSystem.paused = !this.solarSystem.paused;
            }
        }
    }

    resetSolarSystem() {
        // Reset speed controls
        const masterSpeed = document.getElementById('master-speed');
        const masterSpeedValue = document.getElementById('master-speed-value');
        
        if (masterSpeed && masterSpeedValue) {
            masterSpeed.value = 1.0;
            masterSpeedValue.textContent = '1.0x';
        }

        // Reset solar system
        this.updateGlobalSpeed(1.0);
        this.resetCamera();

        // Ensure animation is running
        if (this.solarSystem?.paused) {
            this.toggleAnimation();
        }

        // Update pause button
        const pauseBtn = document.getElementById('pause-all-btn');
        if (pauseBtn) {
            pauseBtn.textContent = '⏸️ Pause All';
        }
    }

    setPresetSpeed(speed) {
        const masterSpeed = document.getElementById('master-speed');
        const masterSpeedValue = document.getElementById('master-speed-value');
        
        if (masterSpeed && masterSpeedValue) {
            masterSpeed.value = speed;
            masterSpeedValue.textContent = `${speed.toFixed(1)}x`;
            this.updateGlobalSpeed(speed);
        }
    }

    // Camera Control Methods
    resetCamera() {
        if (this.solarSystem?.resetCamera) {
            this.solarSystem.resetCamera();
        } else if (this.solarSystem?.camera) {
            this.solarSystem.camera.position.set(0, 50, 100);
            this.solarSystem.camera.lookAt(0, 0, 0);
        }
    }

    setCameraView(view) {
        if (!this.solarSystem?.camera) return;

        const camera = this.solarSystem.camera;
        
        switch(view) {
            case 'top':
                camera.position.set(0, 200, 0);
                camera.lookAt(0, 0, 0);
                break;
            case 'side':
                camera.position.set(200, 0, 0);
                camera.lookAt(0, 0, 0);
                break;
            case 'front':
                camera.position.set(0, 0, 200);
                camera.lookAt(0, 0, 0);
                break;
        }
    }

    // UI Methods
    toggleSidebar() {
        const sidebar = document.getElementById('mySidebar');
        const main = document.getElementById('main');
        
        if (sidebar && main) {
            const isOpen = sidebar.classList.contains('open');
            
            if (isOpen) {
                sidebar.classList.remove('open');
                main.classList.remove('shifted');
            } else {
                sidebar.classList.add('open');
                main.classList.add('shifted');
            }
        }
    }

    toggleTheme() {
        document.body.classList.toggle('dark-theme');
        const isDark = document.body.classList.contains('dark-theme');
        
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.textContent = isDark ? '☀️' : '🌙';
        }
        
        // Save theme preference
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        
        // Update solar system colors if possible
        if (this.solarSystem?.scene) {
            this.solarSystem.scene.background = new THREE.Color(isDark ? 0x000011 : 0x001122);
        }
    }

    onWindowResize() {
        if (this.solarSystem?.camera && this.solarSystem?.renderer) {
            this.solarSystem.camera.aspect = window.innerWidth / window.innerHeight;
            this.solarSystem.camera.updateProjectionMatrix();
            this.solarSystem.renderer.setSize(window.innerWidth, window.innerHeight);
        }
    }

    showLoading(show) {
        const loadingElement = document.getElementById('loading-screen');
        if (loadingElement) {
            loadingElement.style.display = show ? 'flex' : 'none';
        }
    }

    showError(message) {
        console.error(message);
        // You can implement error display UI here
        this.showLoading(false);
    }

    // Public API
    getSolarSystem() {
        return this.solarSystem;
    }

    getStatus() {
        return {
            isAnimating: this.solarSystem ? !this.solarSystem.paused : false,
            speed: this.solarSystem?.animationSpeed || 1.0,
            hasCamera: !!this.solarSystem?.camera,
            hasRenderer: !!this.solarSystem?.renderer
        };
    }
}

// Initialize the application
let solarSystemApp;

document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing Solar System App...');
    solarSystemApp = new SolarSystemApp();
    
    // Make it globally available
    window.solarSystemApp = solarSystemApp;
});

// Load saved theme on page load
document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.textContent = '☀️';
        }
    }
});