import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import PasswordInput from "../../components/PasswordInput";
import { supabase } from "../../config/supabaseClient.js";
import Spinner from "../../components/Spinner.js";
import "./register.css";

const RegisterPage: React.FC = () => {
    // scroll top of the page
    const { pathname } = useLocation();
    const navigate = useNavigate();
    // validate name, email and password
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [passwordConfirm, setPasswordConfirm] = useState<string>("");
    // for their error messages
    const [nameError, setNameError] = useState<string>("");
    const [emailError, setEmailError] = useState<string>("");
    const [passError, setPassError] = useState<string>("");
    const [passwordError, setPasswordError] = useState<string>("");
    const [passwordConfirmError, setPasswordConfirmError] = useState<string>("");
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [verification, setVerification] = useState<string>("");
    
    
  // Scrolling Solution
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }, [pathname]);

  // Shadow when mouse is hovering on the Form
  const handleMouseOver = () => {
    const form = document.querySelector(".form-div");
    form?.classList.add("shadow-md", "shadow-primaryPink");
  };

  // Remove shadow when mouse leaves the form
  const handleMouseLeave = () => {
    const form = document.querySelector(".form-div");
    form?.classList.remove("shadow-md", "shadow-primaryPink");
  };

  // SUPABASE
  const registerAuthentication = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        throw new Error(`Supabase sign-up error: ${error.message}`);
      }

      if (data) {
        console.log("Registration successful:", data);
        // Registration Successful, show success message
        setVerification("Account Created Successfully!");
        await new Promise((resolve) => setTimeout(resolve, 5000));
        navigate("/login");
      }
    } catch (err: any) {
      // Registration failed, show error message
      console.error("Registration error:", err.message || err);
      setPassError(err.message || "An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  // Function for Name Validation
  const handleNameValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newName = e.target.value;

    // Check if the entered names contains a number or special character
    if (/\d/.test(newName) || /[!@#$%^&*(),.?":{}|<>]/g.test(newName)) {
      setNameError("Name cannot contain numbers or special characters");
    } else {
      setNameError("");
    }

    // Update the name state
    setName(newName);
  };

  // Function for Email Validation
  const handleEmailValidation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = e.target.value;

    // Check if the entered email is valid and does not contain the @ symbol
    if (!/@/.test(newEmail)) {
      setEmailError("Email must contain @ symbol");
    } else {
      setEmailError("");
    }

    // Update the email state
    setEmail(newEmail);
  };

  // Function for Password Validation
  const handlePasswordValidation = (newPassword: string) => {
    // Check if the entered password is less 6 or more characters, one number, one uppercase & one lower case.
    if (/^(?=.*\d)(?=.*[a-zA-Z]).{8,}$/g.test(newPassword)) {
      setPasswordError("");
    } else {
      setPasswordError(
        "8 or more characters, one number, one uppercase & one lower case."
      );
    }

    //  Update the password state
    setPassword(newPassword);
  };

  // Function for password confirmation
  const handlePasswordConfirmation = (newPassword: string) => {
    console.log("Checking password");
    if (newPassword === password) {
      setPasswordConfirmError("Password Matches ✔");
      // console.log("Password matches ");
    } else {
      setPasswordConfirmError("Password does not match ❌");
      // console.log("Password does not match ");
    }
    // Update the Confirm password state
    setPasswordConfirm(newPassword);
    console.log(passwordConfirm);
  };

  
return (
    <section className="section-register">
      <div
        className="form-div"
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
      >
        <form
          className="input-group"
          onSubmit={registerAuthentication}
        >
          <div className="form-heading">
            <h1><span className="cliply-text">Welcome</span> 👋</h1>
            <h2>Register</h2>
            <p>Create an account to get started</p>
          </div>
  
          <div>
            <input
              name="name"
              id="name"
              type="text"
              value={name}
              placeholder="Username"
              required
              onChange={handleNameValidation}
            />
            {nameError && (
              <p className="error-message">{nameError}</p>
            )}
          </div>
  
          <div>
            <input
              name="email"
              id="email"
              type="email"
              value={email}
              placeholder="Email address"
              required
              onChange={handleEmailValidation}
            />
            {emailError && (
              <p className="error-message">{emailError}</p>
            )}
            {passError && (
              <p className="pass-error">{passError}</p>
            )}
          </div>
  
          <div>
            <PasswordInput
              onChange={handlePasswordValidation}
              placeholder="Password"
            />
            {passwordError && (
              <p className="error-message">{passwordError}</p>
            )}
          </div>
  
          <div>
            <PasswordInput
              onChange={handlePasswordConfirmation}
              placeholder="Confirm password"
            />
            {passwordConfirmError && (
              <p className="error-message">
                {passwordConfirmError}
              </p>
            )}
          </div>
  
          {verification && (
            <p className="success-message">
              {verification}
            </p>
          )}
  
          <div style={{ marginTop: '1.25em', display: 'flex', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <button
              className="button"
              type="submit"
            >
              Register
            </button>
          </div>
  
          <Spinner isLoading={isLoading} />
  
          <div>
            <p className="form-heading-p">
              <span> Already have an account?</span>
              <Link
                to="/login"
                className="link"
              >
                Login
              </Link>
            </p>
          </div>
        </form>
  
        <div className="terms">
          <p>
            By registering, you agree to Cliply's Terms of Service, Privacy Policy and Acceptable Use Policy.
          </p>
        </div>
      </div>
    </section>
  );
}

export default RegisterPage;