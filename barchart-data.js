barChartData = {
//  console.log(width);
  // 1. Get min and max of the date
  
  const extent = d3.extent(data, d => d.date)
  // console.log(extent);
  
  // Pass min and max into the xScale
  
  const xScale = d3.scaleTime()
    .domain(extent)
    .range([0, width])
  
  // console.log(xScale(new Date('6/1/2017')));
  
  // 2. map high temp to y-positions
  //    get the min and max of high temp
  const yExtent = d3.extent(data, d => d.high);
  // console.log(yExtent);
  
  const yScale = d3.scaleLinear()
    .domain(yExtent)
    .range([height, 0]);
  
  // console.log(yScale(100));
  
  // return an array of objects with x, y and height
  
  return data.map(d => {
    return {
      x: xScale(d.date),
      y: yScale(d.high),
      height: yScale(d.low) - yScale(d.high),
  }
  });
 }

