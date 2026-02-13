/**
 * Password Reset Utilities
 * Handles password reset token generation, validation, and password updates
 */

import { supabase } from '@/lib/supabase/config';
import crypto from 'crypto';

/**
 * Request a password reset
 */
export async function requestPasswordReset(email: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    // Use Supabase's built-in password reset
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
    });

    if (error) {
      console.error('Password reset request error:', error);
      // Return generic message to prevent email enumeration
      return {
        success: true,
        message: 'If an account exists with this email, you will receive a password reset link.',
      };
    }

    return {
      success: true,
      message: 'If an account exists with this email, you will receive a password reset link.',
    };
  } catch (error) {
    console.error('Password reset error:', error);
    return {
      success: false,
      message: 'An error occurred. Please try again later.',
    };
  }
}

/**
 * Update password with new password
 */
export async function updatePassword(newPassword: string): Promise<{
  success: boolean;
  message: string;
}> {
  try {
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (error) {
      return {
        success: false,
        message: error.message || 'Failed to update password',
      };
    }

    return {
      success: true,
      message: 'Password updated successfully',
    };
  } catch (error) {
    console.error('Password update error:', error);
    return {
      success: false,
      message: 'An error occurred. Please try again.',
    };
  }
}
