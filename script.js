// Retro Website JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Initialize videos
    initializeVideos();
    
    // Add keyboard event listeners
    document.addEventListener('keydown', handleKeyPress);
    
    // Add Hello Kitty video click event
    const kittyContainer = document.querySelector('.kitty-container');
    kittyContainer.addEventListener('click', handleKittyClick);
    
    // Add input focus events
    const passwordInput = document.getElementById('passwordInput');
    passwordInput.addEventListener('focus', function() {
        this.style.boxShadow = '0 0 20px rgba(0, 255, 0, 1)';
    });
    
    passwordInput.addEventListener('blur', function() {
        this.style.boxShadow = '0 0 15px rgba(0, 255, 0, 0.8)';
    });
});

// Initialize videos
function initializeVideos() {
    const bgVideo = document.getElementById('bgVideo');
    const kittyVideo = document.getElementById('kittyVideo');
    
    // Background video settings
    bgVideo.play().catch(function(error) {
        console.log('Background video autoplay failed:', error);
    });
    
    // Hello Kitty video settings
    kittyVideo.addEventListener('mouseenter', function() {
        this.play();
        this.style.filter = 'brightness(1.2) contrast(1.1)';
    });
    
    kittyVideo.addEventListener('mouseleave', function() {
        this.pause();
        this.currentTime = 0;
        this.style.filter = 'brightness(1) contrast(1)';
    });
}

// Handle keyboard events
function handleKeyPress(event) {
    if (event.key === 'Enter') {
        checkPassword();
    }
}

// Handle Hello Kitty click event
function handleKittyClick() {
    const kittyVideo = document.getElementById('kittyVideo');
    
    // Play sound effect (if available)
    playRandomSound();
    
    // Add click animation effect
    kittyVideo.style.transform = 'scale(0.9)';
    setTimeout(() => {
        kittyVideo.style.transform = 'scale(1)';
    }, 150);
    
    // Show random message
    showRandomMessage();
}

// Play random sound effect
function playRandomSound() {
    const sounds = [
        'beep.mp3',
        'click.mp3',
        'pop.mp3'
    ];
    
    // Add actual sound effect playback logic here
    console.log('Playing sound:', sounds[Math.floor(Math.random() * sounds.length)]);
}

// Show random message
function showRandomMessage() {
    const messages = [
        'Hello Kitty says hi!',
        'Meow~ Click me!',
        'Retro style is awesome!',
        'Keep exploring!'
    ];
    
    const message = messages[Math.floor(Math.random() * messages.length)];
    
    // Create temporary message element
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.9);
        color: #00ff00;
        padding: 1rem 2rem;
        border: 2px solid #00ff00;
        border-radius: 10px;
        font-family: 'VT323', monospace;
        font-size: 1.2rem;
        z-index: 1000;
        animation: fadeInOut 2s ease-in-out;
    `;
    
    document.body.appendChild(messageElement);
    
    setTimeout(() => {
        document.body.removeChild(messageElement);
    }, 2000);
}

// Check password
function checkPassword() {
    const passwordInput = document.getElementById('passwordInput');
    const errorMessage = document.getElementById('errorMessage');
    const password = passwordInput.value.trim();
    
    // Set password (you can modify this password)
    const correctPassword = 'retro2024';
    
    if (password === correctPassword) {
        // Password correct, show success message
        errorMessage.textContent = 'Password correct! Entering...';
        errorMessage.style.color = '#00ff00';
        errorMessage.style.animation = 'none';
        
        // Add success animation
        document.body.style.animation = 'successGlow 1s ease-in-out';
        
        // Delay redirect to main page
        setTimeout(() => {
            window.location.href = 'mainpage.html';
        }, 1500);
        
    } else {
        // Password incorrect
        errorMessage.textContent = 'Incorrect password! Please try again.';
        errorMessage.style.color = '#ff6b6b';
        errorMessage.style.animation = 'shake 0.5s ease-in-out';
        
        // Clear input field
        passwordInput.value = '';
        passwordInput.focus();
        
        // Add error sound effect
        document.body.style.animation = 'errorShake 0.5s ease-in-out';
    }
}

// Add CSS animations
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInOut {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
        50% { opacity: 1; transform: translate(-50%, -50%) scale(1.1); }
        100% { opacity: 0; transform: translate(-50%, -50%) scale(0.8); }
    }
    
    @keyframes successGlow {
        0% { box-shadow: 0 0 20px rgba(0, 255, 0, 0.5); }
        50% { box-shadow: 0 0 50px rgba(0, 255, 0, 1); }
        100% { box-shadow: 0 0 20px rgba(0, 255, 0, 0.5); }
    }
    
    @keyframes errorShake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);

// Add retro terminal effect
function addTerminalEffect() {
    const terminalText = [
        'System starting...',
        'Loading retro modules...',
        'Initializing CRT display...',
        'Connecting to network...',
        'Welcome to the retro world!'
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
            setTimeout(typeText, 800);
        } else {
            setTimeout(() => {
                terminalElement.style.opacity = '0';
                setTimeout(() => {
                    document.body.removeChild(terminalElement);
                }, 1000);
            }, 2000);
        }
    }
    
    setTimeout(typeText, 1000);
}

// Start terminal effect after page load
setTimeout(addTerminalEffect, 500); 