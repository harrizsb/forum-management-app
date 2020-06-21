/** @jsx jsx */

import { jsx } from "@emotion/core";
import {
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from "@material-ui/core";
import { Virtuoso } from "react-virtuoso";
import { useSelector, shallowEqual } from "react-redux";

export default ({ topicID }) => {
  const { commentList } = useSelector(
    (state) => ({
      commentList:
        state.app.topics.find((val) => val.id === parseInt(topicID)).comments ||
        [],
    }),
    shallowEqual
  );

  return (
    <div>
      <Typography variant="h6">Comments</Typography>
      <List>
        {commentList && commentList.length > 0 && (
          <Virtuoso
            item={(index) => {
              const { username, comment } = commentList[index];
              return (
                <List>
                  <Paper elevation={1} css={{ marginBottom: 10 }}>
                    <ListItem>
                      <ListItemText primary={comment} secondary={username} />
                    </ListItem>
                  </Paper>
                </List>
              );
            }}
            totalCount={commentList.length}
          />
        )}
      </List>
    </div>
  );
};
