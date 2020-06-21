/** @jsx jsx */

import { jsx } from "@emotion/core";
import { useState } from "react";
import { TextField } from "@material-ui/core";
import PostList from "../components/PostList";

export default () => {
  const [searchValue, setSearchValue] = useState("");

  return (
    <div>
      <TextField
        label="Search Topic"
        variant="outlined"
        onChange={(event) => {
          setSearchValue(event.target.value);
        }}
        fullWidth={true}
        css={{
          marginTop: 10,
        }}
        value={searchValue}
      />

      <PostList searchValue={searchValue} />
    </div>
  );
};
