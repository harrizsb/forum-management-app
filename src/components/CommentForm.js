/** @jsx jsx */

import { jsx } from "@emotion/core";
import { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { useDispatch, useSelector, shallowEqual } from "react-redux";
import { addComment } from "../redux/action";

export default ({ topicID }) => {
  const dispatch = useDispatch();
  const [comment, setComment] = useState("");
  const { userInfo } = useSelector(
    (state) => ({
      userInfo:
        (state.user.userInfo &&
          (state.user.userInfo.displayName || state.user.userInfo.username)) ||
        null,
    }),
    shallowEqual
  );

  const submitComment = (event) => {
    event.preventDefault();
    setComment("");

    dispatch(addComment({ comment, username: userInfo, topicID }));
  };

  return (
    <form autoComplete="off" noValidate onSubmit={submitComment}>
      <TextField
        label="Comment"
        multiline
        rows={4}
        variant="outlined"
        fullWidth={true}
        onChange={(event) => {
          setComment(event.target.value);
        }}
        value={comment}
      />
      <Button
        css={{
          marginTop: 10,
        }}
        variant="contained"
        color="primary"
        type="submit"
        fullWidth={true}
        disabled={comment === ""}
      >
        Submit
      </Button>
    </form>
  );
};
