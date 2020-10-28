import React, { useRef, useState } from "react";
import { Redirect } from "react-router-dom";
const minYear = 2019;
const maxYear = 2022;

export default function AdicionarMes() {
  const years = [];
  const months = [];
  const yearRef = useRef();
  const monthRef = useRef();
  const [redir, setRedir] = useState("");

  for (let i = minYear; i <= maxYear; i++) {
    years.push(i);
  }

  for (let j = 1; j <= 12; j++) {
    months.push(j);
  }

  const zeroPad = (num) => {
    if (num < 10) return `0${num}`;

    return num;
  };

  const addMonth = () => {
    setRedir(`${yearRef.current.value}-${monthRef.current.value}`);
  };

  if (redir !== "") {
    return <Redirect to={`/movimentacoes/${redir}`} />;
  }

  return (
    <>
      <h2>Adicionar mês</h2>
      <select ref={yearRef}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </select>
      <select ref={monthRef}>
        {months.map(zeroPad).map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </select>
      <button onClick={addMonth} className="btn-success">
        Adicionar mês
      </button>
    </>
  );
}
