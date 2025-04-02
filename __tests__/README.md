# Testing Structure

This project uses Jest for running tests and Testing Library for testing React components.

## Test Directory Structure

- `__tests__/` - Root directory for all tests
  - `unit/` - Unit tests for individual functions or components
  - `integration/` - Integration tests that verify multiple components or functions working together
  - `e2e/` - End-to-end tests that test the application as a whole
  - `utils/` - Utility functions and helpers for tests

## Test File Naming

Each test file should follow the pattern of `[filename].(test|spec).(ts|tsx)` to match the file it's testing.

## Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## Writing Tests

Tests should follow the Arrange-Act-Assert pattern:

1. **Arrange** - Set up the test data, state and mocks
2. **Act** - Execute the code being tested
3. **Assert** - Verify the results

Example:

```typescript
describe('Component', () => {
  it('should do something', () => {
    // Arrange
    const props = { value: 'test' };
    
    // Act
    render(<Component {...props} />);
    
    // Assert
    expect(screen.getByText('test')).toBeInTheDocument();
  });
});
```

## Mocking

For mocking external dependencies, use Jest's mocking features:

```typescript
// Mock a module
jest.mock('@/lib/api', () => ({
  fetchData: jest.fn()
}));

// Mock implementation
(fetchData as jest.Mock).mockResolvedValue({ data: 'test' });
```

## TDD Workflow

1. Write a failing test that describes the expected behavior
2. Run the test to see it fail
3. Write the minimum code needed to make the test pass
4. Run the test to see it pass
5. Refactor the code while keeping the test passing
6. Repeat 