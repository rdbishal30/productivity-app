# Technology Stack & Build System

## Tech Stack

### Frontend
- **React 18.2.0**: Functional components with hooks
- **CSS3**: Custom CSS with grid/flexbox layouts
- **HTML5**: Semantic markup
- **JavaScript ES6+**: Modern JavaScript features

### Build & Development
- **Create React App 5.0.1**: Zero-config build tool
- **Node.js 18+**: Development environment
- **npm**: Package management

### Testing
- **Jest**: Test runner and assertion library
- **React Testing Library**: Component testing utilities
- **@testing-library/user-event**: User interaction testing

### Deployment
- **Docker**: Multi-stage containerization
- **Nginx Alpine**: Production web server
- **Docker Compose**: Local orchestration

### CI/CD
- **GitHub Actions**: Automated testing and deployment
- **Trivy**: Security vulnerability scanning
- **Codecov**: Test coverage reporting

## Common Commands

### Development
```bash
# Install dependencies
npm install

# Start development server (http://localhost:3000)
npm start

# Run tests
npm test

# Run tests with coverage
npm run test:coverage

# Build for production
npm run build
```

### Docker Operations
```bash
# Build and run with Docker Compose
docker-compose up --build

# Run in background
docker-compose up -d

# Stop containers
docker-compose down

# Build Docker image manually
docker build -t productivity-hub .

# Run container manually
docker run -p 3000:80 productivity-hub
```

### Testing Commands
```bash
# Run all tests
npm test

# Run tests in CI mode
npm run test:ci

# Run specific test file
npm test TodoList.test.js

# Run tests with coverage report
npm test -- --coverage --watchAll=false
```

## Build Configuration

### Production Build
- Multi-stage Docker build for optimized images
- Nginx serves static files with gzip compression
- Build artifacts in `/build` directory
- Optimized bundle splitting and minification

### Development Setup
- Hot reload with Create React App dev server
- Source maps for debugging
- ESLint integration for code quality
- Automatic browser refresh on changes

## Performance Targets
- Build time: <30 seconds
- Docker image size: <25MB
- Load time: <2 seconds
- Test coverage: >90%