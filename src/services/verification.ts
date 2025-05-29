import { getFunctions, httpsCallable } from 'firebase/functions';
import app from '../firebase';

export const sendVerificationCode = async (email: string) => {
  try {
    console.log('Initializing Firebase Functions...');
    const functions = getFunctions(app);
    console.log('Functions initialized, getting callable function...');
    const sendCode = httpsCallable(functions, 'sendVerificationCode');
    console.log('Calling sendVerificationCode with email:', email);
    const result = await sendCode({ email });
    console.log('Verification code sent successfully:', result);
    return result.data;
  } catch (error: any) {
    console.error('Detailed error:', {
      code: error.code,
      message: error.message,
      details: error.details,
      stack: error.stack
    });
    
    if (error.code === 'functions/not-found') {
      throw new Error('Verification service is not available. Please try again later.');
    }
    if (error.code === 'functions/unavailable') {
      throw new Error('Verification service is currently unavailable. Please try again later.');
    }
    throw new Error('Failed to send verification code. Please try again.');
  }
}; 