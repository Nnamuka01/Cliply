import Reason1 from '../assets/FeatureAssets/Group 6.svg';
import Reason2 from '../assets/FeatureAssets/Frame 1000001718.svg';
import Reason3 from '../assets/FeatureAssets/Frame 1000001695.svg';
import Reason4 from '../assets/FeatureAssets/Frame 1000001695 (1).svg';
import '../css/Features.css';

const Features: React.FC = () => {
  const ReasonsForCliply = [
    // first reason
    {
      image: Reason1,
      alt: "Link icon",
      title: "URL Shortening",
      description:
        "Cliply allows you to shorten URLs of your business, events. Shorten your URL at scale, URL redirects.",
    },

    // second reason
    {
      image: Reason2,
      alt: "Editing Icon",
      title: "Custom URLs",
      description:
        "With Cliply, you can create custom URLs, with the length you want! A solution for socials and businesses.",
    },

    // third reason
    {
      image: Reason3,
      alt: "QR Codes Icon",
      title: "QR Codes",
      description:
        " Generate QR codes to your business, events. Bring your audience and customers to your doorstep with this scan and go solution.",
    },

    // fourth reason
    {
      image: Reason4,
      alt: "Data Analytics Icon",
      title: "Data Analytics",
      description:
        "Receive data on the usage of either your shortened URL, custom URLs or generated QR codes. Embedded to monitor progress.",
    },
  ];

  return (
    <section className="section" id="features">
      {/* Why choose Cliply */}
      <div>
        <h2>
          Why choose <span className="cliply-text">Cliply</span>
        </h2>
        <p>
          In an increasingly connected world, managing your online presence is
          crucial. Cliply stands out as the premier platform for link
          management, offering a suite of features designed to simplify and
          enhance your digital interactions. From shortening URLs to customizing
          them for brand consistency, Cliply provides an intuitive and powerful
          solution. With advanced analytics, you gain valuable insights into
          link performance, helping you optimize your marketing strategies.
          Additionally, our seamless QR code generation makes offline-to-online
          interactions effortless, while our robust tracking capabilities ensure
          you stay informed about your audience's engagement. Whether you're an
          individual, small business, or large enterprise, Cliply empowers you
          to take control of your links with unmatched ease and efficiency.
        </p>
      </div>

      {/* Reasons */}
      <div className="grid-container">
        {ReasonsForCliply.map((reason, index) => (
          <div key={index} className="card">
            <div>
              <img src={reason.image} alt={reason.alt} />
            </div>
            <h3>{reason.title}</h3>
            <p>{reason.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;