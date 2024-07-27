import { useState } from "react";
import { Link } from "react-router-dom";
import SignIn from "../assets/sign-in.png";
import Logo from "../assets/logo.png";
import "../css/Navbar.css";

const NavBar: React.FC = () => {
  const [open, setOpen] = useState(false);

  const Links = [
    { name: "Features", link: "#features", newtab: false },
    { name: "Pricing", link: "#pricing", newtab: false },
  ];

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth >= 768) {
  //       setOpen(false);
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <header className={`first-header ${open ? "header-md" : ""}`}>
      <nav className="second-header">
        <div className="first-div">
          <img src={Logo} className="logo-img" alt="Logo" />

          {/* Move button and links to the right */}
          <div className="ml-auto">
            <button onClick={() => setOpen(!open)} className="first-btn">
              <ion-icon
                name={open ? "close" : "menu"}
                className="first-ion"
              ></ion-icon>
            </button>

            {/* Links container */}
            <div
              className={`nav-links ${open ? "open" : "closed"} ${
                open ? "" : "links-md"
              }`}
            >
              <ul className={`nav-ul ${open ? "" : "link-list-md"}`}>
                {Links.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.link}
                      className="nav-a"
                      {...(link.newtab
                        ? { target: "_blank" }
                        : { target: "_self" })}
                      rel="noreferrer"
                      onClick={() => setOpen(false)}
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>

              {/* Buttons */}
              <div className={`second ${open ? "" : "btn-container-md"}`}>
                <button className="second-btn">
                  <Link to="/login" className="login-link">
                    <span>Login</span>
                    <img src={SignIn} className="sign-in" alt="Arrow-icon" />
                  </Link>
                </button>
                <button className="third-btn">
                  <Link to="/register" className="login-link">
                    Register Now
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
