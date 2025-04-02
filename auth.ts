import { compareSync } from 'bcrypt-ts-edge';
import type { NextAuthConfig } from 'next-auth';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import { prisma } from '@/db/prisma';
import { PrismaAdapter } from '@auth/prisma-adapter';

export const config = {
  // Pages
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
  },
  // Session
  session: {
    strategy: 'jwt',
    // Seconds - How long until an idle session expires and is no longer valid.
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  adapter: PrismaAdapter(prisma),
  // Providers
  providers: [
    CredentialsProvider({
      credentials: {
        email: { type: 'email' },
        password: { type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials.password) {
          return null;
        }

        // Find user in database
        const user = await prisma.user.findFirst({
          where: { email: credentials.email as string },
        });

        if (!user || !user.password) {
          // No user found or user doesn't have a password (e.g., OAuth user)
          return null;
        }

        // Validate password
        const isPasswordValid = compareSync(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) {
          return null;
        }

        // Return user object if credentials are valid
        // Exclude password from the returned user object
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
      },
    }),
  ],
  callbacks: {
    // The jwt callback is used to add custom fields to the token
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async jwt({token, user, trigger, session}: any) {
      // Assign user fields to the token
      if (user) {
        token.role = user.role;   
        token.id = user.id;

        // If user has no name, use email as their default name
        if (user.name === 'NO_NAME') {
          token.name = user.email!.split('@')[0];

          //Update the user in the database with the new name
          await prisma.user.update({
            where: { id: user.id },
            data: { name: token.name },
          });
        }
      }

      // Handle session updates
      if (session?.user.name && trigger === 'update') {
        token.name = session.user.name;
      }

      return token;
    },
    // The session callback is used to add custom fields to the session
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    async session({ session, trigger, token }: any) {
      // Map the token data to the session object
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.role = token.role; 

    // Optionally handle session updates (like name change)
    if (trigger === 'update' && token.name) {
      session.user.name = token.name;
    }

    // Return the updated session object
    return session;
    },
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
