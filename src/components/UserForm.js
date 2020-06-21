/** @jsx jsx */

import { jsx } from "@emotion/core";

import { useState, useEffect } from "react";
import { TextField } from "@material-ui/core";

export default ({ children, triggerChanges }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (username && password) {
      triggerChanges({ username, password });
    }
  }, [username, password]);

  return (
    <form
      noValidate
      autoComplete="off"
      css={{
        "@media (max-width: 425px)": {
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        },
      }}
    >
      <TextField
        variant="outlined"
        label="Username"
        type="text"
        onChange={(event) => {
          setUsername(event.target.value);
        }}
        data-testid="username"
      />
      <TextField
        variant="outlined"
        label="Password"
        type="password"
        onChange={(event) => {
          setPassword(event.target.value);
        }}
        data-testid="password"
      />

      <div>{children}</div>
    </form>
  );
};
