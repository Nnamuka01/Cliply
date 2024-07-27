import {CSSProperties, useState } from "react";
import InputLink from '../assets/link.png';
import '../css/Form.css'

interface FormProps {
  onSubmit: (url: string) => void;
  onFocus: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style: CSSProperties;
}

const Form: React.FC<FormProps> = ({ onSubmit, onFocus, style }) => {
  const [url, setUrl] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(url);
  };

  const handleLinkFocus = (e: React.FocusEvent<HTMLInputElement>) => {
    console.log("Link is now focused", onFocus);
    onFocus(e);
  };

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <div className="form-content" style={style}>
        <img src={InputLink} alt="Link Icon" className="link-icon" />
        <input
          className="input-field"
          placeholder="Enter the link here"
          required
          id="url"
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          onFocus={handleLinkFocus}
        />
        <button className="submit-button" type="submit">
          Shorten!
        </button>
      </div>
    </form>
  );
};

export default Form;