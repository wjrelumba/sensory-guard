import { useEffect, useRef, useState } from "react";
import { Chart as ChartJS } from 'chart.js/auto';
import { fetchMonthly } from "../../../Functions/HistoryFunctions";

export default function Chart() {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null); // Ref to store chart instance

    const [averageValues, setAverageValues] = useState(null);

    const getAverage = async() => {
        const averageValuesChild = await fetchMonthly(2025);

        setAverageValues(averageValuesChild);

        console.log(averageValuesChild);
    }

    const createChart = () => {
        const dataValues = {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [{
                label: 'Average Temp',
                data: averageValues?.map(value => value.averageTemp),
                backgroundColor: 'rgba(176, 40, 0, 0.2)',
                borderColor: 'rgba(176, 40, 0, 1)',
                borderWidth: 1,
                },
                {
                label: 'Average Humidity',
                data: averageValues?.map(value => value.averageHumidity),
                backgroundColor: 'rgba(0, 43, 102, 0.2)',
                borderColor: 'rgba(0, 43, 102, 1)',
                borderWidth: 1,
                },
            ],
        };

        const colorValue = 'rgba(56, 56, 56, 1)';
        const titleColor = 'rgba(256, 256 ,256)';
    
        const optionValue = {
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        color: colorValue, // Change Y-axis tick color
                    },
                },
                x: {
                    ticks: {
                        color: colorValue, // Change X-axis tick color
                    },
                },
            },
            plugins: {
                legend: {
                    labels: {
                        color: colorValue, // Change legend text color
                    },
                },
                tooltip: {
                    titleColor: titleColor, // Change tooltip title color
                    bodyColor: titleColor, // Change tooltip body color
                },
            },
        };

        // Create a new chart instance if it doesn't already exist
        if (chartRef.current) {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy(); // Destroy the existing chart
            }
            if (averageValues){
                chartInstanceRef.current = new ChartJS(chartRef.current, {
                    type: 'bar',
                    data: dataValues,
                    options: optionValue,
                });
            }
        }
    }


    useEffect(() => {
        getAverage();
        // Cleanup function to destroy the chart on unmount
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, []);

    useEffect(() => {
        createChart();
    },[averageValues])

    return (
        <div className="w-full">
            <div className="w-full p-2 rounded-md from-white border-[2px] border-gray-300 shadow-xl to-blue-600 bg-gradient-to-b text-gray-900">
                <canvas ref={chartRef} />
            </div>
        </div>
    );
}
