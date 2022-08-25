import React from "react";

const PopupContext = React.createContext({
  loading: false,
  setLoading: () => {},
});
export default PopupContext;
