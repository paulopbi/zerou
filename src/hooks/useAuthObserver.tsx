import { onAuthStateChanged, User } from "firebase/auth";
import React from "react";
import { auth } from "../firebase/firebaseConfig";

export const useAuthObeserver = () => {
  const [user, setUser] = React.useState<null | User>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return { user, loading };
};
