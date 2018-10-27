lineChartData = {
    // ...
    const xExtent = d3.extent(data, d => d.date);
    const xScale = d3.scaleTime().range([0, width]).domain(xExtent);
    
  //  const yMin = d3.min(data, d => d.low);
    const yMax = d3.max(data, d => d.high);
     
    const yExtent = [0, yMax];
    const yScale = d3.scaleLinear()
      .range([height, 0])
      .domain(yExtent);
    
    const lineGenerator = d3.line().x(d => xScale(d.date));
    
    
    return [
      { 
       fill: '#eb6a5b',
        path: lineGenerator.y(d => yScale(d.high))(data)
      },
      {
        fill: '#52b6ca',
        path: lineGenerator.y(d => yScale(d.low))(data)
      },
      {
        fill: '#acb6ca',
        path: lineGenerator.y(d => yScale(d.avg))(data)      
      }
      ];
   
  }