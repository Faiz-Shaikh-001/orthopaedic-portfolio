import {
  useEffect,
  useState,
} from "react";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
} from "firebase/auth";

import LoginScreen from "./LoginScreen";
import AdminPanel from "./AdminPanel";


const AdminLogin = ({ children }) => {
  const [user, setUser] =
    useState(null);

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [error, setError] =
    useState("");

  const [loading, setLoading] =
    useState(true);


  const auth = getAuth();


  useEffect(() => {
    const unsubscribe =
      onAuthStateChanged(
        auth,
        (currentUser) => {
          setUser(currentUser);
          setLoading(false);
        }
      );

    return unsubscribe;
  }, [auth]);


  const handleLogin = async (
    event
  ) => {
    event.preventDefault();

    setError("");

    try {
      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
    } catch (loginError) {
      console.error(
        "Admin authentication failed:",
        loginError
      );

      setError(
        "Invalid credentials. Please try again."
      );
    }
  };


  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">

        <div className="w-12 h-12 border-4 border-[#0E5B81] border-t-transparent rounded-full animate-spin" />

      </div>
    );
  }


  if (user) {
    return (
      <AdminPanel
        auth={auth}
        user={user}
      >
        {children}
      </AdminPanel>
    );
  }


  return (
    <LoginScreen
      handleLogin={handleLogin}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      error={error}
    />
  );
};


export default AdminLogin;