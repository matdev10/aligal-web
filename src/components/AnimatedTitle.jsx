import { useEffect } from "react";

const titles = [
  "Olvidos? | Cerebria®",
  "Concentración? | Cerebria®",
  "Aprendizaje? | Cerebria®",
  "Recuerdos? | Cerebria®",
];

function AnimatedTitle() {
  useEffect(() => {
    let index = 0;

    document.title = titles[index];

    const intervalId = setInterval(() => {
      index = (index + 1) % titles.length;
      document.title = titles[index];
    }, 2500);

    return () => {
      clearInterval(intervalId);
      document.title = "Cerebria® | Memoria y concentración";
    };
  }, []);

  return null;
}

export default AnimatedTitle;