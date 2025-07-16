# Contributing to Productivity Hub

Thank you for your interest in contributing to Productivity Hub! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- Docker & Docker Compose
- Git

### Development Setup

1. **Fork and Clone**
   ```bash
   git clone https://github.com/your-username/productivity-hub.git
   cd productivity-hub
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Start Development Server**
   ```bash
   npm start
   ```

4. **Run Tests**
   ```bash
   npm test
   ```

## 📋 Development Workflow

### Branch Strategy
- `main` - Production-ready code
- `develop` - Integration branch for features
- `feature/feature-name` - Individual feature branches
- `bugfix/bug-description` - Bug fix branches

### Commit Convention
We follow conventional commits:
```
type(scope): description

feat(todos): add drag and drop functionality
fix(notes): resolve auto-save timing issue
docs(readme): update installation instructions
test(components): add integration tests
```

### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Write clean, readable code
   - Add tests for new functionality
   - Update documentation as needed

3. **Test Your Changes**
   ```bash
   npm test
   npm run test:coverage
   docker-compose up --build
   ```

4. **Submit Pull Request**
   - Clear title and description
   - Reference related issues
   - Include screenshots for UI changes

## 🧪 Testing Guidelines

### Test Requirements
- All new features must include tests
- Maintain 90%+ test coverage
- Test both happy path and edge cases

### Test Types
- **Unit Tests**: Individual component functionality
- **Integration Tests**: Component interactions
- **E2E Tests**: Full user workflows

### Running Tests
```bash
# Run all tests
npm test

# Run with coverage
npm run test:coverage

# Run specific test file
npm test TodoList.test.js
```

## 📝 Code Style

### JavaScript/React Guidelines
- Use functional components with hooks
- Follow React best practices
- Use meaningful variable names
- Add JSDoc comments for complex functions

### CSS Guidelines
- Use CSS modules or styled-components
- Follow BEM naming convention
- Ensure responsive design
- Maintain consistent spacing

### Example Code Style
```javascript
/**
 * Adds a new todo item to the list
 * @param {string} text - The todo text
 * @param {Function} setTodos - State setter function
 */
const addTodo = (text, setTodos) => {
  if (!text.trim()) return;
  
  const newTodo = {
    id: Date.now(),
    text: text.trim(),
    completed: false,
    createdAt: new Date().toISOString()
  };
  
  setTodos(prev => [newTodo, ...prev]);
};
```

## 🐳 Docker Development

### Local Docker Testing
```bash
# Build and test locally
docker-compose up --build

# Test production build
docker build -t productivity-hub:test .
docker run -p 3000:80 productivity-hub:test
```

### Docker Best Practices
- Use multi-stage builds
- Minimize image layers
- Use .dockerignore effectively
- Test container security

## 📚 Documentation

### Documentation Requirements
- Update README.md for new features
- Add API documentation for new endpoints
- Include inline code comments
- Update architecture docs for significant changes

### Documentation Style
- Clear, concise language
- Include code examples
- Use proper markdown formatting
- Add diagrams for complex concepts

## 🔍 Code Review Process

### Review Checklist
- [ ] Code follows style guidelines
- [ ] Tests are included and passing
- [ ] Documentation is updated
- [ ] No security vulnerabilities
- [ ] Performance impact considered
- [ ] Accessibility requirements met

### Review Guidelines
- Be constructive and respectful
- Focus on code, not the person
- Suggest improvements with examples
- Approve when ready, request changes when needed

## 🐛 Bug Reports

### Bug Report Template
```markdown
**Bug Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to...
2. Click on...
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- OS: [e.g., Windows 10]
- Browser: [e.g., Chrome 91]
- Version: [e.g., 1.0.0]

**Screenshots**
If applicable, add screenshots
```

## 💡 Feature Requests

### Feature Request Template
```markdown
**Feature Description**
Clear description of the proposed feature

**Problem Statement**
What problem does this solve?

**Proposed Solution**
How should this feature work?

**Alternatives Considered**
Other solutions you've considered

**Additional Context**
Any other relevant information
```

## 🏷️ Issue Labels

- `bug` - Something isn't working
- `enhancement` - New feature or request
- `documentation` - Improvements to docs
- `good first issue` - Good for newcomers
- `help wanted` - Extra attention needed
- `priority: high` - High priority issue
- `priority: low` - Low priority issue

## 🎯 Contribution Areas

### High Priority
- Performance optimizations
- Accessibility improvements
- Mobile responsiveness
- Test coverage improvements

### Medium Priority
- New productivity features
- UI/UX enhancements
- Documentation improvements
- Code refactoring

### Future Enhancements
- Backend integration
- User authentication
- Real-time collaboration
- Mobile app development

## 📞 Getting Help

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and ideas
- **Pull Request Comments**: Code-specific discussions

### Response Times
- Issues: Within 48 hours
- Pull Requests: Within 72 hours
- Security Issues: Within 24 hours

## 🏆 Recognition

### Contributors
All contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

### Contribution Types
We recognize all types of contributions:
- Code contributions
- Documentation improvements
- Bug reports
- Feature suggestions
- Testing and QA
- Design and UX feedback

## 📄 License

By contributing to Productivity Hub, you agree that your contributions will be licensed under the same license as the project (MIT License).

---

Thank you for contributing to Productivity Hub! Your efforts help make this project better for everyone. 🚀