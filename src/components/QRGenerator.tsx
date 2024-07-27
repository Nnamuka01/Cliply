import { useRef } from "react";
import React from "react";
import QRCode from "qrcode.react";
import '../css/QRCode.css'

interface QRGeneratorComponentProps {
    qrUrl: string;
}

const QRCodeGenerator: React.FC<QRGeneratorComponentProps> = ({ qrUrl }) => {
  const qrCodeRef = useRef<HTMLDivElement>(null);

  function downloadQRCode() {
    if (qrCodeRef.current) {
      const canvas = qrCodeRef.current.querySelector("canvas");
      if (canvas) {
        const pngUrl = canvas
          .toDataURL("image/png")
          .replace("image/png", "image/octet-stream");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = "qrcode.png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      }
    }
  }

  return (
    <div className="flex justify-center flex-col items-center gap-3">
      <div ref={qrCodeRef}>
        <QRCode value={qrUrl} />
      </div>
      <button
        onClick={() => window.open(qrUrl, "_blank")}
        className="bg-primaryBlue p-1 px-2 rounded-md font-semibold"
      >
        <a onClick={downloadQRCode}>Download QR Code</a>
      </button>
    </div>
  );
};

export default QRCodeGenerator;