import { useEffect } from "react";

const titles = [
  "Memoria activa | Cerebria®",
  "Mejor concentración | Cerebria®",
  "Bienestar diario | Cerebria®",
  "Mente activa | Cerebria®",
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