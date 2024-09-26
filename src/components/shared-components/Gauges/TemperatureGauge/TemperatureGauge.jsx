import React from 'react'
import GaugeComponent from 'react-gauge-component'

export default function TemperatureGauge( {
    allowed_temperature, // Allowed temperature
    temperature, // Temperature reading
    parentClassname, // Classname of parent div
    maximumValue = 37, // Gauge's maximum value
    minimunValue = 10, // Gauge's minimum value
    firstLimitText = 'Normal', // The message on the first limit
    secondLimitText = 'High', // The message on the second limit
    thirdLimitText = null, // The message on the third limit
    gaugeType = 'radial', // Determines the gauge type
    textSize = '50px', // Determine the size of the text
    colorFill = '#d5d5d5', // Set the color of the text
} ) {
  return (
    <div className={parentClassname}>
        <div className='grid grid-cols-2 items-center'>
            <h1 className='text-xs'>Temperature</h1>
            <h1 className={`text-xs text-white rounded-md p-1 text-center ${(temperature > allowed_temperature && temperature < allowed_temperature + 5) ? 'bg-yellow-600' : temperature > allowed_temperature ? 'bg-red-600' : 'bg-blue-600'}`}>{(temperature > allowed_temperature && temperature < allowed_temperature + 5) ? 'High' : temperature > allowed_temperature ? 'Danger' : 'Normal'}</h1>
        </div>
        <GaugeComponent
            type={gaugeType}
            arc={{
            width: 0.2,
            cornerRadius: 3,
            subArcs: [
                {
                limit: allowed_temperature,
                color: '#00a2ff',
                // showTick: true,
                tooltip: {
                    text: firstLimitText
                },
                },
                {
                limit: allowed_temperature + 5,
                color: '#F5CD19',
                tooltip: {
                    text: secondLimitText
                }
                },
                {
                color: '#ff0000',
                tooltip: {
                    text: thirdLimitText
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
                fontSize: textSize,
                color: "#808080",
                fill: colorFill, 
                }
            },
            tickLabels: {
                hideMinMax: true,
            }
            }}
            value={temperature ? temperature : 0}
            minValue={minimunValue}
            maxValue={maximumValue}
        />
    </div>
  )
}
