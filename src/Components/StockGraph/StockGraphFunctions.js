import axios from "axios";
import { alphaVantageKey } from "./../../Constants/Keys";

const getSymbolData = requestProps => {
  const { historicProps, symbol } = requestProps;
  if (!symbol) throw { error: "No symbol prop" };
  const _historicProps = historicProps
    ? historicProps
    : {
        interval: "1min",
        outputsize: "full"
      };

  const requestUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${_historicProps.interval}&apikey=${alphaVantageKey}&outputsize=${_historicProps.outputsize}`;

  return new Promise(async res => {
    const rawData = await axios.get(requestUrl);
    const { data } = rawData;
    const prices = data[`Time Series (${_historicProps.interval})`] || [];
    const today = new Date().getTime() - 60 * 60 * 24 * 1000;
    const dataArray = Object.keys(prices)
      .map(timeStamp => {
        return {
          date: new Date(new Date(timeStamp).getTime() - 60 * 60 * 2 * 1000),
          volume: Number(prices[timeStamp]["5. volume"]),
          high: Number(prices[timeStamp]["2. high"]),
          low: Number(prices[timeStamp]["3. low"]),
          open: Number(prices[timeStamp]["1. open"]),
          close: Number(prices[timeStamp]["4. close"])
        };
      })
      .filter(datum => {
        return datum.date.getTime() > today;
      });
    res(dataArray);
  });
};

export { getSymbolData };
