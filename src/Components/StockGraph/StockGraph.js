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

  const { myStocks, selectedStock } = state;

  useEffect(() => {
    const callForData = async () => {
      if (selectedStock) {
        const resultData = await getSymbolData({
          symbol: selectedStock
        });

        setData(resultData);
      }
    };
    callForData();
  }, [selectedStock]);

  useEffect(() => {
    console.log("data", data);
    if (data) {
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

      chart.decorate(selection => {
        selection
          .enter()
          .select(".x-label")
          .style("color", "white")
          .style("background", "rgba(255,255,255,.06)")
          .style("padding", "10px")
          .style("border-radius", "5px");
        selection
          .enter()
          .select(".y-label")
          .style("color", "white")
          .style("background", "rgba(255,255,255,.06)")
          .style("padding", "10px")
          .style("border-radius", "5px");
        selection
          .enter()
          .select(".chart-label")
          .style("color", "white")
          .style("background", "rgba(255,255,255,.06)")
          .style("padding", "10px")
          .style("border-radius", "5px");
        selection
          .enter()
          .select(".x-axis")
          .style("color", "white");
      });

      d3.select("#chart-div")
        .datum(data)
        .call(chart);
    }
  }, [data, myStocks, selectedStock]);

  return data ? (
    <GridSvgCanvas id="chart-div" />
  ) : (
    <div>
      <h2>Select some Stocks to draw a chart</h2>
    </div>
  );
};

export default StockGraph;
