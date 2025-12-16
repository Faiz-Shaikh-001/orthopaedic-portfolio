import { motion, AnimatePresence } from "framer-motion";
import FilledButton from "../components/filledButton";
import { Icon } from "@iconify/react";
import LogoComponent from "../components/logo";

// 👇 DESTUCTURE THE PROPS HERE
const LoginScreen = ({ handleLogin, email, setEmail, password, setPassword, error }) => {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#f0f9ff] relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-[#48CEF3]/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-[#0E5B81]/10 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-white p-8 md:p-12 rounded-3xl shadow-2xl w-full max-w-md relative z-10 mx-4"
      >
        <div className="flex justify-center mb-6">
          <LogoComponent height="h-16" displayLogoText={true} />
        </div>

        <h2 className="text-2xl font-[battambang] font-bold text-center text-[#0E5B81] mb-2">
          Welcome Back, Doc!
        </h2>
        <p className="text-center text-gray-500 mb-8 text-sm">
          Please enter your credentials to access the dashboard.
        </p>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Email Address
            </label>
            <div className="relative">
              <Icon
                icon="mdi:email-outline"
                className="absolute left-4 top-3.5 text-gray-400 text-xl"
              />
              <input
                type="email"
                required
                value={email} // ✅ Now this works
                onChange={(e) => setEmail(e.target.value)} // ✅ Now this works
                placeholder="doctor@example.com"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#48CEF3] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-semibold text-gray-700 ml-1">
              Password
            </label>
            <div className="relative">
              <Icon
                icon="mdi:lock-outline"
                className="absolute left-4 top-3.5 text-gray-400 text-xl"
              />
              <input
                type="password"
                required
                value={password} // ✅ Now this works
                onChange={(e) => setPassword(e.target.value)} // ✅ Now this works
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#48CEF3] focus:border-transparent transition-all"
              />
            </div>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg"
              >
                {error}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Fixed Button: Use HTML Button to ensure form submission works perfectly */}
          <button 
             type="submit" 
             className="w-full py-4 bg-[#0E5B81] hover:bg-[#0b4a6b] text-white rounded-full font-bold transition-all"
          >
            Sign In to Dashboard
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginScreen;