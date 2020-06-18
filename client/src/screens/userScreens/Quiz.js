import React, { useEffect, useState } from "react";
import gsap from "gsap";
import questions from "./questions";
import "./Quiz.css";

const Quiz = () => {
  return (
    <div className="quiz__wrapper">
      <div className="quiz__content">
        <div className="quiz__question"></div>
        <div className="quiz__options"></div>
      </div>
    </div>
  );
};

export default Quiz;
