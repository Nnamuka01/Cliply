import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import PasswordInput from "../../components/PasswordInput";
import { supabase } from "../../config/supabaseClient.js";
import "./login.css";

interface User {
  id: string;
  email: string;
}

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<User | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [login, setLogin] = useState("");

  const navigate = useNavigate();
  console.log(user);

  function listenToSignInEvent() {
    supabase.auth.onAuthStateChange((event: any, session: any) => {
      if (event === "SIGNED_IN") {
        console.log("User signed in:", session.user);
      }
    });
  }

  // calling the listen to sign in event function
  listenToSignInEvent();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        if (error.message === "Email not confirmed") {
          setErrorMessage(
            "Email not confirmed. Please check your email for the confirmation link"
          );
        } else {
          setErrorMessage("Error signing in: " + error.message);
        }
        throw error;
      }

      if (data) {
        console.log(data);
        setUser(data.user);
        setLogin("Login Successful");
        await new Promise((resolve) => setTimeout(resolve, 5000));
        navigate(`/dashboard/${email}`);
      } else {
        setErrorMessage("Account not found. Register?");
        setLogin("Account not found");
      }
    } catch (err: any) {
      console.error(err);
      if (err.message === "Email not confirmed") {
        setErrorMessage(
          "Email not confirmed. Please check your email for the confirmation link."
        );
      } else {
        setErrorMessage(err.message);
      }
    }
  };

  const handleMouseOver = () => {
    const form = document.querySelector(".form-div");
    form?.classList.add("shadow-md", "shadow-primaryPink");
  };

  const handleMouseLeave = () => {
    const form = document.querySelector(".form-div");
    form?.classList.remove("shadow-md", "shadow-primaryPink");
  };

  const passwordCheck = (newPassword: string) => {
    const value = newPassword;
    setPassword(value);
    // console.log(value, "Checking password");
  };

  return (
    <section className="login-section">
      <div
        className="form-div"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <form className="form" onSubmit={handleLogin}>
          <div>
            <h1 className="welcome-text">
              <span className="cliply-text">Welcome Back</span> 👋
            </h1>
            <h1 className="login-text">Login</h1>
          </div>

          <div className="container">
            {errorMessage && (
              <div className="error-message">
                <p>{errorMessage}</p>
              </div>
            )}

            <div>
              <input
                type="email"
                placeholder="Email address"
                required
                // pattern="^([a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4})|([a-zA-Z]+)$"
                className="email-input"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div>
              <PasswordInput onChange={passwordCheck} placeholder="Password" />
            </div>

            {/* <div className="forgot-password">
              <Link to="/forgot-password" className="forgot-password-link">
                Forgot your password?
              </Link>
              <p></p>
            </div> */}

            {login && <p className="login-success-message">{login}</p>}

            <div className="login-button-container">
              <button type="submit" className="login-button">
                Login
              </button>
            </div>

            <div>
              <p className="register-text">
                <span>Don't have an account?</span>
                <Link to="/register" className="register-link">
                  Register
                </Link>
              </p>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default LoginPage;
