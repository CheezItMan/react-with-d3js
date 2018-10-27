
# React with D3

## D3 Learning Code

Enter-Update-Exit - Flow of D3.  

Let React do the rendering to the DOM, instead of making D3 do it ourselves.  

Strip out Enter-Update-Exit from D3 and replace it with Reactjs.

Know enough about D3 to know when to use D3 and when to use React

## Workshop Order

1. Workshop #1 Data Visualization for React Developers
    - Intro for React Developers
1. Workshop #2 Intro to D3 (core D3)
1. Workshop #3 Building Custom Data Visualizations (beyound the built-ins)


## Workshop 1 Order

- Basic Chart Types
- Making a chart with SVG
- Going from raw data to SVG
- Using React to render SVG and Canvas
- Exceptions to above, and finishing touches

## Basic Chart Types

Ordinal (T-shirt sizes)

- Quantitative (temps, fixed numbers)
- Temporal (dates)
- Spacial (Cities, countries, regions, etc)
- Categorical (genres)

### Bar Charts

Used for categorical comparisons Domain is categorical, range is quantitative.  

### Histograms

For categorical distributions
Domain is quantitative bins
Range is frequency of quantitative bins.

### Scatterplots

For correlation

2 data attributes and their relationship between their quantitative values.  

### Line Charts

For temporal trends

Domain: temporal
Range: quantitative

### Trees

For hierarchy
Parent-child relations
Multiple tiers of categories (wierd)
One directional links

### Node-link diagrams

For connetions
Relationships between entities (cyclical links)

### Maps

Chloropleth for spacial trends
Domain: spacial regions 
Range: quantitative
Good for regional patterns
Only one variable
Relative data (normalize for population otherwise you'll just be showing population)
[Datawrapper academy](https://academy.datawrapper.de/) - Check this out

### Pie Charts

For hierarchical part to whole

Best for:

- When values are precent
- 3 or 4 values, too few, don't need a pie, too many hard to read

Data wrapper has notes on better alternatives

Not good for:

- comparing fine differences
- multiple totals

Not good for subtle differences in data

## SVG Intro

XML Language to describe shapes and draw them on the screen.

Most commonly used 
- Rect
  - x, y coordinates (top-left)
  - width and height
- Circle
  - center x and y coordinates
  - radius
- Text
 -x, y coordinates
 -dx, x-coordinate offset
 -dy, y-coordinate offset
 -Text-anchor - Horizontal text alignment
- Path
 -d - path attribute to follow
 -moveto, lineto, curveto, arcto


## D3 - Going from Data to SVG Shapes

1. Stage 1, data preparation

Scales & Shapes 
- Calculate X,Y Coordinates, width height and path strings

Scales map from data attibute (domain) to display (range)

```javascript
d3.scaleLinear()
  .domain([min, max])  // input
  .range([min, max]);  // output
```
Date - x-value
value - y-value
value - opacity etc

D3 has a lot of utility functions for scaling.

```javascript
// get min/max

const width = 800;
const height = 600;
const data = [
    { date: new Date('01-01-2015'), temp: 0 },
    { date: new Date('01-01-2017'), temp: 3 }
];

const min = d3.min(data, d => d.date);
const max = d3.max(data, d => d.date);

// or use extent which gives back [min, max]
const extent = d3.extent(data, d => d.temp);

const xScale = d3.scaleTime()
  .domain([min, max])
  .range([0, width]);
const yScale = d3.scaleLinear()
  .domain(extent)
  .range([height, 0]);
```

#### Scales used often

Quantitative:

- Continuous Domain - ScaleLinear
- Continuous range - ScaleLog
  - scaleTime
- continuous domain & discrete range - scaleQuantize

Categorical

- Discrete Domain
  -scaleOrdinal
- discrete range 
  -scale Ordinal
- discrete domain
  -scaleBand
- continous range
  -scaleBand

  [D3 documentation on scales](https://github.com/d3/d3/blob/master/API.md#scales-d3-scale)

### Exercise

  Exercise in [barchart-data.js](./barchart-data.js)

## Making Line Charts

Example Code with `d3.line`

```javascript
const data = [
    { date: '2007-03-24', value: 93.24 },
    { date: '2007-04-24', value: 95.35 },
    { date: '2007-05-24', value: 98.84 },
    { date: '2007-06-24', value: 99.92 },
    { date: '2007-07-24', value: 99.80 },
    { date: '2007-08-24', value: 99.47 },
];

const line = d3.line()
// Tell d3.line the accessor for x position and accessor for y position.
  .x( d => xScale(new Date(d.date)))
  .y( d => yScale(d.value));

// this outputs the path string for the path's d-attribute.
line(data)
```


## Creating a Radial Chart

Arc generator example:

```javascript
const pie = {
    "data": 1, 
    "value": 1,
    "startAngle": 6.050474740247008,
    "endAngle": 6.166830023713296,
};

const arc = d3.arc()
  .innerRadius(0)
  .outerRadius(100)
  .startAngle(d => d.startAngle)
  .endAngle(d => d.endAngle);

  arc(pie);
  // output:
  // m-230.61, -97.3044, 100, 0, 0, 1,

}
```

Drawing a radial chart:

```javascript
radialChartData = {
  // ...
  const radiusScale = d3.scaleLinear()
    .domain([
      d3.min(data, d => d.low),
      d3.max(data, d => d.high)
    ])
    .range([0, width / 2]);
  const colorScale = d3.scaleSequential(d3.interpolateSpectral);
  
  const avgExtent = d3.extent(data, d => d.avg).reverse();
  colorScale.domain(avgExtent);
  
  const arcGenerator = d3.arc();
  
    // D3 takes Radians and SVG takes degrees (annoying)
  
  // Get the angle for each slice
  // 2PI / 365
  const anglePerSlice = (2 * Math.PI) / data.length
  //const startAngle = i * perSliceAngle
  //const endAngle = (i + 1) * perSliceAngle
  
  return data.map((d, i) => {
    return {
      fill: colorScale(d.avg),
      path: arcGenerator({
        startAngle: i * anglePerSlice,
        endAngle: (i + 1) * anglePerSlice,
        innerRadius:  radiusScale(d.low), // width / 4.0,
        outerRadius:  radiusScale(d.high), // width / 2.0,
      }),
    }
  });
 
 /*  const radiusScale = d3.scaleLinear().range([0, width / 2]);
  const colorScale = d3.scaleSequential(d3.interpolateSpectral);
  
  const tempMax = d3.max(data, d => d.high);
  const [minAvg, maxAvg] = d3.extent(data, d => d.avg);
  radiusScale.domain([0, tempMax]);
  colorScale.domain([maxAvg, minAvg]);
  
  const arcGenerator = d3.arc();
  
    // D3 takes Radians and SVG takes degrees (annoying)
  
  // Get the angle for each slice
  // 2PI / 365
  const anglePerSlice = (2 * Math.PI) / data.length
  //const startAngle = i * perSliceAngle
  //const endAngle = (i + 1) * perSliceAngle
  
  return data.map((d, i) => {
    return {
      fill: colorScale(d.avg),
      path: arcGenerator({
        startAngle: i * anglePerSlice,
        endAngle: (i + 1) * anglePerSlice,
        innerRadius: radiusScale(d.low),
        outerRadius: radiusScale(d.high),
      }),
    }
  });       
        */
}
```



## Breaking Down D3 API

### Data Preparation

The data preparation methods (statistics, search, transformations, maps, filter sets, etc) can be replaced with JavaScript native or lodash methods.  

The most powerful things about D3 data preparation include:

- Chord (pass data into this function and you get path string to make a Chord layout)
- Nests (pass data in and get back )
- Hierarchy 
- Pies
  - Get back start and endangle for arcs


### Layout Calculation
The Unique selling point of D3 is the library to calculate where things go in the SVG.

They turn raw data into stuff for the SVG.  


## React & D3

Dom Manipulation Tools

### Selections Module

- selecting
- modifying
- joining data

### React Renderers Architecture

Division of responsibilities

- Chart Component
  -Each chart gets it's own component
  -Be passed in the raw data from it's children
  -Translates raw data into screen space.
  -renders calculated data in it's render function
  -Manages state for interactions that don't require redrawing the chart.
    -Example hover to see title of bar
- Root Component
  -Parent component of all charts
  -manages and updates raw data (websockets, api calls etc)
  -**Some assumptions made here**
  -Manages state for interactions that require you to redraw the chart (filter aggregate, sort, etc)

Where to calculate data:
- getDerivedStateFromProps
  -Pros:  Simple & straightforward
  -Cons:  Asynch, race conditions if not careful.  
- render
  -Pros:  **very** straightforward
  -Cons:  recalculates on every lifecycle.
- componentDidMount & componentDidUpdate
  -Pros: No race conditions
  -Cons: less straightforward


Assumes React does state management.
Multiple charts share some part of the data & state, and that's why the parent manages the data.
Child components only are responsible for rendering data to the screen.

**Main Takeaway**
D3 calculations can go **anywhere**, as long as React can access it in it's render function.  


## Axes

Example Code:

```javascript
// Create axisLeft or axisBottom at the beginning of React lifecycle
//   and set corresponding scale
const yAxis = d3.axisLeft()
  .scale(yScale);

// create SVG group element in render
<g ref='group' />

// Call axis on the group element in componentDidUpdate
d3.select(this.refs.group)
  .call(yAxis);
```

## D3 Render Transitions*

Example Code:

```javascript

// in componentDidUpdate

// Select elements to update
d3.select(this.refs.bars)
  .selectAll('rect') // get all the rectangles
  .data(this.state.bars) // Bind the data
  .transition() // Call d3's transition method
  .attr('y', d => d.y) // set attributes to transition
  .attr('height', d => d.height)
  .attr('fill', d => d.fill);

// in render()
<g ref='bars'>
  {this.state.bars.map((d, i) => (<rect key={i} x={d.x} width='2' /> ))}
</g>
```

**Note above, that React doesn't see the attributes that d3 is transitioning**.  For example: `y`, `height`, and `fill`

This works, it's performant, but it's ugly.  Not highly recommended.  

You can also just put a group `<g>` element into `render` and have D3 insert elements into that group, so React sees nothing.  Doing the enter, update, exit from D3.  


## Brushes 

Brushes are a way to interact with a chart and filter-down data.

Example code:

```javascript
// In componentDidMount
this.brush = d3.brush() // create brush instance
  .extent([[0, 0], [width, height]]) // define brushable area
  .on('end', () => console.log('your code goes here!'));

// Personal note, I would also take into account the margins here


d3.select(this.refs.brush)
  .call(this.brush)


// in render
```


## Readibility

Legends are useful to really helpful especially with colored data

Checkout Resources on Legends and annotation: 

- [d3-legend by Susie Lu](https://d3-legend.susielu.com/)
- [react-annotation by Susie Lu](https://react-annotation.susielu.com/)

Frameworks combining React & D3

- [React + D3 = VX](https://github.com/hshoff/vx) which is out of AirBNB
- [Semiotic](https://github.com/emeeks/semiotic) - This is done in layers of visual elements, bars axes, etc.  Lets you quickly prototype.



## Canvas

This is important for large datasets.  More than 2K SVG nodes, you should use a canvas.

**if you do have more than 2K nodes, you should probably filter or aggregate the data down a bit**.  

Example Code:

```JavaScript
// in render
<canvas ref='canvas'
  style={{width: `${width}px, height: `${height}px }} 
  // retina screen friendly???
  // otherwise the edges get blurry for some reason
  width={2 * width} height={2 * height }
  />

  // in componentDidMount
  ctx = this.refs.canvas.getContext('2d')
```


This is performant because only one DOM element that we're drawing shapes on.  

### Drawing on a canvas

```JavaScript
// rectangle
ctx.fillRect(x, y, width, height)
// or ctx.strokeRect(x, y, width, height)

// Circle
ctx.beginPath()
ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise)
ctx.fill() // or ctx.stroke()

// line
ctx.beginPath()
// moveTo, lineTo, bezierCurveTo
ctx.fill() // or ctx.stroke
```

## Resources

[blockbuilder.org](blockbuilder.org) - Sandbox resource
[Observable](https://beta.observablehq.com/) - Examples with different types of charts