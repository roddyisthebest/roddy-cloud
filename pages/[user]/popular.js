import React, { useState } from "react";

import Index from ".";
function Popular() {
  const [now, setNow] = useState(1);
  return (
    <Index
      component={
        <div>
          <button onClick={() => setNow(now + 1)}>up</button>
          <div>{now}</div>
        </div>
      }
    />
  );
}

export default Popular;
