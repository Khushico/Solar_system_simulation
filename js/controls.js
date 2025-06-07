// // controls.js - Speed control system for planets
// export class Controls {
//     constructor(solarSystem) {
//         this.solarSystem = solarSystem;
//         this.controlPanel = null;
//         this.planetControls = new Map();
//         this.masterSpeedMultiplier = 1.0;
//         this.isVisible = true;
        
//         // Default speed ranges
//         this.speedRange = {
//             min: 0,
//             max: 5,
//             step: 0.1,
//             default: 1.0
//         };
//     }

//     init() {
//         this.createControlPanel();
//         this.createMasterControls();
//         this.createPlanetControls();
//         this.addEventListeners();
//         this.updateControlsVisibility();
//     }

//     createControlPanel() {
//         // Check if control panel already exists
//         this.controlPanel = document.getElementById('control-panel');
        
//         if (!this.controlPanel) {
//             // Create control panel element
//             this.controlPanel = document.createElement('div');
//             this.controlPanel.id = 'control-panel';
//             this.controlPanel.className = 'control-panel';
//             document.body.appendChild(this.controlPanel);
//         }

//         // Set up the panel structure
//         this.controlPanel.innerHTML = `
//             <div class="control-header">
//                 <h3>Solar System Controls</h3>
//                 <button id="toggle-controls-btn" class="toggle-btn">−</button>
//             </div>
//             <div class="control-content" id="control-content">
//                 <div class="master-controls">
//                     <h4>Master Controls</h4>
//                     <div class="control-group">
//                         <label for="master-speed">Overall Speed:</label>
//                         <input type="range" id="master-speed" min="0" max="3" step="0.1" value="1">
//                         <span id="master-speed-value">1.0x</span>
//                     </div>
//                     <div class="button-group">
//                         <button id="pause-all-btn" class="control-btn">Pause All</button>
//                         <button id="reset-all-btn" class="control-btn">Reset All</button>
//                     </div>
//                 </div>
//                 <div class="planet-controls" id="planet-controls">
//                     <h4>Individual Planet Controls</h4>
//                 </div>
//             </div>
//         `;
//     }

//     createMasterControls() {
//         const masterSpeedSlider = document.getElementById('master-speed');
//         const masterSpeedValue = document.getElementById('master-speed-value');
//         const pauseAllBtn = document.getElementById('pause-all-btn');
//         const resetAllBtn = document.getElementById('reset-all-btn');

//         // Master speed control
//         if (masterSpeedSlider && masterSpeedValue) {
//             masterSpeedSlider.addEventListener('input', (e) => {
//                 this.masterSpeedMultiplier = parseFloat(e.target.value);
//                 masterSpeedValue.textContent = `${this.masterSpeedMultiplier.toFixed(1)}x`;
//                 this.updateAllPlanetSpeeds();
//             });
//         }

//         // Pause all button
//         if (pauseAllBtn) {
//             pauseAllBtn.addEventListener('click', () => {
//                 this.toggleAllPlanets();
//                 pauseAllBtn.textContent = this.masterSpeedMultiplier === 0 ? 'Resume All' : 'Pause All';
//             });
//         }

//         // Reset all button
//         if (resetAllBtn) {
//             resetAllBtn.addEventListener('click', () => {
//                 this.resetAllControls();
//             });
//         }
//     }

//     createPlanetControls() {
//         const planetControlsContainer = document.getElementById('planet-controls');
//         if (!planetControlsContainer || !this.solarSystem || !this.solarSystem.planets) {
//             return;
//         }

//         // Clear existing controls
//         planetControlsContainer.innerHTML = '<h4>Individual Planet Controls</h4>';

//         // Create controls for each planet
//         this.solarSystem.planets.forEach((planet, index) => {
//             this.createPlanetControl(planet, planetControlsContainer);
//         });
//     }

//     createPlanetControl(planet, container) {
//         const planetData = planet.userData;
//         const planetName = planetData.name;
//         const planetId = planetName.toLowerCase();

//         // Create planet control group
//         const controlGroup = document.createElement('div');
//         controlGroup.className = 'planet-control-group';
//         controlGroup.innerHTML = `
//             <div class="planet-control-header">
//                 <span class="planet-name" style="color: ${this.getPlanetColor(planetName)}">${planetName}</span>
//                 <button class="planet-toggle-btn" data-planet="${planetId}">⏸️</button>
//             </div>
//             <div class="planet-control-body">
//                 <div class="slider-group">
//                     <label for="${planetId}-speed">Orbital Speed:</label>
//                     <input 
//                         type="range" 
//                         id="${planetId}-speed" 
//                         class="planet-speed-slider"
//                         data-planet="${planetId}"
//                         min="${this.speedRange.min}" 
//                         max="${this.speedRange.max}" 
//                         step="${this.speedRange.step}" 
//                         value="${this.speedRange.default}"
//                     >
//                     <span class="speed-value" id="${planetId}-speed-value">${this.speedRange.default.toFixed(1)}x</span>
//                 </div>
//                 <div class="slider-group">
//                     <label for="${planetId}-rotation">Rotation Speed:</label>
//                     <input 
//                         type="range" 
//                         id="${planetId}-rotation" 
//                         class="planet-rotation-slider"
//                         data-planet="${planetId}"
//                         min="${this.speedRange.min}" 
//                         max="${this.speedRange.max}" 
//                         step="${this.speedRange.step}" 
//                         value="${this.speedRange.default}"
//                     >
//                     <span class="speed-value" id="${planetId}-rotation-value">${this.speedRange.default.toFixed(1)}x</span>
//                 </div>
//                 <div class="button-group">
//                     <button class="planet-reset-btn" data-planet="${planetId}">Reset</button>
//                     <button class="planet-info-btn" data-planet="${planetId}">Info</button>
//                 </div>
//             </div>
//         `;

//         container.appendChild(controlGroup);

//         // Store control references
//         this.planetControls.set(planetId, {
//             planet: planet,
//             speedSlider: controlGroup.querySelector(`#${planetId}-speed`),
//             rotationSlider: controlGroup.querySelector(`#${planetId}-rotation`),
//             speedValue: controlGroup.querySelector(`#${planetId}-speed-value`),
//             rotationValue: controlGroup.querySelector(`#${planetId}-rotation-value`),
//             toggleBtn: controlGroup.querySelector(`.planet-toggle-btn[data-planet="${planetId}"]`),
//             resetBtn: controlGroup.querySelector(`.planet-reset-btn[data-planet="${planetId}"]`),
//             infoBtn: controlGroup.querySelector(`.planet-info-btn[data-planet="${planetId}"]`),
//             isPaused: false,
//             originalSpeed: planetData.orbitSpeed || 1.0,
//             originalRotation: planetData.rotationSpeed || 1.0
//         });

//         // Add event listeners for this planet
//         this.addPlanetEventListeners(planetId);
//     }

//     addPlanetEventListeners(planetId) {
//         const controls = this.planetControls.get(planetId);
//         if (!controls) return;

//         // Speed slider
//         controls.speedSlider.addEventListener('input', (e) => {
//             const speed = parseFloat(e.target.value);
//             controls.speedValue.textContent = `${speed.toFixed(1)}x`;
//             this.updatePlanetSpeed(planetId, 'orbit', speed);
//         });

//         // Rotation slider
//         controls.rotationSlider.addEventListener('input', (e) => {
//             const speed = parseFloat(e.target.value);
//             controls.rotationValue.textContent = `${speed.toFixed(1)}x`;
//             this.updatePlanetSpeed(planetId, 'rotation', speed);
//         });

//         // Toggle button
//         controls.toggleBtn.addEventListener('click', () => {
//             this.togglePlanet(planetId);
//         });

//         // Reset button
//         controls.resetBtn.addEventListener('click', () => {
//             this.resetPlanetControl(planetId);
//         });

//         // Info button
//         controls.infoBtn.addEventListener('click', () => {
//             this.showPlanetInfo(planetId);
//         });
//     }

//     updatePlanetSpeed(planetId, type, speed) {
//         const controls = this.planetControls.get(planetId);
//         if (!controls || !controls.planet) return;

//         const finalSpeed = speed * this.masterSpeedMultiplier;
//         const planetData = controls.planet.userData;

//         if (type === 'orbit') {
//             planetData.orbitSpeedMultiplier = finalSpeed;
//         } else if (type === 'rotation') {
//             planetData.rotationSpeedMultiplier = finalSpeed;
//         }

//         // Update the planet in the solar system
//         if (this.solarSystem && this.solarSystem.updatePlanetSpeed) {
//             this.solarSystem.updatePlanetSpeed(planetId, type, finalSpeed);
//         }
//     }

//     updateAllPlanetSpeeds() {
//         this.planetControls.forEach((controls, planetId) => {
//             const orbitSpeed = parseFloat(controls.speedSlider.value);
//             const rotationSpeed = parseFloat(controls.rotationSlider.value);
            
//             this.updatePlanetSpeed(planetId, 'orbit', orbitSpeed);
//             this.updatePlanetSpeed(planetId, 'rotation', rotationSpeed);
//         });
//     }

//     togglePlanet(planetId) {
//         const controls = this.planetControls.get(planetId);
//         if (!controls) return;

//         controls.isPaused = !controls.isPaused;
//         controls.toggleBtn.textContent = controls.isPaused ? '▶️' : '⏸️';
        
//         // Update planet speed (0 when paused, normal when playing)
//         const orbitSpeed = controls.isPaused ? 0 : parseFloat(controls.speedSlider.value);
//         const rotationSpeed = controls.isPaused ? 0 : parseFloat(controls.rotationSlider.value);
        
//         this.updatePlanetSpeed(planetId, 'orbit', orbitSpeed);
//         this.updatePlanetSpeed(planetId, 'rotation', rotationSpeed);
//     }

//     toggleAllPlanets() {
//         const shouldPause = this.masterSpeedMultiplier > 0;
        
//         if (shouldPause) {
//             // Store current speed and set to 0
//             this.storedMasterSpeed = this.masterSpeedMultiplier;
//             this.masterSpeedMultiplier = 0;
//         } else {
//             // Restore previous speed
//             this.masterSpeedMultiplier = this.storedMasterSpeed || 1.0;
//         }

//         // Update master speed slider
//         const masterSpeedSlider = document.getElementById('master-speed');
//         const masterSpeedValue = document.getElementById('master-speed-value');
        
//         if (masterSpeedSlider && masterSpeedValue) {
//             masterSpeedSlider.value = this.masterSpeedMultiplier;
//             masterSpeedValue.textContent = `${this.masterSpeedMultiplier.toFixed(1)}x`;
//         }

//         this.updateAllPlanetSpeeds();
//     }

//     resetPlanetControl(planetId) {
//         const controls = this.planetControls.get(planetId);
//         if (!controls) return;

//         // Reset sliders to default values
//         controls.speedSlider.value = this.speedRange.default;
//         controls.rotationSlider.value = this.speedRange.default;
//         controls.speedValue.textContent = `${this.speedRange.default.toFixed(1)}x`;
//         controls.rotationValue.textContent = `${this.speedRange.default.toFixed(1)}x`;
        
//         // Reset pause state
//         controls.isPaused = false;
//         controls.toggleBtn.textContent = '⏸️';
        
//         // Update planet speeds
//         this.updatePlanetSpeed(planetId, 'orbit', this.speedRange.default);
//         this.updatePlanetSpeed(planetId, 'rotation', this.speedRange.default);
//     }

//     resetAllControls() {
//         // Reset master controls
//         this.masterSpeedMultiplier = 1.0;
//         const masterSpeedSlider = document.getElementById('master-speed');
//         const masterSpeedValue = document.getElementById('master-speed-value');
        
//         if (masterSpeedSlider && masterSpeedValue) {
//             masterSpeedSlider.value = 1.0;
//             masterSpeedValue.textContent = '1.0x';
//         }

//         // Reset all planet controls
//         this.planetControls.forEach((controls, planetId) => {
//             this.resetPlanetControl(planetId);
//         });

//         // Update pause all button
//         const pauseAllBtn = document.getElementById('pause-all-btn');
//         if (pauseAllBtn) {
//             pauseAllBtn.textContent = 'Pause All';
//         }
//     }

//     showPlanetInfo(planetId) {
//         const controls = this.planetControls.get(planetId);
//         if (!controls) return;

//         const planetData = controls.planet.userData;
//         const info = this.getPlanetInfo(planetId);
        
//         // Create or update info modal
//         let modal = document.getElementById('planet-info-modal');
//         if (!modal) {
//             modal = document.createElement('div');
//             modal.id = 'planet-info-modal';
//             modal.className = 'modal';
//             document.body.appendChild(modal);
//         }

//         modal.innerHTML = `
//             <div class="modal-content">
//                 <span class="close" onclick="this.parentElement.parentElement.style.display='none'">&times;</span>
//                 <h2 style="color: ${this.getPlanetColor(planetData.name)}">${planetData.name}</h2>
//                 <div class="planet-info">
//                     <p><strong>Distance from Sun:</strong> ${info.distance}</p>
//                     <p><strong>Diameter:</strong> ${info.diameter}</p>
//                     <p><strong>Orbital Period:</strong> ${info.orbitalPeriod}</p>
//                     <p><strong>Day Length:</strong> ${info.dayLength}</p>
//                     <p><strong>Moons:</strong> ${info.moons}</p>
//                     <p><strong>Composition:</strong> ${info.composition}</p>
//                     <p><strong>Fun Fact:</strong> ${info.funFact}</p>
//                 </div>
//             </div>
//         `;

//         modal.style.display = 'block';
//     }

//     getPlanetInfo(planetId) {
//         const planetInfo = {
//             mercury: {
//                 distance: '57.9 million km',
//                 diameter: '4,879 km',
//                 orbitalPeriod: '88 Earth days',
//                 dayLength: '59 Earth days',
//                 moons: '0',
//                 composition: 'Rocky planet with large iron core',
//                 funFact: 'Mercury has the most extreme temperature variations in the solar system!'
//             },
//             venus: {
//                 distance: '108.2 million km',
//                 diameter: '12,104 km',
//                 orbitalPeriod: '225 Earth days',
//                 dayLength: '243 Earth days',
//                 moons: '0',
//                 composition: 'Rocky planet with thick atmosphere',
//                 funFact: 'Venus rotates backwards compared to most planets!'
//             },
//             earth: {
//                 distance: '149.6 million km',
//                 diameter: '12,756 km',
//                 orbitalPeriod: '365.25 days',
//                 dayLength: '24 hours',
//                 moons: '1',
//                 composition: 'Rocky planet with water and life',
//                 funFact: 'Earth is the only known planet with life!'
//             },
//             mars: {
//                 distance: '227.9 million km',
//                 diameter: '6,792 km',
//                 orbitalPeriod: '687 Earth days',
//                 dayLength: '24.6 hours',
//                 moons: '2',
//                 composition: 'Rocky planet with iron oxide surface',
//                 funFact: 'Mars has the largest volcano in the solar system - Olympus Mons!'
//             },
//             jupiter: {
//                 distance: '778.6 million km',
//                 diameter: '142,984 km',
//                 orbitalPeriod: '12 Earth years',
//                 dayLength: '9.9 hours',
//                 moons: '95+',
//                 composition: 'Gas giant made mostly of hydrogen and helium',
//                 funFact: 'Jupiter is so massive it could contain all other planets!'
//             },
//             saturn: {
//                 distance: '1.43 billion km',
//                 diameter: '120,536 km',
//                 orbitalPeriod: '29 Earth years',
//                 dayLength: '10.7 hours',
//                 moons: '146+',
//                 composition: 'Gas giant with prominent ring system',
//                 funFact: 'Saturn is less dense than water - it would float!'
//             },
//             uranus: {
//                 distance: '2.87 billion km',
//                 diameter: '51,118 km',
//                 orbitalPeriod: '84 Earth years',
//                 dayLength: '17.2 hours',
//                 moons: '27',
//                 composition: 'Ice giant with methane atmosphere',
//                 funFact: 'Uranus rotates on its side with an 98° axial tilt!'
//             },
//             neptune: {
//                 distance: '4.50 billion km',
//                 diameter: '49,528 km',
//                 orbitalPeriod: '165 Earth years',
//                 dayLength: '16.1 hours',
//                 moons: '16',
//                 composition: 'Ice giant with strong winds',
//                 funFact: 'Neptune has the fastest winds in the solar system - up to 2,100 km/h!'
//             }
//         };

//         return planetInfo[planetId] || {};
//     }

//     getPlanetColor(planetName) {
//         const colors = {
//             'Mercury': '#8C7853',
//             'Venus': '#FFC649',
//             'Earth': '#6B93D6',
//             'Mars': '#C1440E',
//             'Jupiter': '#D8CA9D',
//             'Saturn': '#FAD5A5',
//             'Uranus': '#4FD0E7',
//             'Neptune': '#4B70DD'
//         };
//         return colors[planetName] || '#FFFFFF';
//     }

//     addEventListeners() {
//         // Toggle controls visibility
//         const toggleBtn = document.getElementById('toggle-controls-btn');
//         if (toggleBtn) {
//             toggleBtn.addEventListener('click', () => {
//                 this.toggleControlsVisibility();
//             });
//         }

//         // Keyboard shortcuts
//         document.addEventListener('keydown', (event) => {
//             this.handleKeyboardShortcuts(event);
//         });

//         // Close modal when clicking outside
//         window.addEventListener('click', (event) => {
//             const modal = document.getElementById('planet-info-modal');
//             if (event.target === modal) {
//                 modal.style.display = 'none';
//             }
//         });
//     }

//     handleKeyboardShortcuts(event) {
//         if (event.target.tagName === 'INPUT') return; // Don't trigger if typing in input

//         switch(event.code) {
//             case 'KeyC':
//                 event.preventDefault();
//                 this.toggleControlsVisibility();
//                 break;
//             case 'KeyP':
//                 event.preventDefault();
//                 this.toggleAllPlanets();
//                 break;
//             case 'KeyR':
//                 if (event.ctrlKey || event.metaKey) return; // Don't interfere with browser refresh
//                 event.preventDefault();
//                 this.resetAllControls();
//                 break;
//             case 'Escape':
//                 const modal = document.getElementById('planet-info-modal');
//                 if (modal) {
//                     modal.style.display = 'none';
//                 }
//                 break;
//         }
//     }

//     toggleControlsVisibility() {
//         this.isVisible = !this.isVisible;
//         const controlContent = document.getElementById('control-content');
//         const toggleBtn = document.getElementById('toggle-controls-btn');
        
//         if (controlContent && toggleBtn) {
//             if (this.isVisible) {
//                 controlContent.style.display = 'block';
//                 toggleBtn.textContent = '−';
//                 this.controlPanel.classList.remove('collapsed');
//             } else {
//                 controlContent.style.display = 'none';
//                 toggleBtn.textContent = '+';
//                 this.controlPanel.classList.add('collapsed');
//             }
//         }
//     }

//     updateControlsVisibility() {
//         // Set initial visibility based on screen size
//         const isMobile = window.innerWidth <= 768;
//         if (isMobile && this.isVisible) {
//             this.toggleControlsVisibility();
//         }
//     }

//     // Method to get current planet speeds (useful for debugging)
//     getCurrentSpeeds() {
//         const speeds = {};
//         this.planetControls.forEach((controls, planetId) => {
//             speeds[planetId] = {
//                 orbit: parseFloat(controls.speedSlider.value) * this.masterSpeedMultiplier,
//                 rotation: parseFloat(controls.rotationSlider.value) * this.masterSpeedMultiplier,
//                 isPaused: controls.isPaused
//             };
//         });
//         return speeds;
//     }

//     // Method to set planet speed programmatically
//     setPlanetSpeed(planetId, type, speed) {
//         const controls = this.planetControls.get(planetId);
//         if (!controls) return false;

//         if (type === 'orbit') {
//             controls.speedSlider.value = speed;
//             controls.speedValue.textContent = `${speed.toFixed(1)}x`;
//         } else if (type === 'rotation') {
//             controls.rotationSlider.value = speed;
//             controls.rotationValue.textContent = `${speed.toFixed(1)}x`;
//         }

//         this.updatePlanetSpeed(planetId, type, speed);
//         return true;
//     }

//     // Method to set master speed programmatically
//     setMasterSpeed(speed) {
//         this.masterSpeedMultiplier = Math.max(0, Math.min(3, speed));
        
//         const masterSpeedSlider = document.getElementById('master-speed');
//         const masterSpeedValue = document.getElementById('master-speed-value');
        
//         if (masterSpeedSlider && masterSpeedValue) {
//             masterSpeedSlider.value = this.masterSpeedMultiplier;
//             masterSpeedValue.textContent = `${this.masterSpeedMultiplier.toFixed(1)}x`;
//         }

//         this.updateAllPlanetSpeeds();
//     }

//     // Method to get control panel statistics
//     getControlStats() {
//         return {
//             totalPlanets: this.planetControls.size,
//             activePlanets: Array.from(this.planetControls.values()).filter(c => !c.isPaused).length,
//             masterSpeed: this.masterSpeedMultiplier,
//             isVisible: this.isVisible,
//             averageOrbitSpeed: this.getAverageSpeed('orbit'),
//             averageRotationSpeed: this.getAverageSpeed('rotation')
//         };
//     }

//     getAverageSpeed(type) {
//         let total = 0;
//         let count = 0;
        
//         this.planetControls.forEach((controls) => {
//             if (!controls.isPaused) {
//                 const speed = type === 'orbit' 
//                     ? parseFloat(controls.speedSlider.value)
//                     : parseFloat(controls.rotationSlider.value);
//                 total += speed;
//                 count++;
//             }
//         });

//         return count > 0 ? total / count : 0;
//     }

//     // Method to export current settings
//     exportSettings() {
//         const settings = {
//             masterSpeed: this.masterSpeedMultiplier,
//             planetSettings: {}
//         };

//         this.planetControls.forEach((controls, planetId) => {
//             settings.planetSettings[planetId] = {
//                 orbitSpeed: parseFloat(controls.speedSlider.value),
//                 rotationSpeed: parseFloat(controls.rotationSlider.value),
//                 isPaused: controls.isPaused
//             };
//         });

//         return JSON.stringify(settings, null, 2);
//     }

//     // Method to import settings
//     importSettings(settingsJson) {
//         try {
//             const settings = JSON.parse(settingsJson);
            
//             // Set master speed
//             if (settings.masterSpeed !== undefined) {
//                 this.setMasterSpeed(settings.masterSpeed);
//             }

//             // Set planet settings
//             if (settings.planetSettings) {
//                 Object.entries(settings.planetSettings).forEach(([planetId, planetSettings]) => {
//                     const controls = this.planetControls.get(planetId);
//                     if (controls) {
//                         // Set orbit speed
//                         if (planetSettings.orbitSpeed !== undefined) {
//                             this.setPlanetSpeed(planetId, 'orbit', planetSettings.orbitSpeed);
//                         }
                        
//                         // Set rotation speed
//                         if (planetSettings.rotationSpeed !== undefined) {
//                             this.setPlanetSpeed(planetId, 'rotation', planetSettings.rotationSpeed);
//                         }
                        
//                         // Set pause state
//                         if (planetSettings.isPaused !== undefined && 
//                             planetSettings.isPaused !== controls.isPaused) {
//                             this.togglePlanet(planetId);
//                         }
//                     }
//                 });
//             }

//             return true;
//         } catch (error) {
//             console.error('Error importing settings:', error);
//             return false;
//         }
//     }

//     // Method to create preset configurations
//     applyPreset(presetName) {
//         const presets = {
//             default: {
//                 masterSpeed: 1.0,
//                 planetSettings: Object.fromEntries(
//                     Array.from(this.planetControls.keys()).map(id => [id, {
//                         orbitSpeed: 1.0,
//                         rotationSpeed: 1.0,
//                         isPaused: false
//                     }])
//                 )
//             },
//             slow: {
//                 masterSpeed: 0.3,
//                 planetSettings: Object.fromEntries(
//                     Array.from(this.planetControls.keys()).map(id => [id, {
//                         orbitSpeed: 0.5,
//                         rotationSpeed: 0.5,
//                         isPaused: false
//                     }])
//                 )
//             },
//             fast: {
//                 masterSpeed: 2.0,
//                 planetSettings: Object.fromEntries(
//                     Array.from(this.planetControls.keys()).map(id => [id, {
//                         orbitSpeed: 2.0,
//                         rotationSpeed: 2.0,
//                         isPaused: false
//                     }])
//                 )
//             },
//             realistic: {
//                 masterSpeed: 1.0,
//                 planetSettings: {
//                     mercury: { orbitSpeed: 4.15, rotationSpeed: 0.017, isPaused: false },
//                     venus: { orbitSpeed: 1.62, rotationSpeed: 0.004, isPaused: false },
//                     earth: { orbitSpeed: 1.0, rotationSpeed: 1.0, isPaused: false },
//                     mars: { orbitSpeed: 0.53, rotationSpeed: 0.97, isPaused: false },
//                     jupiter: { orbitSpeed: 0.084, rotationSpeed: 2.4, isPaused: false },
//                     saturn: { orbitSpeed: 0.034, rotationSpeed: 2.23, isPaused: false },
//                     uranus: { orbitSpeed: 0.012, rotationSpeed: 1.39, isPaused: false },
//                     neptune: { orbitSpeed: 0.006, rotationSpeed: 1.49, isPaused: false }
//                 }
//             }
//         };

//         const preset = presets[presetName];
//         if (preset) {
//             this.importSettings(JSON.stringify(preset));
//             return true;
//         }
//         return false;
//     }

//     // Cleanup method
//     destroy() {
//         // Remove event listeners
//         const toggleBtn = document.getElementById('toggle-controls-btn');
//         if (toggleBtn) {
//             toggleBtn.removeEventListener('click', this.toggleControlsVisibility);
//         }

//         // Clear planet controls
//         this.planetControls.clear();

//         // Remove control panel from DOM if it was created by this class
//         if (this.controlPanel && this.controlPanel.parentNode) {
//             this.controlPanel.parentNode.removeChild(this.controlPanel);
//         }
//     }

//     // Reset method
//     reset() {
//         this.resetAllControls();
//         this.setMasterSpeed(1.0);
//     }
// }
// controls.js - Speed control system for planets with hamburger menu
export class Controls {
    constructor(solarSystem) {
        this.solarSystem = solarSystem;
        this.controlPanel = null;
        this.hamburgerMenu = null;
        this.planetControls = new Map();
        this.masterSpeedMultiplier = 1.0;
        this.isVisible = false; // Start hidden
        this.isMenuOpen = false;
        
        // Default speed ranges
        this.speedRange = {
            min: 0,
            max: 5,
            step: 0.1,
            default: 1.0
        };
    }

    init() {
        this.createHamburgerMenu();
        this.createControlPanel();
        this.createMasterControls();
        this.createPlanetControls();
        this.addEventListeners();
        this.updateControlsVisibility();
    }

    // NEW: Create hamburger menu button
    createHamburgerMenu() {
        // Check if hamburger menu already exists
        this.hamburgerMenu = document.getElementById('hamburger-menu');
        
        if (!this.hamburgerMenu) {
            this.hamburgerMenu = document.createElement('button');
            this.hamburgerMenu.id = 'hamburger-menu';
            this.hamburgerMenu.className = 'hamburger-menu';
            this.hamburgerMenu.innerHTML = `
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
                <span class="hamburger-line"></span>
            `;
            document.body.appendChild(this.hamburgerMenu);
        }

        // Add hamburger menu styles
        this.addHamburgerStyles();
    }

    // NEW: Add CSS styles for hamburger menu
    addHamburgerStyles() {
        const style = document.createElement('style');
        style.textContent = `
            /* Hamburger Menu Button */
            .hamburger-menu {
                position: fixed;
                top: 20px;
                right: 20px;
                z-index: 1001;
                background: rgba(0, 0, 0, 0.8);
                border: 2px solid #fff;
                border-radius: 8px;
                padding: 12px;
                cursor: pointer;
                display: flex;
                flex-direction: column;
                justify-content: space-around;
                width: 50px;
                height: 50px;
                transition: all 0.3s ease;
                backdrop-filter: blur(10px);
            }

            .hamburger-menu:hover {
                background: rgba(76, 175, 80, 0.2);
                border-color: #4CAF50;
                transform: scale(1.05);
            }

            /* Hamburger Lines */
            .hamburger-line {
                width: 25px;
                height: 3px;
                background: #fff;
                border-radius: 2px;
                transition: all 0.3s ease;
                transform-origin: center;
            }

            /* Hamburger Animation when Active */
            .hamburger-menu.active .hamburger-line:nth-child(1) {
                transform: rotate(45deg) translate(6px, 6px);
                background: #4CAF50;
            }

            .hamburger-menu.active .hamburger-line:nth-child(2) {
                opacity: 0;
            }

            .hamburger-menu.active .hamburger-line:nth-child(3) {
                transform: rotate(-45deg) translate(6px, -6px);
                background: #4CAF50;
            }

            /* Control Panel Styles */
            .control-panel {
                position: fixed;
                top: 0;
                right: 0;
                width: 380px;
                height: 100vh;
                background: rgba(0, 0, 0, 0.95);
                border-left: 3px solid #4CAF50;
                padding: 80px 20px 20px 20px;
                z-index: 1000;
                transform: translateX(100%);
                transition: transform 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
                overflow-y: auto;
                color: white;
                backdrop-filter: blur(15px);
                box-shadow: -5px 0 20px rgba(0, 0, 0, 0.5);
            }

            .control-panel.visible {
                transform: translateX(0);
            }

            .control-panel.hidden {
                transform: translateX(100%);
            }

            /* Scrollbar Styling */
            .control-panel::-webkit-scrollbar {
                width: 8px;
            }

            .control-panel::-webkit-scrollbar-track {
                background: rgba(255, 255, 255, 0.1);
                border-radius: 4px;
            }

            .control-panel::-webkit-scrollbar-thumb {
                background: #4CAF50;
                border-radius: 4px;
            }

            .control-panel::-webkit-scrollbar-thumb:hover {
                background: #45a049;
            }

            /* Control Panel Content */
            .control-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 25px;
                padding-bottom: 15px;
                border-bottom: 2px solid #333;
            }

            .control-header h3 {
                color: #4CAF50;
                margin: 0;
                font-size: 1.3em;
                font-weight: 600;
            }

            .toggle-btn {
                background: transparent;
                border: 2px solid #4CAF50;
                color: #4CAF50;
                border-radius: 50%;
                width: 35px;
                height: 35px;
                cursor: pointer;
                font-size: 1.2em;
                transition: all 0.3s ease;
            }

            .toggle-btn:hover {
                background: #4CAF50;
                color: white;
                transform: rotate(180deg);
            }

            .master-controls,
            .planet-controls {
                margin-bottom: 30px;
            }

            .master-controls h4,
            .planet-controls h4 {
                color: #fff;
                font-size: 1.1em;
                margin-bottom: 15px;
                border-bottom: 1px solid #333;
                padding-bottom: 8px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }

            .control-group {
                margin-bottom: 20px;
                padding: 15px;
                background: rgba(255, 255, 255, 0.05);
                border-radius: 8px;
                border-left: 3px solid #4CAF50;
            }

            .control-group label {
                display: block;
                margin-bottom: 8px;
                color: #ccc;
                font-size: 0.95em;
                font-weight: 500;
            }

            .control-group input[type="range"] {
                width: 100%;
                margin-bottom: 8px;
                height: 6px;
                border-radius: 3px;
                background: #333;
                outline: none;
                -webkit-appearance: none;
            }

            .control-group input[type="range"]::-webkit-slider-thumb {
                -webkit-appearance: none;
                appearance: none;
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: #4CAF50;
                cursor: pointer;
                box-shadow: 0 2px 6px rgba(76, 175, 80, 0.3);
            }

            .control-group input[type="range"]::-moz-range-thumb {
                width: 18px;
                height: 18px;
                border-radius: 50%;
                background: #4CAF50;
                cursor: pointer;
                border: none;
                box-shadow: 0 2px 6px rgba(76, 175, 80, 0.3);
            }

            .button-group {
                display: flex;
                gap: 10px;
                margin-top: 15px;
                flex-wrap: wrap;
            }

            .control-btn {
                flex: 1;
                min-width: 80px;
                padding: 10px 15px;
                background: linear-gradient(45deg, #4CAF50, #45a049);
                color: white;
                border: none;
                border-radius: 6px;
                cursor: pointer;
                font-size: 0.9em;
                font-weight: 500;
                transition: all 0.3s ease;
                text-transform: uppercase;
                letter-spacing: 0.5px;
            }

            .control-btn:hover {
                background: linear-gradient(45deg, #45a049, #4CAF50);
                transform: translateY(-2px);
                box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
            }

            .control-btn:active {
                transform: translateY(0);
            }

            /* Planet Control Groups */
            .planet-control-group {
                background: rgba(255, 255, 255, 0.08);
                border-radius: 10px;
                padding: 18px;
                margin-bottom: 18px;
                border-left: 4px solid #4CAF50;
                transition: all 0.3s ease;
            }

            .planet-control-group:hover {
                background: rgba(255, 255, 255, 0.12);
                transform: translateX(-5px);
            }

            .planet-control-header {
                display: flex;
                justify-content: space-between;
                align-items: center;
                margin-bottom: 15px;
            }

            .planet-name {
                font-weight: 600;
                font-size: 1.1em;
                text-shadow: 0 1px 3px rgba(0, 0, 0, 0.5);
            }

            .planet-toggle-btn {
                background: transparent;
                border: 2px solid currentColor;
                color: inherit;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                cursor: pointer;
                font-size: 0.9em;
                transition: all 0.3s ease;
            }

            .planet-toggle-btn:hover {
                background: currentColor;
                color: white;
                transform: scale(1.1);
            }

            .slider-group {
                margin-bottom: 15px;
            }

            .speed-value {
                display: inline-block;
                min-width: 45px;
                text-align: center;
                background: rgba(76, 175, 80, 0.2);
                padding: 2px 8px;
                border-radius: 4px;
                font-weight: 600;
                color: #4CAF50;
            }

            .planet-reset-btn,
            .planet-info-btn {
                flex: 1;
                padding: 8px 12px;
                border: 1px solid currentColor;
                background: transparent;
                color: inherit;
                border-radius: 4px;
                cursor: pointer;
                font-size: 0.85em;
                transition: all 0.3s ease;
            }

            .planet-reset-btn:hover,
            .planet-info-btn:hover {
                background: currentColor;
                color: white;
            }

            /* Modal Styles */
            .modal {
                display: none;
                position: fixed;
                z-index: 2000;
                left: 0;
                top: 0;
                width: 100%;
                height: 100%;
                background-color: rgba(0, 0, 0, 0.8);
                backdrop-filter: blur(5px);
            }

            .modal-content {
                background-color: #1a1a1a;
                margin: 5% auto;
                padding: 30px;
                border: none;
                border-radius: 15px;
                width: 90%;
                max-width: 600px;
                color: white;
                box-shadow: 0 10px 30px rgba(0, 0, 0, 0.5);
            }

            .close {
                color: #aaa;
                float: right;
                font-size: 28px;
                font-weight: bold;
                cursor: pointer;
                transition: color 0.3s ease;
            }

            .close:hover,
            .close:focus {
                color: #4CAF50;
            }

            .planet-info {
                margin-top: 20px;
                line-height: 1.6;
            }

            .planet-info p {
                margin-bottom: 10px;
                padding: 8px 0;
                border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            }

            .planet-info strong {
                color: #4CAF50;
                margin-right: 10px;
            }

            /* Responsive Design */
            @media (max-width: 768px) {
                .control-panel {
                    width: 100%;
                    padding: 80px 15px 20px 15px;
                }
                
                .hamburger-menu {
                    top: 15px;
                    right: 15px;
                    width: 45px;
                    height: 45px;
                }
                
                .modal-content {
                    margin: 10% auto;
                    padding: 20px;
                    width: 95%;
                }
            }

            /* Animation for panel entrance */
            @keyframes slideIn {
                from {
                    transform: translateX(100%);
                    opacity: 0;
                }
                to {
                    transform: translateX(0);
                    opacity: 1;
                }
            }

            .control-panel.visible {
                animation: slideIn 0.4s ease-out;
            }
        `;
        
        // Only add styles if they don't exist
        if (!document.getElementById('controls-styles')) {
            style.id = 'controls-styles';
            document.head.appendChild(style);
        }
    }

    createControlPanel() {
        // Check if control panel already exists
        this.controlPanel = document.getElementById('control-panel');
        
        if (!this.controlPanel) {
            // Create control panel element
            this.controlPanel = document.createElement('div');
            this.controlPanel.id = 'control-panel';
            this.controlPanel.className = 'control-panel hidden';
            document.body.appendChild(this.controlPanel);
        }

        // Set up the panel structure
        this.controlPanel.innerHTML = `
            <div class="control-header">
                <h3>🌌 Solar System Controls</h3>
                <button id="toggle-controls-btn" class="toggle-btn">−</button>
            </div>
            <div class="control-content" id="control-content">
                <div class="master-controls">
                    <h4>⚡ Master Controls</h4>
                    <div class="control-group">
                        <label for="master-speed">🚀 Overall Speed:</label>
                        <input type="range" id="master-speed" min="0" max="3" step="0.1" value="1">
                        <span id="master-speed-value" class="speed-value">1.0x</span>
                    </div>
                    <div class="button-group">
                        <button id="pause-all-btn" class="control-btn">⏸️ Pause All</button>
                        <button id="reset-all-btn" class="control-btn">🔄 Reset All</button>
                        <button id="export-settings-btn" class="control-btn">💾 Export</button>
                        <button id="import-settings-btn" class="control-btn">📁 Import</button>
                    </div>
                    <div class="button-group">
                        <button id="preset-slow-btn" class="control-btn">🐌 Slow</button>
                        <button id="preset-normal-btn" class="control-btn">⚡ Normal</button>
                        <button id="preset-fast-btn" class="control-btn">🚀 Fast</button>
                        <button id="preset-realistic-btn" class="control-btn">🌍 Realistic</button>
                    </div>
                </div>
                <div class="planet-controls" id="planet-controls">
                    <h4>🪐 Individual Planet Controls</h4>
                </div>
            </div>
        `;
    }

    createMasterControls() {
        const masterSpeedSlider = document.getElementById('master-speed');
        const masterSpeedValue = document.getElementById('master-speed-value');
        const pauseAllBtn = document.getElementById('pause-all-btn');
        const resetAllBtn = document.getElementById('reset-all-btn');
        const exportBtn = document.getElementById('export-settings-btn');
        const importBtn = document.getElementById('import-settings-btn');

        // Preset buttons
        const presetSlowBtn = document.getElementById('preset-slow-btn');
        const presetNormalBtn = document.getElementById('preset-normal-btn');
        const presetFastBtn = document.getElementById('preset-fast-btn');
        const presetRealisticBtn = document.getElementById('preset-realistic-btn');

        // Master speed control
        if (masterSpeedSlider && masterSpeedValue) {
            masterSpeedSlider.addEventListener('input', (e) => {
                this.masterSpeedMultiplier = parseFloat(e.target.value);
                masterSpeedValue.textContent = `${this.masterSpeedMultiplier.toFixed(1)}x`;
                this.updateAllPlanetSpeeds();
            });
        }

        // Pause all button
        if (pauseAllBtn) {
            pauseAllBtn.addEventListener('click', () => {
                this.toggleAllPlanets();
                pauseAllBtn.innerHTML = this.masterSpeedMultiplier === 0 ? '▶️ Resume All' : '⏸️ Pause All';
            });
        }

        // Reset all button
        if (resetAllBtn) {
            resetAllBtn.addEventListener('click', () => {
                this.resetAllControls();
            });
        }

        // Export settings button
        if (exportBtn) {
            exportBtn.addEventListener('click', () => {
                const settings = this.exportSettings();
                this.downloadSettings(settings);
            });
        }

        // Import settings button
        if (importBtn) {
            importBtn.addEventListener('click', () => {
                this.createFileInput();
            });
        }

        // Preset buttons
        if (presetSlowBtn) {
            presetSlowBtn.addEventListener('click', () => this.applyPreset('slow'));
        }
        if (presetNormalBtn) {
            presetNormalBtn.addEventListener('click', () => this.applyPreset('default'));
        }
        if (presetFastBtn) {
            presetFastBtn.addEventListener('click', () => this.applyPreset('fast'));
        }
        if (presetRealisticBtn) {
            presetRealisticBtn.addEventListener('click', () => this.applyPreset('realistic'));
        }
    }

    createPlanetControls() {
        const planetControlsContainer = document.getElementById('planet-controls');
        if (!planetControlsContainer || !this.solarSystem || !this.solarSystem.planets) {
            return;
        }

        // Clear existing controls
        planetControlsContainer.innerHTML = '<h4>🪐 Individual Planet Controls</h4>';

        // Create controls for each planet
        this.solarSystem.planets.forEach((planet, index) => {
            this.createPlanetControl(planet, planetControlsContainer);
        });
    }

    createPlanetControl(planet, container) {
        const planetData = planet.data;
        const planetName = planetData.name;
        const planetId = planetName.toLowerCase();

        // Create planet control group
        const controlGroup = document.createElement('div');
        controlGroup.className = 'planet-control-group';
        controlGroup.innerHTML = `
            <div class="planet-control-header">
                <span class="planet-name" style="color: ${this.getPlanetColor(planetName)}">${this.getPlanetEmoji(planetName)} ${planetName}</span>
                <button class="planet-toggle-btn" data-planet="${planetId}">⏸️</button>
            </div>
            <div class="planet-control-body">
                <div class="slider-group">
                    <label for="${planetId}-speed">🌌 Orbital Speed:</label>
                    <input 
                        type="range" 
                        id="${planetId}-speed" 
                        class="planet-speed-slider"
                        data-planet="${planetId}"
                        min="${this.speedRange.min}" 
                        max="${this.speedRange.max}" 
                        step="${this.speedRange.step}" 
                        value="${this.speedRange.default}"
                    >
                    <span class="speed-value" id="${planetId}-speed-value">${this.speedRange.default.toFixed(1)}x</span>
                </div>
                <div class="slider-group">
                    <label for="${planetId}-rotation">🔄 Rotation Speed:</label>
                    <input 
                        type="range" 
                        id="${planetId}-rotation" 
                        class="planet-rotation-slider"
                        data-planet="${planetId}"
                        min="${this.speedRange.min}" 
                        max="${this.speedRange.max}" 
                        step="${this.speedRange.step}" 
                        value="${this.speedRange.default}"
                    >
                    <span class="speed-value" id="${planetId}-rotation-value">${this.speedRange.default.toFixed(1)}x</span>
                </div>
                <div class="button-group">
                    <button class="planet-reset-btn" data-planet="${planetId}">🔄 Reset</button>
                    <button class="planet-info-btn" data-planet="${planetId}">ℹ️ Info</button>
                </div>
            </div>
        `;

        container.appendChild(controlGroup);

        // Store control references
        this.planetControls.set(planetId, {
            planet: planet,
            speedSlider: controlGroup.querySelector(`#${planetId}-speed`),
            rotationSlider: controlGroup.querySelector(`#${planetId}-rotation`),
            speedValue: controlGroup.querySelector(`#${planetId}-speed-value`),
            rotationValue: controlGroup.querySelector(`#${planetId}-rotation-value`),
            toggleBtn: controlGroup.querySelector(`.planet-toggle-btn[data-planet="${planetId}"]`),
            resetBtn: controlGroup.querySelector(`.planet-reset-btn[data-planet="${planetId}"]`),
            infoBtn: controlGroup.querySelector(`.planet-info-btn[data-planet="${planetId}"]`),
            isPaused: false,
            originalSpeed: planetData.speed || 1.0,
            originalRotation: 1.0
        });

        // Add event listeners for this planet
        this.addPlanetEventListeners(planetId);
    }

    addPlanetEventListeners(planetId) {
        const controls = this.planetControls.get(planetId);
        if (!controls) return;

        // Speed slider
        controls.speedSlider.addEventListener('input', (e) => {
            const speed = parseFloat(e.target.value);
            controls.speedValue.textContent = `${speed.toFixed(1)}x`;
            this.updatePlanetSpeed(planetId, 'orbit', speed);
        });

        // Rotation slider
        controls.rotationSlider.addEventListener('input', (e) => {
            const speed = parseFloat(e.target.value);
            controls.rotationValue.textContent = `${speed.toFixed(1)}x`;
            this.updatePlanetSpeed(planetId, 'rotation', speed);
        });

        // Toggle button
        controls.toggleBtn.addEventListener('click', () => {
            this.togglePlanet(planetId);
        });

        // Reset button
        controls.resetBtn.addEventListener('click', () => {
            this.resetPlanetControl(planetId);
        });

        // Info button
        controls.infoBtn.addEventListener('click', () => {
            this.showPlanetInfo(planetId);
        });
    }

    updatePlanetSpeed(planetId, type, speed) {
        const controls = this.planetControls.get(planetId);
        if (!controls || !controls.planet) return;

        const finalSpeed = speed * this.masterSpeedMultiplier;
        const planetData = controls.planet.data;

        if (type === 'orbit') {
            planetData.speed = finalSpeed;
        }

        // Update the planet in the solar system
        if (this.solarSystem && this.solarSystem.updatePlanetSpeed) {
            this.solarSystem.updatePlanetSpeed(planetId, type, finalSpeed);
        }
    }

    updateAllPlanetSpeeds() {
        this.planetControls.forEach((controls, planetId) => {
            const orbitSpeed = parseFloat(controls.speedSlider.value);
            const rotationSpeed = parseFloat(controls.rotationSlider.value);
            
            this.updatePlanetSpeed(planetId, 'orbit', orbitSpeed);
            this.updatePlanetSpeed(planetId, 'rotation', rotationSpeed);
        });
    }

    togglePlanet(planetId) {
        const controls = this.planetControls.get(planetId);
        if (!controls) return;

        controls.isPaused = !controls.isPaused;
        controls.toggleBtn.textContent = controls.isPaused ? '▶️' : '⏸️';
        
        // Update planet speed (0 when paused, normal when playing)
        const orbitSpeed = controls.isPaused ? 0 : parseFloat(controls.speedSlider.value);
        const rotationSpeed = controls.isPaused ? 0 : parseFloat(controls.rotationSlider.value);
        
        this.updatePlanetSpeed(planetId, 'orbit', orbitSpeed);
        this.updatePlanetSpeed(planetId, 'rotation', rotationSpeed);
    }

    toggleAllPlanets() {
        const shouldPause = this.masterSpeedMultiplier > 0;
        
        if (shouldPause) {
            // Store current speed and set to 0
            this.storedMasterSpeed = this.masterSpeedMultiplier;
            this.masterSpeedMultiplier = 0;
        } else {
            // Restore previous speed
            this.masterSpeedMultiplier = this.storedMasterSpeed || 1.0;
        }

        // Update master speed slider
        const masterSpeedSlider = document.getElementById('master-speed');
        const masterSpeedValue = document.getElementById('master-speed-value');
        
        if (masterSpeedSlider && masterSpeedValue) {
            masterSpeedSlider.value = this.masterSpeedMultiplier;
            masterSpeedValue.textContent = `${this.masterSpeedMultiplier.toFixed(1)}x`;
        }

        this.updateAllPlanetSpeeds();
    }

    resetPlanetControl(planetId) {
        const controls = this.planetControls.get(planetId);
        if (!controls) return;

        // Reset sliders to default values
        controls.speedSlider.value = this.speedRange.default;
        controls.rotationSlider.value = this.speedRange.default;
        controls.speedValue.textContent = `${this.speedRange.default.toFixed(1)}x`;
        controls.rotationValue.textContent = `${this.speedRange.default.toFixed(1)}x`;
        
        // Reset pause state
        controls.isPaused = false;
        controls.toggleBtn.textContent = '⏸️';
        
        // Update planet speeds
        this.updatePlanetSpeed(planetId, 'orbit', this.speedRange.default);
        this.updatePlanetSpeed(planetId, 'rotation', this.speedRange.default);
    }

    resetAllControls() {
        // Reset master controls
        this.masterSpeedMultiplier = 1.0;
        const masterSpeedSlider = document.getElementById('master-speed');
        const masterSpeedValue = document.getElementById('master-speed-value');
        
        if (masterSpeedSlider && masterSpeedValue) {
            masterSpeedSlider.value = 1.0;
            masterSpeedValue.textContent = '1.0x';
        }

        // Reset all planet controls
        this.planetControls.forEach((controls, planetId) => {
            this.resetPlanetControl(planetId);
        });

        // Update pause all button
        const pauseAllBtn = document.getElementById('pause-all-btn');
        if (pauseAllBtn) {
            pauseAllBtn.innerHTML = '⏸️ Pause All';
        }
    }

    showPlanetInfo(planetId) {
        const controls = this.planetControls.get(planetId);
        if (!controls) return;

        const planetData = controls.planet.data;
        const info = this.getPlanetInfo(planetId);
        
        // Create or update info modal
        let modal = document.getElementById('planet-info-modal');
        if (!modal) {
            modal = document.createElement('div');
            modal.id = 'planet-info-modal';
            modal.className = 'modal';
            document.body.appendChild(modal);
        }

        modal.innerHTML = `
            <div class="modal-content">
                <span class="close" onclick="this.parentElement.parentElement.style.display='none'">&times;</span>
                <h2 style="color: ${this.getPlanetColor(planetData.name)}">${this.getPlanetEmoji(planetData.name)} ${planetData.name}</h2>
                <div class="planet-info">
                    <p><strong>🌍 Distance from Sun:</strong> ${info.distance}</p>
                    <p><strong>📏 Diameter:</strong> ${info.diameter}</p>
                    <p><strong>🔄 Orbital Period:</strong> ${info.orbitalPeriod}</p>
                    <p><strong>⏰ Day Length:</strong> ${info.dayLength}</p>
                    <p><strong>🌙 Moons:</strong> ${info.moons}</p>
                    <p><strong>🧪 Composition:</strong> ${info.composition}</p>
                    <p><strong>✨ Fun Fact:</strong> ${info.funFact}</p>
                </div>
            </div>
        `;

        modal.style.display = 'block';
    }

    getPlanetInfo(planetId) {
        const planetInfo = {
            mercury: {
                distance: '57.9 million km',
                diameter: '4,879 km',
                orbitalPeriod: '88 Earth days',
                dayLength: '59 Earth days',
                moons: '0',
                composition: 'Rocky planet with large iron core',
                funFact: 'Mercury has the most extreme temperature variations in the solar system!'
            },
            venus: {
                distance: '108.2 million km',
                diameter: '12,104 km',
                orbitalPeriod: '225 Earth days',
                dayLength: '243 Earth days',
                moons: '0',
                composition: 'Rocky planet with thick atmosphere',
                funFact: 'Venus rotates backwards compared to most planets!'
            },
            earth: {
                distance: '149.6 million km',
                diameter: '12,756 km',
                orbitalPeriod: '365.25 days',
                dayLength: '24 hours',
                moons: '1',
                composition: 'Rocky planet with water and life',
                funFact: 'Earth is the only known planet with life!'
            },
            mars: {
                distance: '227.9 million km',
                diameter: '6,792 km',
                orbitalPeriod: '687 Earth days',
                dayLength: '24.6 hours',
                moons: '2',
                composition: 'Rocky planet with iron oxide surface',
                funFact: 'Mars has the largest volcano in the solar system - Olympus Mons!'
            },
            jupiter: {
                distance: '778.6 million km',
                diameter: '142,984 km',
                orbitalPeriod: '12 Earth years',
                dayLength: '9.9 hours',
                moons: '95+',
                composition: 'Gas giant made mostly of hydrogen and helium',
                funFact: 'Jupiter is so massive it could contain all other planets!'
            },
            saturn: {
                distance: '1.43 billion km',
                diameter: '120,536 km',
                orbitalPeriod: '29 Earth years',
                dayLength: '10.7 hours',
                moons: '146+',
                composition: 'Gas giant with prominent ring system',
                funFact: 'Saturn is less dense than water - it would float!'
            },
            uranus: {
                distance: '2.87 billion km',
                diameter: '51,118 km',
                orbitalPeriod: '84 Earth years',
                dayLength: '17.2 hours',
                moons: '27',
                composition: 'Ice giant with methane atmosphere',
                funFact: 'Uranus rotates on its side with an 98° axial tilt!'
            },
            neptune: {
                distance: '4.50 billion km',
                diameter: '49,528 km',
                orbitalPeriod: '165 Earth years',
                dayLength: '16.1 hours',
                moons: '16',
                composition: 'Ice giant with strong winds',
                funFact: 'Neptune has the fastest winds in the solar system - up to 2,100 km/h!'
            }
        };

        return planetInfo[planetId] || {};
    }

    getPlanetColor(planetName) {
        const colors = {
            'Mercury': '#8C7853',
            'Venus': '#FFC649',
            'Earth': '#6B93D6',
            'Mars': '#C1440E',
            'Jupiter': '#D8CA9D',
            'Saturn': '#FAD5A5',
            'Uranus': '#4FD0E7',
            'Neptune': '#4B70DD'
        };
        return colors[planetName] || '#FFFFFF';
    }

    // NEW: Get planet emoji
    getPlanetEmoji(planetName) {
        const emojis = {
            'Mercury': '☿️',
            'Venus': '♀️',
            'Earth': '🌍',
            'Mars': '♂️',
            'Jupiter': '♃',
            'Saturn': '♄',
            'Uranus': '♅',
            'Neptune': '♆'
        };
        return emojis[planetName] || '🪐';
    }

    addEventListeners() {
        // NEW: Hamburger menu toggle
        if (this.hamburgerMenu) {
            this.hamburgerMenu.addEventListener('click', () => {
                this.toggleMenu();
            });
        }

        // Toggle controls visibility
        const toggleBtn = document.getElementById('toggle-controls-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                this.toggleControlsVisibility();
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', (event) => {
            this.handleKeyboardShortcuts(event);
        });

        // Close modal when clicking outside
        window.addEventListener('click', (event) => {
            const modal = document.getElementById('planet-info-modal');
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (event) => {
            if (this.isMenuOpen && 
                !this.controlPanel.contains(event.target) && 
                !this.hamburgerMenu.contains(event.target)) {
                this.closeMenu();
            }
        });
    }

    // NEW: Toggle hamburger menu
    toggleMenu() {
        if (this.isMenuOpen) {
            this.closeMenu();
        } else {
            this.openMenu();
        }
    }

    // NEW: Open menu
    openMenu() {
        this.isMenuOpen = true;
        this.hamburgerMenu.classList.add('active');
        this.controlPanel.classList.remove('hidden');
        this.controlPanel.classList.add('visible');
    }

    // NEW: Close menu
    closeMenu() {
        this.isMenuOpen = false;
        this.hamburgerMenu.classList.remove('active');
        this.controlPanel.classList.remove('visible');
        this.controlPanel.classList.add('hidden');
    }

    handleKeyboardShortcuts(event) {
        if (event.target.tagName === 'INPUT') return; // Don't trigger if typing in input

        switch(event.code) {
            case 'KeyC':
                event.preventDefault();
                this.toggleMenu();
                break;
            case 'KeyP':
                event.preventDefault();
                this.toggleAllPlanets();
                break;
            case 'KeyR':
                if (event.ctrlKey || event.metaKey) return; // Don't interfere with browser refresh
                event.preventDefault();
                this.resetAllControls();
                break;
            case 'Escape':
                const modal = document.getElementById('planet-info-modal');
                if (modal && modal.style.display === 'block') {
                    modal.style.display = 'none';
                } else if (this.isMenuOpen) {
                    this.closeMenu();
                }
                break;
        }
    }

    toggleControlsVisibility() {
        this.isVisible = !this.isVisible;
        const controlContent = document.getElementById('control-content');
        const toggleBtn = document.getElementById('toggle-controls-btn');
        
        if (controlContent && toggleBtn) {
            if (this.isVisible) {
                controlContent.style.display = 'block';
                toggleBtn.textContent = '−';
                this.controlPanel.classList.remove('collapsed');
            } else {
                controlContent.style.display = 'none';
                toggleBtn.textContent = '+';
                this.controlPanel.classList.add('collapsed');
            }
        }
    }

    updateControlsVisibility() {
        // Set initial visibility based on screen size
        const isMobile = window.innerWidth <= 768;
        if (isMobile && this.isVisible) {
            this.toggleControlsVisibility();
        }
    }

    // NEW: Download settings as file
    downloadSettings(settings) {
        const blob = new Blob([settings], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'solar-system-settings.json';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    // NEW: Create file input for importing
    createFileInput() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    try {
                        this.importSettings(e.target.result);
                        alert('Settings imported successfully!');
                    } catch (error) {
                        alert('Error importing settings: ' + error.message);
                    }
                };
                reader.readAsText(file);
            }
        };
        input.click();
    }

    // Method to get current planet speeds (useful for debugging)
    getCurrentSpeeds() {
        const speeds = {};
        this.planetControls.forEach((controls, planetId) => {
            speeds[planetId] = {
                orbit: parseFloat(controls.speedSlider.value) * this.masterSpeedMultiplier,
                rotation: parseFloat(controls.rotationSlider.value) * this.masterSpeedMultiplier,
                isPaused: controls.isPaused
            };
        });
        return speeds;
    }

    // Method to set planet speed programmatically
    setPlanetSpeed(planetId, type, speed) {
        const controls = this.planetControls.get(planetId);
        if (!controls) return false;

        if (type === 'orbit') {
            controls.speedSlider.value = speed;
            controls.speedValue.textContent = `${speed.toFixed(1)}x`;
        } else if (type === 'rotation') {
            controls.rotationSlider.value = speed;
            controls.rotationValue.textContent = `${speed.toFixed(1)}x`;
        }

        this.updatePlanetSpeed(planetId, type, speed);
        return true;
    }

    // Method to set master speed programmatically
    setMasterSpeed(speed) {
        this.masterSpeedMultiplier = Math.max(0, Math.min(3, speed));
        
        const masterSpeedSlider = document.getElementById('master-speed');
        const masterSpeedValue = document.getElementById('master-speed-value');
        
        if (masterSpeedSlider && masterSpeedValue) {
            masterSpeedSlider.value = this.masterSpeedMultiplier;
            masterSpeedValue.textContent = `${this.masterSpeedMultiplier.toFixed(1)}x`;
        }

        this.updateAllPlanetSpeeds();
    }

    // Method to get control panel statistics
    getControlStats() {
        return {
            totalPlanets: this.planetControls.size,
            activePlanets: Array.from(this.planetControls.values()).filter(c => !c.isPaused).length,
            masterSpeed: this.masterSpeedMultiplier,
            isVisible: this.isVisible,
            averageOrbitSpeed: this.getAverageSpeed('orbit'),
            averageRotationSpeed: this.getAverageSpeed('rotation')
        };
    }

    getAverageSpeed(type) {
        let total = 0;
        let count = 0;
        
        this.planetControls.forEach((controls) => {
            if (!controls.isPaused) {
                const speed = type === 'orbit' 
                    ? parseFloat(controls.speedSlider.value)
                    : parseFloat(controls.rotationSlider.value);
                total += speed;
                count++;
            }
        });

        return count > 0 ? total / count : 0;
    }

    // Method to export current settings
    exportSettings() {
        const settings = {
            masterSpeed: this.masterSpeedMultiplier,
            planetSettings: {}
        };

        this.planetControls.forEach((controls, planetId) => {
            settings.planetSettings[planetId] = {
                orbitSpeed: parseFloat(controls.speedSlider.value),
                rotationSpeed: parseFloat(controls.rotationSlider.value),
                isPaused: controls.isPaused
            };
        });

        return JSON.stringify(settings, null, 2);
    }

    // Method to import settings
    importSettings(settingsJson) {
        try {
            const settings = JSON.parse(settingsJson);
            
            // Set master speed
            if (settings.masterSpeed !== undefined) {
                this.setMasterSpeed(settings.masterSpeed);
            }

            // Set planet settings
            if (settings.planetSettings) {
                Object.entries(settings.planetSettings).forEach(([planetId, planetSettings]) => {
                    const controls = this.planetControls.get(planetId);
                    if (controls) {
                        // Set orbit speed
                        if (planetSettings.orbitSpeed !== undefined) {
                            this.setPlanetSpeed(planetId, 'orbit', planetSettings.orbitSpeed);
                        }
                        
                        // Set rotation speed
                        if (planetSettings.rotationSpeed !== undefined) {
                            this.setPlanetSpeed(planetId, 'rotation', planetSettings.rotationSpeed);
                        }
                        
                        // Set pause state
                        if (planetSettings.isPaused !== undefined && 
                            planetSettings.isPaused !== controls.isPaused) {
                            this.togglePlanet(planetId);
                        }
                    }
                });
            }

            return true;
        } catch (error) {
            console.error('Error importing settings:', error);
            return false;
        }
    }

    // Method to create preset configurations
    applyPreset(presetName) {
        const presets = {
            default: {
                masterSpeed: 1.0,
                planetSettings: Object.fromEntries(
                    Array.from(this.planetControls.keys()).map(id => [id, {
                        orbitSpeed: 1.0,
                        rotationSpeed: 1.0,
                        isPaused: false
                    }])
                )
            },
            slow: {
                masterSpeed: 0.3,
                planetSettings: Object.fromEntries(
                    Array.from(this.planetControls.keys()).map(id => [id, {
                        orbitSpeed: 0.5,
                        rotationSpeed: 0.5,
                        isPaused: false
                    }])
                )
            },
            fast: {
                masterSpeed: 2.0,
                planetSettings: Object.fromEntries(
                    Array.from(this.planetControls.keys()).map(id => [id, {
                        orbitSpeed: 2.0,
                        rotationSpeed: 2.0,
                        isPaused: false
                    }])
                )
            },
            realistic: {
                masterSpeed: 1.0,
                planetSettings: {
                    mercury: { orbitSpeed: 4.15, rotationSpeed: 0.017, isPaused: false },
                    venus: { orbitSpeed: 1.62, rotationSpeed: 0.004, isPaused: false },
                    earth: { orbitSpeed: 1.0, rotationSpeed: 1.0, isPaused: false },
                    mars: { orbitSpeed: 0.53, rotationSpeed: 0.97, isPaused: false },
                    jupiter: { orbitSpeed: 0.084, rotationSpeed: 2.4, isPaused: false },
                    saturn: { orbitSpeed: 0.034, rotationSpeed: 2.23, isPaused: false },
                    uranus: { orbitSpeed: 0.012, rotationSpeed: 1.39, isPaused: false },
                    neptune: { orbitSpeed: 0.006, rotationSpeed: 1.49, isPaused: false }
                }
            }
        };

        const preset = presets[presetName];
        if (preset) {
            this.importSettings(JSON.stringify(preset));
            return true;
        }
        return false;
    }

    // Cleanup method
    destroy() {
        // Remove event listeners
        if (this.hamburgerMenu) {
            this.hamburgerMenu.removeEventListener('click', this.toggleMenu);
        }

        const toggleBtn = document.getElementById('toggle-controls-btn');
        if (toggleBtn) {
            toggleBtn.removeEventListener('click', this.toggleControlsVisibility);
        }

        // Clear planet controls
        this.planetControls.clear();

        // Remove control panel from DOM if it was created by this class
        if (this.controlPanel && this.controlPanel.parentNode) {
            this.controlPanel.parentNode.removeChild(this.controlPanel);
        }

        // Remove hamburger menu from DOM
        if (this.hamburgerMenu && this.hamburgerMenu.parentNode) {
            this.hamburgerMenu.parentNode.removeChild(this.hamburgerMenu);
        }

        // Remove styles
        const styles = document.getElementById('controls-styles');
        if (styles) {
            styles.remove();
        }
    }

    // Reset method
    reset() {
        this.resetAllControls();
        this.setMasterSpeed(1.0);
        this.closeMenu();
    }
}
