# Project Structure & Organization

## Directory Layout

```
productivity-hub/
├── .github/workflows/          # CI/CD pipeline configurations
├── .kiro/steering/            # AI assistant steering rules
├── docs/                      # Project documentation
│   ├── API.md                # API documentation
│   ├── ARCHITECTURE.md       # System architecture
│   └── FUNCTIONS.md          # Function documentation
├── public/                    # Static assets
│   └── index.html            # HTML template
├── src/                      # Source code
│   ├── components/           # React components
│   │   ├── TodoList.js       # Todo management component
│   │   ├── TodoList.test.js  # Todo component tests
│   │   ├── NotesPanel.js     # Notes component
│   │   └── NotesPanel.test.js # Notes component tests
│   ├── App.js               # Main application component
│   ├── App.css              # Application styles
│   ├── App.test.js          # App component tests
│   ├── index.js             # React entry point
│   └── setupTests.js        # Test configuration
├── docker-compose.yml        # Container orchestration
├── Dockerfile               # Container build instructions
├── nginx.conf               # Web server configuration
├── package.json             # Dependencies and scripts
└── README.md                # Project overview
```

## Code Organization Principles

### Component Structure
- **Functional Components**: Use React hooks, avoid class components
- **Single Responsibility**: Each component handles one concern
- **Co-located Tests**: Test files alongside component files
- **Props Interface**: Clear prop definitions and PropTypes when needed

### File Naming Conventions
- **Components**: PascalCase (e.g., `TodoList.js`)
- **Test Files**: Component name + `.test.js` (e.g., `TodoList.test.js`)
- **Styles**: Component name + `.css` or global `App.css`
- **Utilities**: camelCase for utility functions

### State Management
- **Local State**: useState for component-specific state
- **Shared State**: Props drilling for simple data flow
- **Persistence**: localStorage for data persistence
- **Side Effects**: useEffect for lifecycle management

## Architecture Patterns

### Component Hierarchy
```
App (main container)
├── TodoList (todo management)
└── NotesPanel (sticky notes)
```

### Data Flow
- **Top-down**: State managed in App component
- **Props**: Data passed down to child components
- **Callbacks**: State updates passed as functions
- **LocalStorage**: Automatic persistence via useEffect

### Styling Approach
- **Global Styles**: App.css for layout and shared styles
- **Component Styles**: Inline or component-specific CSS
- **Responsive Design**: CSS Grid and Flexbox
- **Design System**: Consistent colors, spacing, typography

## Development Conventions

### Import Order
1. React and React-related imports
2. Third-party libraries
3. Local components
4. Styles and assets

### Function Organization
- **Event Handlers**: Prefix with `handle` (e.g., `handleAddTodo`)
- **Utility Functions**: Descriptive names (e.g., `saveTodosToStorage`)
- **Component Functions**: Export as default, named exports for utilities

### Testing Structure
- **Unit Tests**: Individual component functionality
- **Integration Tests**: Component interaction
- **Test Organization**: Describe blocks for features, it blocks for specific behaviors
- **Test Coverage**: Aim for >90% coverage

## Configuration Files

### Root Level
- `package.json`: Dependencies, scripts, project metadata
- `docker-compose.yml`: Container orchestration
- `Dockerfile`: Multi-stage build configuration
- `nginx.conf`: Production web server settings

### Hidden Directories
- `.github/workflows/`: CI/CD pipeline definitions
- `.kiro/steering/`: AI assistant guidance rules
- `node_modules/`: Installed dependencies (auto-generated)

## Best Practices

### File Organization
- Keep components small and focused
- Group related files together
- Use descriptive file and folder names
- Maintain consistent directory structure

### Code Quality
- Follow React best practices
- Use meaningful variable names
- Add comments for complex logic
- Maintain consistent formatting