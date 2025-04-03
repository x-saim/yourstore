import { signInWithCredentials, signOutUser } from '@/lib/actions/user.actions';
import { signIn, signOut } from '@/auth';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

// Mock dependencies
jest.mock('@/auth', () => ({
  signIn: jest.fn(),
  signOut: jest.fn(),
}));

// Mock the redirect error
jest.mock('next/dist/client/components/redirect-error', () => ({
  isRedirectError: jest.fn(),
}));

// Mock the validators
jest.mock('@/lib/validators', () => ({
  signInFormSchema: {
    parse: jest.fn((data) => data),
  },
}));

// Mock the auth
describe('User Actions', () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear all mocks before each test
  });

  // Test the signInWithCredentials action
  describe('signInWithCredentials', () => {
    it('should return success message when sign in is successful', async () => {
      // Arrange
      const mockFormData = new FormData();
      mockFormData.append('email', 'john@doe.com');
      mockFormData.append('password', 'password');
      
      (signIn as jest.Mock).mockResolvedValueOnce(undefined);
      
      // Act
      const result = await signInWithCredentials({}, mockFormData);
      
      // Assert
      expect(signIn).toHaveBeenCalledWith('credentials', {
        email: 'john@doe.com',
        password: 'password',
      });
      expect(result).toEqual({
        success: true,
        message: 'Sign in successful.',
      });
    });

    it('should handle redirect error during sign in', async () => {
      // Arrange
      const mockFormData = new FormData();
      mockFormData.append('email', 'john@doe.com');
      mockFormData.append('password', 'password');
      
      const redirectError = new Error('Redirect error');
      (signIn as jest.Mock).mockRejectedValueOnce(redirectError);
      (isRedirectError as unknown as jest.Mock).mockReturnValueOnce(true);
      
      // Act & Assert
      await expect(signInWithCredentials({}, mockFormData)).rejects.toThrow(redirectError);
      expect(isRedirectError).toHaveBeenCalledWith(redirectError);
    });

    it('should return error message for invalid credentials', async () => {
      // Arrange
      const mockFormData = new FormData();
      mockFormData.append('email', 'test@example.com');
      mockFormData.append('password', 'wrong-password');
      
      const authError = new Error('Auth error');
      (signIn as jest.Mock).mockRejectedValueOnce(authError);
      (isRedirectError as unknown as jest.Mock).mockReturnValueOnce(false);
      
      // Act
      const result = await signInWithCredentials({}, mockFormData);
      
      // Assert
      expect(result).toEqual({
        success: false,
        message: 'Invalid credentials or server error.',
      });
    });
  });

  // Test the signOutUser action
  describe('signOutUser', () => {
    it('should call signOut when executed', async () => {
      // Arrange
      (signOut as jest.Mock).mockResolvedValueOnce(undefined);
      
      // Act
      await signOutUser();
      
      // Assert
      expect(signOut).toHaveBeenCalledTimes(1);

    });
  });
}); 