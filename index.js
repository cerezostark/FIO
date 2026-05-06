document.addEventListener('DOMContentLoaded', () => {
    const audio = document.getElementById('song');
    const loader = document.querySelector('.loader');
    const lyrics = document.querySelectorAll('.lyric-line');
  
    // Array con los tiempos en segundos para cada línea de la letra
    const lyricTimes = [

    12.48, // "Llevo tanto tiempo"
    14.95, // "Soñando con verte"
    17.50, // "Haciéndome el fuerte"
    19.72, // "para no llamarte más"
    22.40, // "Ya van cuatro veces"
    25, // "No he tenido suerte"
    27.21, // "Y aún espero que vengas a cenar"
    31.05, // "Si te quieres divertir"
    33.5, // "O quieres ya no sufrir"
    36.1, // "Ven te invito"
    37.2, // "porrito y a dormir"
    41, // "Sal de la desilusión"
    43.60, // "Pósate en mi colchón"
    46, // "Ven te canto una bonita canción"
    49.40, // "Que soñándote canté"
    54.80, // "Tu carita dibujé"
    59.80, // "Si vienes aquí estaré"
    64.7, // "Pa' siempre te cuidaré"
    72,
    ];

    // Verifica que el audio y el loader existan
    if (!audio || !loader) return;

    const hideLoader = () => {
        loader.style.display = 'none';
        document.body.classList.remove("not-loaded");
    };

    audio.addEventListener('loadeddata', hideLoader); // Cuando los datos iniciales están cargados
    audio.addEventListener('canplay', hideLoader); // Cuando puede reproducirse
    audio.addEventListener('canplaythrough', hideLoader); // Cuando puede reproducirse sin interrupciones
    
    // 2. Timeout de respaldo por si falla la carga
    const backupTimeout = setTimeout(hideLoader, 5000); // 5 segundos máximo
    
    // 3. Manejar errores
    audio.addEventListener('error', () => {
        clearTimeout(backupTimeout);
        hideLoader();
    });

    let isPlaying = false;
    const playBtn = document.getElementById('play-btn');

    const handlePlayPause = () => {
        if (!isPlaying) {
            audio.play().catch(err => console.log("Esperando interacción..."));
            isPlaying = true;
            playBtn.classList.add('hidden');
        } else {
            audio.pause();
            isPlaying = false;
            playBtn.classList.remove('hidden');
        }
    };
    
    // Escuchar los eventos nativos del audio por si el usuario usa los controles predeterminados
    audio.addEventListener('play', () => {
        isPlaying = true;
        playBtn.classList.add('hidden');
    });

    audio.addEventListener('pause', () => {
        isPlaying = false;
        playBtn.classList.remove('hidden');
    });

    // Agregar el evento al botón dedicado en lugar de usar todo el cuerpo (body)
    if(playBtn) {
        playBtn.addEventListener('click', handlePlayPause);
    }

    // --- FIREFLIES EFFECT ---
    const createFireflies = () => {
        const fireflyCount = 40; // Número de luciérnagas
        const body = document.body;
        
        for (let i = 0; i < fireflyCount; i++) {
            const firefly = document.createElement('div');
            firefly.classList.add('firefly');
            
            // Posición inicial aleatoria
            const startX = Math.random() * 100; // 0vw a 100vw
            const startY = Math.random() * 100; // 0vh a 100vh
            
            // Retraso y duración aleatoria para que no se muevan al mismo tiempo
            const delay = Math.random() * 5;
            const floatDuration = 10 + Math.random() * 20; // 10s a 30s
            const blinkDuration = 2 + Math.random() * 4; // 2s a 6s
            
            firefly.style.left = `${startX}vw`;
            firefly.style.top = `${startY}vh`;
            
            // Asignar animaciones personalizadas
            firefly.style.animation = `
                firefly-blink ${blinkDuration}s infinite ease-in-out ${delay}s,
                firefly-float ${floatDuration}s infinite linear ${delay}s
            `;
            
            body.appendChild(firefly);
        }
    };
    
    // Llamar la función para crear luciérnagas al cargar
    createFireflies();

    audio.addEventListener('timeupdate', () => {
        const currentTime = audio.currentTime;
        lyrics.forEach((lyric, index) => {
            // Fix logic for the last lyric line
            if (currentTime >= lyricTimes[index] && (!lyricTimes[index + 1] || currentTime < lyricTimes[index + 1])) {
                lyric.classList.add('active');
    
                if (index > 0) {
                    lyrics[index - 1].classList.remove('active');
                    lyrics[index - 1].classList.add('exit');
                }
            } else {
                lyric.classList.remove('active');
                lyric.classList.remove('exit');
            }
        });
    });
});

  
  
  
