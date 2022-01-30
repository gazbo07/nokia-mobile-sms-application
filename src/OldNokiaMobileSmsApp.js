import { useState } from "react";
import Cursor from "./components/Cursor";
import "./styles.css";
import { buttons } from "./config";

import { customDebounce, useLazyRef } from "./utils";

// https://4.imimg.com/data4/GY/RX/ANDROID-40083844/product-500x500.jpeg

export default function OldNokiaMobileSmsApp() {
  const [message, setMessage] = useState("");
  const [activeButtonLabel, setActiveButtonLabel] = useState("");

  const debounceSetMessage = useLazyRef(() => {
    const _setMessage = ({ ch = "" }) => {
      setMessage((message) => message + ch);
    };
    return customDebounce(_setMessage, 500);
  });

  const handleButtonClick = (event) => {
    const { label, value } = event.currentTarget.dataset;
    const button = { label, value };

    const isSameButtonClick = label === activeButtonLabel;
    const isLastActionComplete = !debounceSetMessage.token;
    if (!isSameButtonClick && !isLastActionComplete) {
      debounceSetMessage.executeNow();
    }
    debounceSetMessage(button);
    setActiveButtonLabel(label);
  };

  const handleDeleteClick = () => {
    setMessage(message.substring(0, message.length - 1));
  };

  const clearMessage = () => {
    setMessage("");
  };

  const renderKeypad = () => {
    return buttons.map((button) => {
      const { label, value, isDisabled } = button;
      return (
        <button
          key={label}
          className="key"
          data-label={label}
          data-value={value}
          onClick={handleButtonClick}
          disabled={isDisabled}
        >
          {label}
          {value != "" && (
            <div>
              <q>{value}</q>
            </div>
          )}
        </button>
      );
    });
  };

  const isEmptyMessage = message === "";

  return (
    <div className="App">
      <div className="nokia-mobile">
        <div className="screen">
          <p className="message">
            {message}
            <Cursor />
          </p>
        </div>
        <p>word count: {message.length}</p>
        <button
          className="key"
          onClick={clearMessage}
          disabled={isEmptyMessage}
        >
          Clear All
        </button>
        <button
          className="key"
          onClick={handleDeleteClick}
          disabled={isEmptyMessage}
        >
          Delete
        </button>
        <div className="keypad">{renderKeypad()}</div>
      </div>
    </div>
  );
}
