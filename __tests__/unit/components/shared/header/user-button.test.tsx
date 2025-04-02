/// <reference types="@testing-library/jest-dom" />

// Mock the auth module
jest.mock('@/auth', () => {
  return {
    auth: jest.fn(),
  };
});

// Mock the user actions module
jest.mock('@/lib/actions/user.actions', () => ({
  signOutUser: jest.fn(),
}));

import { render, screen } from '@testing-library/react';
import UserButton from '@/components/shared/header/user-button';
import userEvent from '@testing-library/user-event';
import { auth } from '@/auth';

// Get the mocked function and properly type it
type AuthSession = {
  user?: {
    name?: string;
    email?: string;
  };
  expires: string;
} | null;

const mockAuth = auth as jest.MockedFunction<typeof auth> & {
  mockResolvedValue: (val: AuthSession) => void;
};

// Helper functions for tests
const mockAuthenticatedSession = (userData = {
  name: 'Test User',
  email: 'test@example.com',
}) => {
  mockAuth.mockResolvedValue({
    user: userData,
    expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  });
};

const mockUnauthenticatedSession = () => {
  mockAuth.mockResolvedValue(null);
};

describe('UserButton Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should not render when user is not authenticated', async () => {
    // Setup mock to return unauthenticated session
    mockUnauthenticatedSession();

    const { container } = render(await UserButton());

    // Component should be null when not authenticated
    expect(container).toBeEmptyDOMElement();
  });

  it('should render user button with first initial when user is authenticated', async () => {
    // Setup mock to return authenticated session
    mockAuthenticatedSession({
      name: 'John Doe',
      email: 'john@example.com',
    });

    render(await UserButton());

    // Check that the button is rendered with the correct initial
    const userInitial = screen.getByText('J');
    expect(userInitial).toBeInTheDocument();
  });

  it('should display user info in dropdown when clicked', async () => {
    // Setup mock to return authenticated session
    mockAuthenticatedSession({
      name: 'John Doe',
      email: 'john@example.com',
    });

    render(await UserButton());

    // Click the user button to open the dropdown
    const userButton = screen.getByText('J');
    await userEvent.click(userButton);

    // Check that user info is displayed in dropdown
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });

  it('should show sign out button in dropdown', async () => {
    // Setup mock to return authenticated session
    mockAuthenticatedSession();

    render(await UserButton());

    // Click the user button to open the dropdown
    const userButton = screen.getByText('T');
    await userEvent.click(userButton);

    // Check that sign out button is displayed
    expect(screen.getByText('Sign Out')).toBeInTheDocument();
  });
}); 