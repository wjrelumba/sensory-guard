import React from 'react'
import GaugeComponent from 'react-gauge-component'

export default function SmokeGasGauge( {
    allowed_smoke_gas, // Allowed Smoke and Gas
    smokeGas, // Smoke gas reading
    parentClassname, // Classname for parent div
} ) {
  return (
    <div className={parentClassname}>
        <div className='grid grid-cols-2 items-center'>
            <h1 className='text-xs'>Smoke/Gas</h1>
            <h1 className={`text-xs text-white rounded-md p-1 text-center ${smokeGas > allowed_smoke_gas ? 'bg-red-600' : 'bg-yellow-600'}`}>{smokeGas > allowed_smoke_gas ? 'Detected' : 'Undetected'}</h1>
        </div>
        <GaugeComponent
            type='radial'
            arc={{
            width: 0.15,
            padding: 0.02,
            cornerRadius: 1,
            subArcs: [
                {
                limit: allowed_smoke_gas,
                color: '#F5CD19',
                // showTick: true,
                tooltip: {
                    text: 'No Smoke and Gas'
                },
                },
                {
                color: '#ff0000',
                tooltip: {
                    text: 'Smoke/Gas Detected'
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
            //     { value: allowed_smoke_gas },
            //     { value: (allowed_smoke_gas + 5) },
            //     ],
            // }
            }}
            value={smokeGas ? smokeGas : 0}
            minValue={0}
            maxValue={2}
        />
    </div>
  )
}
