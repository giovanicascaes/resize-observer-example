import React, { useRef, useEffect } from "react";
// Verifica se a API é suportada; caso contrário é utilizado um polyfill
const ResizeObserver =
  window.ResizeObserver || require("resize-observer-polyfill");

// Define o comportamento do observer ao detectar alguma mudança nas dimensões
// do container
const observer = new ResizeObserver(function (entries) {
  // Breakpoints default. As keys desse objecto serão os nomes das classes
  // CSS que serão utilizadas para estilizar dinamicamente os elementos
  // dentro do container
  const defaultBreakpoints = {
    SM: 384,
    MD: 576,
    LG: 768,
    XL: 960,
  };

  // Itera por cada elemento que teve suas dimensões alteradas. Como o observer
  // é criado globalmente, por questões de performance, poderão ser observados
  // diversos elementos
  entries.forEach(function (entry) {
    // Verifica se o container recebeu breakpoints customizados, através do atributo
    // `data-breakpoints`
    const breakpoints = entry.target.dataset.breakpoints
      ? JSON.parse(entry.target.dataset.breakpoints)
      : defaultBreakpoints;

    // Adiciona a classe CSS associada ao breakpoint de acordo com a largura
    // do container
    Object.keys(breakpoints).forEach(function (breakpoint) {
      const minWidth = breakpoints[breakpoint];
      if (entry.contentRect.width >= minWidth) {
        entry.target.classList.add(breakpoint);
      } else {
        entry.target.classList.remove(breakpoint);
      }
    });
  });
});

// Componente React
export default function ResponsiveContainer({ breakpoints, ...otherProps }) {
  const ref = useRef();

  useEffect(() => {
    const element = ref.current;
    // Começa a observar o container
    observer.observe(element);
  }, []);

  let props = otherProps;
  // Conveniência para as props do componente
  if (breakpoints) {
    props = {
      ...props,
      "data-breakpoints": JSON.stringify(breakpoints),
    };
  }

  // O container. `data-observe-resizes` pode ser utilizado para buscar
  // todos os elementos observaodos
  return <div {...props} data-observe-resizes ref={ref} />;
}
