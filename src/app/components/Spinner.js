import { BeatLoader } from "react-spinners";
import { primary } from "../lib/colors";

function Spinner() {
  return (
    <BeatLoader
      style={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      color={primary}
    />
  );
}

export default Spinner;
