 // Éléments DOM
        const homeScreen = document.getElementById('homeScreen');
        const celebrationScreen = document.getElementById('celebrationScreen');
        const thankYouScreen = document.getElementById('thankYouScreen');
        const countdownElement = document.getElementById('countdown');
        const startBtn = document.getElementById('startBtn');
        const restartBtn = document.getElementById('restartBtn');
        const backToStartBtn = document.getElementById('backToStartBtn');
        const photoContainer = document.getElementById('photoContainer');
        const galleryControls = document.getElementById('galleryControls');
        const wishesContainer = document.getElementById('wishesContainer');
        const birthdayAudio = document.getElementById('birthdayAudio');
        
        // Éléments audio pour les explosions
        const explosionSounds = [
            document.getElementById('explosionSound1'),
            document.getElementById('explosionSound2'),
            document.getElementById('explosionSound3'),
            document.getElementById('explosionSound4')
        ];

        // Variables pour le compte à rebours
        let countdownValue = "";
        let countdownInterval;
        
        // Variables pour la galerie
        let currentPhotoIndex = 0;
        let currentWishIndex = 0;
        
        // Variables de contrôle
        let musicStarted = false;
        let fireworksActive = false;
        let photoInterval;
        let wishesInterval;
        let fireworksInterval;
        
        // Liste des souhaits d'anniversaire
        const birthdayWishes = [
    							   "🎊Je ne sais pas parlé mais voici quelques mots pour te souhaiter en ce jour si spécial: 💝 ",
            "🎂 Que tous tes souhaits se réalisent ! 🎂",
            "✨ Une journée remplie de bonheur et de succès ! ✨",
            "🌟 Qui t'apporte du joie et du santé ! 🌟",
            "🎁 Plein de bonnes surprises t'attendent ! 🎁",
            "💫 Que chaque jour soit une nouvelle aventure ! 💫",
            "🥳 Profite de chaque instant précieux ! 🥳",
            "🎊 Que la chance te sourie toute l'année ! 🎊",
            "🚀 Que tes projets prennent leur envol ! 🚀",
            "🌈 Que ton chemin soit coloré de bonheur ! 🌈",
            "👼Soit bénis 👼! et Soit heureuse pour toujours! 💖🥹😽"
        ];
        
        // URLs des photos (remplacez par vos propres URLs)
        const photoUrls = [
            'img_0.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            'img_1.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            'img_2.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            'img_3.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            'img_4.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            'img_5.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            'img_6.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            'img_7.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            'img_8.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            'img_9.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            'img_10.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            'img_11.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            'img_12.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            'img_13.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
            'img_14.jpg?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80',
        ];
        
        // Fonction pour jouer un son d'explosion aléatoire
        function playExplosionSound() {
            if (!fireworksActive) return;
            
            try {
                const randomSound = explosionSounds[Math.floor(Math.random() * explosionSounds.length)];
                if (randomSound) {
                    // Créer un clone pour pouvoir jouer plusieurs sons en même temps
                    const clone = randomSound.cloneNode();
                    
                    // VOLUME AUGMENTÉ - de 0.3 à 0.8
                    clone.volume = 0.8;
                    
                    // Essayer de jouer le son
                    const playPromise = clone.play();
                    
                    if (playPromise !== undefined) {
                        playPromise.catch(error => {
                            console.log("Lecture audio bloquée, tentative de déblocage...");
                            // Tentative de déblocage avec un geste utilisateur simulé
                            document.body.click();
                        });
                    }
                    
                    // Supprimer le clone après la lecture
                    setTimeout(() => {
                        clone.remove();
                    }, 4000);
                }
            } catch (error) {
                console.log("Erreur de son d'explosion:", error);
            }
        }

        // Initialiser la galerie de souhaits
        function initWishesGallery() {
            wishesContainer.innerHTML = '';
            
            birthdayWishes.forEach((wish, index) => {
                const wishDiv = document.createElement('div');
                wishDiv.className = 'wish';
                wishDiv.textContent = wish;
                wishDiv.style.background = index % 2 === 0 
                    ? 'linear-gradient(45deg, rgba(255,105,180,0.3), rgba(255,165,0,0.3))'
                    : 'linear-gradient(45deg, rgba(30,144,255,0.3), rgba(138,43,226,0.3))';
                wishesContainer.appendChild(wishDiv);
            });
        }
        
        // Initialiser la galerie de photos
        function initPhotoGallery() {
            photoContainer.innerHTML = '';
            galleryControls.innerHTML = '';
            
            photoUrls.forEach((url, index) => {
                const photoDiv = document.createElement('div');
                photoDiv.className = 'photo';
                photoDiv.style.backgroundImage = `url(${url})`;
                photoContainer.appendChild(photoDiv);
                
                const controlBtn = document.createElement('button');
                controlBtn.className = `gallery-btn ${index === 0 ? 'active' : ''}`;
                controlBtn.addEventListener('click', () => showPhoto(index));
                galleryControls.appendChild(controlBtn);
            });
        }
        
        // Afficher une photo spécifique
        function showPhoto(index) {
            currentPhotoIndex = index;
            photoContainer.style.transform = `translateX(-${index * 100}%)`;
            
            document.querySelectorAll('.gallery-btn').forEach((btn, i) => {
                btn.classList.toggle('active', i === index);
            });
        }
        
        // Afficher un souhait spécifique
        function showWish(index) {
            currentWishIndex = index;
            wishesContainer.style.transform = `translateX(-${index * 100}%)`;
        }
        
        // Démarrer le diaporama automatique des photos
        function startPhotoSlideshow() {
            photoInterval = setInterval(() => {
                currentPhotoIndex = (currentPhotoIndex + 1) % photoUrls.length;
                showPhoto(currentPhotoIndex);
            }, 6000);
        }
        
        // Démarrer le diaporama automatique des souhaits
        function startWishesSlideshow() {
            wishesInterval = setInterval(() => {
                currentWishIndex = (currentWishIndex + 1) % birthdayWishes.length;
                showWish(currentWishIndex);
            }, 6000);
        }
        
        // Compte à rebours
        function startCountdown() {
            startBtn.disabled = true;
            countdownValue = 5;
            countdownElement.textContent = countdownValue;
            
            countdownInterval = setInterval(() => {
                countdownValue--;
                countdownElement.textContent = countdownValue;
                
                if (countdownValue === 0) {
                    clearInterval(countdownInterval);
                    
                    // Transition vers l'écran de célébration
                    homeScreen.style.opacity = '0';
                    homeScreen.style.pointerEvents = 'none';
                    
                    setTimeout(() => {
                        celebrationScreen.style.opacity = '1';
                        celebrationScreen.style.pointerEvents = 'all';
                        
                        // Démarrer les feux d'artifice SANS la musique
                        fireworksActive = true;
                        startFireworks();
                        startPhotoSlideshow();
                        startWishesSlideshow();
                      
                        // Démarrer la musique après 2 secondes (quand les premiers feux explosent)
                        setTimeout(() => {
                            musicStarted = true;
                            
                            // VOLUME DE LA MUSIQUE RÉDUIT pour laisser place aux explosions
                            birthdayAudio.volume = 0.6;
                            birthdayAudio.play().catch(e => {
                                console.log("Lecture audio bloquée, cliquer pour activer");
                                // Ajouter un bouton de déblocage si nécessaire
                            });
                            
                            // Quand la musique se termine, montrer l'écran de remerciement
                            birthdayAudio.onended = showThankYouScreen;
                        }, 2000);
                        
                    }, 1000);
                }
            }, 1300);
        }
        
        // Afficher l'écran de remerciement
        function showThankYouScreen() {
            celebrationScreen.style.opacity = '0';
            celebrationScreen.style.pointerEvents = 'none';
            
            setTimeout(() => {
                thankYouScreen.style.opacity = '1';
                thankYouScreen.style.pointerEvents = 'all';
            }, 1000);
        }
        
        // Système de feux d'artifice
        const canvas = document.getElementById('fireworksCanvas');
        const ctx = canvas.getContext('2d');
        
        let fireworks = [];
        let particles = [];
        
        // Ajuster la taille du canvas
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);
        
        // Classes pour les feux d'artifice
        class Firework {
            constructor(x, y, targetX, targetY) {
                this.x = x;
                this.y = y;
                this.startX = x;
                this.startY = y;
                this.targetX = targetX;
                this.targetY = targetY;
                this.distance = Math.hypot(targetX - x, targetY - y);
                this.traveled = 0;
                this.speed = 8 + Math.random() * 4;
                this.angle = Math.atan2(targetY - y, targetX - x);
                this.velocity = {
                    x: Math.cos(this.angle) * this.speed,
                    y: Math.sin(this.angle) * this.speed
                };
                this.gravity = 0.02;
                this.hue = Math.floor(Math.random() * 360);
                this.brightness = Math.floor(50 + Math.random() * 20);
                this.alpha = 1;
                this.trail = [];
                this.trailLength = 5;
                this.hasExploded = false;
            }
            
            update() {
                this.trail.push({x: this.x, y: this.y});
                if (this.trail.length > this.trailLength) {
                    this.trail.shift();
                }
                
                this.velocity.y += this.gravity;
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                
                this.traveled = Math.hypot(this.x - this.startX, this.y - this.startY);
                
                if (this.traveled >= this.distance && !this.hasExploded) {
                    this.explode();
                    this.hasExploded = true;
                    return true;
                }
                
                return false;
            }
            
            explode() {
                // Jouer le son d'explosion
                playExplosionSound();
                
                const particleCount = 80 + Math.floor(Math.random() * 50);
                const power = 3 + Math.random() * 3;
                
                for (let i = 0; i < particleCount; i++) {
                    const angle = Math.random() * Math.PI * 2;
                    const velocity = Math.random() * power;
                    
                    particles.push(new Particle(
                        this.x,
                        this.y,
                        Math.cos(angle) * velocity,
                        Math.sin(angle) * velocity,
                        this.hue,
                        this.brightness
                    ));
                }
                
                createShockwave(this.x, this.y);
            }
            
            draw() {
                ctx.beginPath();
                ctx.moveTo(this.trail[0].x, this.trail[0].y);
                for (let i = 1; i < this.trail.length; i++) {
                    ctx.lineTo(this.trail[i].x, this.trail[i].y);
                }
                ctx.strokeStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
                ctx.lineWidth = 2;
                ctx.stroke();
                
                ctx.beginPath();
                ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
                ctx.fill();
            }
        }
        
        class Particle {
            constructor(x, y, vx, vy, hue, brightness) {
                this.x = x;
                this.y = y;
                this.velocity = {
                    x: vx,
                    y: vy
                };
                this.gravity = 0.05;
                this.resistance = 0.98;
                this.hue = hue;
                this.brightness = brightness;
                this.alpha = 1;
                this.decay = Math.random() * 0.02 + 0.005;
                this.size = Math.random() * 2 + 1;
            }
            
            update() {
                this.velocity.x *= this.resistance;
                this.velocity.y *= this.resistance;
                this.velocity.y += this.gravity;
                
                this.x += this.velocity.x;
                this.y += this.velocity.y;
                
                this.alpha -= this.decay;
                
                return this.alpha > 0;
            }
            
            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${this.hue}, 100%, ${this.brightness}%, ${this.alpha})`;
                ctx.fill();
            }
        }
        
        function createShockwave(x, y) {
            for (let i = 0; i < 10; i++) {
                const angle = Math.random() * Math.PI * 2;
                const distance = 5 + Math.random() * 15;
                
                particles.push(new Particle(
                    x + Math.cos(angle) * distance,
                    y + Math.sin(angle) * distance,
                    0, 0,
                    Math.floor(Math.random() * 360),
                    100
                ));
            }
        }
        
        function createFirework(startX, startY, targetX, targetY) {
            fireworks.push(new Firework(startX, startY, targetX, targetY));
        }
        
        function createRandomFirework() {
            const startX = canvas.width / 2;
            const startY = canvas.height;
            const targetX = Math.random() * canvas.width;
            const targetY = Math.random() * canvas.height * 0.7;
            
            createFirework(startX, startY, targetX, targetY);
        }
        
        function createSpecialFirework() {
            const startX = canvas.width / 2;
            const startY = canvas.height;
            const targetX = Math.random() * canvas.width;
            const targetY = Math.random() * canvas.height * 0.6;
            
            const firework = new Firework(startX, startY, targetX, targetY);
            firework.hue = Math.floor(Math.random() * 360);
            fireworks.push(firework);
            
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    const angle = (Math.PI * 2 / 3) * i;
                    const distance = 30;
                    const additionalFirework = new Firework(
                        startX, startY,
                        targetX + Math.cos(angle) * distance,
                        targetY + Math.sin(angle) * distance
                    );
                    additionalFirework.hue = firework.hue;
                    fireworks.push(additionalFirework);
                }, 100 * i);
            }
        }
        
        function animate() {
            ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            
            for (let i = fireworks.length - 1; i >= 0; i--) {
                if (fireworks[i].update()) {
                    fireworks.splice(i, 1);
                } else {
                    fireworks[i].draw();
                }
            }
            
            for (let i = particles.length - 1; i >= 0; i--) {
                if (particles[i].update()) {
                    particles[i].draw();
                } else {
                    particles.splice(i, 1);
                }
            }
            
            requestAnimationFrame(animate);
        }
        
        function startFireworks() {
            fireworksActive = true;
            
            // Lancer plusieurs feux d'artifice au début
            for (let i = 0; i < 7; i++) {
                setTimeout(createRandomFirework, i * 300);
            }
            
            // Continuer avec des feux aléatoires
            fireworksInterval = setInterval(() => {
                if (Math.random() < 0.7) {
                    createRandomFirework();
                } else {
                    createSpecialFirework();
                }
            }, 800);
            
            // Arrêter après 30 secondes
            setTimeout(() => {
                clearInterval(fireworksInterval);
                fireworksActive = false;
            }, 200000);
        }
        
        // Réinitialiser tout
        function resetAll() {
            // Arrêter l'audio
            birthdayAudio.pause();
            birthdayAudio.currentTime = 0;
            birthdayAudio.onended = null;
            
            // Arrêter les intervalles
            if (countdownInterval) clearInterval(countdownInterval);
            if (photoInterval) clearInterval(photoInterval);
            if (wishesInterval) clearInterval(wishesInterval);
            if (fireworksInterval) clearInterval(fireworksInterval);
            
            // Réinitialiser les variables
            musicStarted = false;
            fireworksActive = false;
            currentPhotoIndex = 0;
            currentWishIndex = 0;
            
            // Réinitialiser les galeries
            showPhoto(0);
            showWish(0);
            
            // Vider les feux d'artifice
            fireworks = [];
            particles = [];
        }
        
        // Événements
        startBtn.addEventListener('click', startCountdown);
        
        restartBtn.addEventListener('click', () => {
            resetAll();
            celebrationScreen.style.opacity = '0';
            celebrationScreen.style.pointerEvents = 'none';
            
            setTimeout(() => {
                homeScreen.style.opacity = '1';
                homeScreen.style.pointerEvents = 'all';
                startBtn.disabled = false;
                countdownElement.textContent = '10';
            }, 500);
        });
        
        backToStartBtn.addEventListener('click', () => {
            resetAll();
            thankYouScreen.style.opacity = '0';
            thankYouScreen.style.pointerEvents = 'none';
            
            setTimeout(() => {
                homeScreen.style.opacity = '1';
                homeScreen.style.pointerEvents = 'all';
                startBtn.disabled = false;
                countdownElement.textContent = '10';
            }, 500);
        });
        
        // Initialiser les galeries et démarrer l'animation
        initWishesGallery();
        initPhotoGallery();
        animate();