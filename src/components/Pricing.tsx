import BlueCheck from '../assets/PricingAssets/check-circle.svg';
import WhiteCheck from '../assets/PricingAssets/check-circle (1).svg';
import { Link } from 'react-router-dom';
import '../css/Pricing.css'

const Pricing: React.FC = () => {
  const FreePlan = [
    {
      image: BlueCheck,
      alt: "Check Icon",
      title: "Basic Link Analysis",
    },

    {
      image: BlueCheck,
      alt: "Check Icon",
      title: "Customizable Short Links",
    },

    {
      image: BlueCheck,
      alt: "Check Icon",
      title: "Standard Support",
    },
  ];

  const ProfessionalPlan = [
    {
      image: WhiteCheck,
      alt: "White Check Icon",
      description: "Enhanced Link Analytics",
    },

    {
      image: WhiteCheck,
      alt: "White Check Icon",
      description: "Advanced Link Customization",
    },

    {
      image: WhiteCheck,
      alt: "White Check Icon",
      description: "Priority Support",
    },
  ];

  const TeamsPlan = [
    {
      image: BlueCheck,
      alt: "Blue Check Icon",
      description: "Team Collaboration",
    },

    {
      image: BlueCheck,
      alt: "Blue Check Icon",
      description: "Enhanced Security",
    },

    {
      image: BlueCheck,
      alt: "Blue Check Icon",
      description: "Dedicated Account Manager",
    },
  ];

  return (
    <section className="section" id="pricing">
      <div className="text-center">
        <h2 className="header-text">Pricing</h2>
        <p className="header-description">
          Choose a plan that works for you, from catering for your personal,
          business, event, socials needs, you can be rest assured we have you in
          mind in our pricing.
        </p>
      </div>

      <div className="pricing-div">
        {/* Free Plan Div */}
        <div className="pricing-card">
          <h2 className="card-title">Basic</h2>
          <h3 className="card-price">Free</h3>
          <p className="card-description">Free plans for all users</p>
          <ul className="card-list">
            {FreePlan.map((free, index) => (
              <li key={index} className="card-list-item">
                <span>
                  <img src={free.image} alt={free.alt} />
                </span>
                <span>{free.title}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Professional Pricing Div */}
        <div className="pricing-card featured">
          <h2 className="card-title">Professional</h2>
          <h3 className="card-price">$8/month</h3>
          <p className="card-description">Ideal for business creators</p>
          <ul className="card-list">
            {ProfessionalPlan.map((professional, index) => (
              <li key={index} className="card-list-item">
                <span>
                  <img src={professional.image} alt={professional.alt} />
                </span>
                <span>{professional.description}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Teams Pricing Div */}
        <div className="pricing-card">
          <h2 className="card-title">Teams</h2>
          <h3 className="card-price">$18/month</h3>
          <p className="card-description">Share with up to 10 users</p>
          <ul className="card-list">
            {TeamsPlan.map((team, index) => (
              <li key={index} className="card-list-item">
                <span>
                  <img src={team.image} alt={team.alt} />
                </span>
                <span>{team.description}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="register-link">
        <p>
          <Link to="/register">Register</Link> to get started
        </p>
      </div>
    </section>
  );
};

export default Pricing;