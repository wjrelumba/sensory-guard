import React from 'react'
import GaugeComponent from 'react-gauge-component'

export default function VibrationGauge( {
    allow_vibration, // Allowed vibration
    vibration, // Vibration reading
    parentClassname, // Classname of parent div
} ) {
  return (
    <div className={parentClassname}>
        <div className='grid grid-cols-2 items-center'>
            <h1 className='text-xs'>Vibration</h1>
            <h1 className={`text-xs text-white rounded-md p-1 text-center ${vibration > allow_vibration ? 'bg-red-600' : 'bg-yellow-600'}`}>{vibration > allow_vibration ? 'Detected' : 'Undetected'}</h1>
        </div>
        <GaugeComponent
            type='radial'
            arc={{
            width: 0.15,
            padding: 0.02,
            cornerRadius: 1,
            subArcs: [
                {
                limit: allow_vibration,
                color: '#F5CD19',
                // showTick: true,
                tooltip: {
                    text: 'No Vibration'
                },
                },
                {
                color: '#ff0000',
                tooltip: {
                    text: 'Vibration Detected!'
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
            //     { value: allow_vibration },
            //     { value: (allow_vibration + 5) },
            //     ],
            // }
            }}
            value={vibration ? vibration : 0}
            minValue={0}
            maxValue={2}
        />
    </div>
  )
}
