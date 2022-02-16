export default function CurrencySelector({ symbols, name, value, onChange }) {
  return (
    <select name={name} value={value} onChange={onChange}>
      {Object.keys(symbols).map((code) => {
        return (
          <option key={code} value={code}>
            {code} - {symbols[code]}
          </option>
        );
      })}
    </select>
  );
}
