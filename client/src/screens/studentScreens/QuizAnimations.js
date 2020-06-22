import gsap from "gsap";
const tl = gsap.timeline();

export const animateNextQuestion = (onComplete) => {
  //do nothing is animation is playing
  if (tl.isActive()) {
    return;
  }
  //slide both question and options out of view to left
  tl.to(
    [".quiz__question", ".quiz__options"],
    0.5,
    {
      x: "-100vw",
      opacity: 0,
      ease: "Power4.easeIn",
      onComplete: onComplete,
    },
    "+=0.8"
  );
  //return question and options elements to original position (not visible)
  tl.to([".quiz__question", ".quiz__options"], 0, {
    x: 0,
  });
  //and fade them in
  tl.to(
    [".quiz__question", ".quiz__options"],
    1,
    {
      opacity: 1,
      ease: "Power1.easeOut",
    },
    ">+0.3"
  );
};
