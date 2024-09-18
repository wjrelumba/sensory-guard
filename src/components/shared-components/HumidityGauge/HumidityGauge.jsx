import React from 'react'
import GaugeComponent from 'react-gauge-component'

export default function HumidityGauge( {
    allowed_humidity, // Allowed temperature
    humidity, // Temperature reading
} ) {
  return (
    <div className='w-full'>
        <div className='grid grid-cols-2 items-center'>
            <h1 className='text-xs'>Humidity</h1>
            <h1 className={`text-xs ${(humidity > allowed_humidity && humidity < allowed_humidity + 5) ? 'text-orange-400' : humidity > allowed_humidity ? 'text-red-400' : 'text-yellow-400'}`}>{(humidity > allowed_humidity && humidity < allowed_humidity + 5) ? 'High' : humidity > allowed_humidity ? 'Danger' : 'Normal'}</h1>
        </div>
        <GaugeComponent
            type='radial'
            arc={{
            width: 0.15,
            padding: 0.02,
            cornerRadius: 1,
            subArcs: [
                {
                limit: allowed_humidity,
                color: '#F5CD19',
                // showTick: true,
                tooltip: {
                    text: 'Allowed Humidity'
                },
                },
                {
                limit: allowed_humidity + 5,
                color: '#ff8f00',
                tooltip: {
                    text: 'Too high humidity!'
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
                formatTextValue: value => value,
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
            //     { value: allowed_humidity },
            //     { value: (allowed_humidity + 5) },
            //     ],
            // }
            }}
            value={humidity ? humidity : 0}
            minValue={10}
            maxValue={37}
        />
    </div>
  )
}
