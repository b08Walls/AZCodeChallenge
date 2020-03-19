import axios from "axios";
import { alphaVantageKey } from "./../../Constants/Keys";

const getSymbolData = requestProps => {
  const { historicProps, symbol } = requestProps;
  if (!symbol) throw { error: "No symbol prop" };
  const _historicProps = historicProps
    ? historicProps
    : {
        interval: "15min",
        outputsize: "full"
      };

  const requestUrl = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=${_historicProps.interval}&apikey=${alphaVantageKey}&outputsize=${_historicProps.outputsize}`;

  return new Promise(async res => {
    const rawData = await axios.get(requestUrl);
    const { data } = rawData;
    const prices = data[`Time Series (${_historicProps.interval})`] || [];
    const dataArray = Object.keys(prices).map(timeStamp => {
      return {
        date: new Date(timeStamp),
        volume: Number(prices[timeStamp]["5. volume"]),
        high: Number(prices[timeStamp]["2. high"]),
        low: Number(prices[timeStamp]["3. low"]),
        open: Number(prices[timeStamp]["1. open"]),
        close: Number(prices[timeStamp]["4. close"])
      };
    });
    res(dataArray);
  });
};

export { getSymbolData };
