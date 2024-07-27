import { useState } from "react";
import SwitchToggle from "./SwitchToggle";
import React from "react";
import QRCodeGenerator from "./QRGenerator";

const ShortLink: React.FC<{
    url: string;
    qrcode: string;
}> = ({ url }) => {
    const [ copied, setCopied ] = useState<boolean>(false);

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url);
        setCopied(true);
    };

    const handleToggle = (checked: boolean) => {
        if (checked) {
            copyToClipboard();
        } else {
            setCopied(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center">
          <p className="custom-p">
            <a href={url} target="_blank" rel="noopener noreferrer">
              {url}
            </a>
          </p>
          {copied && <span className="custom-span">Copied!</span>}
          <div className="flex gap-4 items-center justify-center mt-5">
            <SwitchToggle onChange={handleToggle} onClick={copyToClipboard} />
            <p className="custom-text-base">Auto Paste from Clipboard</p>
          </div>
          <div className="flex items-center justify-center mt-8">
            <QRCodeGenerator qrUrl={url} />
          </div>
        </div>
      );
    
}

export default ShortLink;