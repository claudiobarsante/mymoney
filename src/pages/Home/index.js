import React from "react";
import AdicionarMes from "./AdicionarMes";
import Meses from "./Meses";

export default function Home() {
  return (
    <div className="container">
      <AdicionarMes />
      <Meses />
    </div>
  );
}
