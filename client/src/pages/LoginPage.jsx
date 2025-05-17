import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import assets from '../assets/assets';

const LoginPage = () => {
  const [currState, setCurrState] = useState("Sign up"); // Sign up / Login / Bio
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("success"); // 'success' or 'error'

  // Bio related states
  const [bio, setBio] = useState("");
  const [bioSuggestion, setBioSuggestion] = useState("");
  const [loadingSuggestion, setLoadingSuggestion] = useState(false);

  const navigate = useNavigate();

  const validateName = (name) => /^[a-zA-Z]+([ '-][a-zA-Z]+)*$/.test(name);
  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!email || !password || (currState === "Sign up" && !fullName)) {
      setMessageType("error");
      setMessage("Please fill in all required fields.");
      return;
    }

    if (currState === "Sign up" && !validateName(fullName)) {
      setMessageType("error");
      setMessage("Please enter a valid full name (letters, spaces, hyphens, apostrophes only).");
      return;
    }

    if (!validateEmail(email)) {
      setMessageType("error");
      setMessage("Please enter a valid email address.");
      return;
    }

    if (password.length < 4 || password.length > 8) {
      setMessageType("error");
      setMessage("Password must be 4 to 8 characters long.");
      return;
    }

    if (currState === "Sign up" && !agreeTerms) {
      setMessageType("error");
      setMessage("You must agree to the Terms and Conditions.");
      return;
    }

    if (currState === "Sign up") {
      setMessageType("success");
      setMessage("Sign up successful! Please enter your bio.");
      setCurrState("Bio");
      // Clear sensitive fields but keep name/email for bio context if needed
      setPassword("");
      setAgreeTerms(false);
      return;
    }

    if (currState === "Login") {
      setMessageType("success");
      setMessage("Login successful!");
      
      // Add a slight delay before navigation for better UX
      setTimeout(() => {
        navigate('/'); // Navigate to home page
      }, 500);
      return;
    }
  };

  // Mock AI bio suggestion based on user's full name and short bio input
  const generateBioSuggestion = () => {
    if (!bio.trim()) {
      setMessageType("error");
      setMessage("Please enter some info to get a bio suggestion.");
      return;
    }
    setLoadingSuggestion(true);
    setMessage("");

    // Simulate async AI call delay
    setTimeout(() => {
      const suggestion = `Passionate and dedicated professional named ${fullName}, with interests in ${bio.trim()}. Always eager to learn and grow.`;
      setBioSuggestion(suggestion);
      setMessage("");
      setLoadingSuggestion(false);
    }, 1200);
  };

  // When user finishes bio step
  const finishBio = () => {
    // Accept either the user typed bio or AI suggestion
    if (!bio.trim() && !bioSuggestion.trim()) {
      setMessageType("error");
      setMessage("Please enter or accept a bio before continuing.");
      return;
    }

    setMessageType("success");
    setMessage("Bio saved! Redirecting to Login...");
    setTimeout(() => {
      setCurrState("Login");
      setMessage("");
      // Reset all except email (optional)
      setFullName("");
      setPassword("");
      setAgreeTerms(false);
      setBio("");
      setBioSuggestion("");
    }, 1200);
  };

  return (
    <div className='min-h-screen bg-cover bg-center relative px-4 flex items-center justify-center gap-8 sm:justify-evenly max-sm:flex-col backdrop-blur-2xl bg-[url("/your-background.jpg")]'>
      <div className='absolute inset-0 bg-black opacity-50 -z-10'></div>
      <img src={assets.logo_big} alt="Logo" className='w-[min(30vw,250px)] max-sm:w-40 rounded-lg shadow-lg' />

      {(currState === "Sign up" || currState === "Login") && (
        <form
          onSubmit={handleSubmit}
          className='relative z-10 border-2 bg-white/10 text-white border-gray-500 p-8 flex flex-col gap-6 rounded-xl shadow-xl w-full max-w-sm
          transition-all duration-500 ease-in-out'
        >
          <h2 className='font-semibold text-3xl flex justify-between items-center select-none'>
            {currState}
            <img
              src={assets.arrow_icon}
              alt="Toggle"
              className='w-6 cursor-pointer hover:rotate-90 transition-transform duration-300'
              onClick={() => {
                setCurrState(currState === "Sign up" ? "Login" : "Sign up");
                setMessage("");
              }}
              title={`Switch to ${currState === "Sign up" ? "Login" : "Sign up"}`}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === "Enter" && setCurrState(currState === "Sign up" ? "Login" : "Sign up")}
            />
          </h2>

          {currState === "Sign up" && (
            <div className='relative'>
              <span className='absolute left-3 top-1/2 -translate-y-1/2 text-purple-400'>👤</span>
              <input
                type="text"
                placeholder="Full Name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                className='p-3 pl-10 bg-transparent border border-gray-500 rounded-md w-full
                placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400
                hover:ring-2 hover:ring-purple-400 transition-all'
                aria-label="Full Name"
              />
            </div>
          )}

          <div className='relative'>
            <span className='absolute left-3 top-1/2 -translate-y-1/2 text-purple-400'>📧</span>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='p-3 pl-10 bg-transparent border border-gray-500 rounded-md w-full
              placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400
              hover:ring-2 hover:ring-purple-400 transition-all'
              aria-label="Email"
            />
          </div>

          <div className='relative'>
            <span className='absolute left-3 top-1/2 -translate-y-1/2 text-purple-400'>🔒</span>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className='p-3 pl-10 bg-transparent border border-gray-500 rounded-md w-full
              placeholder-white focus:outline-none focus:ring-2 focus:ring-purple-400
              hover:ring-2 hover:ring-purple-400 transition-all'
              aria-label="Password"
            />
          </div>

          {currState === "Sign up" && (
            <label className='text-sm flex items-center gap-2 cursor-pointer select-none'>
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className='accent-purple-400 w-5 h-5 cursor-pointer'
                aria-checked={agreeTerms}
                aria-label="Agree to Terms and Conditions"
              />
              I agree to the{' '}
              <a
                href="https://www.termsfeed.com/live/95e26c7e-8676-4b6c-97da-d1cdd185f167"
                target="_blank"
                rel="noopener noreferrer"
                className="underline cursor-pointer hover:text-purple-300"
              >
                Terms & Conditions
              </a>.
            </label>
          )}

          {message && (
            <p
              className={`text-sm text-center ${messageType === "error" ? "text-red-400" : "text-green-400"} font-medium select-none`}
              role={messageType === "error" ? "alert" : "status"}
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            className='relative overflow-hidden bg-gradient-to-r from-purple-600 to-indigo-600
            hover:from-purple-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold
            transition-all duration-300 active:scale-95 shadow-md'
          >
            {currState}
            <span
              className='absolute inset-0 bg-white opacity-10 rounded-lg scale-0
              active:scale-100 transition-transform duration-300 pointer-events-none'
            ></span>
          </button>

          {currState === "Sign up" ? (
            <p className="text-sm text-center text-white/80 mt-2 select-none">
              Already have an account?{' '}
              <span
                onClick={() => {
                  setCurrState("Login");
                  setMessage("");
                }}
                className="underline cursor-pointer text-purple-400 hover:text-purple-300"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setCurrState("Login")}
              >
                Login
              </span>
            </p>
          ) : (
            <p className="text-sm text-center text-white/80 mt-2 select-none">
              Don't have an account?{' '}
              <span
                onClick={() => {
                  setCurrState("Sign up");
                  setMessage("");
                }}
                className="underline cursor-pointer text-purple-400 hover:text-purple-300"
                role="button"
                tabIndex={0}
                onKeyDown={(e) => e.key === "Enter" && setCurrState("Sign up")}
              >
                Sign up
              </span>
            </p>
          )}
        </form>
      )}

      {/* BIO INPUT STEP */}
      {currState === "Bio" && (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            finishBio();
          }}
          className='relative z-10 border-2 bg-white/10 text-white border-gray-500 p-8 flex flex-col gap-6 rounded-xl shadow-xl w-full max-w-sm
          transition-all duration-500 ease-in-out'
        >
          <h2 className='font-semibold text-3xl select-none'>Tell us about yourself</h2>

          <textarea
            placeholder="Enter a few words or interests about yourself..."
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={5}
            className='p-3 bg-transparent border border-gray-500 rounded-md w-full placeholder-white
            focus:outline-none focus:ring-2 focus:ring-purple-400 hover:ring-2 hover:ring-purple-400
            transition-all resize-none'
            aria-label="Your bio or interests"
          />

          <button
            type="button"
            onClick={generateBioSuggestion}
            disabled={loadingSuggestion}
            className={`bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg font-semibold transition-colors duration-300 shadow-md
              ${loadingSuggestion ? 'opacity-60 cursor-not-allowed' : ''}`}
            aria-busy={loadingSuggestion}
          >
            {loadingSuggestion ? "Generating..." : "Get AI Suggestion"}
          </button>

          {bioSuggestion && (
            <>
              <label className='text-sm mt-2' htmlFor="bioSuggestionTextarea">AI Suggested Bio (edit if you want):</label>
              <textarea
                id="bioSuggestionTextarea"
                value={bioSuggestion}
                onChange={(e) => setBioSuggestion(e.target.value)}
                rows={4}
                className='p-3 bg-transparent border border-gray-500 rounded-md w-full placeholder-white
                focus:outline-none focus:ring-2 focus:ring-purple-400 hover:ring-2 hover:ring-purple-400
                transition-all resize-none'
                aria-label="AI suggested bio"
              />
              <button
                type="button"
                onClick={() => setBio(bioSuggestion)}
                className="mt-1 text-sm text-purple-400 underline hover:text-purple-300"
              >
                Use this suggestion
              </button>
            </>
          )}

          {message && (
            <p className={`text-sm text-center ${messageType === "error" ? "text-red-400" : "text-green-400"} font-medium select-none`} role={messageType === "error" ? "alert" : "status"}>
              {message}
            </p>
          )}

          <button
            type="submit"
            className='bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700
            text-white py-3 rounded-lg font-semibold transition-all duration-300 active:scale-95 shadow-md'
          >
            Finish
          </button>
        </form>
      )}
    </div>
  );
};

export default LoginPage;
