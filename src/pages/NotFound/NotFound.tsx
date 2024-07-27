import { useNavigate } from "react-router-dom";
import "./notFound.css"

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };
  return (
    <div className="nf-container">
      <h2 className="nf-title">Not Found.</h2>
      <h4
        onClick={handleGoBack}
        className="go-back"
      >
        Go back
      </h4>
    </div>
  );
};

export default NotFound;