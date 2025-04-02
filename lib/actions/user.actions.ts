'use server';
import { signInFormSchema, signUpFormSchema } from '../validators';
import { signIn, signOut } from '@/auth';
import { prisma } from '@/db/prisma';
import { hashSync } from 'bcrypt-ts-edge';
import { isRedirectError } from 'next/dist/client/components/redirect-error';

// Sign in User with credentials
export async function signInWithCredentials(
  prevState: unknown,
  formData: FormData
): Promise<{ success: boolean; message: string } | undefined> {
  try {
    const user = signInFormSchema.parse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    // Attempt to sign in using the 'credentials' provider
    await signIn('credentials', user);

    return { success: true, message: 'Sign in successful.' };
  } catch (error) {
    // Check if the error is the specific RedirectError thrown by NextAuth
    if (isRedirectError(error)) {
      // Re-throw the RedirectError so Next.js can handle the redirect
      throw error;
    }

    // Handle other errors (e.g., CredentialsSignin error from authorize callback)
    console.error('Sign-in error:', error);
    return { success: false, message: 'Invalid credentials or server error.' };
  }
}

// Sign out User
export async function signOutUser() {
  await signOut();
}

// Sign up User
export async function signUpUser(prevState: unknown, formData: FormData) {
  try {
    // Parse the form data
    const user = signUpFormSchema.parse({
      name: formData.get('name'),
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });
  
    const plainPassword = user.password;

    // Hash the password
    user.password = hashSync(user.password, 10);

    await prisma.user.create({
      data: {
        name: user.name,
        email: user.email,
        password: user.password,
      },
    });

    // Sign in the user
    await signIn('credentials', {
      email: user.email,
      password: plainPassword,
    });
 
    return {
      success: true,
      message: 'Sign up successful. User created successfully.',
    };

  } catch (error) {
    // Check if the error is the specific RedirectError thrown by NextAuth
    if (isRedirectError(error)) {
      throw error;
    }

    console.error('Sign-up error:', error);
    return {
      success: false,
      message: 'Sign up failed. Please try again.',
    };
  }
}
