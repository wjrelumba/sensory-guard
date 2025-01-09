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
    arrowColor = '#616161',
} ) {
  return (
    <div className={parentClassname}>
        <div className='grid grid-cols-2 items-center'>
            <h1 className='text-xs'>Temperature</h1>
            <h1 className={`text-xs text-white rounded-md p-1 text-center ${(temperature > allowed_temperature.normal.high && temperature < allowed_temperature.high.high) ? 'bg-orange-600' : temperature > allowed_temperature.high.high ? 'bg-red-600' : 'bg-blue-600'}`}>{(temperature > allowed_temperature.normal.high && temperature < allowed_temperature.high.high) ? 'High' : temperature > allowed_temperature.high.high ? 'Danger' : 'Normal'}</h1>
        </div>
        <GaugeComponent
            type={gaugeType}
            arc={{
            width: 0.2,
            cornerRadius: 3,
            subArcs: [
                {
                limit: allowed_temperature.normal.high,
                color: '#00a2ff',
                // showTick: true,
                tooltip: {
                    text: firstLimitText
                },
                },
                {
                limit: allowed_temperature.high.high,
                color: '#ff8f00',
                tooltip: {
                    text: secondLimitText
                }
                },
                {
                limit: allowed_temperature.danger.high,
                color: '#ff0000',
                tooltip: {
                    text: thirdLimitText
                }
                }
            ]
            }}
            pointer={{
            type: 'needle',
            color: arrowColor,
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
            minValue={allowed_temperature.normal.low}
            maxValue={allowed_temperature.danger.high}
        />
    </div>
  )
}
