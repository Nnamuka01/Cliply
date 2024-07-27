import Logo from "../../assets/logo.png";
import Form from "../../components/Form";
import Spinner from "../../components/Spinner";
import ShortLink from "../../components/ShortenedLink";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { supabase } from "../../config/supabaseClient.js";
import moment from "moment";
import "./dashboard.css";

const DashboardPage: React.FC = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [notification, setNotification] = useState<boolean>(false);
  const [profile, setProfile] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [invalidLink, setInValidLink] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<null>(null);
  const [shortUrl, setShortUrl] = useState("");
  const [qrCode, setQrCode] = useState("");
  const navigate = useNavigate();
  const { email } = useParams();
  const [tabledData, setTabledData] = useState<any>([]);

  const handleClick = () => {
    if (notification) {
      setNotification(false);
    }
    setIsOpen(!isOpen);
  };

  const handleNotification = () => {
    if (isOpen) {
      setIsOpen(false);
    }

    if (profile) {
      setProfile(false);
    }
    setNotification(!notification);
  };

  const handleProfile = () => {
    if (notification) {
      setNotification(false);
    }
    setProfile(!profile);
  };

  const handleOutsideClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (
      target &&
      (target.id === "dropdown-button" || target.id === "dropdown")
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

  const logOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsLoading(true);
      navigate("/");
    } catch (err) {
      console.error(err);
    }
  };

  const handleInputFocus = () => {
    setInValidLink(false);
  };

  const getUserData = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data, error } = await supabase
        .from("cliply-url")
        .select()
        .eq("user_id", user.id);

      if (error) {
        console.error(error, "Error");
      } else {
        setTabledData(data || []);
      }
    }
  };

  useEffect(() => {
    getUserData();
  }, []);

  const dashboardFormSubmit = async (longUrl: string) => {
    setIsLoading(true);

    // validate and prepare the long url
    const linkValid = /^https?:\/\/[^\s/$.?#].[^\s]*$/.test(longUrl);
    console.log(linkValid);

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

    const timestamp = new Date();

    // get the authenticated user
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setIsLoading(false);
      return;
    }

    console.log(user);

    try {
      // shorten the url using external API
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
        const result = data?.data?.tiny_url;
        const qrCode = data.data.tiny_url;
        console.log(result, "result");

        // insert the new url data into the supabase table
        await supabase.from("cliply-url").insert([
          {
            name: user.email,
            original_link: longUrl,
            shortened_url: result,
            created_at: timestamp,
            created_at_date: timestamp,
            user_id: user?.id || "null",
            is_authenticated: user?.role === "authenticated" ? true : false,
            status: result ? "Active" : "Inactive",
            clicks: 1,
          },
        ]);

        setShortUrl(result);
        console.log("Shorturl", shortUrl);
        console.log(qrCode, "qrcode");
        setQrCode(qrCode);

        getUserData();
      } else {
        console.error("Error", response.statusText);
        throw new Error("Failed to shorten URL");
      }
    } catch (err: any) {
      console.error(err.message);
      setErrorMessage(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="dashboard-section">
      <header className="dsh">
        <nav className="dsn">
          <div className="ds1">
            <div>
              <img src={Logo} className="ds1-img" alt="Logo" />
            </div>
            {/* this is for mobile */}
            <div>
              <div
                className="mobile-only"
                style={{ position: "absolute", top: "20px", right: "60px" }}
              >
                <button
                  onClick={handleProfile}
                  style={{
                    fontSize: "2rem",
                    backgroundColor: "#2d2d2d",
                    borderRadius: "40px",
                    height: "35px",
                    width: "35px",
                  }}
                >
                  <ion-icon name="person-circle-outline"></ion-icon>
                </button>
                {profile && (
                  <div className="profile-div">
                    <button
                      style={{
                        border: "2px solid",
                        backgroundColor: "#9e9aa7",
                        padding: "0.5em",
                        borderRadius: "50%",
                        display: "flex",
                        alignItems: "center",
                      }}
                      onClick={handleClick}
                    >
                      <span style={{ width: "16.6em", padding: "0.5em" }}>
                        Welcome {email}
                      </span>
                      <span
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "rotate(0)",
                        }}
                      >
                        <svg
                          style={{ height: "1.75em", width: "1.75em" }}
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.657 6.586 4.293 7.95l.707.707L10 13.757z" />
                        </svg>
                      </span>
                    </button>
                    {isOpen && (
                      <div
                        style={{
                          position: "absolute",
                          top: "3.5em",
                          right: "0",
                          width: "6em",
                          boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                          borderRadius: "0.5em",
                        }}
                      >
                        <button
                        className="log-div"
                          style={{
                            display: "flex",
                            gap: "0.5em",
                            padding: "0.5em",
                            width: "100%",
                          }}
                          onClick={logOut}
                        >
                          <span>Logout</span>
                          <span>
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 512 512"
                              style={{ height: "1.5em", width: "1.5em" }}
                            >
                              <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
                            </svg>
                          </span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div style={{ position: "relative", top: "-5px" }}>
                <button
                  style={{
                    backgroundColor: "#007BFF",
                    borderRadius: "50%",
                    width: "2.5em",
                    height: "2.5em",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={handleNotification}
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.97656 0C8.50781 0 8.97656 0.46875 8.97656 1V1.625C11.2578 2.0625 12.9766 4.09375 12.9766 6.5V7.09375C12.9766 8.5625 13.5078 10 14.4766 11.0938L14.6953 11.3438C14.9766 11.6562 15.0391 12.0625 14.8828 12.4375C14.7266 12.7812 14.3516 13 13.9766 13H1.97656C1.57031 13 1.19531 12.7812 1.03906 12.4375C0.882812 12.0625 0.945312 11.6562 1.22656 11.3438L1.44531 11.0938C2.41406 10 2.97656 8.5625 2.97656 7.09375V6.5C2.97656 4.09375 4.69531 2.0625 6.97656 1.625V1C6.97656 0.46875 7.41406 0 7.97656 0ZM9.38281 15.4375C9.00781 15.8125 8.50781 16 7.97656 16C7.44531 16 6.91406 15.8125 6.53906 15.4375C6.16406 15.0625 5.97656 14.5312 5.97656 14H7.97656H9.97656C9.97656 14.5312 9.75781 15.0625 9.38281 15.4375Z"
                      fill="white"
                    />
                  </svg>
                </button>
                {notification && (
                  <div
                    style={{
                      position: "absolute",
                      top: "3.5em",
                      right: "0",
                      color: "white",
                    }}
                  >
                    <p>No notification</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* this is for laptop */}
          <div
            className="laptop"
            style={{
              gap: "1em",
              alignItems: "center",
              justifyContent: "flex-end",
            }}
          >
            <div style={{ position: "relative", top: "-50px", right: "50px", display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
              <button
                style={{
                  border: "2px solid",
                  backgroundColor: "#f3f3f3",
                  padding: "0.5em",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                }}
                onClick={handleClick}
              >
                <span style={{ width: "16.6em", padding: "0.5em" }}>
                  Welcome {email}
                </span>
                <span
                  style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}
                >
                  <svg
                    style={{ height: "1.75em", width: "1.75em" }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.657 6.586 4.293 7.95l.707.707L10 13.757z" />
                  </svg>
                </span>
              </button>
              {isOpen && (
                <div
                  style={{
                    position: "absolute",
                    top: "3.5em",
                    right: "0",
                    backgroundColor: "#ff3366",
                    width: "6em",
                    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
                    borderRadius: "0.5em",
                  }}
                >
                  <button
                  className="log-div"
                    style={{
                      display: "flex",
                      gap: "0.5em",
                      padding: "0.5em",
                      width: "100%",
                    }}
                    onClick={logOut}
                  >
                    <span>Logout</span>
                    <span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                        style={{ height: "1.5em", width: "1.5em" }}
                      >
                        <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 192 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l210.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128zM160 96c17.7 0 32-14.3 32-32s-14.3-32-32-32L96 32C43 32 0 75 0 128L0 384c0 53 43 96 96 96l64 0c17.7 0 32-14.3 32-32s-14.3-32-32-32l-64 0c-17.7 0-32-14.3-32-32l0-256c0-17.7 14.3-32 32-32l64 0z" />
                      </svg>
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>
          <div
            style={{
              marginTop: "5em",
              display: "flex",
              flexDirection: "column",
              width: "100%",
              alignItems: "center",
            }}
          >
            <Form
              onSubmit={dashboardFormSubmit}
              onFocus={handleInputFocus}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              {/* Form content */}
            </Form>
            <div style={{ display: "block" }}>
              <p
                style={{
                  color: "red",
                  textAlign: "center",
                  marginBottom: "1em",
                }}
              >
                {invalidLink ? "Please enter a valid link" : ""}
              </p>
              {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}
              {/* Spinner Component */}
              <Spinner isLoading={isLoading} />
              {shortUrl && <ShortLink url={shortUrl} qrcode={qrCode} />}
            </div>
          </div>
        </nav>
      </header>
      <div>
        <div className="res-container"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1em",
            alignItems: "center",
            justifyContent: "center",
            margin: "2em auto",
            maxWidth: "1100px",
          }}
        >
          <table className="res-table"
            style={{
              width: "100%",
              borderCollapse: "collapse",
              backgroundColor: "#f3f3f3",
              border: "2px solid #ddd",
            }}
          >
            <thead>
              <tr>
                <th style={{ padding: "1em", borderBottom: "1px solid #ddd" }}>
                  Original URL
                </th>
                <th style={{ padding: "1em", borderBottom: "1px solid #ddd" }}>
                  Shortened URL
                </th>
                <th style={{ padding: "1em", borderBottom: "1px solid #ddd" }}>
                  Date
                </th>
                <th style={{ padding: "1em", borderBottom: "1px solid #ddd" }}>
                  Clicks
                </th>
                <th style={{ padding: "1em", borderBottom: "1px solid #ddd" }}>
                  Active
                </th>
              </tr>
            </thead>
            <tbody>
              {tabledData.map((data: any) => (
                <tr key={data.id} style={{ textAlign: "center" }}>
                  <td
                    style={{ padding: "1em", borderBottom: "1px solid #ddd" }}
                  >
                    {data.original_link}
                  </td>
                  <td
                    style={{ padding: "1em", borderBottom: "1px solid #ddd" }}
                  >
                    {data.shortened_url}
                  </td>
                  <td
                    style={{ padding: "1em", borderBottom: "1px solid #ddd" }}
                  >
                    {moment(data.created_at_date).format("MMMM-DD-YYYY H:MM: SS")}
                  </td>
                  <td>{data.clicks}</td>
                  <td
                    style={{
                      display: "flex",
                      gap: "8px",
                      alignItems: "center",
                      justifyContent: "center",
                      border: "none",
                      color: data.status ? "#1EB036" : "#B0901E",
                    }}
                  >
                    {data.status}
                    <span>
                      {data.status ? (
                        <svg
                          width="36"
                          height="35"
                          viewBox="0 0 36 35"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.25"
                            width="35"
                            height="35"
                            rx="17.5"
                            fill="#1EB036"
                            fillOpacity="0.14"
                          />
                          <path
                            d="M25.6895 17.875L22.0273 21.5371C20.5625 23.002 18.1895 23.002 16.7539 21.5371C15.3477 20.1309 15.2598 17.9043 16.5488 16.4395L16.7246 16.2637C16.8711 16.0586 17.1934 16.0293 17.3691 16.2051C17.5742 16.3809 17.6035 16.6738 17.4277 16.8789L17.2812 17.0547C16.3145 18.168 16.373 19.8379 17.3984 20.8633C18.5117 21.9766 20.2695 21.9766 21.3828 20.8633L25.0156 17.2305C26.1289 16.1172 26.1289 14.3594 25.0156 13.2461C23.9316 12.1621 22.1445 12.1621 21.0605 13.2461L20.3867 13.9199C20.2109 14.0957 19.918 14.0957 19.7129 13.9199C19.5371 13.7148 19.5371 13.4219 19.7129 13.2461L20.3867 12.5723C21.8516 11.1074 24.2246 11.1074 25.6895 12.5723C27.1543 14.0371 27.1543 16.4102 25.6895 17.875ZM9.78125 17.875L13.4434 14.2422C14.9082 12.7773 17.252 12.7773 18.7461 14.2422C20.123 15.6191 20.2109 17.8457 18.9219 19.3398L18.7461 19.5156C18.5996 19.7207 18.3066 19.75 18.1016 19.5742C17.8965 19.3984 17.8672 19.1055 18.043 18.9004L18.2188 18.7246C19.1562 17.6113 19.0977 15.9414 18.0723 14.916C16.959 13.8027 15.2012 13.8027 14.0879 14.916L10.4551 18.5488C9.3418 19.6621 9.3418 21.4199 10.4551 22.5332C11.5391 23.6172 13.3262 23.6172 14.4102 22.5332L15.084 21.8594C15.2598 21.6836 15.5527 21.6836 15.7578 21.8594C15.9336 22.0352 15.9336 22.3574 15.7578 22.5332L15.084 23.1777C13.6191 24.6426 11.2461 24.6426 9.78125 23.1777C8.31641 21.7129 8.31641 19.3398 9.78125 17.875Z"
                            fill="#C9CED6"
                          />
                        </svg>
                      ) : (
                        <svg
                          width="36"
                          height="35"
                          viewBox="0 0 36 35"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <rect
                            x="0.25"
                            width="35"
                            height="35"
                            rx="17.5"
                            fill="#B0901E"
                            fillOpacity="0.19"
                          />
                          <path
                            d="M9.10742 10.4922L26.9492 24.5547C27.125 24.7012 27.1836 25.0234 27.0078 25.1992C26.8613 25.4043 26.5684 25.4629 26.3633 25.2871L8.55078 11.2246C8.3457 11.0781 8.28711 10.7559 8.46289 10.5801C8.60938 10.375 8.93164 10.3164 9.10742 10.4922ZM25.6895 17.875L23.5215 20.0723L22.7891 19.4863L25.0156 17.2305C26.1289 16.1172 26.1289 14.3594 25.0156 13.2461C23.9316 12.1621 22.1445 12.1621 21.0605 13.2461L20.3867 13.9199C20.2109 14.0957 19.918 14.0957 19.7129 13.9199C19.5371 13.7148 19.5371 13.4219 19.7129 13.2461L20.3867 12.5723C21.8516 11.1074 24.2246 11.1074 25.6895 12.5723C27.1543 14.0371 27.1543 16.4102 25.6895 17.875ZM20.5039 22.4746C19.2148 22.8555 17.7793 22.5625 16.7539 21.5371C15.9629 20.7461 15.582 19.6914 15.6699 18.6367L16.6367 19.3984C16.7246 19.9551 16.9883 20.4531 17.3984 20.8633C17.9844 21.4492 18.7754 21.7422 19.5371 21.6836L20.5039 22.4746ZM18.0723 14.916V14.8867C17.4863 14.3301 16.6953 14.0371 15.9336 14.0664L14.9668 13.3047C16.2559 12.9238 17.7207 13.2168 18.7168 14.2422C19.5078 15.0332 19.8887 16.0879 19.8301 17.1426L18.834 16.3809C18.7461 15.8242 18.4824 15.3262 18.0723 14.916ZM12.7109 16.293L10.4551 18.5488C9.3418 19.6621 9.3418 21.4199 10.4551 22.5332C11.5391 23.6172 13.3262 23.6172 14.4102 22.5332L15.084 21.8594C15.2598 21.6836 15.5527 21.6836 15.7578 21.8594C15.9336 22.0352 15.9336 22.3574 15.7578 22.5332L15.084 23.1777C13.6191 24.6426 11.2461 24.6426 9.78125 23.1777C8.31641 21.7129 8.31641 19.3398 9.78125 17.875L11.9492 15.707L12.7109 16.293Z"
                            fill="#B0901E"
                          />
                        </svg>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;