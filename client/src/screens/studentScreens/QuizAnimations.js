import gsap from "gsap";
const tl = gsap.timeline();

export const animateNextQuestion = (onComplete) => {
  //do nothing is animation is playing
  if (tl.isActive()) {
    return;
  }
  //slide both question and options out of view to left
  tl.to(
    ".quiz__questionContent",
    1,
    {
      x: "-100vw",
      opacity: 0,
      ease: "Power2.ease-in",
      onComplete: onComplete,
    },
    "+=0.8"
  );
  //return question and options elements to original position (not visible)
  tl.to(".quiz__questionContent", 0, {
    x: "100vw",
  });
  //and fade them in
  tl.to(
    ".quiz__questionContent",
    1,
    {
      opacity: 1,
      x: 0,
      ease: "Power1.easeOut",
    },
    ">+0.3"
  );
};
