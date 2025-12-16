import { useState, useEffect } from "react";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import LoginScreen from "./LoginScreen";
import AdminPanel from "./AdminPanel"; // Ensure capitalization matches file name

const AdminLogin = ({ children }) => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  const auth = getAuth();
  
  // 1. Listen for Auth Changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      console.error(err);
      setError("Invalid credentials. Please try again.");
    }
  };

  if (loading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-slate-50">
        <div className="w-12 h-12 border-4 border-[#0E5B81] border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // If Logged In, show the Dashboard Wrapper
  if (user) return <AdminPanel auth={auth} user={user}>{children}</AdminPanel>;

  // If Logged Out, show Login Screen (Passing all state down!)
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