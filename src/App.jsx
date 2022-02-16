import { useEffect, useState } from "react";

import { convert, symbols } from "exchangerate-javascript-sdk";

function App() {
  const [state, setState] = useState({
    amount: 0,
    from: "USD",
    to: "EUR",
  });

  const [result, setResult] = useState(0);

  const [symbolsData, setSymbols] = useState({});

  useEffect(() => {
    symbols().then((data) => {
      setSymbols(data.symbols);
    });
  });

  useEffect(() => {
    convert(state).then((data) => {
      setResult(data.result);
    });
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
          <select name="from" value={state.from} onChange={handleChange}>
            {Object.values(symbolsData).map(({ description, code }) => {
              return (
                <option key={code} value={code}>
                  {code} - {description}
                </option>
              );
            })}
          </select>
        </div>
        <div className="control">
          <label>To</label>
          <select name="to" value={state.to} onChange={handleChange}>
            {Object.values(symbolsData).map(({ description, code }) => {
              return (
                <option key={code} value={code}>
                  {code} - {description}
                </option>
              );
            })}
          </select>
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
