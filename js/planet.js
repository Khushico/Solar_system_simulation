// // Planet Data and Configuration for Solar System Simulation

// /**
//  * Planet data with realistic proportions and characteristics
//  * Distances are scaled down for visualization purposes
//  * Speeds are relative to Earth's orbital period
//  */
// const PLANET_DATA = {
//     sun: {
//         name: 'Sun',
//         radius: 2.5,
//         distance: 0,
//         orbitalPeriod: 0,
//         rotationPeriod: 25.4, // days
//         color: 0xFDB813,
//         texture: null,
//         description: 'The Sun is the star at the center of our Solar System. It is a nearly perfect sphere of hot plasma, with internal convective motion that generates a magnetic field.',
//         facts: [
//             'Mass: 1.989 × 10³⁰ kg',
//             'Temperature: ~5,778K surface',
//             'Age: ~4.6 billion years',
//             'Composition: 73% Hydrogen, 25% Helium'
//         ]
//     },
//     mercury: {
//         name: 'Mercury',
//         radius: 0.15,
//         distance: 8,
//         orbitalPeriod: 0.24, // Earth years
//         rotationPeriod: 58.6, // days
//         color: 0x8C7853,
//         texture: 'assets/textures/mercury.jpg',
//         description: 'Mercury is the smallest planet in our solar system and the closest to the Sun. It has extreme temperature variations.',
//         facts: [
//             'Distance from Sun: 57.9 million km',
//             'Day length: 176 Earth days',
//             'No atmosphere',
//             'Temperature range: -173°C to 427°C'
//         ]
//     },
//     venus: {
//         name: 'Venus',
//         radius: 0.25,
//         distance: 12,
//         orbitalPeriod: 0.62,
//         rotationPeriod: -243, // Retrograde rotation
//         color: 0xF7CC7F,
//         texture: 'assets/textures/venus.jpg',
//         description: 'Venus is the second planet from the Sun and the hottest planet in our solar system due to its thick atmosphere.',
//         facts: [
//             'Distance from Sun: 108.2 million km',
//             'Atmospheric pressure: 92x Earth',
//             'Rotates backwards',
//             'Surface temperature: 462°C'
//         ]
//     },
//     earth: {
//         name: 'Earth',
//         radius: 0.26,
//         distance: 16,
//         orbitalPeriod: 1.0, // Reference point
//         rotationPeriod: 1, // days
//         color: 0x6B93D6,
//         texture: 'assets/textures/earth.jpg',
//         description: 'Earth is the third planet from the Sun and the only known planet to support life.',
//         facts: [
//             'Distance from Sun: 149.6 million km',
//             'Atmosphere: 78% Nitrogen, 21% Oxygen',
//             '71% of surface covered by water',
//             'One natural satellite: Moon'
//         ]
//     },
//     mars: {
//         name: 'Mars',
//         radius: 0.18,
//         distance: 22,
//         orbitalPeriod: 1.88,
//         rotationPeriod: 1.03,
//         color: 0xCD5C5C,
//         texture: 'assets/textures/mars.jpg',
//         description: 'Mars is the fourth planet from the Sun, known as the Red Planet due to iron oxide on its surface.',
//         facts: [
//             'Distance from Sun: 227.9 million km',
//             'Largest volcano: Olympus Mons',
//             'Two moons: Phobos and Deimos',
//             'Evidence of ancient water flow'
//         ]
//     },
//     jupiter: {
//         name: 'Jupiter',
//         radius: 0.8,
//         distance: 32,
//         orbitalPeriod: 11.86,
//         rotationPeriod: 0.41,
//         color: 0xD8CA9D,
//         texture: 'assets/textures/jupiter.jpg',
//         description: 'Jupiter is the largest planet in our solar system, a gas giant with a Great Red Spot storm.',
//         facts: [
//             'Distance from Sun: 778.5 million km',
//             'Mass: 2.5x all other planets combined',
//             'Over 80 known moons',
//             'Great Red Spot: storm larger than Earth'
//         ]
//     },
//     saturn: {
//         name: 'Saturn',
//         radius: 0.65,
//         distance: 45,
//         orbitalPeriod: 29.46,
//         rotationPeriod: 0.45,
//         color: 0xFAD5A5,
//         texture: 'assets/textures/saturn.jpg',
//         description: 'Saturn is the sixth planet from the Sun, famous for its spectacular ring system.',
//         facts: [
//             'Distance from Sun: 1.43 billion km',
//             'Density less than water',
//             'Prominent ring system',
//             'Over 80 known moons, including Titan'
//         ]
//     },
//     uranus: {
//         name: 'Uranus',
//         radius: 0.35,
//         distance: 58,
//         orbitalPeriod: 84.01,
//         rotationPeriod: -0.72, // Retrograde rotation
//         color: 0x4FD0E7,
//         texture: 'assets/textures/uranus.jpg',
//         description: 'Uranus is an ice giant that rotates on its side, likely due to an ancient collision.',
//         facts: [
//             'Distance from Sun: 2.87 billion km',
//             'Rotates on its side (98° tilt)',
//             'Made of water, methane, and ammonia ices',
//             '27 known moons'
//         ]
//     },
//     neptune: {
//         name: 'Neptune',
//         radius: 0.32,
//         distance: 68,
//         orbitalPeriod: 164.8,
//         rotationPeriod: 0.67,
//         color: 0x4B70DD,
//         texture: 'assets/textures/neptune.jpg',
//         description: 'Neptune is the eighth and outermost planet in our solar system, known for its intense winds.',
//         facts: [
//             'Distance from Sun: 4.5 billion km',
//             'Fastest winds in solar system: 2,100 km/h',
//             'Deep blue color from methane',
//             '14 known moons, largest is Triton'
//         ]
//     }
// };

// /**
//  * Planet configuration settings
//  */
// const PLANET_CONFIG = {
//     // Rendering settings
//     segments: 32, // Sphere geometry segments
//     showOrbits: true,
//     showLabels: true,
    
//     // Animation settings
//     defaultSpeedMultiplier: 1.0,
//     maxSpeedMultiplier: 10.0,
//     minSpeedMultiplier: 0.0,
    
//     // Visual settings
//     orbitOpacity: 0.3,
//     orbitColor: 0x444444,
    
//     // Interaction settings
//     hoverScale: 1.2,
//     clickScale: 1.5,
    
//     // Performance settings
//     maxDistance: 100, // Maximum render distance
//     lodLevels: {
//         high: { distance: 30, segments: 32 },
//         medium: { distance: 60, segments: 16 },
//         low: { distance: 100, segments: 8 }
//     }
// };

// /**
//  * Texture fallback colors for when textures fail to load
//  */
// const FALLBACK_COLORS = {
//     sun: 0xFDB813,
//     mercury: 0x8C7853,
//     venus: 0xF7CC7F,
//     earth: 0x6B93D6,
//     mars: 0xCD5C5C,
//     jupiter: 0xD8CA9D,
//     saturn: 0xFAD5A5,
//     uranus: 0x4FD0E7,
//     neptune: 0x4B70DD
// };

// /**
//  * Planet class to represent individual celestial bodies
//  */
// class Planet {
//     constructor(name, data) {
//         this.name = name;
//         this.data = data;
//         this.mesh = null;
//         this.orbitLine = null;
//         this.angle = Math.random() * Math.PI * 2; // Random starting position
//         this.rotationAngle = 0;
//         this.speedMultiplier = 1.0;
//         this.originalScale = 1.0;
//         this.isHovered = false;
        
//         // Create the 3D objects
//         this.createMesh();
//         if (data.distance > 0) {
//             this.createOrbitLine();
//         }
//     }
    
//     /**
//      * Create the planet's 3D mesh
//      */
//     createMesh() {
//         // Create geometry
//         const geometry = new THREE.SphereGeometry(
//             this.data.radius,
//             PLANET_CONFIG.segments,
//             PLANET_CONFIG.segments
//         );
        
//         // Create material
//         let material;
//         if (this.name === 'sun') {
//             // Sun uses emissive material
//             material = new THREE.MeshBasicMaterial({
//                 color: this.data.color,
//                 transparent: false
//             });
//         } else {
//             // Planets use lambert material for realistic lighting
//             material = new THREE.MeshLambertMaterial({
//                 color: this.data.color
//             });
            
//             // Try to load texture
//             if (this.data.texture) {
//                 const textureLoader = new THREE.TextureLoader();
//                 textureLoader.load(
//                     this.data.texture,
//                     (texture) => {
//                         material.map = texture;
//                         material.needsUpdate = true;
//                     },
//                     undefined,
//                     (error) => {
//                         console.warn(`Failed to load texture for ${this.name}:`, error);
//                         // Texture loading failed, keep the base color
//                     }
//                 );
//             }
//         }
        
//         // Create mesh
//         this.mesh = new THREE.Mesh(geometry, material);
//         this.mesh.userData = { 
//             planetName: this.name,
//             planetData: this.data,
//             planet: this
//         };
        
//         // Set initial position
//         if (this.data.distance > 0) {
//             this.mesh.position.set(this.data.distance, 0, 0);
//         }
        
//         this.originalScale = this.mesh.scale.x;
//     }
    
//     /**
//      * Create orbit visualization line
//      */
//     createOrbitLine() {
//         if (this.data.distance <= 0) return;
        
//         const points = [];
//         const segments = 64;
        
//         for (let i = 0; i <= segments; i++) {
//             const angle = (i / segments) * Math.PI * 2;
//             points.push(new THREE.Vector3(
//                 Math.cos(angle) * this.data.distance,
//                 0,
//                 Math.sin(angle) * this.data.distance
//             ));
//         }
        
//         const geometry = new THREE.BufferGeometry().setFromPoints(points);
//         const material = new THREE.LineBasicMaterial({
//             color: PLANET_CONFIG.orbitColor,
//             transparent: true,
//             opacity: PLANET_CONFIG.orbitOpacity
//         });
        
//         this.orbitLine = new THREE.Line(geometry, material);
//     }
    
//     /**
//      * Update planet position and rotation
//      */
//     update(deltaTime, globalSpeedMultiplier = 1.0) {
//         if (!this.mesh) return;
        
//         // Skip sun orbital movement
//         if (this.data.distance > 0) {
//             // Calculate orbital speed (inverse of period for correct direction)
//             const orbitalSpeed = globalSpeedMultiplier * this.speedMultiplier * 
//                                (2 * Math.PI) / (this.data.orbitalPeriod * 365.25);
            
//             // Update orbital angle
//             this.angle += orbitalSpeed * deltaTime;
            
//             // Update position
//             this.mesh.position.x = Math.cos(this.angle) * this.data.distance;
//             this.mesh.position.z = Math.sin(this.angle) * this.data.distance;
//         }
        
//         // Update rotation (all planets rotate)
//         const rotationSpeed = (2 * Math.PI) / Math.abs(this.data.rotationPeriod);
//         this.rotationAngle += rotationSpeed * deltaTime * globalSpeedMultiplier;
        
//         // Apply rotation (negative for retrograde rotation)
//         if (this.data.rotationPeriod < 0) {
//             this.mesh.rotation.y = -this.rotationAngle;
//         } else {
//             this.mesh.rotation.y = this.rotationAngle;
//         }
//     }
    
//     /**
//      * Set planet speed multiplier
//      */
//     setSpeedMultiplier(multiplier) {
//         this.speedMultiplier = MathUtils.clamp(
//             multiplier,
//             PLANET_CONFIG.minSpeedMultiplier,
//             PLANET_CONFIG.maxSpeedMultiplier
//         );
//     }
    
//     /**
//      * Handle hover effect
//      */
//     setHovered(hovered) {
//         if (this.isHovered === hovered) return;
        
//         this.isHovered = hovered;
//         const targetScale = hovered ? 
//             this.originalScale * PLANET_CONFIG.hoverScale : 
//             this.originalScale;
        
//         // Animate scale change
//         if (typeof AnimationUtils !== 'undefined') {
//             AnimationUtils.tween(
//                 this.mesh.scale.x,
//                 targetScale,
//                 200,
//                 AnimationUtils.easeInOutCubic,
//                 (value) => {
//                     this.mesh.scale.setScalar(value);
//                 }
//             );
//         } else {
//             this.mesh.scale.setScalar(targetScale);
//         }
//     }
    
//     /**
//      * Get planet information for tooltips
//      */
//     getInfo() {
//         return {
//             name: this.data.name,
//             description: this.data.description,
//             facts: this.data.facts,
//             distance: this.data.distance,
//             radius: this.data.radius,
//             orbitalPeriod: this.data.orbitalPeriod,
//             rotationPeriod: this.data.rotationPeriod
//         };
//     }
    
//     /**
//      * Dispose of resources
//      */
//     dispose() {
//         if (this.mesh) {
//             ThreeUtils.dispose(this.mesh);
//         }
//         if (this.orbitLine) {
//             ThreeUtils.dispose(this.orbitLine);
//         }
//     }
// }

// /**
//  * Planet manager to handle all planets
//  */
// class PlanetManager {
//     constructor() {
//         this.planets = new Map();
//         this.planetGroup = new THREE.Group();
//         this.orbitGroup = new THREE.Group();
//     }
    
//     /**
//      * Initialize all planets
//      */
//     init() {
//         // Create planets in order
//         const planetOrder = ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
        
//         planetOrder.forEach(planetName => {
//             if (PLANET_DATA[planetName]) {
//                 const planet = new Planet(planetName, PLANET_DATA[planetName]);
//                 this.planets.set(planetName, planet);
                
//                 // Add to groups
//                 this.planetGroup.add(planet.mesh);
//                 if (planet.orbitLine) {
//                     this.orbitGroup.add(planet.orbitLine);
//                 }
//             }
//         });
//     }
    
//     /**
//      * Update all planets
//      */
//     update(deltaTime, globalSpeedMultiplier = 1.0) {
//         this.planets.forEach(planet => {
//             planet.update(deltaTime, globalSpeedMultiplier);
//         });
//     }
    
//     /**
//      * Get planet by name
//      */
//     getPlanet(name) {
//         return this.planets.get(name);
//     }
    
//     /**
//      * Get all planet names
//      */
//     getPlanetNames() {
//         return Array.from(this.planets.keys());
//     }
    
//     /**
//      * Set visibility of orbit lines
//      */
//     setOrbitVisibility(visible) {
//         this.orbitGroup.visible = visible;
//     }
    
//     /**
//      * Dispose of all resources
//      */
//     dispose() {
//         this.planets.forEach(planet => {
//             planet.dispose();
//         });
//         this.planets.clear();
//     }
// }

// // Export for use in other modules
// if (typeof module !== 'undefined' && module.exports) {
//     module.exports = {
//         PLANET_DATA,
//         PLANET_CONFIG,
//         FALLBACK_COLORS,
//         Planet,
//         PlanetManager
//     };
// }
// Planet Data and Configuration for Solar System Simulation

/**
 * Planet data with realistic proportions and characteristics
 * Distances are scaled down for visualization purposes
 * Speeds are relative to Earth's orbital period
 */
const PLANET_DATA = {
    sun: {
        name: 'Sun',
        radius: 2.5,
        distance: 0,
        orbitalPeriod: 0,
        rotationPeriod: 25.4, // days
        color: 0xFDB813,
        texture: null,
        description: 'The Sun is the star at the center of our Solar System. It is a nearly perfect sphere of hot plasma, with internal convective motion that generates a magnetic field.',
        facts: [
            'Mass: 1.989 × 10³⁰ kg',
            'Temperature: ~5,778K surface',
            'Age: ~4.6 billion years',
            'Composition: 73% Hydrogen, 25% Helium'
        ]
    },
    mercury: {
        name: 'Mercury',
        radius: 0.15,
        distance: 8,
        orbitalPeriod: 0.24, // Earth years
        rotationPeriod: 58.6, // days
        color: 0x8C7853,
        texture: 'assets/textures/mercury.jpg',
        description: 'Mercury is the smallest planet in our solar system and the closest to the Sun. It has extreme temperature variations.',
        facts: [
            'Distance from Sun: 57.9 million km',
            'Day length: 176 Earth days',
            'No atmosphere',
            'Temperature range: -173°C to 427°C'
        ]
    },
    venus: {
        name: 'Venus',
        radius: 0.25,
        distance: 12,
        orbitalPeriod: 0.62,
        rotationPeriod: -243, // Retrograde rotation
        color: 0xF7CC7F,
        texture: 'assets/textures/venus.jpg',
        description: 'Venus is the second planet from the Sun and the hottest planet in our solar system due to its thick atmosphere.',
        facts: [
            'Distance from Sun: 108.2 million km',
            'Atmospheric pressure: 92x Earth',
            'Rotates backwards',
            'Surface temperature: 462°C'
        ]
    },
    earth: {
        name: 'Earth',
        radius: 0.26,
        distance: 16,
        orbitalPeriod: 1.0, // Reference point
        rotationPeriod: 1, // days
        color: 0x6B93D6,
        texture: 'assets/textures/earth.jpg',
        description: 'Earth is the third planet from the Sun and the only known planet to support life.',
        facts: [
            'Distance from Sun: 149.6 million km',
            'Atmosphere: 78% Nitrogen, 21% Oxygen',
            '71% of surface covered by water',
            'One natural satellite: Moon'
        ]
    },
    mars: {
        name: 'Mars',
        radius: 0.18,
        distance: 22,
        orbitalPeriod: 1.88,
        rotationPeriod: 1.03,
        color: 0xCD5C5C,
        texture: 'assets/textures/mars.jpg',
        description: 'Mars is the fourth planet from the Sun, known as the Red Planet due to iron oxide on its surface.',
        facts: [
            'Distance from Sun: 227.9 million km',
            'Largest volcano: Olympus Mons',
            'Two moons: Phobos and Deimos',
            'Evidence of ancient water flow'
        ]
    },
    jupiter: {
        name: 'Jupiter',
        radius: 0.8,
        distance: 32,
        orbitalPeriod: 11.86,
        rotationPeriod: 0.41,
        color: 0xD8CA9D,
        texture: 'assets/textures/jupiter.jpg',
        description: 'Jupiter is the largest planet in our solar system, a gas giant with a Great Red Spot storm.',
        facts: [
            'Distance from Sun: 778.5 million km',
            'Mass: 2.5x all other planets combined',
            'Over 80 known moons',
            'Great Red Spot: storm larger than Earth'
        ]
    },
    saturn: {
        name: 'Saturn',
        radius: 0.65,
        distance: 45,
        orbitalPeriod: 29.46,
        rotationPeriod: 0.45,
        color: 0xFAD5A5,
        texture: 'assets/textures/saturn.jpg',
        description: 'Saturn is the sixth planet from the Sun, famous for its spectacular ring system.',
        facts: [
            'Distance from Sun: 1.43 billion km',
            'Density less than water',
            'Prominent ring system',
            'Over 80 known moons, including Titan'
        ]
    },
    uranus: {
        name: 'Uranus',
        radius: 0.35,
        distance: 58,
        orbitalPeriod: 84.01,
        rotationPeriod: -0.72, // Retrograde rotation
        color: 0x4FD0E7,
        texture: 'assets/textures/uranus.jpg',
        description: 'Uranus is an ice giant that rotates on its side, likely due to an ancient collision.',
        facts: [
            'Distance from Sun: 2.87 billion km',
            'Rotates on its side (98° tilt)',
            'Made of water, methane, and ammonia ices',
            '27 known moons'
        ]
    },
    neptune: {
        name: 'Neptune',
        radius: 0.32,
        distance: 68,
        orbitalPeriod: 164.8,
        rotationPeriod: 0.67,
        color: 0x4B70DD,
        texture: 'assets/textures/neptune.jpg',
        description: 'Neptune is the eighth and outermost planet in our solar system, known for its intense winds.',
        facts: [
            'Distance from Sun: 4.5 billion km',
            'Fastest winds in solar system: 2,100 km/h',
            'Deep blue color from methane',
            '14 known moons, largest is Triton'
        ]
    }
};

/**
 * Planet configuration settings
 */
const PLANET_CONFIG = {
    // Rendering settings
    segments: 32, // Sphere geometry segments
    showOrbits: true,
    showLabels: true,
    
    // Animation settings
    defaultSpeedMultiplier: 1.0,
    maxSpeedMultiplier: 10.0,
    minSpeedMultiplier: 0.0,
    
    // Visual settings
    orbitOpacity: 0.3,
    orbitColor: 0x444444,
    
    // Interaction settings
    hoverScale: 1.2,
    clickScale: 1.5,
    
    // Performance settings
    maxDistance: 100, // Maximum render distance
    lodLevels: {
        high: { distance: 30, segments: 32 },
        medium: { distance: 60, segments: 16 },
        low: { distance: 100, segments: 8 }
    }
};

/**
 * Texture fallback colors for when textures fail to load
 */
const FALLBACK_COLORS = {
    sun: 0xFDB813,
    mercury: 0x8C7853,
    venus: 0xF7CC7F,
    earth: 0x6B93D6,
    mars: 0xCD5C5C,
    jupiter: 0xD8CA9D,
    saturn: 0xFAD5A5,
    uranus: 0x4FD0E7,
    neptune: 0x4B70DD
};

/**
 * Planet class to represent individual celestial bodies
 */
class Planet {
    constructor(name, data) {
        this.name = name;
        this.data = data;
        this.mesh = null;
        this.orbitLine = null;
        this.angle = Math.random() * Math.PI * 2; // Random starting position
        this.rotationAngle = 0;
        this.speedMultiplier = 1.0;
        this.rotationSpeedMultiplier = 1.0; // ADDED: Separate rotation speed control
        this.originalScale = 1.0;
        this.isHovered = false;
        this.isPaused = false; // ADDED: Individual pause state
        this.originalSpeed = data.orbitalPeriod || 1.0; // ADDED: Store original speed
        
        // Create the 3D objects
        this.createMesh();
        if (data.distance > 0) {
            this.createOrbitLine();
        }
    }
    
    /**
     * Create the planet's 3D mesh
     */
    // createMesh() {
    //     // Create geometry with LOD support
    //     const segments = this.getLODSegments();
    //     const geometry = new THREE.SphereGeometry(
    //         this.data.radius,
    //         segments,
    //         segments
    //     );
        
    //     // Create material
    //     let material;
    //     if (this.name === 'sun') {
    //         // Sun uses emissive material
    //         material = new THREE.MeshBasicMaterial({
    //             color: this.data.color,
    //             transparent: false
    //         });
    //     } else {
    //         // Planets use lambert material for realistic lighting
    //         material = new THREE.MeshLambertMaterial({
    //             color: this.data.color
    //         });
            
    //         // Try to load texture with error handling
    //         if (this.data.texture) {
    //             this.loadTexture(material);
    //         }
    //     }
        
    //     // Create mesh
    //     this.mesh = new THREE.Mesh(geometry, material);
    //     this.mesh.userData = { 
    //         planetName: this.name,
    //         planetData: this.data,
    //         planet: this,
    //         // ADDED: Additional data for controls compatibility
    //         name: this.name,
    //         orbitSpeed: this.data.orbitalPeriod || 1.0,
    //         rotationSpeed: this.data.rotationPeriod || 1.0
    //     };
        
    //     // Set initial position
    //     if (this.data.distance > 0) {
    //         this.mesh.position.set(this.data.distance, 0, 0);
    //     }
        
    //     this.originalScale = this.mesh.scale.x;
        
    //     // ADDED: Enable shadow casting and receiving
    //     this.mesh.castShadow = true;
    //     this.mesh.receiveShadow = true;
    // }
    // In your planets.js file, update the createMesh method:
createMesh() {
    // Create geometry with LOD support
    const segments = this.getLODSegments();
    const geometry = new THREE.SphereGeometry(
        this.data.radius,
        segments,
        segments
    );
    
    // Create material
    let material;
    if (this.name === 'sun') {
        // FIXED: Use only color property for MeshBasicMaterial
        material = new THREE.MeshBasicMaterial({
            color: this.data.color
            // Removed emissive and emissiveIntensity
        });
    } else {
        // Planets use lambert material for realistic lighting
        material = new THREE.MeshLambertMaterial({
            color: this.data.color
        });
        
        // Try to load texture with error handling
        if (this.data.texture) {
            this.loadTexture(material);
        }
    }
    
}

    
    /**
     * ADDED: Load texture with better error handling
     */
    loadTexture(material) {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(
            this.data.texture,
            (texture) => {
                // Texture loaded successfully
                material.map = texture;
                material.needsUpdate = true;
                console.log(`Texture loaded for ${this.name}`);
            },
            (progress) => {
                // Loading progress
                console.log(`Loading texture for ${this.name}: ${(progress.loaded / progress.total * 100)}%`);
            },
            (error) => {
                console.warn(`Failed to load texture for ${this.name}:`, error);
                // Keep the base color as fallback
                material.color.setHex(FALLBACK_COLORS[this.name.toLowerCase()] || this.data.color);
            }
        );
    }
    
    /**
     * ADDED: Get LOD segments based on distance
     */
    getLODSegments() {
        // For now, return default segments
        // Can be enhanced with camera distance calculation
        return PLANET_CONFIG.segments;
    }
    
    /**
     * Create orbit visualization line
     */
    createOrbitLine() {
        if (this.data.distance <= 0) return;
        
        const points = [];
        const segments = 64;
        
        for (let i = 0; i <= segments; i++) {
            const angle = (i / segments) * Math.PI * 2;
            points.push(new THREE.Vector3(
                Math.cos(angle) * this.data.distance,
                0,
                Math.sin(angle) * this.data.distance
            ));
        }
        
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        const material = new THREE.LineBasicMaterial({
            color: PLANET_CONFIG.orbitColor,
            transparent: true,
            opacity: PLANET_CONFIG.orbitOpacity
        });
        
        this.orbitLine = new THREE.Line(geometry, material);
        this.orbitLine.userData = {
            planetName: this.name,
            type: 'orbit'
        };
    }
    
    /**
     * Update planet position and rotation
     */
    update(deltaTime, globalSpeedMultiplier = 1.0) {
        if (!this.mesh || this.isPaused) return;
        
        // Skip sun orbital movement
        if (this.data.distance > 0) {
            // Calculate orbital speed (inverse of period for correct direction)
            const orbitalSpeed = globalSpeedMultiplier * this.speedMultiplier * 
                               (2 * Math.PI) / (this.data.orbitalPeriod * 365.25);
            
            // Update orbital angle
            this.angle += orbitalSpeed * deltaTime;
            
            // Update position
            this.mesh.position.x = Math.cos(this.angle) * this.data.distance;
            this.mesh.position.z = Math.sin(this.angle) * this.data.distance;
        }
        
        // Update rotation (all planets rotate)
        const rotationSpeed = (2 * Math.PI) / Math.abs(this.data.rotationPeriod);
        this.rotationAngle += rotationSpeed * deltaTime * globalSpeedMultiplier * this.rotationSpeedMultiplier;
        
        // Apply rotation (negative for retrograde rotation)
        if (this.data.rotationPeriod < 0) {
            this.mesh.rotation.y = -this.rotationAngle;
        } else {
            this.mesh.rotation.y = this.rotationAngle;
        }
    }
    
    /**
     * Set planet speed multiplier
     */
    setSpeedMultiplier(multiplier) {
        this.speedMultiplier = this.clampValue(
            multiplier,
            PLANET_CONFIG.minSpeedMultiplier,
            PLANET_CONFIG.maxSpeedMultiplier
        );
        
        // ADDED: Update userData for controls compatibility
        this.mesh.userData.orbitSpeed = this.speedMultiplier;
    }
    
    /**
     * ADDED: Set planet rotation speed multiplier
     */
    setRotationSpeedMultiplier(multiplier) {
        this.rotationSpeedMultiplier = this.clampValue(
            multiplier,
            PLANET_CONFIG.minSpeedMultiplier,
            PLANET_CONFIG.maxSpeedMultiplier
        );
        
        // Update userData for controls compatibility
        this.mesh.userData.rotationSpeed = this.rotationSpeedMultiplier;
    }
    
    /**
     * ADDED: Pause/unpause planet
     */
    setPaused(paused) {
        this.isPaused = paused;
    }
    
    /**
     * ADDED: Toggle pause state
     */
    togglePause() {
        this.isPaused = !this.isPaused;
        return this.isPaused;
    }
    
    /**
     * ADDED: Reset planet to default state
     */
    reset() {
        this.speedMultiplier = PLANET_CONFIG.defaultSpeedMultiplier;
        this.rotationSpeedMultiplier = PLANET_CONFIG.defaultSpeedMultiplier;
        this.isPaused = false;
        this.angle = Math.random() * Math.PI * 2;
        this.rotationAngle = 0;
        
        // Reset scale
        this.mesh.scale.setScalar(this.originalScale);
        this.isHovered = false;
        
        // Update userData
        this.mesh.userData.orbitSpeed = this.speedMultiplier;
        this.mesh.userData.rotationSpeed = this.rotationSpeedMultiplier;
    }
    
    /**
     * ADDED: Utility function to clamp values
     */
    clampValue(value, min, max) {
        return Math.min(Math.max(value, min), max);
    }
    
    /**
     * Handle hover effect
     */
    setHovered(hovered) {
        if (this.isHovered === hovered) return;
        
        this.isHovered = hovered;
        const targetScale = hovered ? 
            this.originalScale * PLANET_CONFIG.hoverScale : 
            this.originalScale;
        
        // Animate scale change
        if (typeof AnimationUtils !== 'undefined' && AnimationUtils.tween) {
            AnimationUtils.tween(
                this.mesh.scale.x,
                targetScale,
                200,
                AnimationUtils.easeInOutCubic,
                (value) => {
                    this.mesh.scale.setScalar(value);
                }
            );
        } else {
            // Fallback to immediate scale change
            this.mesh.scale.setScalar(targetScale);
        }
    }
    
    /**
     * ADDED: Handle click effect
     */
    setClicked(clicked) {
        const targetScale = clicked ? 
            this.originalScale * PLANET_CONFIG.clickScale : 
            this.originalScale;
        
        this.mesh.scale.setScalar(targetScale);
        
        // Auto-reset after a short time
        if (clicked) {
            setTimeout(() => {
                this.mesh.scale.setScalar(this.originalScale);
            }, 300);
        }
    }
    
    /**
     * Get planet information for tooltips
     */
    getInfo() {
        return {
            name: this.data.name,
            description: this.data.description,
            facts: this.data.facts,
            distance: this.data.distance,
            radius: this.data.radius,
            orbitalPeriod: this.data.orbitalPeriod,
            rotationPeriod: this.data.rotationPeriod,
            currentSpeed: this.speedMultiplier,
            currentRotationSpeed: this.rotationSpeedMultiplier,
            isPaused: this.isPaused
        };
    }
    
    /**
     * ADDED: Get current state for controls
     */
    getState() {
        return {
            name: this.name,
            orbitSpeed: this.speedMultiplier,
            rotationSpeed: this.rotationSpeedMultiplier,
            isPaused: this.isPaused,
            position: {
                x: this.mesh.position.x,
                y: this.mesh.position.y,
                z: this.mesh.position.z
            },
            rotation: this.mesh.rotation.y
        };
    }
    
    /**
     * ADDED: Set state from controls
     */
    setState(state) {
        if (state.orbitSpeed !== undefined) {
            this.setSpeedMultiplier(state.orbitSpeed);
        }
        if (state.rotationSpeed !== undefined) {
            this.setRotationSpeedMultiplier(state.rotationSpeed);
        }
        if (state.isPaused !== undefined) {
            this.setPaused(state.isPaused);
        }
    }
    
    /**
     * Dispose of resources
     */
    dispose() {
        if (this.mesh) {
            if (this.mesh.geometry) {
                this.mesh.geometry.dispose();
            }
            if (this.mesh.material) {
                if (this.mesh.material.map) {
                    this.mesh.material.map.dispose();
                }
                this.mesh.material.dispose();
            }
        }
        if (this.orbitLine) {
            if (this.orbitLine.geometry) {
                this.orbitLine.geometry.dispose();
            }
            if (this.orbitLine.material) {
                this.orbitLine.material.dispose();
            }
        }
    }
}

/**
 * Planet manager to handle all planets
 */
class PlanetManager {
    constructor() {
        this.planets = new Map();
        this.planetGroup = new THREE.Group();
        this.orbitGroup = new THREE.Group();
        this.globalSpeedMultiplier = 1.0; // ADDED: Global speed control
        this.isPaused = false; // ADDED: Global pause state
    }
    
    /**
     * Initialize all planets
     */
    init() {
        // Create planets in order
        const planetOrder = ['sun', 'mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune'];
        
        planetOrder.forEach(planetName => {
            if (PLANET_DATA[planetName]) {
                const planet = new Planet(planetName, PLANET_DATA[planetName]);
                this.planets.set(planetName, planet);
                
                // Add to groups
                this.planetGroup.add(planet.mesh);
                if (planet.orbitLine) {
                    this.orbitGroup.add(planet.orbitLine);
                }
            }
        });
        
        console.log(`Initialized ${this.planets.size} planets`);
    }
    
    /**
     * Update all planets
     */
    update(deltaTime, externalSpeedMultiplier = 1.0) {
        const finalSpeedMultiplier = this.isPaused ? 0 : this.globalSpeedMultiplier * externalSpeedMultiplier;
        
        this.planets.forEach(planet => {
            planet.update(deltaTime, finalSpeedMultiplier);
        });
    }
    
    /**
     * Get planet by name
     */
    getPlanet(name) {
        return this.planets.get(name.toLowerCase());
    }
    
    /**
     * Get all planet names
     */
    getPlanetNames() {
        return Array.from(this.planets.keys());
    }
    
    /**
     * ADDED: Get all planets as array
     */
    getAllPlanets() {
        return Array.from(this.planets.values());
    }
    
    /**
     * ADDED: Set global speed multiplier
     */
    setGlobalSpeed(speed) {
        this.globalSpeedMultiplier = Math.max(0, Math.min(10, speed));
    }
    
    /**
     * ADDED: Get global speed multiplier
     */
    getGlobalSpeed() {
        return this.globalSpeedMultiplier;
    }
    
    /**
     * ADDED: Pause/unpause all planets
     */
    setPaused(paused) {
        this.isPaused = paused;
    }
    
    /**
     * ADDED: Toggle global pause
     */
    togglePause() {
        this.isPaused = !this.isPaused;
        return this.isPaused;
    }
    
    /**
     * ADDED: Reset all planets
     */
    resetAll() {
        this.globalSpeedMultiplier = 1.0;
        this.isPaused = false;
        this.planets.forEach(planet => {
            planet.reset();
        });
    }
    
    /**
     * ADDED: Update individual planet speed (for controls compatibility)
     */
    updatePlanetSpeed(planetName, type, speed) {
        const planet = this.getPlanet(planetName);
        if (planet) {
            if (type === 'orbit') {
                planet.setSpeedMultiplier(speed);
            } else if (type === 'rotation') {
                planet.setRotationSpeedMultiplier(speed);
            }
            return true;
        }
        return false;
    }
    
    /**
     * Set visibility of orbit lines
     */
    setOrbitVisibility(visible) {
        this.orbitGroup.visible = visible;
    }
    
    /**
     * ADDED: Get visibility of orbit lines
     */
    getOrbitVisibility() {
        return this.orbitGroup.visible;
    }
    
    /**
     * ADDED: Toggle orbit visibility
     */
    toggleOrbitVisibility() {
        this.orbitGroup.visible = !this.orbitGroup.visible;
        return this.orbitGroup.visible;
    }
    
    /**
     * ADDED: Get planet statistics
     */
    getStatistics() {
        const stats = {
            totalPlanets: this.planets.size,
            activePlanets: 0,
            pausedPlanets: 0,
            averageSpeed: 0,
            globalSpeed: this.globalSpeedMultiplier,
            isPaused: this.isPaused
        };
        
        let totalSpeed = 0;
        this.planets.forEach(planet => {
            if (planet.isPaused) {
                stats.pausedPlanets++;
            } else {
                stats.activePlanets++;
            }
            totalSpeed += planet.speedMultiplier;
        });
        
        stats.averageSpeed = this.planets.size > 0 ? totalSpeed / this.planets.size : 0;
        
        return stats;
    }
    
    /**
     * ADDED: Export planet states
     */
    exportStates() {
        const states = {};
        this.planets.forEach((planet, name) => {
            states[name] = planet.getState();
        });
        return {
            planetStates: states,
            globalSpeed: this.globalSpeedMultiplier,
            isPaused: this.isPaused,
            orbitVisibility: this.orbitGroup.visible
        };
    }
    
    /**
     * ADDED: Import planet states
     */
    importStates(data) {
        if (data.globalSpeed !== undefined) {
            this.setGlobalSpeed(data.globalSpeed);
        }
        if (data.isPaused !== undefined) {
            this.setPaused(data.isPaused);
        }
        if (data.orbitVisibility !== undefined) {
            this.setOrbitVisibility(data.orbitVisibility);
        }
        if (data.planetStates) {
            Object.entries(data.planetStates).forEach(([name, state]) => {
                const planet = this.getPlanet(name);
                if (planet) {
                    planet.setState(state);
                }
            });
        }
    }
    
    /**
     * ADDED: Handle mouse interactions
     */
    handleMouseInteraction(mouse, camera, type = 'hover') {
        const raycaster = new THREE.Raycaster();
        raycaster.setFromCamera(mouse, camera);
        
        const intersects = raycaster.intersectObjects(this.planetGroup.children);
        
        // Reset all hover states
        if (type === 'hover') {
            this.planets.forEach(planet => {
                planet.setHovered(false);
            });
        }
        
        if (intersects.length > 0) {
            const intersectedObject = intersects[0].object;
            const planetData = intersectedObject.userData;
            
            if (planetData && planetData.planet) {
                if (type === 'hover') {
                    planetData.planet.setHovered(true);
                } else if (type === 'click') {
                    planetData.planet.setClicked(true);
                }
                return planetData.planet;
            }
        }
        
        return null;
    }
    
    /**
     * Dispose of all resources
     */
    dispose() {
        this.planets.forEach(planet => {
            planet.dispose();
        });
        this.planets.clear();
        
        // Dispose of groups
        if (this.planetGroup) {
            this.planetGroup.clear();
        }
        if (this.orbitGroup) {
            this.orbitGroup.clear();
        }
    }
}

// ADDED: Utility functions for external access
const PlanetUtils = {
    /**
     * Get planet data by name
     */
    getPlanetData(name) {
        return PLANET_DATA[name.toLowerCase()];
    },
    
    /**
     * Get all planet data
     */
    getAllPlanetData() {
        return PLANET_DATA;
    },
    
    /**
     * Get planet configuration
     */
    getConfig() {
        return PLANET_CONFIG;
    },
    
    /**
     * Get fallback colors
     */
    getFallbackColors() {
        return FALLBACK_COLORS;
    },
    
    /**
     * Validate planet data
     */
    validatePlanetData(data) {
        const required = ['name', 'radius', 'distance', 'orbitalPeriod', 'rotationPeriod', 'color'];
        return required.every(prop => data.hasOwnProperty(prop));
    }
};

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        PLANET_DATA,
        PLANET_CONFIG,
        FALLBACK_COLORS,
        Planet,
        PlanetManager,
        PlanetUtils
    };
}

// ADDED: ES6 module exports for modern usage
if (typeof window !== 'undefined') {
    window.PLANET_DATA = PLANET_DATA;
    window.PLANET_CONFIG = PLANET_CONFIG;
    window.Planet = Planet;
    window.PlanetManager = PlanetManager;
    window.PlanetUtils = PlanetUtils;
}
