import React from "react";

const Slide = React.forwardRef((props, ref) => {
  return (
    <div
      className={`inner ${props.position === "left" ? "left" : "right"}`}
      ref={ref}
    >
      {props.question && (
        <>
          <h3 className="question">{props.question.question}</h3>

          <div className="options">
            {props.question.options.map((option, index) => (
              <div className="option" onClick={props.handleClick} key={index}>
                {option.text}
              </div>
            ))}
          </div>
        </>
      )}
      {!props.question && <h3 className="end">End of quiz</h3>}
    </div>
  );
});

export default Slide;
