import "../pages/LandingPage/landing.css";

interface SpinnerProps {
  isLoading: boolean;
}

const Spinner: React.FC<SpinnerProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return <span className="loader"></span>;
};

export default Spinner;