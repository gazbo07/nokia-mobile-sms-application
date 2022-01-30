import { useState, useRef, useCallback } from "react";
import Cursor from "./components/Cursor";
import "./styles.css";

// https://4.imimg.com/data4/GY/RX/ANDROID-40083844/product-500x500.jpeg

const buttons = [
  { label: "1", value: "", isDisabled: true },
  { label: "2", value: "abc2" },
  { label: "3", value: "def3" },
  { label: "4", value: "ghi4" },
  { label: "5", value: "jkl5" },
  { label: "6", value: "mno6" },
  { label: "7", value: "pqrs7" },
  { label: "8", value: "tuv8" },
  { label: "9", value: "wxyz9" },
  { label: "*", value: "", isDisabled: true },
  { label: "0", value: " " },
  { label: "#", value: "", isDisabled: true }
];

let GLOBAL_INDEX = -1;
const DEFAULT_BUTTON = {
  label: "-1",
  value: ""
};

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

const _obj = {};
function useLazyRef(callbackFn) {
  const ref = useRef(_obj);
  if (ref.current === _obj) {
    ref.current = callbackFn();
  }
  return ref.current;
}

export default function App() {
  const [message, setMessage] = useState("");
  const [activeButtonLabel, setActiveButtonLabel] = useState(DEFAULT_BUTTON);

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
