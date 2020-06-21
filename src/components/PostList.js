/** @jsx jsx */

import { jsx } from "@emotion/core";
import {
  Grid,
  Typography,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@material-ui/core";
import { useSelector, shallowEqual } from "react-redux";
import { useHistory } from "react-router-dom";
import { Virtuoso } from "react-virtuoso";

export default ({ searchValue }) => {
  let history = useHistory();
  const { topics } = useSelector(
    (state) => ({
      topics:
        searchValue && searchValue !== ""
          ? state.app.topics.filter((val) => val.title.includes(searchValue))
          : state.app.topics,
    }),
    shallowEqual
  );

  const handleClick = (id) => {
    history.push(`/topic/${id}`);
  };

  return (
    <Grid
      css={{
        marginTop: 10,
        marginBottom: 10,
      }}
      container
      spacing={2}
    >
      <Grid item xs={12}>
        <Typography variant="h6">Feed</Typography>
        {topics && topics.length > 0 ? (
          <Virtuoso
            style={{
              width: "100%",
            }}
            item={(index) => {
              const { id, title } = topics[index];
              return (
                <List>
                  <Paper
                    key={id}
                    elevation={1}
                    css={{
                      cursor: "pointer",
                    }}
                  >
                    <ListItem>
                      <ListItemText
                        primary={title}
                        onClick={() => {
                          handleClick(id);
                        }}
                      />
                    </ListItem>
                  </Paper>
                </List>
              );
            }}
            totalCount={topics.length}
          />
        ) : (
          <span>No Posts</span>
        )}
      </Grid>
    </Grid>
  );
};
