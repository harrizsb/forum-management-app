/** @jsx jsx */

import { jsx } from "@emotion/core";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, TextField } from "@material-ui/core";
import { addTopic } from "../redux/action";

export default () => {
  let history = useHistory();
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    dispatch(
      addTopic({
        title,
        body,
      })
    );
    history.push("/");
  };

  const handleEvent = (event) => {
    event.persist();
    const {
      target: { name, value },
    } = event;

    if (name === "title-topic") {
      setTitle(value);
    } else {
      setBody(value);
    }
  };

  return (
    <div
      css={{
        marginTop: 20,
        marginBottom: 20,
        "& .MuiOutlinedInput-root": {
          marginBottom: 10,
        },
      }}
    >
      <form onSubmit={handleSubmit} autoComplete="off">
        <TextField
          name="title-topic"
          label="Title"
          variant="outlined"
          fullWidth={true}
          onChange={handleEvent}
        />
        <TextField
          name="body-topic"
          label="Body"
          multiline
          rows={4}
          variant="outlined"
          fullWidth={true}
          onChange={handleEvent}
        />
        <Button
          variant="contained"
          color="primary"
          type="submit"
          fullWidth={true}
          disabled={title === "" || body === ""}
        >
          Submit
        </Button>
      </form>
    </div>
  );
};
