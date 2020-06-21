/** @jsx jsx */
import { useSelector, shallowEqual } from "react-redux";
import { jsx } from "@emotion/core";

export default () => {
  const { loading, overlayLoading } = useSelector(
    (state) => ({
      overlayLoading: state.app.overlayLoading,
      loading: state.app.loading,
    }),
    shallowEqual
  );

  return (
    loading && (
      <div
        data-testid="loading"
        css={
          overlayLoading && {
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 999,
            backgroundColor: "#8282826b",
          }
        }
      >
        <span>Loading...</span>
      </div>
    )
  );
};
