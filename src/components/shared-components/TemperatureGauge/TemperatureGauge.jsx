import React from 'react'
import GaugeComponent from 'react-gauge-component'

export default function TemperatureGauge( {
    allowed_temperature, // Allowed temperature
    temperature, // Temperature reading
} ) {
  return (
    <div className='w-full'>
        <div className='grid grid-cols-2 items-center'>
            <h1 className='text-xs'>Temperature</h1>
            <h1 className={`text-xs ${(temperature > allowed_temperature && temperature < allowed_temperature + 5) ? 'text-yellow-400' : temperature > allowed_temperature ? 'text-red-400' : 'text-blue-400'}`}>{(temperature > allowed_temperature && temperature < allowed_temperature + 5) ? 'High' : temperature > allowed_temperature ? 'Danger' : 'Normal'}</h1>
        </div>
        <GaugeComponent
            type='radial'
            arc={{
            width: 0.15,
            padding: 0.02,
            cornerRadius: 1,
            subArcs: [
                {
                limit: allowed_temperature,
                color: '#00a2ff',
                // showTick: true,
                tooltip: {
                    text: 'Allowed Temperature'
                },
                },
                {
                limit: allowed_temperature + 5,
                color: '#F5CD19',
                tooltip: {
                    text: 'Too high temperature!'
                }
                },
                {
                color: '#ff0000',
                tooltip: {
                    text: 'Danger Zone!'
                }
                }
            ]
            }}
            pointer={{
            type: 'needle',
            color: '#d5d5d5',
            length: 0.70,
            width: 10,
            // elastic: true,
            }}
            labels={{
            valueLabel: { 
                formatTextValue: value => value + 'ºC',
                style: {
                fontSize: "50px",
                color: "#808080",
                fill: "#d5d5d5", 
                }
            },
            // tickLabels: {
            //     type: 'outer',
            //     valueConfig: { formatTextValue: value => value + 'ºC', fontSize: 3 },
            //     ticks: [
            //     { value: allowed_temperature },
            //     { value: (allowed_temperature + 5) },
            //     ],
            // }
            }}
            value={temperature ? temperature : 0}
            minValue={10}
            maxValue={37}
        />
    </div>
  )
}
