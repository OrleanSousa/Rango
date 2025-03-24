import { useAuth, useUser } from "@clerk/clerk-react";

export function useClerkAuth() {
  const { isSignedIn } = useAuth();
  const { user } = useUser();

  if (isSignedIn && user) {
    return {
      isSignedIn: true,
      firstName: user.firstName || "Usuário",
      email: user.primaryEmailAddress?.emailAddress || "",
      imageUrl: user.imageUrl || "https://via.placeholder.com/150",
    };
  }

  return {
    isSignedIn: false,
    firstName: "",
    email: "",
    imageUrl: "",
  };
}
