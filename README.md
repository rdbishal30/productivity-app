# Productivity Hub

A minimal, clean productivity application built with React and Docker. Features todo management and sticky notes with a focus on simplicity and functionality.

## 🚀 Features

- **Todo Management**: Add, edit, complete, and delete tasks
- **Sticky Notes**: Quick note-taking with persistent storage
- **Local Storage**: All data persists in browser
- **Responsive Design**: Works on desktop and mobile
- **Docker Ready**: Containerized for easy deployment
- **Network Access**: Available across local network

## 🛠️ Tech Stack

- **Frontend**: React 18, CSS3, HTML5
- **Build Tool**: Create React App
- **Web Server**: Nginx (Alpine)
- **Containerization**: Docker & Docker Compose
- **Storage**: Browser LocalStorage

## 📦 Quick Start

### Prerequisites
- Node.js 18+
- Docker & Docker Compose
- Modern web browser

### Development Setup

```bash
# Clone the repository
git clone https://github.com/rdbishal30/productivity-app.git
cd productivity-app

# Install dependencies
npm install

# Start development server
npm start
```

Visit `http://localhost:3000`

### Docker Deployment

```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in background
docker-compose up -d

# Stop the application
docker-compose down
```

**Access Points:**
- Local: `http://localhost:3000`
- Network: `http://[your-ip]:3000`

## 📁 Project Structure

```
productivity-hub/
├── src/
│   ├── components/
│   │   ├── TodoList.js          # Todo management component
│   │   └── NotesPanel.js        # Sticky notes component
│   ├── App.js                   # Main application component
│   ├── App.css                  # Application styles
│   └── index.js                 # React entry point
├── public/
│   └── index.html               # HTML template
├── docker-compose.yml           # Container orchestration
├── Dockerfile                   # Container build instructions
├── nginx.conf                   # Web server configuration
└── package.json                 # Dependencies and scripts
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Run tests in CI mode
npm test -- --ci --watchAll=false
```

## 🚀 Deployment

### Local Network
The app is configured to be accessible across your local network. Other devices can access it using your computer's IP address.

### Production Deployment
1. Build the Docker image
2. Deploy to your preferred container platform
3. Configure reverse proxy if needed
4. Set up SSL/TLS for production use

## 📖 API Documentation

### LocalStorage Schema

**Todos:**
```json
[
  {
    "id": 1642123456789,
    "text": "Task description",
    "completed": false,
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

**Notes:**
```json
[
  {
    "id": 1642123456789,
    "content": "Note content",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
]
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🐛 Troubleshooting

### Common Issues

**Port already in use:**
```bash
# Check what's using port 3000
netstat -ano | findstr :3000

# Kill the process or use different port
docker-compose down
```

**Docker build fails:**
```bash
# Clean Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

**App not accessible on network:**
- Check firewall settings
- Verify IP address with `ipconfig`
- Ensure Docker is binding to `0.0.0.0:3000`

## 📞 Support

For support, please open an issue in the repository or contact the development team.

---

Built with ❤️ using vibe coding principles - simple, functional, and effective.