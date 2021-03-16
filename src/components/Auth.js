import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

export default function Auth() {
  const history = useHistory();

  useEffect(() => {
    let token = sessionStorage.getItem("__aT__");
    if (token) {
      history.push("/tasks");
    } else {
      history.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="container-fluid bg-white">
      <i className="h-100 fa fa-cog fa-spin" />
    </div>
  );
}
