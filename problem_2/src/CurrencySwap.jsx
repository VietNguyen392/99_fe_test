import React, { useState, useEffect } from "react";
import Select from "react-select";

import styled from "styled-components";

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f7f7f7;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  max-width: 400px;
  margin: 0 auto;
`;

const FormTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
`;

const FormField = styled.div`
  margin-bottom: 15px;
  width: 100%;
`;

const Label = styled.label`
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
`;

const Input = styled.input`
  width: calc(100% - 16px);
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  color: #fff;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #0056b3;
  }
`;

const Result = styled.div`
  margin-top: 20px;
  text-align: center;
`;

const CurrencySwapForm = () => {
  const [amount, setAmount] = useState("");
  const [fromCurrency, setFromCurrency] = useState(null);
  const [toCurrency, setToCurrency] = useState(null);
  const [exchangeRate, setExchangeRate] = useState(null);
  const [currencies, setCurrencies] = useState([]);

  useEffect(() => {
    fetch("https://interview.switcheo.com/prices.json")
      .then((res) => res.json())
      .then((data) => {
        const currencyOptions = data.map((currency) => ({
          value: currency.price,
          label: currency.currency,
        }));
        setCurrencies(currencyOptions);
      })
      .catch((error) => console.error("Error fetching currencies:", error));
  }, []);
  const handleSubmit = (event) => {
    event.preventDefault();
    const priceA = fromCurrency.value;
    const priceB = toCurrency.value;
    const exchangeRate = priceA / priceB;
    setExchangeRate(exchangeRate);
  };

  return (
    <FormContainer>
      <FormTitle>Currency Swap</FormTitle>
      <form onSubmit={handleSubmit}>
        <FormField>
          <Label>Amount:</Label>
          <Input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </FormField>
        <FormField>
          <Label>From:</Label>
          <Select
            options={currencies}
            value={fromCurrency}
            onChange={setFromCurrency}
            required
          />
        </FormField>
        <FormField>
          <Label>To:</Label>
          <Select
            options={currencies}
            value={toCurrency}
            onChange={setToCurrency}
            required
          />
        </FormField>
        <Button type="submit">Swap</Button>
      </form>
      {exchangeRate && (
        <Result>
          <h2>Exchange Rate:</h2>
          <p>
            1 {fromCurrency.label} = {exchangeRate} {toCurrency.label}
          </p>
          <p>
            Converted Amount: {(amount * exchangeRate).toFixed(2)}{" "}
            {toCurrency.label}
          </p>
        </Result>
      )}
    </FormContainer>
  );
};

export default CurrencySwapForm;
