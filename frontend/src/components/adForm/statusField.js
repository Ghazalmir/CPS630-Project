import { useState } from "react";
import AvailabilityStatus from "../../components/general/availabilityStatus";

function StatusFields(props) {
  const [currentStatus, setStatus] = useState(props.status);

  return (
    <div>
      <h2>Item Status</h2>
      <div className="mb-3">Status: <AvailabilityStatus available={currentStatus}/></div>
      <div className="mb-3 form-check form-switch">
        <label className="form-check-label" htmlFor="meet-on-campus">
          Availability
        </label>
        <input className="form-check-input" type="checkbox" name="isAvailable" value={currentStatus} id="is-available" checked={currentStatus}
                onChange={() => {setStatus(!currentStatus)}
            }
        />
      </div>
    </div>
  );
}

export default StatusFields;