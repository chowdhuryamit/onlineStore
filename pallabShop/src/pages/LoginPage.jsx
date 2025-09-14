import React, { useState } from "react";
import { Mail, Lock, Fingerprint, Eye, EyeOff } from "lucide-react";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showPassKey, setShowPassKey] = useState(false);

  const [password,setPassword] = useState("");
  const [passkey,setPasskey] = useState("");

  const handlePasswordLogin = (e) => {
    e.preventDefault();
    console.log(password);
    console.log(passkey);
     
  };

  return (
    <div className="bg-gray-50 flex items-center justify-center min-h-screen font-sans">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-2xl shadow-lg m-4">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900">Welcome Pallab</h1>
          <p className="mt-2 text-sm text-gray-600">
            Sign in to continue to your account.
          </p>
        </div>

        <div className="animate-fade-in">
          <form className="mt-8 space-y-6" onSubmit={handlePasswordLogin}>
            <div className="space-y-4">
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e)=>setPassword(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  id="passKey"
                  name="passKey"
                  type={showPassKey ? "text" : "password"}
                  required
                  value={passkey}
                  onChange={(e)=>setPasskey(e.target.value)}
                  className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="PassKey"
                />
                <button
                  type="button"
                  onClick={() => setShowPassKey(!showPassKey)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 hover:text-gray-600"
                >
                  {showPassKey ? <EyeOff /> : <Eye />}
                </button>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
              >
                Sign in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
