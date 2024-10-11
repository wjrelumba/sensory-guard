import { useEffect, useRef } from "react";
import { Chart as ChartJS } from 'chart.js/auto';

export default function Chart() {
    const chartRef = useRef(null);
    const chartInstanceRef = useRef(null); // Ref to store chart instance

    useEffect(() => {
        const dataValues = {
            labels: ['January', 'February', 'March', 'April', 'May'],
            datasets: [{
                label: 'Readings',
                data: [12, 19, 18, 5, 2],
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            }],
        };

        const colorValue = 'rgba(216, 222, 225, 1)';
    
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
                    titleColor: colorValue, // Change tooltip title color
                    bodyColor: colorValue, // Change tooltip body color
                },
            },
        };

        // Create a new chart instance if it doesn't already exist
        if (chartRef.current) {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy(); // Destroy the existing chart
            }
            chartInstanceRef.current = new ChartJS(chartRef.current, {
                type: 'bar',
                data: dataValues,
                options: optionValue,
            });
        }

        // Cleanup function to destroy the chart on unmount
        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, []);

    return (
        <div className="w-full">
            <div className="w-full p-2 rounded-md bg-gray-600 text-gray-300">
                <canvas ref={chartRef} />
            </div>
        </div>
    );
}
