import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "../../components/Navbar";
import Pricing from '../../components/Pricing';
import Features from "../../components/Features";
import Form from "../../components/Form";
import ShortLink from "../../components/ShortenedLink";
import Footer from "../../components/Footer";
import Spinner from "../../components/Spinner";
import "./landing.css";
import TabletTable from '../../assets/Frame 39.png';
import MobileTable from "../../assets/Frame 39 (1).png";


const LandingPage: React.FC = () => {
  const [shortUrl, setShortUrl] = useState("");
  const [qrCode, setQrCode] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [invalidLink, setInValidLink] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<null>(null);
  const [count, setCount] = useState<number>(0);
  const [countMessage, setCountMessage] = useState<boolean>(false);

  const handleFormSubmit = async (longUrl: string) => {
    setIsLoading(true);

    // Check if the input is a valid URL
    const linkValid = /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(longUrl);
    console.log(linkValid);

    // Ensure the link has http:// or https:// prefix
    const updateLinkValid =
      longUrl.startsWith("http://") || longUrl.startsWith("https://")
        ? longUrl
        : `https://${longUrl}`;

    if (!updateLinkValid) {
      setInValidLink(true);
      setIsLoading(false);
      return;
    }

    setInValidLink(false);
    console.log(updateLinkValid);

    try {
      const response = await fetch(
        "https://api.tinyurl.com/create?api_token=sX9Z93j8f6BRAy10xkh4esULwnyvDrUO5LaMgmLjGFLKSiMJenrmFsmiv0jD",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: updateLinkValid,
            domain: "tinyurl.com",
            description: "string",
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log(data);
        const result = data.data.tiny_url;
        console.log(result);
        setShortUrl(result);
        const qrCode = data.data.tiny_url;
        console.log(qrCode);
        setQrCode(qrCode);

        // Increment link count after successfully shortening a link
        setCount((prevCount) => prevCount + 1);

        // Check if the user has shortened two links, then show the popup
        if (count + 1 >= 2) {
          setCountMessage(true);
        }
      } else {
        console.error("Error", response.statusText);
      }
    } catch (err: any) {
      console.error(err.message);
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputFocus = () => {
    setInValidLink(false);
  };

  return (
    <section className="landingPage">
      <NavBar />
      <div className="hero">
        {/* Texts */}
        <div className="hero-text">
          <h1 className="hero__p">Your Links Can Now Be Shortened here 100%</h1>

          <p className="text-primaryLite text-base">
            Cliply stands out as the premier platform for link management and
            easy-to-use URL shortening service that streamlines your{" "}
            <br className="hidden md:block"></br>online experience.
          </p>
        </div>

        {/* Link Input, Toggle Switch and so.... */}
        <div className="flex-center flex-column gap-1-9em lg:gap-1-5em">
          {/* Link Input */}

          <Form
            onSubmit={handleFormSubmit}
            onFocus={handleInputFocus}
            style={{ width: "90%", maxWidth: "30em" }}
          />
          <p className="error-text">
            {invalidLink ? "Please enter a valid link" : ""}
          </p>
          {errorMessage && <p className="error-text">{errorMessage}</p>}
          <Spinner isLoading={isLoading} />

          {shortUrl && <ShortLink url={shortUrl} qrcode={qrCode} />}

          {/* Toggle switch and Texts */}
          <div className="flex-center flex-column text-primaryLite gap-1-3em">
            {countMessage && (
              <p className="text-sm flex-center text-center gap-2 text-primaryLite">
                <span>
                  <Link
                    to="/register"
                    className="link sm-no-underline font-semibold sm-font-normal cursor-pointer sm:hover-underline"
                  >
                    <span className="linkly-text font-semibold">
                      Register Now
                    </span>
                  </Link>{" "}
                  to enjoy Unlimited usage
                </span>
              </p>
            )}
          </div>

          {/* Pictures */}
          <div className="table-div">
            <div className="laptop-img-div">
              <img
                src={TabletTable}
                alt="Table showing Links Shortened on Desktop Screen"
              />
              <p className="text-sm text-primaryLite text-center mt-negative-2em">
                <Link
                  to="/register"
                  className="text-primaryBlue underline pr-1"
                >
                  Register Now
                </Link>
                to enjoy Unlimited History
              </p>
            </div>
            <div className="mobile-img-div">
              <img
                src={MobileTable}
                alt="Table showing Links Shortened on Mobile Screen"
              />
            </div>
          </div>
        </div>
      </div>

      <Features />
      <Pricing />
      <Footer />
    </section>
  );
};

export default LandingPage;