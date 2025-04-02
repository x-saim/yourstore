import { signInWithCredentials, signOutUser } from '@/lib/actions/user.actions';
import { signIn, signOut } from '@/auth';

// Mock dependencies
jest.mock('@/auth', () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

describe('Authentication Flow Integration', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should complete a full auth flow (sign in and sign out)', async () => {
    // Arrange
    const mockFormData = new FormData();
    mockFormData.append('email', 'john@doe.com');
    mockFormData.append('password', 'password');
    
    (signIn as jest.Mock).mockResolvedValueOnce(undefined);
    (signOut as jest.Mock).mockResolvedValueOnce(undefined);
    
    // Act - Sign In
    const signInResult = await signInWithCredentials({}, mockFormData);
    
    // Assert - Sign In
    expect(signIn).toHaveBeenCalledWith('credentials', {
      email: 'john@doe.com',
      password: 'password',
    });
    expect(signInResult).toEqual({
      success: true,
      message: 'Sign in successful.',
    });
    
    // Act - Sign Out
    await signOutUser();
    
    // Assert - Sign Out
    expect(signOut).toHaveBeenCalledTimes(1);
  });
}); 