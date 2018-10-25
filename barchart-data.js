// Barchart data pulled from the exercise on:
//  https://beta.observablehq.com/@sxywu/data-visualization-for-react-developers-starter

barChartData = {
  console.log(width);
  // 1. Get min and max of the date
  
  const extent = d3.extent(data, d => d.date)
  console.log(extent);
  
  // Pass min and max into the xScale
  
  const xScale = d3.scaleTime()
    .domain(extent)
    .range([0, width])
  
  console.log(xScale(new Date('6/1/2017')));
  
  // 2. map high temp to y-positions
  //    get the min and max of high temp
  const yExtent = d3.extent(data, d => d.high);
  console.log(yExtent);
  
  const yScale = d3.scaleLinear()
    .domain(yExtent)
    .range([height, 0]);
  
  console.log(yScale(100));
  
  return [];
  
  
  
 /* 
  const xScale = d3.scaleTime().range([0, width]);
  const yScale = d3.scaleLinear().range([height, 0]);
  const colorScale = d3.scaleSequential(d3.interpolateSpectral);
  
  const timeDomain = d3.extent(data, d => d.date);
  const tempMax = d3.max(data, d => d.high);
  const [minAvg, maxAvg] = d3.extent(data, d => d.avg);
  xScale.domain(timeDomain);
  yScale.domain([0, tempMax]);
  colorScale.domain([maxAvg, minAvg]);
  
 return data.map(d => {
     const y1 = yScale(d.high);
     const y2 = yScale(d.low);
   
     return {
       x: xScale(d.date),
       y: y1,
       height: y2 - y1,
       fill: colorScale(d.avg),
     }
 }); */
}

