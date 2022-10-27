import BaseCard from "./BaseCard/BaseCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

export default function Loader() {
  return (
      <BaseCard>
        <div className="loading">
          <FontAwesomeIcon icon={faSpinner} className="spinner" />
        </div>
      </BaseCard>
  );
}