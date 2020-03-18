import React, { useEffect, useState, useContext } from "react";
import * as d3 from "d3";
import * as fc from "d3fc";
import axios from "axios";
import { GridSvgCanvas } from "./StockStyles";
import { getSymbolData } from "./StockGraphFunctions";
import { AppContext } from "./../../Contexts/AppContext/AppContext";
const StockGraph = props => {
  const { historicProps } = props;

  const [data, setData] = useState(null);
  const [state, setState] = useContext(AppContext);

  const { myStocks } = state;

  useEffect(() => {
    const getSymbolData = async callback => {
      const _historicProps = historicProps
        ? historicProps
        : {
            interval: "15min",
            outputsize: "full"
          };
      const rawData = await axios.get(
        `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=MSFT&interval=${_historicProps.interval}&apikey=6YNZVN7G1NS7IS3Z&outputsize=${_historicProps.outputsize}`
      );
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
      callback && callback(dataArray);
    };
    getSymbolData(setData);

    // const symbolsToRequest = myStocks ? Object.keys(myStocks) : null;
    // if (symbolsToRequest) {
    //   const tempData = {};
    //   let count = symbolsToRequest.length;

    //   symbolsToRequest.forEach(async s => {
    //     const resultData = await getSymbolData({
    //       symbol: s
    //     });
    //     const _symbol = Object.keys(resultData)[0];
    //     if (_symbol) tempData[_symbol] = resultData[_symbol];
    //     count--;
    //     if (!count) {
    //       console.log("tempData", tempData);
    //       setData(tempData);
    //     }
    //   });
    // }
  }, [historicProps, myStocks]);

  useEffect(() => {
    console.log("data", data);
    if (data) {
      const xExtent = fc.extentDate().accessors([d => d.date]);
      const yExtent = fc
        .extentLinear()
        .accessors([d => d.high, d => d.low])
        .pad([0.1, 0.1]);

      //   const allValues = Object.keys(data).reduce((p, c) => {
      //     return [...p, data[c]];
      //   }, []);
      //   const xDomain = xExtent(allValues);
      //   const yDomain = yExtent(allValues);
      const xDomain = xExtent(data);
      const yDomain = yExtent(data);

      //   const createStockSeries = _data => {
      const lineSeries = fc
        .seriesSvgLine()
        .crossValue(d => d.date)
        .mainValue(d => d.high);

      const areaSeries = fc
        .seriesSvgArea()
        .baseValue(d => yDomain[0])
        .mainValue(d => d.high)
        .crossValue(d => d.date);

      //   return [lineSeries, areaSeries];
      //   };

      //   const volumeExtent = fc
      //     .extentLinear()
      //     .include([0])
      //     .pad([0, 2])
      //     .accessors([d => d.volume]);
      //   const volumeDomain = volumeExtent(data);
      //   const volumeToPriceScale = d3
      //     .scaleLinear()
      //     .domain(volumeDomain)
      //     .range(yExtent(data));
      //   const volumeSeries = fc
      //     .seriesSvgBar()
      //     .bandwidth(2)
      //     .crossValue(d => d.date)
      //     .mainValue(d => volumeToPriceScale(d.volume))
      //     .decorate(sel =>
      //       sel
      //         .enter()
      //         .classed("volume", true)
      //         .attr("fill", d => (d.open > d.close ? "red" : "green"))
      //     );

      const gridlines = fc
        .annotationSvgGridline()
        .yTicks(5)
        .xTicks(0);

      const multi = fc
        .seriesSvgMulti()
        .series([gridlines, areaSeries, lineSeries]);

      const chart = fc
        .chartCartesian(d3.scaleTime(), d3.scaleLinear())
        .xLabel("Time")
        .yLabel("Price")
        .chartLabel("Stock Historic Chart")
        .yDomain(yDomain)
        .xDomain(xDomain)
        .yOrient("right")
        // .svgPlotArea(gridlines)
        .svgPlotArea(multi);
      // .canvasPlotArea(lineSeries);

      //   console.log(data);
      //   const _data = data[Object.keys(data)[0]];
      //   console.log(_data);

      //   if (_data && _data.length)
      d3.select("#chart-div")
        .datum(data)
        .call(chart);
    }
  }, [data]);

  return data ? (
    <GridSvgCanvas id="chart-div" />
  ) : (
    <div>
      <h2>Select some Stocks to draw a chart</h2>
    </div>
  );
};

export default StockGraph;
