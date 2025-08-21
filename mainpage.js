// Main Page JavaScript
let canvas, ctx;
let isDrawing = false;
let isEraser = false;
let currentVideo = null;
let audioPlayer;

// Video data
const videoData = [
    {
        path: 'working/main page/brain.mp4',
        title: 'Brain',
        description: 'Mysterious brain activity',
        audio: 'songs/brain_song.mp3'
    },
    {
        path: 'working/main page/cat.mp4',
        title: 'Cat',
        description: 'Cute cat video',
        audio: 'songs/cat_song.mp3'
    },
    {
        path: 'working/main page/cool.mp4',
        title: 'Cool',
        description: 'Cool visual effects',
        audio: 'songs/cool_song.mp3'
    },
    {
        path: 'working/main page/hands.mp4',
        title: 'Hands',
        description: 'Hand movement showcase',
        audio: 'songs/hands_song.mp3'
    },
    {
        path: 'working/main page/observer.mp4',
        title: 'Observer',
        description: 'Observer perspective',
        audio: 'songs/observer_song.mp3'
    },
    {
        path: 'working/main page/pepi.mp4',
        title: 'Pepi',
        description: 'Pepi animation',
        audio: 'songs/pepi_song.mp3'
    },
    {
        path: 'working/main page/shout.mp4',
        title: 'Shout',
        description: 'Shout effect',
        audio: 'songs/shout_song.mp3'
    },
    {
        path: 'working/main page/tetris.mp4',
        title: 'Tetris',
        description: 'Classic game',
        audio: 'songs/tetris_song.mp3'
    },
    {
        path: 'working/main page/trippy.mp4',
        title: 'Trippy',
        description: 'Trippy visual effects',
        audio: 'songs/trippy_song.mp3'
    }
];

document.addEventListener('DOMContentLoaded', function() {
    initializeCanvas();
    loadVideos();
    initializeControls();
    initializeAudio();
    updateStatus('System ready');
});

// Initialize canvas
function initializeCanvas() {
    canvas = document.getElementById('drawingCanvas');
    ctx = canvas.getContext('2d');
    
    // Set canvas dimensions
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    
    // Set canvas styles
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#00ff00';
    ctx.lineWidth = 5;
    
    // Add mouse events
    canvas.addEventListener('mousedown', startDrawing);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseup', stopDrawing);
    canvas.addEventListener('mouseout', stopDrawing);
    
    // Add touch events (mobile devices)
    canvas.addEventListener('touchstart', handleTouch);
    canvas.addEventListener('touchmove', handleTouch);
    canvas.addEventListener('touchend', stopDrawing);
}

// Load videos
function loadVideos() {
    const videoGrid = document.getElementById('videoGrid');
    
    videoData.forEach((video, index) => {
        const videoItem = document.createElement('div');
        videoItem.className = 'video-item';
        videoItem.dataset.index = index;
        
        videoItem.innerHTML = `
            <video loop muted>
                <source src="${video.path}" type="video/mp4">
            </video>
            <div class="video-overlay">
                <div class="play-icon">▶</div>
            </div>
            <div class="video-title">${video.title}</div>
            ${video.title === 'Trippy' ? '<div class="omnichord-indicator">🎹</div>' : ''}
        `;
        
        // Add click event
        videoItem.addEventListener('click', () => handleVideoClick(video, index));
        
        // Add mouse hover events
        const videoElement = videoItem.querySelector('video');
        videoItem.addEventListener('mouseenter', () => {
            videoElement.play();
        });
        
        videoItem.addEventListener('mouseleave', () => {
            videoElement.pause();
            videoElement.currentTime = 0;
        });
        
        videoGrid.appendChild(videoItem);
    });
}

// Handle video click
function handleVideoClick(video, index) {
    currentVideo = video;
    
    // Show video info
    const videoInfo = document.getElementById('videoInfo');
    const videoTitle = document.getElementById('videoTitle');
    const videoDescription = document.getElementById('videoDescription');
    
    videoTitle.textContent = video.title;
    videoDescription.textContent = video.description;
    
    // Add omnichord button for trippy video
    let videoControls = videoInfo.querySelector('.video-controls');
    if (video.title === 'Trippy') {
        // Remove existing omnichord button if it exists
        const existingOmnichordBtn = videoInfo.querySelector('.omnichord-btn');
        if (existingOmnichordBtn) {
            existingOmnichordBtn.remove();
        }
        
        // Create omnichord button
        const omnichordBtn = document.createElement('button');
        omnichordBtn.className = 'omnichord-btn';
        omnichordBtn.innerHTML = '🎹 Virtual Omnichord';
        omnichordBtn.onclick = function() {
            // Try multiple omnichord options
            const omnichordUrls = [
                'https://onlineomnichord.com/',
                'https://www.virtualpiano.net/',
                'https://www.musicca.com/piano'
            ];
            
            // Open the first available option
            const omnichordWindow = window.open(omnichordUrls[0], 'omnichordWindow', 'width=800,height=600');
            
            // If the first one fails, try the others
            if (!omnichordWindow || omnichordWindow.closed) {
                setTimeout(() => {
                    window.open(omnichordUrls[1], 'omnichordWindow2', 'width=800,height=600');
                }, 1000);
            }
            
            updateStatus('Opening Virtual Omnichord...');
        };
        
        // Insert omnichord button before the first button
        videoControls.insertBefore(omnichordBtn, videoControls.firstChild);
    } else {
        // Remove omnichord button for other videos
        const existingOmnichordBtn = videoInfo.querySelector('.omnichord-btn');
        if (existingOmnichordBtn) {
            existingOmnichordBtn.remove();
        }
    }
    
    videoInfo.classList.add('active');
    
    // Play audio
    playAudio(video.audio);
    
    // Update status
    updateStatus(`Playing: ${video.title}`);
    
    // Add click effect
    const videoItem = document.querySelector(`[data-index="${index}"]`);
    videoItem.style.transform = 'scale(0.95)';
    setTimeout(() => {
        videoItem.style.transform = 'scale(1)';
    }, 150);
}

// Initialize control panel
function initializeControls() {
    const brushSize = document.getElementById('brushSize');
    const brushSizeValue = document.getElementById('brushSizeValue');
    const brushColor = document.getElementById('brushColor');
    const eraserBtn = document.getElementById('eraserBtn');
    
    // Brush size control
    brushSize.addEventListener('input', function() {
        ctx.lineWidth = this.value;
        brushSizeValue.textContent = this.value;
    });
    
    // Brush color control
    brushColor.addEventListener('input', function() {
        if (!isEraser) {
            ctx.strokeStyle = this.value;
        }
    });
    
    // Eraser control
    eraserBtn.addEventListener('click', toggleEraser);
    
    // Video control buttons
    const playPauseBtn = document.getElementById('playPauseBtn');
    const restartBtn = document.getElementById('restartBtn');
    
    playPauseBtn.addEventListener('click', toggleAudio);
    restartBtn.addEventListener('click', restartAudio);
}

// Initialize audio
function initializeAudio() {
    audioPlayer = document.getElementById('audioPlayer');
    
    audioPlayer.addEventListener('ended', function() {
        updateStatus('Audio playback completed');
    });
    
    audioPlayer.addEventListener('error', function() {
        updateStatus('Audio loading failed');
    });
}

// Play audio
function playAudio(audioPath) {
    try {
        audioPlayer.src = audioPath;
        audioPlayer.play().then(() => {
            updateStatus('Audio started playing');
        }).catch(error => {
            console.log('Audio playback failed:', error);
            updateStatus('Audio playback failed - check file path');
        });
    } catch (error) {
        console.log('Audio loading failed:', error);
        updateStatus('Audio loading failed');
    }
}

// Toggle audio play/pause
function toggleAudio() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        updateStatus('Audio resumed');
    } else {
        audioPlayer.pause();
        updateStatus('Audio paused');
    }
}

// Restart audio
function restartAudio() {
    audioPlayer.currentTime = 0;
    audioPlayer.play();
    updateStatus('Audio restarted');
}

// Start drawing
function startDrawing(e) {
    isDrawing = true;
    draw(e);
}

// Draw
function draw(e) {
    if (!isDrawing) return;
    
    const rect = canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    
    // Update coordinate display
    updateCoordinates(x, y);
}

// Stop drawing
function stopDrawing() {
    isDrawing = false;
    ctx.beginPath();
}

// Handle touch events
function handleTouch(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const mouseEvent = new MouseEvent(e.type === 'touchstart' ? 'mousedown' : 
                                    e.type === 'touchmove' ? 'mousemove' : 'mouseup', {
        clientX: touch.clientX,
        clientY: touch.clientY
    });
    canvas.dispatchEvent(mouseEvent);
}

// Toggle eraser mode
function toggleEraser() {
    isEraser = !isEraser;
    const eraserBtn = document.getElementById('eraserBtn');
    
    if (isEraser) {
        ctx.strokeStyle = '#000';
        eraserBtn.style.background = '#ff6b6b';
        eraserBtn.textContent = 'Brush';
        updateStatus('Eraser mode');
    } else {
        const brushColor = document.getElementById('brushColor').value;
        ctx.strokeStyle = brushColor;
        eraserBtn.style.background = '#00ff00';
        eraserBtn.textContent = 'Eraser';
        updateStatus('Brush mode');
    }
}

// Clear canvas
function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateStatus('Canvas cleared');
}

// Update status
function updateStatus(message) {
    const statusText = document.getElementById('statusText');
    statusText.textContent = message;
}

// Update coordinate display
function updateCoordinates(x, y) {
    const coordinates = document.getElementById('coordinates');
    coordinates.textContent = `X: ${Math.round(x)}, Y: ${Math.round(y)}`;
}

// Go back to main page
function goBack() {
    if (confirm('Are you sure you want to go back to the main page?')) {
        window.location.href = 'index.html';
    }
}

// Toggle fullscreen
function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
        updateStatus('Entered fullscreen mode');
    } else {
        document.exitFullscreen();
        updateStatus('Exited fullscreen mode');
    }
}

// Close video info
function closeVideoInfo() {
    const videoInfo = document.getElementById('videoInfo');
    videoInfo.classList.remove('active');
    
    if (audioPlayer) {
        audioPlayer.pause();
    }
    
    updateStatus('Ready');
}

// Add keyboard shortcuts
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'Escape':
            closeVideoInfo();
            break;
        case 'c':
        case 'C':
            if (e.ctrlKey) {
                clearCanvas();
            }
            break;
        case 'e':
        case 'E':
            toggleEraser();
            break;
        case 'f':
        case 'F':
            if (e.ctrlKey) {
                toggleFullscreen();
            }
            break;
        case 'o':
        case 'O':
            if (currentVideo && currentVideo.title === 'Trippy') {
                const omnichordBtn = document.querySelector('.omnichord-btn');
                if (omnichordBtn) {
                    omnichordBtn.click();
                }
            }
            break;
    }
});

// Add canvas activation/deactivation
document.addEventListener('keydown', function(e) {
    if (e.key === 'Control') {
        canvas.classList.add('active');
        updateStatus('Canvas activated - you can draw');
    }
});

document.addEventListener('keyup', function(e) {
    if (e.key === 'Control') {
        canvas.classList.remove('active');
        updateStatus('Canvas deactivated');
    }
});

// Add retro terminal effect
function addTerminalEffect() {
    const terminalText = [
        'Loading main page...',
        'Initializing video grid...',
        'Setting up canvas system...',
        'Connecting audio modules...',
        'Omnichord module loaded for Trippy video...',
        'System ready! Press Ctrl key to activate canvas',
        'Press O key to open omnichord when Trippy video is active'
    ];
    
    let currentIndex = 0;
    const terminalElement = document.createElement('div');
    terminalElement.style.cssText = `
        position: fixed;
        top: 20px;
        left: 20px;
        font-family: 'VT323', monospace;
        font-size: 14px;
        color: #00ff00;
        z-index: 100;
        background: rgba(0, 0, 0, 0.8);
        padding: 10px;
        border: 1px solid #00ff00;
        max-width: 300px;
    `;
    
    document.body.appendChild(terminalElement);
    
    function typeText() {
        if (currentIndex < terminalText.length) {
            terminalElement.textContent += terminalText[currentIndex] + '\n';
            currentIndex++;
            setTimeout(typeText, 600);
        } else {
            setTimeout(() => {
                terminalElement.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(terminalElement);
                }, 1000);
            }, 2000);
        }
    }
    
    setTimeout(typeText, 500);
}

// Start terminal effect after page load
setTimeout(addTerminalEffect, 300); 