import { useState } from "react";
import "../css/Switch.css"

// Properties that the toggleSwitch component can receive
interface SwitchToggleProps {
  onChange: (checked: boolean) => void;
  onClick: (copied: boolean) => void;
}

const SwitchToggle: React.FC<SwitchToggleProps> = ({ onChange, onClick }) => {
  const [checked, setChecked] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // handle toggle action
  function handleToggle() {
    // update component state and toggle the checked state
    setChecked(!checked);
    // call the onChange with the updated state
    onChange(!checked);
  }

  // handle copy to clipboard action
  function handleCopy() {
    // update component state and toggle the copied state
    setCopied(!copied);
    // call the onClick with the updated state
    onClick(!copied);
  }

  return (
    <button className="flex items-center space-x-2" onClick={handleCopy}>
      <label className="cursor-pointer">
        <input
          type="checkbox"
          className="hidden"
          checked={checked}
          onChange={handleToggle}
        />
        <div className="switch-container">
          <div
            className={`switch-handle ${
              checked ? "switch-handle-checked" : "switch-handle-unchecked"
            }`}
          ></div>
        </div>
      </label>
    </button>
  );
};

export default SwitchToggle;