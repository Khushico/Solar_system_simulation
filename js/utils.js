// // Utility Functions for Solar System Simulation

// /**
//  * Mathematical utilities
//  */
// const MathUtils = {
//     // Convert degrees to radians
//     degToRad: (degrees) => degrees * (Math.PI / 180),
    
//     // Convert radians to degrees
//     radToDeg: (radians) => radians * (180 / Math.PI),
    
//     // Linear interpolation
//     lerp: (start, end, factor) => start + (end - start) * factor,
    
//     // Clamp value between min and max
//     clamp: (value, min, max) => Math.min(Math.max(value, min), max),
    
//     // Map value from one range to another
//     map: (value, inMin, inMax, outMin, outMax) => {
//         return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
//     },
    
//     // Generate random number between min and max
//     random: (min, max) => Math.random() * (max - min) + min,
    
//     // Calculate distance between two 3D points
//     distance3D: (pos1, pos2) => {
//         const dx = pos1.x - pos2.x;
//         const dy = pos1.y - pos2.y;
//         const dz = pos1.z - pos2.z;
//         return Math.sqrt(dx * dx + dy * dy + dz * dz);
//     },
    
//     // Smooth step function for animations
//     smoothStep: (edge0, edge1, x) => {
//         const t = MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1);
//         return t * t * (3 - 2 * t);
//     }
// };

// /**
//  * DOM utilities
//  */
// const DOMUtils = {
//     // Get element by ID with error checking
//     getElementById: (id) => {
//         const element = document.getElementById(id);
//         if (!element) {
//             console.warn(`Element with ID '${id}' not found`);
//         }
//         return element;
//     },
    
//     // Add event listener with error handling
//     addEventListener: (element, event, handler) => {
//         if (element && typeof handler === 'function') {
//             element.addEventListener(event, handler);
//         } else {
//             console.warn('Invalid element or handler for event listener');
//         }
//     },
    
//     // Remove event listener
//     removeEventListener: (element, event, handler) => {
//         if (element && typeof handler === 'function') {
//             element.removeEventListener(event, handler);
//         }
//     },
    
//     // Set element visibility
//     setVisible: (element, visible) => {
//         if (element) {
//             element.style.display = visible ? 'block' : 'none';
//         }
//     },
    
//     // Toggle class on element
//     toggleClass: (element, className) => {
//         if (element) {
//             element.classList.toggle(className);
//         }
//     },
    
//     // Add class to element
//     addClass: (element, className) => {
//         if (element) {
//             element.classList.add(className);
//         }
//     },
    
//     // Remove class from element
//     removeClass: (element, className) => {
//         if (element) {
//             element.classList.remove(className);
//         }
//     },
    
//     // Check if element has class
//     hasClass: (element, className) => {
//         return element ? element.classList.contains(className) : false;
//     }
// };

// /**
//  * Animation utilities
//  */
// const AnimationUtils = {
//     // Ease in-out cubic function
//     easeInOutCubic: (t) => {
//         return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
//     },
    
//     // Ease out elastic function
//     easeOutElastic: (t) => {
//         const c4 = (2 * Math.PI) / 3;
//         return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
//     },
    
//     // Simple tween function
//     tween: (from, to, duration, easing = AnimationUtils.easeInOutCubic, callback = null) => {
//         const startTime = performance.now();
        
//         function animate(currentTime) {
//             const elapsed = currentTime - startTime;
//             const progress = Math.min(elapsed / duration, 1);
//             const easedProgress = easing(progress);
//             const value = MathUtils.lerp(from, to, easedProgress);
            
//             if (callback) callback(value, progress);
            
//             if (progress < 1) {
//                 requestAnimationFrame(animate);
//             }
//         }
        
//         requestAnimationFrame(animate);
//     }
// };

// /**
//  * Three.js utilities
//  */
// const ThreeUtils = {
//     // Create basic sphere geometry
//     createSphere: (radius = 1, segments = 32) => {
//         return new THREE.SphereGeometry(radius, segments, segments);
//     },
    
//     // Create basic material with texture
//     createMaterial: (texture = null, options = {}) => {
//         const materialOptions = {
//             map: texture,
//             ...options
//         };
//         return new THREE.MeshLambertMaterial(materialOptions);
//     },
    
//     // Load texture with error handling
//     loadTexture: (url, onLoad = null, onError = null) => {
//         const loader = new THREE.TextureLoader();
//         const texture = loader.load(
//             url,
//             (loadedTexture) => {
//                 console.log(`Texture loaded: ${url}`);
//                 if (onLoad) onLoad(loadedTexture);
//             },
//             undefined,
//             (error) => {
//                 console.warn(`Failed to load texture: ${url}`, error);
//                 if (onError) onError(error);
//             }
//         );
//         return texture;
//     },
    
//     // Create orbit line
//     createOrbitLine: (radius, segments = 64, color = 0x444444) => {
//         const points = [];
//         for (let i = 0; i <= segments; i++) {
//             const angle = (i / segments) * Math.PI * 2;
//             points.push(new THREE.Vector3(
//                 Math.cos(angle) * radius,
//                 0,
//                 Math.sin(angle) * radius
//             ));
//         }
        
//         const geometry = new THREE.BufferGeometry().setFromPoints(points);
//         const material = new THREE.LineBasicMaterial({ 
//             color: color,
//             transparent: true,
//             opacity: 0.3
//         });
        
//         return new THREE.Line(geometry, material);
//     },
    
//     // Create starfield
//     createStarField: (count = 1000, radius = 1000) => {
//         const geometry = new THREE.BufferGeometry();
//         const positions = [];
        
//         for (let i = 0; i < count; i++) {
//             // Generate random position on sphere
//             const phi = Math.acos(2 * Math.random() - 1);
//             const theta = 2 * Math.PI * Math.random();
            
//             const x = radius * Math.sin(phi) * Math.cos(theta);
//             const y = radius * Math.sin(phi) * Math.sin(theta);
//             const z = radius * Math.cos(phi);
            
//             positions.push(x, y, z);
//         }
        
//         geometry.setAttribute('position', new THREE.Float32Array(positions), 3);
        
//         const material = new THREE.PointsMaterial({
//             color: 0xffffff,
//             size: 2,
//             transparent: true,
//             opacity: 0.8
//         });
        
//         return new THREE.Points(geometry, material);
//     },
    
//     // Dispose of Three.js objects properly
//     dispose: (object) => {
//         if (object.geometry) {
//             object.geometry.dispose();
//         }
//         if (object.material) {
//             if (Array.isArray(object.material)) {
//                 object.material.forEach(material => {
//                     if (material.map) material.map.dispose();
//                     material.dispose();
//                 });
//             } else {
//                 if (object.material.map) object.material.map.dispose();
//                 object.material.dispose();
//             }
//         }
//     }
// };

// /**
//  * Performance utilities
//  */
// const PerformanceUtils = {
//     // FPS counter
//     fpsCounter: {
//         frames: 0,
//         lastTime: performance.now(),
//         fps: 0,
        
//         update: function() {
//             this.frames++;
//             const currentTime = performance.now();
            
//             if (currentTime >= this.lastTime + 1000) {
//                 this.fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime));
//                 this.frames = 0;
//                 this.lastTime = currentTime;
//             }
//         },
        
//         getFPS: function() {
//             return this.fps;
//         }
//     },
    
//     // Simple performance monitor
//     monitor: {
//         marks: new Map(),
        
//         start: function(label) {
//             this.marks.set(label, performance.now());
//         },
        
//         end: function(label) {
//             const startTime = this.marks.get(label);
//             if (startTime) {
//                 const duration = performance.now() - startTime;
//                 console.log(`${label}: ${duration.toFixed(2)}ms`);
//                 this.marks.delete(label);
//                 return duration;
//             }
//             return 0;
//         }
//     }
// };

// /**
//  * Event dispatcher for custom events
//  */
// class EventDispatcher {
//     constructor() {
//         this.listeners = new Map();
//     }
    
//     addEventListener(type, listener) {
//         if (!this.listeners.has(type)) {
//             this.listeners.set(type, []);
//         }
//         this.listeners.get(type).push(listener);
//     }
    
//     removeEventListener(type, listener) {
//         if (this.listeners.has(type)) {
//             const listeners = this.listeners.get(type);
//             const index = listeners.indexOf(listener);
//             if (index > -1) {
//                 listeners.splice(index, 1);
//             }
//         }
//     }
    
//     dispatchEvent(type, data = null) {
//         if (this.listeners.has(type)) {
//             this.listeners.get(type).forEach(listener => {
//                 try {
//                     listener(data);
//                 } catch (error) {
//                     console.error(`Error in event listener for ${type}:`, error);
//                 }
//             });
//         }
//     }
// }

// /**
//  * Local storage utilities with error handling
//  */
// const StorageUtils = {
//     // Note: In Claude.ai artifacts, localStorage is not supported
//     // These functions provide fallbacks using in-memory storage
//     memoryStorage: new Map(),
    
//     set: function(key, value) {
//         try {
//             const serialized = JSON.stringify(value);
//             if (typeof localStorage !== 'undefined') {
//                 localStorage.setItem(key, serialized);
//             } else {
//                 this.memoryStorage.set(key, serialized);
//             }
//             return true;
//         } catch (error) {
//             console.warn('Storage set failed:', error);
//             this.memoryStorage.set(key, JSON.stringify(value));
//             return false;
//         }
//     },
    
//     get: function(key, defaultValue = null) {
//         try {
//             let stored;
//             if (typeof localStorage !== 'undefined') {
//                 stored = localStorage.getItem(key);
//             } else {
//                 stored = this.memoryStorage.get(key);
//             }
            
//             if (stored === null) return defaultValue;
//             return JSON.parse(stored);
//         } catch (error) {
//             console.warn('Storage get failed:', error);
//             return defaultValue;
//         }
//     },
    
//     remove: function(key) {
//         try {
//             if (typeof localStorage !== 'undefined') {
//                 localStorage.removeItem(key);
//             } else {
//                 this.memoryStorage.delete(key);
//             }
//             return true;
//         } catch (error) {
//             console.warn('Storage remove failed:', error);
//             return false;
//         }
//     },
    
//     clear: function() {
//         try {
//             if (typeof localStorage !== 'undefined') {
//                 localStorage.clear();
//             } else {
//                 this.memoryStorage.clear();
//             }
//             return true;
//         } catch (error) {
//             console.warn('Storage clear failed:', error);
//             return false;
//         }
//     }
// };

// /**
//  * Debounce utility for performance optimization
//  */
// function debounce(func, wait, immediate = false) {
//     let timeout;
//     return function executedFunction(...args) {
//         const later = () => {
//             timeout = null;
//             if (!immediate) func.apply(this, args);
//         };
//         const callNow = immediate && !timeout;
//         clearTimeout(timeout);
//         timeout = setTimeout(later, wait);
//         if (callNow) func.apply(this, args);
//     };
// }

// /**
//  * Throttle utility for performance optimization
//  */
// function throttle(func, limit) {
//     let inThrottle;
//     return function(...args) {
//         if (!inThrottle) {
//             func.apply(this, args);
//             inThrottle = true;
//             setTimeout(() => inThrottle = false, limit);
//         }
//     };
// }

// // Export utilities for use in other modules
// if (typeof module !== 'undefined' && module.exports) {
//     module.exports = {
//         MathUtils,
//         DOMUtils,
//         AnimationUtils,
//         ThreeUtils,
//         PerformanceUtils,
//         EventDispatcher,
//         StorageUtils,
//         debounce,
//         throttle
//     };
// }
// Utility Functions for Solar System Simulation

/**
 * Mathematical utilities
 */
const MathUtils = {
    // Convert degrees to radians
    degToRad: (degrees) => degrees * (Math.PI / 180),
    
    // Convert radians to degrees
    radToDeg: (radians) => radians * (180 / Math.PI),
    
    // Linear interpolation
    lerp: (start, end, factor) => start + (end - start) * factor,
    
    // Clamp value between min and max
    clamp: (value, min, max) => Math.min(Math.max(value, min), max),
    
    // Map value from one range to another
    map: (value, inMin, inMax, outMin, outMax) => {
        return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
    },
    
    // Generate random number between min and max
    random: (min, max) => Math.random() * (max - min) + min,
    
    // Calculate distance between two 3D points
    distance3D: (pos1, pos2) => {
        const dx = pos1.x - pos2.x;
        const dy = pos1.y - pos2.y;
        const dz = pos1.z - pos2.z;
        return Math.sqrt(dx * dx + dy * dy + dz * dz);
    },
    
    // Smooth step function for animations
    smoothStep: (edge0, edge1, x) => {
        const t = MathUtils.clamp((x - edge0) / (edge1 - edge0), 0, 1);
        return t * t * (3 - 2 * t);
    }
};

/**
 * DOM utilities
 */
const DOMUtils = {
    // Get element by ID with error checking
    getElementById: (id) => {
        const element = document.getElementById(id);
        if (!element) {
            console.warn(`Element with ID '${id}' not found`);
        }
        return element;
    },
    
    // Add event listener with error handling
    addEventListener: (element, event, handler) => {
        if (element && typeof handler === 'function') {
            element.addEventListener(event, handler);
        } else {
            console.warn('Invalid element or handler for event listener');
        }
    },
    
    // Remove event listener
    removeEventListener: (element, event, handler) => {
        if (element && typeof handler === 'function') {
            element.removeEventListener(event, handler);
        }
    },
    
    // Set element visibility
    setVisible: (element, visible) => {
        if (element) {
            element.style.display = visible ? 'block' : 'none';
        }
    },
    
    // Toggle class on element
    toggleClass: (element, className) => {
        if (element) {
            element.classList.toggle(className);
        }
    },
    
    // Add class to element
    addClass: (element, className) => {
        if (element) {
            element.classList.add(className);
        }
    },
    
    // Remove class from element
    removeClass: (element, className) => {
        if (element) {
            element.classList.remove(className);
        }
    },
    
    // Check if element has class
    hasClass: (element, className) => {
        return element ? element.classList.contains(className) : false;
    }
};

/**
 * Animation utilities
 */
const AnimationUtils = {
    // Ease in-out cubic function
    easeInOutCubic: (t) => {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    },
    
    // Ease out elastic function
    easeOutElastic: (t) => {
        const c4 = (2 * Math.PI) / 3;
        return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
    },
    
    // Simple tween function
    tween: (from, to, duration, easing = AnimationUtils.easeInOutCubic, callback = null) => {
        const startTime = performance.now();
        
        function animate(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = easing(progress);
            const value = MathUtils.lerp(from, to, easedProgress);
            
            if (callback) callback(value, progress);
            
            if (progress < 1) {
                requestAnimationFrame(animate);
            }
        }
        
        requestAnimationFrame(animate);
    }
};

/**
 * Three.js utilities
 */
const ThreeUtils = {
    // Create basic sphere geometry
    createSphere: (radius = 1, segments = 32) => {
        return new THREE.SphereGeometry(radius, segments, segments);
    },
    
    // Create basic material with texture
    createMaterial: (texture = null, options = {}) => {
        const materialOptions = {
            map: texture,
            ...options
        };
        return new THREE.MeshLambertMaterial(materialOptions);
    },
    
    // Load texture with error handling
    loadTexture: (url, onLoad = null, onError = null) => {
        const loader = new THREE.TextureLoader();
        const texture = loader.load(
            url,
            (loadedTexture) => {
                console.log(`Texture loaded: ${url}`);
                if (onLoad) onLoad(loadedTexture);
            },
            undefined,
            (error) => {
                console.warn(`Failed to load texture: ${url}`, error);
                if (onError) onError(error);
            }
        );
        return texture;
    },
    
    // Create orbit line
    createOrbitLine: (radius, segments = 64, color = 0x444444) => {
        const points = [];
        for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            points.push(new THREE.Vector3(
                Math.cos(angle) * radius,
                0,
                Math.sin(angle) * radius
            ));
        }
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({ 
            color: color,
            transparent: true,
            opacity: 0.3
        });
        
        return new THREE.Line(geometry, material);
    },
    
    // Create starfield
    createStarField: (count = 1000, radius = 1000) => {
        const geometry = new THREE.BufferGeometry();
        const positions = [];
        
        for (let i = 0; i < count; i++) {
            // Generate random position on sphere
            const phi = Math.acos(2 * Math.random() - 1);
            const theta = 2 * Math.PI * Math.random();
            
            const x = radius * Math.sin(phi) * Math.cos(theta);
            const y = radius * Math.sin(phi) * Math.sin(theta);
            const z = radius * Math.cos(phi);
            
            positions.push(x, y, z);
        }
        
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
        
        const material = new THREE.PointsMaterial({
            color: 0xffffff,
            size: 2,
            transparent: true,
            opacity: 0.8
        });
        
        return new THREE.Points(geometry, material);
    },
    
    // Dispose of Three.js objects properly
    dispose: (object) => {
        if (object.geometry) {
            object.geometry.dispose();
        }
        if (object.material) {
            if (Array.isArray(object.material)) {
                object.material.forEach(material => {
                    if (material.map) material.map.dispose();
                    material.dispose();
                });
            } else {
                if (object.material.map) object.material.map.dispose();
                object.material.dispose();
            }
        }
    }
};

/**
 * ADDED: Loading Manager utilities for fixing loading screen
 */
const LoadingUtils = {
    // Create loading manager with progress tracking
    createLoadingManager: (onLoad, onProgress, onError) => {
        return new THREE.LoadingManager(
            // onLoad callback
            () => {
                console.log('All assets loaded successfully');
                if (onLoad) onLoad();
            },
            // onProgress callback
            (url, itemsLoaded, itemsTotal) => {
                const progress = (itemsLoaded / itemsTotal) * 100;
                console.log(`Loading progress: ${progress.toFixed(1)}% - ${url}`);
                if (onProgress) onProgress(progress, itemsLoaded, itemsTotal);
            },
            // onError callback
            (url) => {
                console.error('Failed to load asset:', url);
                if (onError) onError(url);
            }
        );
    },
    
    // Hide loading screen with animation
    hideLoadingScreen: () => {
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('fade-out');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
            }, 500);
        }
    },
    
    // Update loading progress bar
    updateLoadingProgress: (progress) => {
        const progressBar = document.querySelector('.progress-bar');
        const progressText = document.querySelector('.progress-text');
        
        if (progressBar) {
            progressBar.style.width = progress + '%';
        }
        if (progressText) {
            progressText.textContent = Math.round(progress) + '%';
        }
    },
    
    // Show loading error
    showLoadingError: (message) => {
        const loadingText = document.querySelector('#loading-screen h2');
        if (loadingText) {
            loadingText.textContent = message || 'Loading failed. Please refresh the page.';
            loadingText.style.color = '#ff4444';
        }
    }
};

/**
 * CORRECTED: Texture loading function that your main.js imports
 */
function loadTexture(url, manager = null) {
    const loader = manager ? new THREE.TextureLoader(manager) : new THREE.TextureLoader();
    
    return new Promise((resolve, reject) => {
        loader.load(
            url,
            (texture) => {
                console.log(`Texture loaded successfully: ${url}`);
                resolve(texture);
            },
            (progress) => {
                console.log(`Loading texture progress: ${url}`, progress);
            },
            (error) => {
                console.warn(`Failed to load texture: ${url}`, error);
                // Return a default texture instead of rejecting
                const canvas = document.createElement('canvas');
                canvas.width = 64;
                canvas.height = 64;
                const context = canvas.getContext('2d');
                context.fillStyle = '#666666';
                context.fillRect(0, 0, 64, 64);
                
                const defaultTexture = new THREE.CanvasTexture(canvas);
                resolve(defaultTexture);
            }
        );
    });
}

/**
 * CORRECTED: Star field creation function that your main.js imports
 */
function createStarField(count = 10000, radius = 2000) {
    const geometry = new THREE.BufferGeometry();
    const positions = [];
    const colors = [];
    
    for (let i = 0; i < count; i++) {
        // Generate random position in sphere
        const phi = Math.acos(2 * Math.random() - 1);
        const theta = 2 * Math.PI * Math.random();
        const r = radius * Math.cbrt(Math.random()); // Uniform distribution in sphere
        
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = r * Math.sin(phi) * Math.sin(theta);
        const z = r * Math.cos(phi);
        
        positions.push(x, y, z);
        
        // Random star colors (white to yellow)
        const intensity = 0.5 + Math.random() * 0.5;
        colors.push(intensity, intensity, intensity * 0.8);
    }
    
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
    
    const material = new THREE.PointsMaterial({
        size: Math.random() * 2 + 1,
        vertexColors: true,
        transparent: true,
        opacity: 0.8
    });
    
    return new THREE.Points(geometry, material);
}

/**
 * Performance utilities
 */
const PerformanceUtils = {
    // FPS counter
    fpsCounter: {
        frames: 0,
        lastTime: performance.now(),
        fps: 0,
        
        update: function() {
            this.frames++;
            const currentTime = performance.now();
            
            if (currentTime >= this.lastTime + 1000) {
                this.fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime));
                this.frames = 0;
                this.lastTime = currentTime;
            }
        },
        
        getFPS: function() {
            return this.fps;
        }
    },
    
    // Simple performance monitor
    monitor: {
        marks: new Map(),
        
        start: function(label) {
            this.marks.set(label, performance.now());
        },
        
        end: function(label) {
            const startTime = this.marks.get(label);
            if (startTime) {
                const duration = performance.now() - startTime;
                console.log(`${label}: ${duration.toFixed(2)}ms`);
                this.marks.delete(label);
                return duration;
            }
            return 0;
        }
    }
};

/**
 * Event dispatcher for custom events
 */
class EventDispatcher {
    constructor() {
        this.listeners = new Map();
    }
    
    addEventListener(type, listener) {
        if (!this.listeners.has(type)) {
            this.listeners.set(type, []);
        }
        this.listeners.get(type).push(listener);
    }
    
    removeEventListener(type, listener) {
        if (this.listeners.has(type)) {
            const listeners = this.listeners.get(type);
            const index = listeners.indexOf(listener);
            if (index > -1) {
                listeners.splice(index, 1);
            }
        }
    }
    
    dispatchEvent(type, data = null) {
        if (this.listeners.has(type)) {
            this.listeners.get(type).forEach(listener => {
                try {
                    listener(data);
                } catch (error) {
                    console.error(`Error in event listener for ${type}:`, error);
                }
            });
        }
    }
}

/**
 * Local storage utilities with error handling
 */
const StorageUtils = {
    memoryStorage: new Map(),
    
    set: function(key, value) {
        try {
            const serialized = JSON.stringify(value);
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem(key, serialized);
            } else {
                this.memoryStorage.set(key, serialized);
            }
            return true;
        } catch (error) {
            console.warn('Storage set failed:', error);
            this.memoryStorage.set(key, JSON.stringify(value));
            return false;
        }
    },
    
    get: function(key, defaultValue = null) {
        try {
            let stored;
            if (typeof localStorage !== 'undefined') {
                stored = localStorage.getItem(key);
            } else {
                stored = this.memoryStorage.get(key);
            }
            
            if (stored === null) return defaultValue;
            return JSON.parse(stored);
        } catch (error) {
            console.warn('Storage get failed:', error);
            return defaultValue;
        }
    },
    
    remove: function(key) {
        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.removeItem(key);
            } else {
                this.memoryStorage.delete(key);
            }
            return true;
        } catch (error) {
            console.warn('Storage remove failed:', error);
            return false;
        }
    },
    
    clear: function() {
        try {
            if (typeof localStorage !== 'undefined') {
                localStorage.clear();
            } else {
                this.memoryStorage.clear();
            }
            return true;
        } catch (error) {
            console.warn('Storage clear failed:', error);
            return false;
        }
    }
};

/**
 * Debounce utility for performance optimization
 */
function debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func.apply(this, args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func.apply(this, args);
    };
}

/**
 * Throttle utility for performance optimization
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Export utilities for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        MathUtils,
        DOMUtils,
        AnimationUtils,
        ThreeUtils,
        LoadingUtils,
        PerformanceUtils,
        EventDispatcher,
        StorageUtils,
        debounce,
        throttle,
        loadTexture,
        createStarField
    };
}

// Also export for ES6 modules
export {
    MathUtils,
    DOMUtils,
    AnimationUtils,
    ThreeUtils,
    LoadingUtils,
    PerformanceUtils,
    EventDispatcher,
    StorageUtils,
    debounce,
    throttle,
    loadTexture,
    createStarField
};
