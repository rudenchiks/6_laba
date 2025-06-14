import * as d3 from "d3";
import { useEffect, useMemo, useRef, useState } from "react";

const ChartDraw = (props) => {
    const chartRef = useRef(null);
    const [width, setWidth] = useState(0);
    const [height, setHeight] = useState(0);

    useEffect(() => {
        const svg = d3.select(chartRef.current);      
        setWidth(parseFloat(svg.style('width')));
        setHeight(parseFloat(svg.style('height')));
    }); 
    
    const margin = {
        top: 10, 
        bottom: 60, 
        left: 40, 
        right: 10
    };
    
    const boundsWidth = width - margin.left - margin.right;
    const boundsHeight = height - margin.top - margin.bottom;

    let allValues = [];
    props.data.forEach(d => {
        if (props.oy[0] && d.max !== undefined) allValues.push(d.max);
        if (props.oy[1] && d.min !== undefined) allValues.push(d.min);
    });
    
    let [min, max] = d3.extent(allValues);
    if (min === undefined) min = 0;
    if (max === undefined) max = 1;

    const scaleX = useMemo(() => {
        return d3
            .scaleBand()
            .domain(props.data.map(d => d.labelX))
            .range([0, boundsWidth])
            .padding(0.2);
    }, [props.data, boundsWidth]);
  
    const scaleY = useMemo(() => {
        return d3
            .scaleLinear()
            .domain([min * 0.85, max * 1.1])
            .range([boundsHeight, 0]);
    }, [boundsHeight, min, max]);

    useEffect(() => {
        if (width === 0 || height === 0) return;
        
        const svg = d3.select(chartRef.current);
        svg.selectAll("*").remove();
        
        svg.append("rect")
            .attr("x", margin.left)
            .attr("y", margin.top)
            .attr("width", boundsWidth)
            .attr("height", boundsHeight)
            .style("fill", "lightgrey");
        
        const xAxis = d3.axisBottom(scaleX);     
        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${height - margin.bottom})`)
            .call(xAxis)
            .selectAll("text") 
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", ".15em")
            .attr("transform", "rotate(-30)");

        const yAxis = d3.axisLeft(scaleY);
        svg.append("g")
            .attr("transform", `translate(${margin.left}, ${margin.top})`)
            .call(yAxis);
        
        if (props.chartType === "scatter") {
            // Scatter plot
            if (props.oy[0]) { // Max values
                svg.selectAll(".max-dot")
                    .data(props.data.filter(d => d.max !== undefined))
                    .enter()
                    .append("circle")
                    .attr("r", 5)
                    .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                    .attr("cy", d => scaleY(d.max))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "red");
            }
            if (props.oy[1]) { 
                svg.selectAll(".min-dot")
                    .data(props.data.filter(d => d.min !== undefined))
                    .enter()
                    .append("circle")
                    .attr("r", 5)
                    .attr("cx", d => scaleX(d.labelX) + scaleX.bandwidth() / 2)
                    .attr("cy", d => scaleY(d.min))
                    .attr("transform", `translate(${margin.left}, ${margin.top})`)
                    .style("fill", "blue");
            }
        } else {
            if (props.oy[0]) { 
                svg.selectAll(".max-bar")
                    .data(props.data.filter(d => d.max !== undefined))
                    .enter()
                    .append("rect")
                    .attr("x", d => scaleX(d.labelX) + margin.left)
                    .attr("y", d => scaleY(d.max) + margin.top)
                    .attr("width", scaleX.bandwidth() / (props.oy[1] ? 2 : 1))
                    .attr("height", d => boundsHeight - scaleY(d.max))
                    .style("fill", "red");
            }
            if (props.oy[1]) { 
                svg.selectAll(".min-bar")
                    .data(props.data.filter(d => d.min !== undefined))
                    .enter()
                    .append("rect")
                    .attr("x", d => scaleX(d.labelX) + margin.left + 
                                  (props.oy[0] ? scaleX.bandwidth() / 2 : 0))
                    .attr("y", d => scaleY(d.min) + margin.top)
                    .attr("width", scaleX.bandwidth() / (props.oy[0] ? 2 : 1))
                    .attr("height", d => boundsHeight - scaleY(d.min))
                    .style("fill", "blue");
            }
        }
        
        

    }, [scaleX, scaleY, props.data, props.oy, props.chartType, width, height]); 

    return (
        <svg ref={chartRef} style={{width: "1200px", height: "400px"}}></svg>
    )
}

export default ChartDraw;