import { useState, useCallback } from "react";
import Cursor from "./components/Cursor";
import "./styles.css";
import { buttons } from "./config";

import { useLazyRef } from "./utils";

// https://4.imimg.com/data4/GY/RX/ANDROID-40083844/product-500x500.jpeg

let GLOBAL_INDEX = -1;

function customDebounce(callbackFn, delayMs) {
  function internalFn(...args) {
    GLOBAL_INDEX = GLOBAL_INDEX + 1;
    clearTimeout(internalFn.token);
    const execute = () => {
      callbackFn(...args);
      clearTimeout(internalFn.token);
      internalFn.token = null;
      GLOBAL_INDEX = -1;
    };
    internalFn.token = setTimeout(execute, delayMs);
    internalFn.executeNow = execute;
  }
  internalFn.token = null;
  return internalFn;
}

export default function App() {
  const [message, setMessage] = useState("");
  const [activeButtonLabel, setActiveButtonLabel] = useState("");

  const _setMessage = useCallback(({ value = "" }) => {
    const _index = GLOBAL_INDEX % value.length;
    const _ch = value[_index];
    setMessage((m) => m + _ch);
  }, []);

  const debounceSetMessage = useLazyRef(() => {
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
    setMessage((m) => m.substring(0, m.length - 1));
  };

  const renderButtons = () => {
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
          {value != "" && <div>({value})</div>}
        </button>
      );
    });
  };

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
        <button className="key" onClick={handleDeleteClick}>
          Delete
        </button>
        <div className="keypad">{renderButtons()}</div>
      </div>
    </div>
  );
}
