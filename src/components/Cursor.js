import { useEffect, useState } from "react";

const defaultCursorCharacter = "|";
const emptyCursorCharacter = "";

function swithCursorCharacter(ch) {
  if (ch === defaultCursorCharacter) return emptyCursorCharacter;
  return defaultCursorCharacter;
}
function Cursor(props) {
  const [cursor, setCursor] = useState(defaultCursorCharacter);

  useEffect(() => {
    const token = setInterval(() => {
      setCursor(swithCursorCharacter);
    }, 500);
    return () => clearInterval(token);
  }, []);

  const className = cursor ? "cursor" : "";
  return <span className={className} />;
}

export default Cursor;
