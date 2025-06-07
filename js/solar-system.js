// // Solar System 3D Visualization
// class SolarSystem {
//     constructor() {
//         this.scene = new THREE.Scene();
//         this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
//         this.renderer = new THREE.WebGLRenderer({ antialias: true });
//         this.controls = null;
        
//         this.planets = [];
//         this.sun = null;
//         this.animationSpeed = 1;
//         this.paused = false;
        
//         this.init();
//     }
    
//     init() {
//         // Setup renderer
//         this.renderer.setSize(window.innerWidth, window.innerHeight);
//         this.renderer.setClearColor(0x000011);
//         document.body.appendChild(this.renderer.domElement);
        
//         // Setup camera
//         this.camera.position.set(0, 50, 100);
        
//         // Add lights
//         this.addLights();
        
//         // Create starfield
//         this.createStarfield();
        
//         // Create sun and planets
//         this.createSun();
//         this.createPlanets();
        
//         // Setup controls (if available)
//         this.setupControls();
        
//         // Start animation
//         this.animate();
        
//         // Handle window resize
//         window.addEventListener('resize', () => this.onWindowResize());
//     }
    
//     addLights() {
//         // Ambient light
//         const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
//         this.scene.add(ambientLight);
        
//         // Sun light
//         const sunLight = new THREE.PointLight(0xffffff, 2, 0, 2);
//         sunLight.position.set(0, 0, 0);
//         this.scene.add(sunLight);
//     }
    
//     createStarfield() {
//         const starsGeometry = new THREE.BufferGeometry();
//         const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
        
//         const starsVertices = [];
//         for (let i = 0; i < 10000; i++) {
//             const x = (Math.random() - 0.5) * 2000;
//             const y = (Math.random() - 0.5) * 2000;
//             const z = (Math.random() - 0.5) * 2000;
//             starsVertices.push(x, y, z);
//         }
        
//         starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
//         const stars = new THREE.Points(starsGeometry, starsMaterial);
//         this.scene.add(stars);
//     }
    
//     createSun() {
//         const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
//         const sunMaterial = new THREE.MeshBasicMaterial({ 
//             color: 0xffff00,
//             emissive: 0xffaa00,
//             emissiveIntensity: 0.5
//         });
        
//         this.sun = new THREE.Mesh(sunGeometry, sunMaterial);
//         this.scene.add(this.sun);
//     }
    
//     createPlanets() {
//         const planetData = [
//             { name: 'Mercury', size: 0.4, distance: 15, color: 0x8c7853, speed: 4.15 },
//             { name: 'Venus', size: 0.9, distance: 20, color: 0xffc649, speed: 1.62 },
//             { name: 'Earth', size: 1, distance: 25, color: 0x6b93d6, speed: 1.0 },
//             { name: 'Mars', size: 0.5, distance: 30, color: 0xc1440e, speed: 0.53 },
//             { name: 'Jupiter', size: 3, distance: 45, color: 0xd8ca9d, speed: 0.08 },
//             { name: 'Saturn', size: 2.5, distance: 55, color: 0xfad5a5, speed: 0.03 },
//             { name: 'Uranus', size: 1.5, distance: 65, color: 0x4fd0e4, speed: 0.01 },
//             { name: 'Neptune', size: 1.4, distance: 75, color: 0x4b70dd, speed: 0.006 }
//         ];
        
//         planetData.forEach((data, index) => {
//             const planet = this.createPlanet(data);
//             this.planets.push(planet);
//             this.scene.add(planet.group);
            
//             // Add orbit ring
//             this.createOrbitRing(data.distance);
//         });
//     }
    
//     createPlanet(data) {
//         const geometry = new THREE.SphereGeometry(data.size, 16, 16);
//         const material = new THREE.MeshLambertMaterial({ color: data.color });
//         const mesh = new THREE.Mesh(geometry, material);
        
//         // Create group for planet and its orbit
//         const group = new THREE.Group();
//         mesh.position.x = data.distance;
//         group.add(mesh);
        
//         // Add moon for Earth
//         if (data.name === 'Earth') {
//             const moonGeometry = new THREE.SphereGeometry(0.27, 8, 8);
//             const moonMaterial = new THREE.MeshLambertMaterial({ color: 0x888888 });
//             const moon = new THREE.Mesh(moonGeometry, moonMaterial);
//             moon.position.set(data.distance + 3, 0, 0);
//             group.add(moon);
//         }
        
//         // Add rings for Saturn
//         if (data.name === 'Saturn') {
//             const ringGeometry = new THREE.RingGeometry(data.size * 1.2, data.size * 2, 32);
//             const ringMaterial = new THREE.MeshBasicMaterial({ 
//                 color: 0xaaaaaa, 
//                 side: THREE.DoubleSide,
//                 transparent: true,
//                 opacity: 0.6
//             });
//             const rings = new THREE.Mesh(ringGeometry, ringMaterial);
//             rings.rotation.x = Math.PI / 2;
//             rings.position.x = data.distance;
//             group.add(rings);
//         }
        
//         return {
//             group: group,
//             mesh: mesh,
//             data: data,
//             angle: Math.random() * Math.PI * 2
//         };
//     }
    
//     createOrbitRing(radius) {
//         const geometry = new THREE.RingGeometry(radius - 0.1, radius + 0.1, 64);
//         const material = new THREE.MeshBasicMaterial({ 
//             color: 0x333333, 
//             side: THREE.DoubleSide,
//             transparent: true,
//             opacity: 0.3
//         });
//         const ring = new THREE.Mesh(geometry, material);
//         ring.rotation.x = Math.PI / 2;
//         this.scene.add(ring);
//     }
    
//     setupControls() {
//         // Basic mouse controls for camera movement
//         let mouseDown = false;
//         let mouseX = 0;
//         let mouseY = 0;
        
//         document.addEventListener('mousedown', (event) => {
//             mouseDown = true;
//             mouseX = event.clientX;
//             mouseY = event.clientY;
//         });
        
//         document.addEventListener('mouseup', () => {
//             mouseDown = false;
//         });
        
//         document.addEventListener('mousemove', (event) => {
//             if (mouseDown) {
//                 const deltaX = event.clientX - mouseX;
//                 const deltaY = event.clientY - mouseY;
                
//                 this.camera.position.x += deltaX * 0.1;
//                 this.camera.position.y -= deltaY * 0.1;
                
//                 mouseX = event.clientX;
//                 mouseY = event.clientY;
                
//                 this.camera.lookAt(0, 0, 0);
//             }
//         });
        
//         // Zoom with mouse wheel
//         document.addEventListener('wheel', (event) => {
//             const scale = event.deltaY > 0 ? 1.1 : 0.9;
//             this.camera.position.multiplyScalar(scale);
//             this.camera.lookAt(0, 0, 0);
//         });
//     }
    
//     animate() {
//         requestAnimationFrame(() => this.animate());
        
//         if (!this.paused) {
//             // Rotate sun
//             this.sun.rotation.y += 0.01 * this.animationSpeed;
            
//             // Update planets
//             this.planets.forEach((planet) => {
//                 // Orbit around sun
//                 planet.angle += planet.data.speed * 0.001 * this.animationSpeed;
//                 const x = Math.cos(planet.angle) * planet.data.distance;
//                 const z = Math.sin(planet.angle) * planet.data.distance;
//                 planet.group.position.set(x, 0, z);
                
//                 // Rotate planet
//                 planet.mesh.rotation.y += 0.02 * this.animationSpeed;
//             });
//         }
        
//         this.renderer.render(this.scene, this.camera);
//     }
    
//     onWindowResize() {
//         this.camera.aspect = window.innerWidth / window.innerHeight;
//         this.camera.updateProjectionMatrix();
//         this.renderer.setSize(window.innerWidth, window.innerHeight);
//     }
    
//     // Control methods
//     togglePause() {
//         this.paused = !this.paused;
//     }
    
//     setSpeed(speed) {
//         this.animationSpeed = speed;
//     }
    
//     resetCamera() {
//         this.camera.position.set(0, 50, 100);
//         this.camera.lookAt(0, 0, 0);
//     }
    
//     focusOnPlanet(planetName) {
//         const planet = this.planets.find(p => p.data.name === planetName);
//         if (planet) {
//             const pos = planet.group.position;
//             this.camera.position.set(pos.x + 10, pos.y + 10, pos.z + 10);
//             this.camera.lookAt(pos.x, pos.y, pos.z);
//         }
//     }
// }

// // Initialize the solar system when the page loads
// let solarSystem;

// document.addEventListener('DOMContentLoaded', () => {
//     solarSystem = new SolarSystem();
    
//     // Add keyboard controls
//     document.addEventListener('keydown', (event) => {
//         switch(event.code) {
//             case 'Space':
//                 event.preventDefault();
//                 solarSystem.togglePause();
//                 break;
//             case 'KeyR':
//                 solarSystem.resetCamera();
//                 break;
//             case 'Digit1':
//                 solarSystem.focusOnPlanet('Mercury');
//                 break;
//             case 'Digit2':
//                 solarSystem.focusOnPlanet('Venus');
//                 break;
//             case 'Digit3':
//                 solarSystem.focusOnPlanet('Earth');
//                 break;
//             case 'Digit4':
//                 solarSystem.focusOnPlanet('Mars');
//                 break;
//             case 'Digit5':
//                 solarSystem.focusOnPlanet('Jupiter');
//                 break;
//             case 'Digit6':
//                 solarSystem.focusOnPlanet('Saturn');
//                 break;
//             case 'Digit7':
//                 solarSystem.focusOnPlanet('Uranus');
//                 break;
//             case 'Digit8':
//                 solarSystem.focusOnPlanet('Neptune');
//                 break;
//         }
//     });
// });

// // Export for module usage
// if (typeof module !== 'undefined' && module.exports) {
//     module.exports = SolarSystem;
// }
// Solar System 3D Visualization
class SolarSystem {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.renderer = new THREE.WebGLRenderer({ antialias: true });
        this.controls = null;
        
        this.planets = [];
        this.sun = null;
        this.animationSpeed = 1;
        this.paused = false;
        
        this.init();
    }
    
    init() {
        // Setup renderer
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setClearColor(0x000011);
        document.body.appendChild(this.renderer.domElement);
        
        // Setup camera
        this.camera.position.set(0, 50, 100);
        
        // Add lights
        this.addLights();
        
        // Create starfield
        this.createStarfield();
        
        // Create sun and planets
        this.createSun();
        this.createPlanets();
        
        // Setup controls (if available)
        this.setupControls();
        
        // ADDED: Hide loading screen after everything is created
        this.hideLoadingScreen();
        
        // Start animation
        this.animate();
        
        // Handle window resize
        window.addEventListener('resize', () => this.onWindowResize());
    }
    
    // ADDED: Function to hide loading screen
    hideLoadingScreen() {
        setTimeout(() => {
            // Find loading screen by various possible selectors
            const loadingScreen = document.getElementById('loading-screen') || 
                                document.querySelector('.loading-screen') ||
                                document.querySelector('[class*="loading"]') ||
                                document.querySelector('div:has-text("Loading Solar System")');
            
            if (loadingScreen) {
                loadingScreen.style.opacity = '0';
                loadingScreen.style.transition = 'opacity 0.5s ease-out';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }
            
            // Also search for any element containing "Loading Solar System" text
            const allElements = document.querySelectorAll('*');
            allElements.forEach(element => {
                if (element.textContent && element.textContent.includes('Loading Solar System')) {
                    const parent = element.closest('div');
                    if (parent && parent !== document.body) {
                        parent.style.opacity = '0';
                        parent.style.transition = 'opacity 0.5s ease-out';
                        setTimeout(() => {
                            parent.style.display = 'none';
                        }, 500);
                    }
                }
            });
            
            // Fallback: hide any overlay-style divs that might be loading screens
            const overlays = document.querySelectorAll('div[style*="position: fixed"], div[style*="position: absolute"]');
            overlays.forEach(overlay => {
                if (overlay.style.zIndex > 100 && overlay.textContent.includes('Loading')) {
                    overlay.style.opacity = '0';
                    overlay.style.transition = 'opacity 0.5s ease-out';
                    setTimeout(() => {
                        overlay.style.display = 'none';
                    }, 500);
                }
            });
        }, 200); // Small delay to ensure everything is rendered
    }
    
    addLights() {
        // Ambient light
        const ambientLight = new THREE.AmbientLight(0x404040, 0.2);
        this.scene.add(ambientLight);
        
        // Sun light
        const sunLight = new THREE.PointLight(0xffffff, 2, 0, 2);
        sunLight.position.set(0, 0, 0);
        this.scene.add(sunLight);
    }
    
    createStarfield() {
        const starsGeometry = new THREE.BufferGeometry();
        const starsMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 1 });
        
        const starsVertices = [];
        for (let i = 0; i < 10000; i++) {
            const x = (Math.random() - 0.5) * 2000;
            const y = (Math.random() - 0.5) * 2000;
            const z = (Math.random() - 0.5) * 2000;
            starsVertices.push(x, y, z);
        }
        
        starsGeometry.setAttribute('position', new THREE.Float32BufferAttribute(starsVertices, 3));
        const stars = new THREE.Points(starsGeometry, starsMaterial);
        this.scene.add(stars);
    }
    
    createSun() {
        const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
        const sunMaterial = new THREE.MeshBasicMaterial({ 
            color: 0xffff00,
            emissive: 0xffaa00,
            emissiveIntensity: 0.5
        });
        
        this.sun = new THREE.Mesh(sunGeometry, sunMaterial);
        this.scene.add(this.sun);
    }
    
    createPlanets() {
        const planetData = [
            { name: 'Mercury', size: 0.4, distance: 15, color: 0x8c7853, speed: 4.15 },
            { name: 'Venus', size: 0.9, distance: 20, color: 0xffc649, speed: 1.62 },
            { name: 'Earth', size: 1, distance: 25, color: 0x6b93d6, speed: 1.0 },
            { name: 'Mars', size: 0.5, distance: 30, color: 0xc1440e, speed: 0.53 },
            { name: 'Jupiter', size: 3, distance: 45, color: 0xd8ca9d, speed: 0.08 },
            { name: 'Saturn', size: 2.5, distance: 55, color: 0xfad5a5, speed: 0.03 },
            { name: 'Uranus', size: 1.5, distance: 65, color: 0x4fd0e4, speed: 0.01 },
            { name: 'Neptune', size: 1.4, distance: 75, color: 0x4b70dd, speed: 0.006 }
        ];
        
        planetData.forEach((data, index) => {
            const planet = this.createPlanet(data);
            this.planets.push(planet);
            this.scene.add(planet.group);
            
            // Add orbit ring
            this.createOrbitRing(data.distance);
        });
    }
    
    createSun() {
    const sunGeometry = new THREE.SphereGeometry(5, 32, 32);
    
    // Use MeshLambertMaterial or MeshPhongMaterial for emissive properties
    const sunMaterial = new THREE.MeshLambertMaterial({ 
        color: 0xffff00,
        emissive: 0xffaa00,
        emissiveIntensity: 0.5
    });
    
    this.sun = new THREE.Mesh(sunGeometry, sunMaterial);
    this.scene.add(this.sun);
}

    createPlanet(data) {
        const geometry = new THREE.SphereGeometry(data.size, 16, 16);
        const material = new THREE.MeshLambertMaterial({ color: data.color });
        const mesh = new THREE.Mesh(geometry, material);
        
        // Create group for planet and its orbit
        const group = new THREE.Group();
        mesh.position.x = data.distance;
        group.add(mesh);
        
        // Add moon for Earth
        if (data.name === 'Earth') {
            const moonGeometry = new THREE.SphereGeometry(0.27, 8, 8);
            const moonMaterial = new THREE.MeshLambertMaterial({ color: 0x888888 });
            const moon = new THREE.Mesh(moonGeometry, moonMaterial);
            moon.position.set(data.distance + 3, 0, 0);
            group.add(moon);
        }
        
        // Add rings for Saturn
        if (data.name === 'Saturn') {
            const ringGeometry = new THREE.RingGeometry(data.size * 1.2, data.size * 2, 32);
            const ringMaterial = new THREE.MeshBasicMaterial({ 
                color: 0xaaaaaa, 
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.6
            });
            const rings = new THREE.Mesh(ringGeometry, ringMaterial);
            rings.rotation.x = Math.PI / 2;
            rings.position.x = data.distance;
            group.add(rings);
        }
        
        return {
            group: group,
            mesh: mesh,
            data: data,
            angle: Math.random() * Math.PI * 2
        };
    }
    
    createOrbitRing(radius) {
        const geometry = new THREE.RingGeometry(radius - 0.1, radius + 0.1, 64);
        const material = new THREE.MeshBasicMaterial({ 
            color: 0x333333, 
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0.3
        });
        const ring = new THREE.Mesh(geometry, material);
        ring.rotation.x = Math.PI / 2;
        this.scene.add(ring);
    }
    
    setupControls() {
        // Basic mouse controls for camera movement
        let mouseDown = false;
        let mouseX = 0;
        let mouseY = 0;
        
        document.addEventListener('mousedown', (event) => {
            mouseDown = true;
            mouseX = event.clientX;
            mouseY = event.clientY;
        });
        
        document.addEventListener('mouseup', () => {
            mouseDown = false;
        });
        
        document.addEventListener('mousemove', (event) => {
            if (mouseDown) {
                const deltaX = event.clientX - mouseX;
                const deltaY = event.clientY - mouseY;
                
                this.camera.position.x += deltaX * 0.1;
                this.camera.position.y -= deltaY * 0.1;
                
                mouseX = event.clientX;
                mouseY = event.clientY;
                
                this.camera.lookAt(0, 0, 0);
            }
        });
        
        // Zoom with mouse wheel
        document.addEventListener('wheel', (event) => {
            const scale = event.deltaY > 0 ? 1.1 : 0.9;
            this.camera.position.multiplyScalar(scale);
            this.camera.lookAt(0, 0, 0);
        });
    }
    
    animate() {
        requestAnimationFrame(() => this.animate());
        
        if (!this.paused) {
            // Rotate sun
            this.sun.rotation.y += 0.01 * this.animationSpeed;
            
            // Update planets
            this.planets.forEach((planet) => {
                // Orbit around sun
                planet.angle += planet.data.speed * 0.001 * this.animationSpeed;
                const x = Math.cos(planet.angle) * planet.data.distance;
                const z = Math.sin(planet.angle) * planet.data.distance;
                planet.group.position.set(x, 0, z);
                
                // Rotate planet
                planet.mesh.rotation.y += 0.02 * this.animationSpeed;
            });
        }
        
        this.renderer.render(this.scene, this.camera);
    }
    
    onWindowResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
    
    // Control methods
    togglePause() {
        this.paused = !this.paused;
    }
    
    setSpeed(speed) {
        this.animationSpeed = speed;
    }
    
    resetCamera() {
        this.camera.position.set(0, 50, 100);
        this.camera.lookAt(0, 0, 0);
    }
    
    focusOnPlanet(planetName) {
        const planet = this.planets.find(p => p.data.name === planetName);
        if (planet) {
            const pos = planet.group.position;
            this.camera.position.set(pos.x + 10, pos.y + 10, pos.z + 10);
            this.camera.lookAt(pos.x, pos.y, pos.z);
        }
    }
    
    // ADDED: Method to update planet speeds (for controls integration)
    updatePlanetSpeed(planetName, speed) {
        const planet = this.planets.find(p => p.data.name === planetName);
        if (planet) {
            planet.data.speed = speed;
        }
    }
    
    // ADDED: Method to get planet data (for controls integration)
    getPlanetData() {
        return this.planets.map(planet => ({
            name: planet.data.name,
            speed: planet.data.speed,
            distance: planet.data.distance,
            size: planet.data.size,
            color: planet.data.color
        }));
    }
    
    // ADDED: Method to set global animation speed
    setGlobalSpeed(speed) {
        this.animationSpeed = speed;
    }
    
    // ADDED: Method to get current animation state
    getAnimationState() {
        return {
            paused: this.paused,
            speed: this.animationSpeed,
            planets: this.getPlanetData()
        };
    }
}

// Initialize the solar system when the page loads
let solarSystem;

document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, initializing solar system...');
    
    try {
        solarSystem = new SolarSystem();
        console.log('Solar system initialized successfully');
    } catch (error) {
        console.error('Error initializing solar system:', error);
        
        // Hide loading screen even if there's an error
        setTimeout(() => {
            const loadingElements = document.querySelectorAll('*');
            loadingElements.forEach(element => {
                if (element.textContent && element.textContent.includes('Loading')) {
                    const parent = element.closest('div');
                    if (parent) {
                        parent.style.display = 'none';
                    }
                }
            });
        }, 1000);
    }
    
    // Add keyboard controls
    document.addEventListener('keydown', (event) => {
        if (!solarSystem) return;
        
        switch(event.code) {
            case 'Space':
                event.preventDefault();
                solarSystem.togglePause();
                console.log('Animation toggled');
                break;
            case 'KeyR':
                solarSystem.resetCamera();
                console.log('Camera reset');
                break;
            case 'Digit1':
                solarSystem.focusOnPlanet('Mercury');
                console.log('Focused on Mercury');
                break;
            case 'Digit2':
                solarSystem.focusOnPlanet('Venus');
                console.log('Focused on Venus');
                break;
            case 'Digit3':
                solarSystem.focusOnPlanet('Earth');
                console.log('Focused on Earth');
                break;
            case 'Digit4':
                solarSystem.focusOnPlanet('Mars');
                console.log('Focused on Mars');
                break;
            case 'Digit5':
                solarSystem.focusOnPlanet('Jupiter');
                console.log('Focused on Jupiter');
                break;
            case 'Digit6':
                solarSystem.focusOnPlanet('Saturn');
                console.log('Focused on Saturn');
                break;
            case 'Digit7':
                solarSystem.focusOnPlanet('Uranus');
                console.log('Focused on Uranus');
                break;
            case 'Digit8':
                solarSystem.focusOnPlanet('Neptune');
                console.log('Focused on Neptune');
                break;
        }
    });
});

// ADDED: Global functions for external control access
window.getSolarSystem = function() {
    return solarSystem;
};

window.toggleSolarSystemPause = function() {
    if (solarSystem) {
        solarSystem.togglePause();
        return solarSystem.paused;
    }
    return false;
};

window.setSolarSystemSpeed = function(speed) {
    if (solarSystem) {
        solarSystem.setGlobalSpeed(speed);
        return true;
    }
    return false;
};

window.focusOnPlanet = function(planetName) {
    if (solarSystem) {
        solarSystem.focusOnPlanet(planetName);
        return true;
    }
    return false;
};

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = SolarSystem;
}

// ADDED: Fallback loading screen removal (in case the main one doesn't work)
window.addEventListener('load', () => {
    setTimeout(() => {
        // Force remove any remaining loading screens
        const possibleLoadingScreens = [
            document.getElementById('loading-screen'),
            document.querySelector('.loading-screen'),
            document.querySelector('[class*="loading"]'),
            ...Array.from(document.querySelectorAll('div')).filter(div => 
                div.textContent.includes('Loading Solar System') || 
                div.textContent.includes('Loading...')
            )
        ];
        
        possibleLoadingScreens.forEach(screen => {
            if (screen) {
                screen.style.display = 'none';
            }
        });
    }, 2000);
});

