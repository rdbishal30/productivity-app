# Build Productivity Hub - Complete Application

## Context
You are Kiro, an AI assistant helping to build a production-ready productivity application. Use vibe coding principles: focused, iterative development with minimal but functional features.

## Project Goal
Create a clean, minimal productivity app with todo management and sticky notes, fully containerized with Docker and comprehensive testing.

## Tech Stack Requirements
- React 18 (functional components + hooks)
- Docker + Nginx for deployment
- LocalStorage for persistence
- Jest + React Testing Library
- GitHub Actions CI/CD

## Step 1: Project Foundation
```bash
# Initialize project
npm init -y

# Install core dependencies
npm install react@^18.2.0 react-dom@^18.2.0 react-scripts@^5.0.1

# Install testing dependencies
npm install --save-dev @testing-library/jest-dom @testing-library/react @testing-library/user-event
```

Add these scripts to package.json:
```json
"scripts": {
  "start": "react-scripts start",
  "build": "react-scripts build",
  "test": "react-scripts test",
  "test:coverage": "react-scripts test --coverage --watchAll=false",
  "test:ci": "react-scripts test --ci --coverage --watchAll=false"
}
```

## Step 2: Core React Structure

### public/index.html
Basic HTML template with:
- Root div for React
- Viewport meta tag
- Title: "Productivity Hub"

### src/index.js
React entry point:
- Import React, ReactDOM
- Render App component to root

### src/App.js
Main application component:
- State: `todos` and `notes` arrays
- useEffect: Load from localStorage on mount
- useEffect: Save to localStorage on state change
- Layout: Header + grid (main-section + side-panel)
- Pass state and setters to child components

## Step 3: Component Implementation

### src/components/TodoList.js
Todo management component with:

**State:**
- `newTodo` (string): Input value
- `editingId` (number|null): Currently editing todo ID
- `editText` (string): Edit input value

**Functions:**
- `addTodo()`: Create new todo, validate input
- `toggleTodo(id)`: Toggle completion status
- `deleteTodo(id)`: Remove todo from array
- `startEdit(id, text)`: Enter edit mode
- `saveEdit(id)`: Save changes, exit edit mode
- `cancelEdit()`: Cancel editing without saving
- `handleKeyPress(e, action, id)`: Handle Enter/Escape keys

**UI Features:**
- Add todo input with 100 char limit
- Todo list with checkboxes
- Inline editing (click text or Edit button)
- No edit button for completed todos
- Delete button for all todos
- Empty state message

### src/components/NotesPanel.js
Sticky notes component with:

**Functions:**
- `addNote()`: Create empty note
- `updateNote(id, content)`: Update note content
- `deleteNote(id)`: Remove note

**UI Features:**
- "New Note" button
- Sticky note styling (yellow background)
- Auto-resize textarea
- Delete button (×) on each note
- Empty state message

## Step 4: Styling (src/App.css)

**Layout:**
- CSS Grid: `grid-template-columns: 1fr 300px`
- Responsive: Stack on mobile (`grid-template-columns: 1fr`)

**Design System:**
- Font: `-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto`
- Colors: Clean grays and blues
- Border radius: 8-10px
- Box shadows for depth
- Hover effects and transitions

**Component Styles:**
- Todo items: Flex layout with hover effects
- Edit mode: Highlighted input with save/cancel buttons
- Notes: Sticky note appearance with yellow background
- Buttons: Consistent styling with hover states

## Step 5: Docker Configuration

### Dockerfile
Multi-stage build:
```dockerfile
# Build stage
FROM node:18-alpine as build
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### docker-compose.yml
```yaml
services:
  productivity-app:
    build: .
    ports:
      - "0.0.0.0:3000:80"
    restart: unless-stopped
    container_name: productivity-hub
```

### nginx.conf
Production web server config:
- Gzip compression
- Static asset caching (1 year)
- Security headers
- Client-side routing support

### .dockerignore
Exclude: node_modules, build, .git, README.md

## Step 6: Testing Suite

### src/setupTests.js
```javascript
import '@testing-library/jest-dom';
```

### Test Files Required:
1. **src/App.test.js**: Main app integration tests
2. **src/components/TodoList.test.js**: Todo CRUD operations
3. **src/components/NotesPanel.test.js**: Notes functionality

**Test Patterns:**
- Mock localStorage globally
- Test user interactions (clicks, typing, keyboard events)
- Verify state changes and UI updates
- Cover edge cases (empty input, completed todos)
- Use `fireEvent` for interactions
- Use `screen.getByText`, `screen.getByRole` for queries

## Step 7: CI/CD Pipeline

### .github/workflows/ci.yml
Complete pipeline with:
- Multi-node testing (18.x, 20.x)
- Lint and test execution
- Docker build and security scan
- Coverage reporting
- Automated deployment (staging/production)

## Step 8: Documentation

Create comprehensive docs:
1. **README.md**: Project overview, quick start, features
2. **docs/API.md**: Data models, localStorage schema
3. **docs/ARCHITECTURE.md**: System design, decisions
4. **docs/FUNCTIONS.md**: Detailed function documentation
5. **CONTRIBUTING.md**: Development workflow, guidelines
6. **PROJECT_REPORT.md**: Complete project analysis

## Data Models

### Todo Object
```javascript
{
  id: Date.now(),
  text: "Task description",
  completed: false,
  createdAt: new Date().toISOString()
}
```

### Note Object
```javascript
{
  id: Date.now(),
  content: "Note content",
  createdAt: new Date().toISOString()
}
```

## Key Features Checklist

**Todo Management:**
- ✅ Add new tasks
- ✅ Inline editing (click text or Edit button)
- ✅ Mark complete/incomplete
- ✅ Delete tasks
- ✅ Keyboard shortcuts (Enter/Escape)
- ✅ No edit for completed tasks

**Notes Panel:**
- ✅ Create new notes
- ✅ Auto-save on content change
- ✅ Delete notes
- ✅ Sticky note visual design

**Technical:**
- ✅ LocalStorage persistence
- ✅ Responsive design
- ✅ Docker containerization
- ✅ Network accessibility
- ✅ Comprehensive testing
- ✅ CI/CD pipeline

## Deployment Commands

```bash
# Development
npm start

# Testing
npm test
npm run test:coverage

# Docker
docker-compose up --build
docker-compose up -d

# Access
# Local: http://localhost:3000
# Network: http://[your-ip]:3000
```

## Success Criteria

**Functional:** All CRUD operations working, responsive design, data persistence
**Technical:** 90%+ test coverage, Docker deployment, CI/CD pipeline
**Quality:** Clean code, comprehensive docs, security headers, performance optimization

**Final Result:** Production-ready productivity application built with vibe coding principles.