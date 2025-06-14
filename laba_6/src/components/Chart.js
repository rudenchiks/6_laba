 import { useState } from "react";
import ChartDraw from './ChartDraw.js';
import * as d3 from "d3";

const Chart = (props) => {
    const [ox, setOx] = useState("Страна");
    const [oy, setOy] = useState([true, false]);
    const [chartType, setChartType] = useState("scatter");
    const [error, setError] = useState("");
    
    const handleSubmit = (event) => {        
        event.preventDefault();
        const form = event.target;
        setOx(form["ox"].value);
        setOy([form["oy"][0].checked, form["oy"][1].checked]);
        setChartType(form["chartType"].value);
        
        if (!form["oy"][0].checked && !form["oy"][1].checked) {
            setError("Выберите хотя бы одно значение для оси OY");
        } else {
            setError("");
        }
    }

    const createArrGraph = (data, key) => {   
        const groupObj = d3.group(data, d => d[key]);
        let arrGraph = [];
        
        for (let entry of groupObj) {
            let obj = { labelX: entry[0] };
            let heights = entry[1].map(d => d['Высота']);
            if (heights.length > 0) {
                if (oy[0]) obj.max = d3.max(heights);
                if (oy[1]) obj.min = d3.min(heights);
            }
            arrGraph.push(obj);
        }
        
        if (key === "Год") {
            arrGraph.sort((a, b) => a.labelX - b.labelX);
        }
        
        return arrGraph;
    }

    return (
        <>
            <h4>Визуализация</h4>
            <form onSubmit={handleSubmit}>
                <p> Значение по оси OX: </p>
                <div>
                    <input type="radio" name="ox" value="Страна" defaultChecked={ox === "Страна"} />
                    Страна
                    <br/>		
                    <input type="radio" name="ox" value="Год" />
                    Год
                </div>

                <p> Значение по оси OY </p>
                <div>
                    <input type="checkbox" name="oy" defaultChecked={oy[0]} />
                    Максимальная высота <br/>
                    <input type="checkbox" name="oy" />
                    Минимальная высота
                </div>

                <p>Тип диаграммы:</p>
                <select name="chartType" defaultValue={chartType}>
                    <option value="scatter">Точечная диаграмма</option>
                    <option value="bar">Гистограмма</option>
                </select>

                <p>  
                    <button type="submit">Построить </button>
                </p>
                {error && <div style={{color: "red"}}>{error}</div>}
            </form>    
            {!error && <ChartDraw 
                data={createArrGraph(props.data, ox)} 
                oy={oy}
                chartType={chartType}
            />}
        </>
    )
}

export default Chart;