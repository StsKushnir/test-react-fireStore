interface FirebaseErrorMessages {
  emailError?: string;
  passwordError?: string;
}

export const firebaseErrorHandler = (error: Error): FirebaseErrorMessages => {
  switch (true) {
    case error.message.includes("auth/email-already-in-use"):
      return { emailError: "This email is already in use." };

    case error.message.includes("auth/invalid-email"):
      return { emailError: "Invalid email" };

    case error.message.includes("auth/weak-password"):
      return { passwordError: "Password should be at least 6 characters" };

    case error.message.includes("auth/missing-email"):
      return { emailError: "Missed email" };

    case error.message.includes("auth/missing-password"):
      return { passwordError: "Missed password" };

    case error.message.includes("auth/invalid-credential"):
      return { passwordError: "Invalid credential" };

    default:
      return { emailError: "Registration failed: " + error.message };
  }
};
