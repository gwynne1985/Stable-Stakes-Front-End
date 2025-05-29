import * as functions from "firebase-functions";
import * as admin from "firebase-admin";
import formData from "form-data";
import Mailgun from "mailgun.js";

// Initialize Firebase Admin if not already initialized
if (!admin.apps.length) {
  admin.initializeApp();
}

const mailgun = new Mailgun(formData);
const mg = mailgun.client({
  username: "api",
  key: functions.config().mailgun.key,
});

interface SendVerificationCodeData {
  email: string;
}

export const sendVerificationCode = functions.https.onCall(
  async (request: functions.https.CallableRequest<SendVerificationCodeData>, context) => {
    try {
      const { email } = request.data;

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email || !emailRegex.test(email)) {
        throw new functions.https.HttpsError(
          "invalid-argument",
          "Invalid email format"
        );
      }

      // Generate 5-digit code
      const verificationCode = Math.floor(10000 + Math.random() * 90000).toString();

      // Calculate expiration (10 minutes from now)
      const expiresAt = Date.now() + 10 * 60 * 1000;

      // Save to Firestore
      const pendingUserRef = admin.firestore().collection("pending_users").doc();
      await pendingUserRef.set({
        email,
        code: verificationCode,
        status: "pending",
        expiresAt,
        createdAt: admin.firestore.FieldValue.serverTimestamp(),
      });

      // Send email via Mailgun
      const domain = functions.config().mailgun.domain;
      await mg.messages.create(domain, {
        from: `Stable Stakes <noreply@${domain}>`,
        to: email,
        subject: "Your Stable Stakes Verification Code",
        text: `Your verification code is: ${verificationCode}`,
      });

      return {
        message: "Verification code sent successfully",
        email,
      };
    } catch (error) {
      console.error("Error sending verification code:", error);

      // Type guard for error
      const err = error as any;
      if (err instanceof functions.https.HttpsError) {
        throw err;
      }

      // Handle Mailgun errors
      if (err && err.name === "MailgunError") {
        throw new functions.https.HttpsError(
          "internal",
          "Failed to send verification email"
        );
      }

      // Handle Firestore errors
      if (err && err.code === "permission-denied") {
        throw new functions.https.HttpsError(
          "permission-denied",
          "Failed to save verification data"
        );
      }

      // Generic error
      throw new functions.https.HttpsError(
        "internal",
        "An unexpected error occurred"
      );
    }
  }
); 