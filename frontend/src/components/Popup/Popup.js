import { useState, React } from "react";

const Popup = (msg, img, next) => {
  const url = `images/${img}`;
  const [state, setState] = useState({ display: "none" });
  const Hide = () => {
    setState({ ...state, display: "none" });
  };
  const HidePopup = next || Hide;
  function ESCclose(evt) {
    if (evt.keyCode === 27) {
      HidePopup();
    }
  }
  return (
    <div className="modal" style={{ display: state.display }}>
      <div className="inner">
        <div className="content">
          <div className="title">
            <span role="button" disabled={state.loading} onClick={HidePopup} onKeyDown={ESCclose}>
              <img alt="nothing" src="/images/vector.png" />
            </span>
          </div>
          <div className="noti">
            <img src={url} alt={msg} />
            <p>{msg}</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Popup;
