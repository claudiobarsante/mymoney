import React, { useState } from "react";
import Rest from "../utils/rest";
const baseURL = "https://mymoney-141ef.firebaseio.com/";
const { useGet, usePost, useDelete, usePatch } = Rest(baseURL);

export default function Movimentacoes({ match }) {
  const getData = useGet(`movimentacoes/${match.params.data}`);
  const dataMeses = useGet(`meses/${match.params.data}`);
  const [dataPatch, patch] = usePatch();
  const [postData, post] = usePost(`movimentacoes/${match.params.data}`);
  const [removeData, remove] = useDelete();
  const [descricao, setDescricao] = useState();
  const [valor, setValor] = useState();

  const handleOnChangeDescricao = (e) => {
    setDescricao(e.target.value);
  };

  const handleOnChangeValor = (e) => {
    setValor(e.target.value);
  };

  const handleSaveMovimentacao = async () => {
    if (!isNaN(valor) && valor.search(/^[-]?\d+(\.)?\d+?$/) >= 0) {
      await post({ descricao, valor: parseFloat(valor) });
      setDescricao("");
      setValor(0.0);
      getData.refetch();
      dataMeses.refetch();
    }
  };

  const handleDelete = async (id) => {
    await remove(`movimentacoes/${match.params.data}/${id}`);
    getData.refetch();
    dataMeses.refetch();
  };

  const handleOnChangePrevisaoDeEntrada = (e) => {
    console.log(e.target.value);
    patch(`meses/${match.params.data}`, { previsao_entrada: e.target.value });
  };

  const handleOnChangePrevisaoDeSaida = (e) => {
    patch(`meses/${match.params.data}`, { previsao_saida: e.target.value });
  };

  return (
    <div className="container">
      <h1>Movimentações</h1>
      {!dataMeses.loading && dataMeses.data && (
        <div>
          Previsão entrada : {dataMeses.data.previsao_entrada}{" "}
          <input type="text" onBlur={handleOnChangePrevisaoDeEntrada} /> / Previsão saída :{" "}
          {dataMeses.data.previsao_saida}
          <input type="text" onBlur={handleOnChangePrevisaoDeSaida} /> <br />
          Entradas : {dataMeses.data.entradas} / Saídas : {dataMeses.data.saidas}
        </div>
      )}
      <table className="table">
        <thead>
          <tr>
            <th>Descrição</th>
            <th>Valor</th>
          </tr>
        </thead>
        <tbody>
          {getData.data &&
            Object.keys(getData.data).map((movimentacao) => {
              return (
                <tr key={movimentacao}>
                  <td>{getData.data[movimentacao].descricao}</td>
                  <td>{getData.data[movimentacao].valor}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(movimentacao)}>
                      -
                    </button>
                  </td>
                </tr>
              );
            })}
          <tr>
            <td>
              <input
                type="text"
                id="descricao"
                onChange={handleOnChangeDescricao}
                value={descricao}
              />
            </td>
            <td>
              <input type="text" id="valor" onChange={handleOnChangeValor} value={valor} />
            </td>
            <td>
              <button className="btn btn-success" onClick={handleSaveMovimentacao}>
                +
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <pre>{console.log(getData)}</pre>
    </div>
  );
}
