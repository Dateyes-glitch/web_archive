# Retro Style Website 🎮

A retro-style interactive website featuring video backgrounds, password verification, mouse drawing, and more.

## ✨ Features

### 🎬 Main Page (index.html)
- **Video Background**: Uses `bong copy.mp4` as fullscreen background
- **Hello Kitty Button**: Uses `hellokittie.mp4` as interactive button
- **Password Verification**: Enter password `retro2024` to access main page
- **Retro Effects**: CRT display effects, scan lines, glitch animations
- **Terminal Startup**: Retro terminal-style startup animation

### 🎨 Main Page (mainpage.html)
- **Video Grid**: Displays all MP4 files with hover preview
- **Interactive Canvas**: Mouse drawing support, activate with Ctrl key
- **Audio Playback**: Click videos to play corresponding audio files
- **Control Panel**: Brush size, color, eraser tools
- **Fullscreen Mode**: Fullscreen display support

## 🚀 Quick Start

### Prerequisites
- Docker and Docker Compose installed
- Modern browser (supports HTML5 video and Canvas)

### Using Docker (Recommended)

1. **Clone or download the project**
   ```bash
   git clone <repository-url>
   cd retro-website
   ```

2. **Add your video files**
   - Place `bong copy.mp4` and `hellokittie.mp4` in `working/index/`
   - Place other MP4 files in `working/main page/`
   - Add audio files to `songs/` directory

3. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

4. **Access the website**
   - Open browser and go to: `http://localhost:8080`
   - Enter password: `retro2024`

### Alternative: Local Development

1. **Install Node.js** (version 14.0.0 or higher)

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the server**
   ```bash
   npm start
   # or
   node server.js
   ```

4. **Access the website**
   - Open browser and go to: `http://127.0.0.1:8080`
   - Enter password: `retro2024`

## 📁 File Structure

```
retro-website/
├── index.html              # Main page
├── mainpage.html           # Main page
├── styles.css              # Main page styles
├── mainpage.css            # Main page styles
├── script.js               # Main page scripts
├── mainpage.js             # Main page scripts
├── server.js               # Node.js server
├── package.json            # Project configuration
├── Dockerfile              # Docker configuration
├── docker-compose.yml      # Docker Compose configuration
├── .dockerignore           # Docker ignore file
├── README.md               # Documentation
└── working/                # Video files directory
    ├── index/
    │   ├── bong copy.mp4   # Background video
    │   ├── hellokittie.mp4 # Hello Kitty video
    │   └── kiss.mp4
    └── main page/
        ├── brain.mp4
        ├── cat.mp4
        ├── cool.mp4
        ├── hands.mp4
        ├── observer.mp4
        ├── pepi.mp4
        ├── shout.mp4
        ├── tetris.mp4
        └── trippy.mp4
```

## 🎮 Usage Instructions

### Main Page Operations
1. **Password Verification**: Enter `retro2024` to access main page
2. **Hello Kitty Interaction**: Click or hover over Hello Kitty video
3. **Keyboard Shortcuts**: Press Enter to submit password

### Main Page Operations
1. **Video Browsing**: Hover over videos for preview, click to play audio
2. **Canvas Drawing**: Hold Ctrl key to activate canvas, mouse to draw
3. **Tool Usage**: 
   - Adjust brush size and color
   - Toggle eraser mode
   - Clear canvas
4. **Fullscreen Mode**: Click fullscreen button or press Ctrl+F

### Keyboard Shortcuts
- `Ctrl + Mouse`: Activate canvas drawing
- `E`: Toggle eraser mode
- `Ctrl + C`: Clear canvas
- `Ctrl + F`: Toggle fullscreen
- `Esc`: Close video info
- `Enter`: Submit password

## 🎵 Audio Files

The website supports configuring corresponding audio files for each video. In the `videoData` array in `mainpage.js`, each video object contains:
- `path`: Video file path
- `title`: Video title
- `description`: Video description
- `audio`: Corresponding audio file path

### Suggested Audio File Structure
```
songs/
├── brain_song.mp3
├── cat_song.mp3
├── cool_song.mp3
├── hands_song.mp3
├── observer_song.mp3
├── pepi_song.mp3
├── shout_song.mp3
├── tetris_song.mp3
└── trippy_song.mp3
```

## 🎨 Customization

### Change Password
Find the following code in `script.js` and modify:
```javascript
const correctPassword = 'retro2024'; // Change password here
```

### Add New Videos
Add new videos to the `videoData` array in `mainpage.js`:
```javascript
{
    path: 'working/main page/your-video.mp4',
    title: 'Your Video Title',
    description: 'Video description',
    audio: 'songs/your-audio.mp3'
}
```

### Modify Styles
- Main page styles: Edit `styles.css`
- Main page styles: Edit `mainpage.css`
- Font: Website uses VT323 monospace font

## 🔧 Technical Features

- **Responsive Design**: Supports desktop and mobile devices
- **Touch Support**: Mobile device touch drawing support
- **Video Optimization**: Autoplay, loop, mute settings
- **Error Handling**: Comprehensive error handling and user prompts
- **Performance Optimization**: Lazy loading, event delegation, etc.

## 🌟 Retro Effects

- **CRT Display Effects**: Scan lines, noise, glitch animations
- **Retro Fonts**: VT323 monospace font
- **Green Terminal Style**: Classic green text and black background
- **Glitch Animations**: Text glitch effects and blinking animations
- **Scan Lines**: Simulates CRT display scan line effects

## 🐳 Docker Commands

### Build and Run
```bash
# Build and start
docker-compose up --build

# Run in background
docker-compose up -d

# Stop
docker-compose down

# View logs
docker-compose logs -f
```

### Individual Docker Commands
```bash
# Build image
docker build -t retro-website .

# Run container
docker run -p 8080:8080 -v $(pwd)/working:/app/working -v $(pwd)/songs:/app/songs retro-website

# Stop container
docker stop retro-website
```

## 🐛 Troubleshooting

### Common Issues

1. **Videos won't play**
   - Check video file paths are correct
   - Ensure browser supports MP4 format
   - Check file permissions

2. **Audio won't play**
   - Check audio files exist
   - Ensure audio files are MP3 format
   - Check browser audio permissions

3. **Canvas won't draw**
   - Make sure to hold Ctrl key to activate canvas
   - Check browser supports Canvas
   - Try refreshing page

4. **Server won't start**
   - Check if port 8080 is in use
   - Ensure Node.js version meets requirements
   - Check file permissions

### Port Conflicts
If port 8080 is in use, modify the port in `docker-compose.yml`:
```yaml
ports:
  - "8081:8080"  # Change to different port
```

### Docker Issues
```bash
# Clean up Docker
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache

# Check container status
docker ps -a
```

## 📄 License

MIT License - see LICENSE file for details

## 🤝 Contributing

Welcome to submit Issues and Pull Requests to improve this project!

## 📞 Contact

For questions or suggestions, please contact:
- Submit GitHub Issue
- Email: your-email@example.com

---

**Enjoy the retro-style website experience!** 🎮✨ 
