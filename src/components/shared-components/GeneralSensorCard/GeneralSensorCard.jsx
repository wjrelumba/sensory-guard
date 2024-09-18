import React, { useEffect, useState } from 'react'
import GaugeComponent from 'react-gauge-component';

export default function GeneralSensorCard( {
  prototypeId, // Current prototype ID
  readingValues, // Values
  prototypeImportantValues // Important values from prototype
} ) {
  const [dataValues, setDataValues] = useState(null);

  const getDataValues = () => {
    console.log(readingValues);
    const dataValueChild = readingValues?.filter(value => value.proto_id === prototypeId)
    console.log(dataValueChild);
    console.log(dataValueChild[dataValueChild.length-1]);
    setDataValues(dataValueChild[dataValueChild.length-1]);
  }

  useEffect(() => {
    getDataValues();
    console.log(readingValues);
  },[readingValues])

  useEffect(() => {console.log(dataValues)},[dataValues]);
  
  return (
    <div className='w-1/2 p-2 bg-white rounded-md'>
      <div className='w-full p-2'>
        <h1>Temperature</h1>
        {dataValues && (
          <GaugeComponent
            className='w-[80%] h-[80%]'
            type="radial"
            arc={{
              width: 0.2,
              padding: 0.005,
              cornerRadius: 1,
              subArcs: [
                {
                  limit: prototypeImportantValues.allowed_temperature,
                  color: '#F5CD19',
                  showTick: true,
                  tooltip: {
                    text: 'Allowed Temperature'
                  },
                },
                {
                  limit: prototypeImportantValues.allowed_temperature + 5,
                  color: '#ff8f00',
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
              color: '#345243',
              length: 0.80,
              width: 15,
              // elastic: true,
            }}
            labels={{
              valueLabel: { 
                formatTextValue: value => value + 'ºC',
                style: {
                  fontSize: "40px",
                  color: "#808080",
                  fill: "#808080", 
                }
               },
              tickLabels: {
                type: 'outer',
                valueConfig: { formatTextValue: value => value + 'ºC', fontSize: 5 },
                ticks: [
                  { value: prototypeImportantValues.allowed_temperature },
                  { value: (prototypeImportantValues.allowed_temperature + 5) },
                ],
              }
            }}
            value={dataValues.temperature ? dataValues.temperature : 0}
            minValue={10}
            maxValue={37}
          />
        )}
      </div>
    </div>
  )
}
