
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

