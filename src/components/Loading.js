import React from 'react';
import ReactLoading from "react-loading";
import '../styles/style.css';

let Loading = () => {
  return (
    <div className="loading">
      <ReactLoading type="bars" color="grey" height="100px" width="100px" />
    </div>
  )
};

export default Loading;
