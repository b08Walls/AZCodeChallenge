import React, { useEffect, useState, useContext } from "react";
import * as d3 from "d3";
import * as fc from "d3fc";
import {
  GridSvgCanvas,
  GraphPlaceHolder,
  GraphPlaceHolderTitle,
  GraphPlaceHolderImage,
  TitlePaper
} from "./StockGraphStyles";
import { getSymbolData } from "./StockGraphFunctions";
import { AppContext } from "./../../Contexts/AppContext/AppContext";
import { SocketContext } from "./../../Contexts/SocketContext/SocketContext";

const StockGraph = props => {
  const [historicData, setHistoricData] = useState(null);
  // eslint-disable-next-line no-unused-vars
  const [state, setState] = useContext(AppContext);
  // eslint-disable-next-line no-unused-vars
  const [socketData, appendSocketData] = useContext(SocketContext);

  const { myStocks, selectedStock } = state;
  const data =
    historicData || socketData.data
      ? [...(socketData.data || []), ...(historicData || [])]
      : null;

  useEffect(() => {
    const callForData = async () => {
      if (selectedStock) {
        const resultData = await getSymbolData({
          symbol: selectedStock
        });
        setHistoricData(resultData);
      }
    };
    callForData();
  }, [selectedStock]);

  useEffect(() => {
    if (selectedStock && data) {
      const xExtent = fc.extentDate().accessors([d => d.date]);
      const yExtent = fc
        .extentLinear()
        .accessors([d => d.high, d => d.low])
        .pad([0.1, 0.1]);

      const xDomain = xExtent(data);
      const yDomain = yExtent(data);

      const lineSeries = fc
        .seriesSvgLine()
        .crossValue(d => d.date)
        .mainValue(d => d.high);

      const areaSeries = fc
        .seriesSvgArea()
        .baseValue(d => yDomain[0])
        .mainValue(d => d.high)
        .crossValue(d => d.date);

      const volumeExtent = fc
        .extentLinear()
        .include([0])
        .pad([0, 2])
        .accessors([d => d.volume]);
      const volumeDomain = volumeExtent(data);
      const volumeToPriceScale = d3
        .scaleLinear()
        .domain(volumeDomain)
        .range(yExtent(data));
      const volumeSeries = fc
        .seriesSvgBar()
        .bandwidth(2)
        .crossValue(d => d.date)
        .mainValue(d => volumeToPriceScale(d.volume))
        .decorate(sel =>
          sel
            .enter()
            .classed("volume", true)
            .attr("fill", d => (d.open > d.close ? "red" : "green"))
        );

      const gridlines = fc
        .annotationSvgGridline()
        .yTicks(5)
        .xTicks(0);

      const multi = fc
        .seriesSvgMulti()
        .series([gridlines, areaSeries, lineSeries, volumeSeries]);

      const chart = fc
        .chartCartesian({
          xScale: d3.scaleTime(),
          yScale: d3.scaleLinear()
        })
        .xLabel("Time")
        .yLabel("Price")
        .chartLabel(`${selectedStock} - ${myStocks[selectedStock].name}`)
        .yDomain(yDomain)
        .xDomain(xDomain)
        .yOrient("right")
        .svgPlotArea(multi);

      d3.select("#chart-div")
        .datum(data)
        // .datum([...(socketData.data || [])])
        .call(chart);
    }
  }, [data, myStocks, selectedStock, socketData]);

  return selectedStock ? (
    <GridSvgCanvas id="chart-div" />
  ) : (
    <GraphPlaceHolder>
      <TitlePaper style={{ background: "#024574" }}>
        <GraphPlaceHolderTitle>
          Click on a stock to see its chart
        </GraphPlaceHolderTitle>
      </TitlePaper>

      <GraphPlaceHolderImage />
    </GraphPlaceHolder>
  );
};

export default StockGraph;
