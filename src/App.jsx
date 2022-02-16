import { useEffect, useState } from "react";

import symbols from "../symbols.json";

import { convert } from "exchangerate-javascript-sdk";

import CurrencySelector from "./components/CurrencySelector";

function App() {
  const [state, setState] = useState(() => {
    const params = new URLSearchParams(window.location.search);
    const from = params.get("from") ?? "EUR";
    const to = params.get("to") ?? "USD";
    const amount = params.get("amount") ?? 0;
    return { from, to, amount };
  });

  const [result, setResult] = useState(0);

  const [symbolsData] = useState(symbols);

  useEffect(() => {
    if (state.amount) {
      convert(state).then((data) => {
        setResult(data.result);
        setQueryString();
      });
    }
  }, [state]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    convert(state).then((data) => {
      setResult(data.result);
    });
  };

  const setQueryString = () => {
    const { from, to, amount } = state;
    window.history.pushState({}, "", `?from=${from}&to=${to}&amount=${amount}`);
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <div className="control">
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={state.amount}
            onChange={handleChange}
          />
        </div>
        <div className="control">
          <label>From</label>
          <CurrencySelector
            name="from"
            value={state.from}
            symbols={symbolsData}
            onChange={handleChange}
          />
        </div>
        <div className="control">
          <label>To</label>
          <CurrencySelector
            name="to"
            value={state.to}
            symbols={symbolsData}
            onChange={handleChange}
          />
        </div>
        <input type="submit" value="Convert" />
      </form>
      {result ? (
        <>
          <div className="result-from">
            {state.amount} {state.from} ={" "}
          </div>
          <div className="result-to">
            {result} {state.to}
          </div>
        </>
      ) : null}
    </div>
  );
}

export default App;
