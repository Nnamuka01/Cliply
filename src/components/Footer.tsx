import React, { useState, useEffect, useRef } from "react";
import Icon from "../assets/logo.png";
import "animate.css";
import "../css/Footer.css";

const Footer: React.FC = () => {
  const [isIntersecting, setIsIntersecting] = useState<boolean>(false);
  const animatedElementRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (animatedElementRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            setIsIntersecting(entry.isIntersecting);
          });
        },
        { threshold: 0.2 }
      );
      observer.observe(animatedElementRef.current);
      return () => observer.disconnect();
    } else {
      console.error("Element is null");
    }
  }, []);

  function handleScrollToTop() {
    window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
  }

  return (
    <footer className="footer">
      <p>&copy; 2024 Cliply </p>

      <div className="flex justify-center items-center gap-[1em]">
        <div>
          <img src={Icon} className="logo" alt="Logo" />
        </div>
        <p>
          <a href="#features" className="link">
            Features
          </a>
        </p>
        <p>
          <a href="#pricing" className="link">
            Pricing
          </a>
        </p>

        <button
          ref={animatedElementRef}
          className={`icon-button ${
            isIntersecting ? "animate__bounce" : ""
          } animate__animated animate__repeat-2`}
          onClick={handleScrollToTop}
        >
          <ion-icon name="arrow-up-outline"></ion-icon>
        </button>
      </div>
    </footer>
  );
};

export default Footer;