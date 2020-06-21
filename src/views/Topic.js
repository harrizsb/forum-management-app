/** @jsx jsx */

import { jsx } from "@emotion/core";
import { useParams, Link } from "react-router-dom";
import { useSelector, shallowEqual } from "react-redux";
import { Paper } from "@material-ui/core";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading";

const CommentForm = lazy(() => import("../components/CommentForm"));
const CommentList = lazy(() => import("../components/CommentList"));

export default () => {
  const { id } = useParams();
  const { topic } = useSelector(
    (state) => ({
      topic: state.app.topics.find((val) => val.id === parseInt(id)),
    }),
    shallowEqual
  );

  return (
    <div>
      <Link to="/">Back</Link>
      {topic ? (
        <div>
          <Paper
            elevation={1}
            css={{
              padding: 10,
              marginBottom: 15,
            }}
          >
            <h3>{topic.title}</h3>
            <p>{topic.body}</p>
          </Paper>
          <Suspense fallback={<Loading />}>
            <CommentList topicID={id} />
          </Suspense>
          <Suspense fallback={<Loading />}>
            <CommentForm topicID={id} />
          </Suspense>
        </div>
      ) : (
        <span
          css={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          Oops topic not found
        </span>
      )}
    </div>
  );
};
