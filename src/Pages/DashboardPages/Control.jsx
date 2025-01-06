import React, { useEffect, useState } from 'react'
import { supabase } from '../../Essentials/Supabase';
import { toast } from 'react-toastify';

export default function Control() { 
  // const [sampleAircons, setSampleAircons] = useState();
  const [sampleBuzzers, setSampleBuzzers] = useState();

  // Create states for variables
  const [tempvarClicked, setTempvarClicked] = useState(false);
  const [humidvarClicked, setHumidvarClicked] = useState(false);
  const [smokeGasVarClicked, setSmokeGasVarClicked] = useState(false);

  // Create a state for input object
  const [inputObjectSetter, setInputObjectSetter] = useState(null);

  // Set states for prototypes
  const [prototypeData, setPrototypeData] = useState(null);

  // Input states for temperature
  const [tempNormalLow, setTempNormalLow] = useState({});
  const [tempNormalHigh, setTempNormalHigh] = useState({});

  const [tempHighLow, setTempHighLow] = useState({});
  const [tempHighHigh, setTempHighHigh] = useState({});

  const [tempDangerLow, setTempDangerLow] = useState({});
  const [tempDangerHigh, setTempDangerHigh] = useState({});

  // Input states for humidity
  const [humidNormalLow, setHumidNormalLow] = useState({});
  const [humidNormalHigh, setHumidNormalHigh] = useState({});

  const [humidHighLow, setHumidHighLow] = useState({});
  const [humidHighHigh, setHumidHighHigh] = useState({});

  const [humidDangerLow, setHumidDangerLow] = useState({});
  const [humidDangerHigh, setHumidDangerHigh] = useState({});

  // Input states for smoke and gas
  const [smokeGasValue, setSmokeGasValue] = useState({});

  const inputObjectFunction = (data) => {
    const inputObjectSetterChild = { // This is the object for the input handlers
    }
    for(var i = 0; i < data.length; i++){

      // Temperature
      inputObjectSetterChild[`temperature-normal-low-${i+1}`] = {
        'updater': setTempNormalLow,
        'state': tempNormalLow,
      };
      inputObjectSetterChild[`temperature-normal-high-${i+1}`] = {
        'updater': setTempNormalHigh,
        'state': tempNormalHigh,
      };
      inputObjectSetterChild[`temperature-high-low-${i+1}`] = {
        'updater': setTempHighLow,
        'state': tempHighLow
      };
      inputObjectSetterChild[`temperature-high-high-${i+1}`] = {
        'updater': setTempHighHigh,
        'state': tempHighHigh,
      };
      inputObjectSetterChild[`temperature-danger-low-${i+1}`] = {
        'updater': setTempDangerLow,
        'state': tempDangerLow,
      };
      inputObjectSetterChild[`temperature-danger-high-${i+1}`] = {
        'updater': setTempDangerHigh,
        'state': tempDangerHigh,
      };

      // Humidity
      inputObjectSetterChild[`humidity-normal-low-${i+1}`] = {
        'updater': setHumidNormalLow,
        'state': humidNormalLow,
      };
      inputObjectSetterChild[`humidity-normal-high-${i+1}`] = {
        'updater': setHumidNormalHigh,
        'state': humidNormalHigh,
      };
      inputObjectSetterChild[`humidity-high-low-${i+1}`] = {
        'updater': setHumidHighLow,
        'state': humidHighLow,
      };
      inputObjectSetterChild[`humidity-high-high-${i+1}`] = {
        'updater': setHumidHighHigh,
        'state': humidHighHigh,
      };
      inputObjectSetterChild[`humidity-danger-low-${i+1}`] = {
        'updater': setHumidDangerLow,
        'state': humidDangerLow,
      };
      inputObjectSetterChild[`humidity-danger-high-${i+1}`] = {
        'updater': setHumidDangerHigh,
        'state': humidDangerHigh,
      };

      // Smoke and Gas
      inputObjectSetterChild[`smoke_gas-threshold-${i+1}`] = {
        'updater': setSmokeGasValue,
        'state': smokeGasValue,
      };

      // Vibration
    };
    return inputObjectSetterChild;
  }

  const getVariables = async() => {
    const {data} = await supabase.from('prototypes').select();
    if(data){
      console.log(data);
      data.sort((a,b) => a.proto_number - b.proto_number);
      console.log(data);
      setPrototypeData(data);
      
      const inputObjectSetterHolder = inputObjectFunction(data);
      setInputObjectSetter(inputObjectSetterHolder);
    }
  };

  const variableBoxFunc = (e) => {
    const {name} = e.currentTarget.dataset;
    if(name == 'tempvar'){
      setTempvarClicked(!tempvarClicked);
    }
    if(name == 'humidvar'){
      setHumidvarClicked(!humidvarClicked);
    }
    if(name == 'smokegasvar'){
      setSmokeGasVarClicked(!smokeGasVarClicked);
    }
  };

  // Cancel the changing of variables for temperature
  const temperatureCancelBtn = () => {
    setTempNormalLow({});
    setTempNormalHigh({});
    setTempHighLow({});
    setTempHighHigh({});
    setTempDangerLow({});
    setTempDangerHigh({});
    setTempvarClicked(false);
  };

  // Update the temperature variables in the database
  const temperatureUpdateDB = async() => {
    const {data} = await supabase.from('prototypes').select();
    
    const protoIds = data.map(a => a.id);

    const temperature_variables = {};
    console.log(temperature_variables);

    for(var i=0; i < protoIds.length; i++){
      temperature_variables[protoIds[i]] = {}; // Create the object for specific proto ID
      temperature_variables[protoIds[i]].normal = {}; // Normal range
      temperature_variables[protoIds[i]].high = {}; // High range
      temperature_variables[protoIds[i]].danger = {}; // Danger range

      const {data} = await supabase.from('prototypes').select().eq('id', protoIds[i]);

      // Normal range
      if(tempNormalLow[protoIds[i]] != undefined){
        temperature_variables[protoIds[i]].normal.low = tempNormalLow[protoIds[i]]; // If the user inputs something, this will run
      }
      else{
        temperature_variables[protoIds[i]].normal.low = data[0].temperature_variables.normal.low; // If the user did not input anything, it will take its existing value
      }

      if(tempNormalHigh[protoIds[i]] != undefined){
        temperature_variables[protoIds[i]].normal.high = tempNormalHigh[protoIds[i]]; // If the user inputs something, this will run
      }
      else{
        temperature_variables[protoIds[i]].normal.high = data[0].temperature_variables.normal.high; // If the user did not input anything, it will take its existing value
      }

      // High range
      if(tempHighLow[protoIds[i]] != undefined){
        temperature_variables[protoIds[i]].high.low = tempHighLow[protoIds[i]]; // If the user inputs something, this will run
      }
      else{
        temperature_variables[protoIds[i]].high.low = data[0].temperature_variables.high.low; // If the user did not input anything, it will take its existing value
      }

      if(tempHighHigh[protoIds[i]] != undefined){
        temperature_variables[protoIds[i]].high.high = tempHighHigh[protoIds[i]]; // If the user inputs something, this will run
      }
      else{
        temperature_variables[protoIds[i]].high.high = data[0].temperature_variables.high.high; // If the user did not input anything, it will take its existing value
      }

      // Danger range
      if(tempDangerLow[protoIds[i]] != undefined){
        temperature_variables[protoIds[i]].danger.low = tempDangerLow[protoIds[i]]; // If the user inputs something, this will run
      }
      else{
        temperature_variables[protoIds[i]].danger.low = data[0].temperature_variables.danger.low; // If the user did not input anything, it will take its existing value
      }

      if(tempDangerHigh[protoIds[i]] != undefined){
        temperature_variables[protoIds[i]].danger.high = tempDangerHigh[protoIds[i]]; // If the user inputs something, this will run
      }
      else{
        temperature_variables[protoIds[i]].danger.high = data[0].temperature_variables.danger.high; // If the user did not input anything, it will take its existing value
      }

      if(
        temperature_variables[protoIds[i]].normal.low >= temperature_variables[protoIds[i]].normal.high ||
        temperature_variables[protoIds[i]].normal.high >= temperature_variables[protoIds[i]].high.low ||
        temperature_variables[protoIds[i]].normal.high <= temperature_variables[protoIds[i]].normal.low ||
        temperature_variables[protoIds[i]].high.low >= temperature_variables[protoIds[i]].high.high ||
        temperature_variables[protoIds[i]].high.high <= temperature_variables[protoIds[i]].high.low ||
        temperature_variables[protoIds[i]].high.high >= temperature_variables[protoIds[i]].danger.low ||
        temperature_variables[protoIds[i]].danger.low >= temperature_variables[protoIds[i]].danger.high ||
        temperature_variables[protoIds[i]].danger.high <= temperature_variables[protoIds[i]].danger.low
      ){
        toast.error(`${data[0].proto_name}: Range error, check your inputs`);
      }
      else {
        const {error} = await supabase.from('prototypes').update({
          temperature_variables: temperature_variables[protoIds[i]]
        }).eq('id', protoIds[i]);
        if(!error){
          toast.success(`${data[0].proto_name}: Temperature Variables successfully updated`);
        };
      };

      console.log(tempNormalLow[protoIds[i]]);
      console.log(temperature_variables);
    }
  };

  // Cancel the changing of variables for humidity
  const humidityCancelBtn = () => {
    setHumidNormalLow({});
    setHumidNormalHigh({});
    setHumidHighLow({});
    setHumidHighHigh({});
    setHumidDangerLow({});
    setHumidDangerHigh({});
    setHumidvarClicked(false);
  };

  // Update the humidity variables in the database
  const humidityUpdateDB = async() => {
    const {data} = await supabase.from('prototypes').select();

    const protoIds = data.map(a => a.id);

    const humidity_variables = {};
    console.log(humidity_variables);

    for(var i=0; i < protoIds.length; i++){
      humidity_variables[protoIds[i]] = {}; // Create the object for specific proto ID
      humidity_variables[protoIds[i]].normal = {}; // Normal range
      humidity_variables[protoIds[i]].high = {}; // High range
      humidity_variables[protoIds[i]].danger = {}; // Danger range

      const {data} = await supabase.from('prototypes').select().eq('id', protoIds[i]);

      // Normal range
      if(humidNormalLow[protoIds[i]] != undefined){
        humidity_variables[protoIds[i]].normal.low = humidNormalLow[protoIds[i]]; // If the user inputs something, this will run
      }
      else{
        humidity_variables[protoIds[i]].normal.low = data[0].humidity_variables.normal.low; // If the user did not input anything, it will take its existing value
      }

      if(humidNormalHigh[protoIds[i]] != undefined){
        humidity_variables[protoIds[i]].normal.high = humidNormalHigh[protoIds[i]]; // If the user inputs something, this will run
      }
      else{
        humidity_variables[protoIds[i]].normal.high = data[0].humidity_variables.normal.high; // If the user did not input anything, it will take its existing value
      }

      // High range
      if(humidHighLow[protoIds[i]] != undefined){
        humidity_variables[protoIds[i]].high.low = humidHighLow[protoIds[i]]; // If the user inputs something, this will run
      }
      else{
        humidity_variables[protoIds[i]].high.low = data[0].humidity_variables.high.low; // If the user did not input anything, it will take its existing value
      }

      if(humidHighHigh[protoIds[i]] != undefined){
        humidity_variables[protoIds[i]].high.high = humidHighHigh[protoIds[i]]; // If the user inputs something, this will run
      }
      else{
        humidity_variables[protoIds[i]].high.high = data[0].humidity_variables.high.high; // If the user did not input anything, it will take its existing value
      }

      // Danger range
      if(humidDangerLow[protoIds[i]] != undefined){
        humidity_variables[protoIds[i]].danger.low = humidDangerLow[protoIds[i]]; // If the user inputs something, this will run
      }
      else{
        humidity_variables[protoIds[i]].danger.low = data[0].humidity_variables.danger.low; // If the user did not input anything, it will take its existing value
      }

      if(humidDangerHigh[protoIds[i]] != undefined){
        humidity_variables[protoIds[i]].danger.high = humidDangerHigh[protoIds[i]]; // If the user inputs something, this will run
      }
      else{
        humidity_variables[protoIds[i]].danger.high = data[0].humidity_variables.danger.high; // If the user did not input anything, it will take its existing value
      }

      if(
        humidity_variables[protoIds[i]].normal.low >= humidity_variables[protoIds[i]].normal.high ||
        humidity_variables[protoIds[i]].normal.high >= humidity_variables[protoIds[i]].high.low ||
        humidity_variables[protoIds[i]].normal.high <= humidity_variables[protoIds[i]].normal.low ||
        humidity_variables[protoIds[i]].high.low >= humidity_variables[protoIds[i]].high.high ||
        humidity_variables[protoIds[i]].high.high <= humidity_variables[protoIds[i]].high.low ||
        humidity_variables[protoIds[i]].high.high >= humidity_variables[protoIds[i]].danger.low ||
        humidity_variables[protoIds[i]].danger.low >= humidity_variables[protoIds[i]].danger.high ||
        humidity_variables[protoIds[i]].danger.high <= humidity_variables[protoIds[i]].danger.low
      ){
        toast.error(`${data[0].proto_name}: Range error, check your inputs`);
      }
      else {
        const {error} = await supabase.from('prototypes').update({
          humidity_variables: humidity_variables[protoIds[i]]
        }).eq('id', protoIds[i]);
        if(!error){
          toast.success(`${data[0].proto_name}: Humidity Variables successfully updated`);
        };
      };

      console.log(humidNormalLow[protoIds[i]]);
      console.log(humidity_variables);
    }
  };

  const smokeGasCancelBtn = () => {
    setSmokeGasValue({});
    setSmokeGasVarClicked(false);
  };

  // Update the humidity variables in the database
  const smokeGasUpdateDB = async() => {
    const {data} = await supabase.from('prototypes').select();

    const protoIds = data.map(a => a.id);

    const smoke_gas_variables = {};
    console.log(smoke_gas_variables);

    for(var i=0; i < protoIds.length; i++){
      smoke_gas_variables[protoIds[i]] = {}; // Create the object for specific proto ID
      smoke_gas_variables[protoIds[i]].threshold = {}; // threshold

      const {data} = await supabase.from('prototypes').select().eq('id', protoIds[i]);

      // Threshold
      if(smokeGasValue[protoIds[i]] != undefined){
        smoke_gas_variables[protoIds[i]].threshold = smokeGasValue[protoIds[i]]; // If the user inputs something, this will run
      }
      else{
        smoke_gas_variables[protoIds[i]].threshold = data[0].smoke_gas_variables.threshold; // If the user did not input anything, it will take its existing value
      }

      console.log(smoke_gas_variables[protoIds[i]]);

      const {error} = await supabase.from('prototypes').update({
        smoke_gas_variables: smoke_gas_variables[protoIds[i]]
      }).eq('id', protoIds[i]);
      if(!error){
        toast.success(`${data[0].proto_name}: Smoke and Gas Variables successfully updated`);
      };
    }
  };

  const inputHandler = (e) => {
    const {value, name, defaultValue} = e.target;
    const {id} = e.target.dataset;
    
    let tempObjectHolder = {...inputObjectSetter[name].state};
    console.log(tempObjectHolder);
    tempObjectHolder[id] = parseInt(value);

    console.log(tempObjectHolder);

    inputObjectSetter[name].updater(tempObjectHolder);

    //inputObjectSetter[name](value); // Use the object to automatically get the state updater and update its value
  };

  useEffect(() => { // UseEffect to always update the inputObjectSetter
    if(prototypeData){
      const inputObjectSetterHolder = inputObjectFunction(prototypeData);
      setInputObjectSetter(inputObjectSetterHolder);
    }
  },[
    tempNormalLow,
    tempNormalHigh,
    tempHighLow,
    tempHighHigh,
    tempDangerLow,
    tempDangerHigh,
    humidNormalLow,
    humidNormalHigh,
    humidHighLow,
    humidHighHigh,
    humidDangerLow,
    humidDangerHigh,
  ]);

  useEffect(() => {
    getVariables();
    // const sampleAirconsValue = [{
    //   name: 'AC 1',
    //   open: false,
    // },{
    //   name: 'AC 2',
    //   open: true,
    // }];

    const sampleBuzzersValue = [{
      name: 'BZ 1',
      open: false,
    },{
      name: 'BZ 2',
      open: true,
    }]

    // setSampleAircons(sampleAirconsValue);
    setSampleBuzzers(sampleBuzzersValue);
  },[]);

  // const airconClick = (index) => {
  //   const arrayHolder = [...sampleAircons];
  //   arrayHolder[index].open = !arrayHolder[index].open;

  //   setSampleAircons(arrayHolder);
  // };

  const buzzerClick = (index) => {
    const arrayHolder = [...sampleBuzzers];
    arrayHolder[index].open = !arrayHolder[index].open;

    setSampleBuzzers(arrayHolder);
  };

  const variableRenderer = (text, dataValue, range, mode, proto_number, proto_id) => {
    let modeValue;
    if(mode == 'temperature'){
      modeValue = '°C';
    }
    else if(mode == 'humidity'){
      modeValue = 'g/kg';
    }
    else if(mode == 'smoke_gas'){
      modeValue = 'ppm';
    }

    if(mode == 'temperature' || mode == 'humidity'){
      return (
        <div className='flex items-center'>
          <div className='w-[25%]'>
            <h1 className='text-gray-500 font-bold'>{text}</h1>
          </div>
          <div className='grid grid-flow-col items-center gap-2 w-[75%]'>
            <div className='col-span-2'>
              <input data-id={proto_id} onChange={inputHandler} name={`${mode}-${range}-low-${proto_number}`} type="number" className='w-full rounded-lg px-2 py-1 border border-gray-400' defaultValue={dataValue[`${mode}_variables`][range].low}/>
            </div>
            <div className='col-span-1 flex justify-center'>
              <h1>-</h1>
            </div>
            <div className='col-span-2'>
              <input data-id={proto_id} onChange={inputHandler} name={`${mode}-${range}-high-${proto_number}`} type="number" className='w-full rounded-lg px-2 py-1 border border-gray-400' defaultValue={dataValue[`${mode}_variables`][range].high}/>
            </div>
            <div className='col-span-1'>
              <h1>{modeValue}</h1>
            </div>
          </div>
        </div>
      )
    }
    else if(mode == 'smoke_gas'){
      return (
        <div className='flex items-center'>
          <div className='w-[25%]'>
            <h1 className='text-gray-500 font-bold'>{text}</h1>
          </div>
          <div className='grid grid-flow-col items-center gap-2 w-[75%]'>
            <div className='col-span-2'>
              <input data-id={proto_id} onChange={inputHandler} name={`${mode}-${range}-${proto_number}`} type="number" className='w-full rounded-lg px-2 py-1 border border-gray-400' defaultValue={dataValue[`${mode}_variables`][range]}/>
            </div>
            <div className='col-span-1'>
              <h1>{modeValue}</h1>
            </div>
          </div>
        </div>
      )
    }
  }

  return (
    <div className='w-full h-full flex flex-col gap-6'>
      {/* <div className='p-1'>
        <h1 className='text-xl font-bold text-gray-700'>Air Conditioners</h1>
        <div className='flex gap-1'>
          {sampleAircons && (
            <>
              {sampleAircons.map((data, index) => (
                <div key={index} className='grid grid-cols-2 px-3 py-2 justify-items-center items-center rounded-lg border-[2px] h-[3rem] shadow-lg w-1/2 border-gray-300'>
                    <h1 className='font-bold text-gray-600'>{data.name}</h1>
                    <div onClick={() => airconClick(index)} className={`grid grid-cols-2 w-full p-1 justify-items-center items-center h-full rounded ${data.open ? 'bg-blue-600':'bg-red-600'}`}>
                      <div className={`flex justify-center items-center font-bold rounded w-full h-full text-xs ${data.open ? 'bg-white switch-slide-left' : 'text-white'}`}>
                        <h1>
                          ON
                        </h1>
                      </div>
                      <div className={`flex justify-center items-center font-bold rounded w-full h-full text-xs ${!data.open ? 'bg-white switch-slide-right' : 'text-white'}`}>
                        <h1>
                          OFF
                        </h1>
                      </div>
                    </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div> */}
      <div className='p-1 flex flex-col gap-1'>
        <h1 className='text-xl font-bold text-gray-700'>Buzzer</h1>
        <div className='flex gap-4 items-center'>
          <h1 className='font-bold text-gray-700'>
            Alert
          </h1>
          <div className='bg-gray-300 px-3 py-1 rounded'>
            <h1 className='font-bold text-gray-700'>
              Normal Vitals
            </h1>
          </div>
        </div>
        <div className='flex gap-1'>
          {sampleBuzzers && (
            <>
              {sampleBuzzers.map((data, index) => (
                <div key={index} className='grid grid-cols-2 px-3 py-2 justify-items-center items-center rounded-lg border-[2px] h-[3rem] shadow-lg w-1/2 border-gray-300'>
                    <h1 className='font-bold text-gray-600'>{data.name}</h1>
                    <div onClick={() => buzzerClick(index)} className={`bg-gray-400 flex w-full p-1 justify-center items-center h-full rounded`}>
                      <div className={`${data.open ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-500'} w-full h-full rounded flex justify-center items-center`}>
                        <h1 className='text-xs font-bold'>
                          {data.open ? 'MUTE' : 'UNMUTE'}
                        </h1>
                      </div>
                    </div>
                </div>
              ))}
            </>
          )}
        </div>
      </div>
      <div className='p-1 flex flex-col gap-1'>
        <h1 className='text-xl font-bold text-gray-700'>Variables</h1>
        <div className='w-full flex flex-col justify-center gap-2 items-center'>
          <div className={`flex flex-col justify-center gap-2 ${!tempvarClicked ? 'bg-gray-300' : 'bg-gray-200'} w-full rounded-lg px-4 py-3 text-gray-700`}>
            <div className='flex items-center justify-between w-full'>
              <div className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-thermometer"><path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path></svg>
                <h1 className='text-xl font-bold'>Temperature</h1>
              </div>
              <div className='flex items-center'>
                <button data-name='tempvar' onClick={!tempvarClicked ? variableBoxFunc : temperatureCancelBtn}>
                  {!tempvarClicked ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                  ):(
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  )}
                </button>
              </div>
            </div>
            {prototypeData && tempvarClicked && (
              <>
                <h1 className='text-xs'>Set the variable (ranges) for temperature</h1>
                {prototypeData.map((data) => (
                  <div className='w-full' key={data.proto_number}>
                    <div className='w-[35%]'>
                      <h1 className='py-1 px-3 bg-gray-900 rounded-2xl text-white text-center font-bold'>{data.proto_name}</h1>
                    </div>
                    <div className='grid grid-rows-3 w-full mt-2 gap-2 px-1'>
                      {variableRenderer('Normal', data, 'normal', 'temperature', data.proto_number, data.id)}
                      {variableRenderer('High', data, 'high', 'temperature', data.proto_number, data.id)}
                      {variableRenderer('Danger', data, 'danger', 'temperature', data.proto_number, data.id)}
                    </div>
                  </div>
                ))}
                <div className='w-full flex justify-end'>
                  <div className='w-1/2 grid grid-cols-2 gap-2'>
                    <button onClick={temperatureUpdateDB} className='w-full bg-blue-600 rounded-full text-white'>Apply</button>
                    <button onClick={temperatureCancelBtn} className='w-full bg-gray-300 rounded-full text-gray-800'>Cancel</button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className={`flex flex-col justify-center gap-2 ${!humidvarClicked ? 'bg-gray-300' : 'bg-gray-200'} w-full rounded-lg px-4 py-3 text-gray-700`}>
            <div className='flex items-center justify-between w-full'>
              <div className='flex items-center'>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-droplet"><path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"></path></svg>
                <h1 className='text-xl font-bold'>Humidity</h1>
              </div>
              <div className='flex items-center'>
                <button data-name='humidvar' onClick={!humidvarClicked ? variableBoxFunc : humidityCancelBtn}>
                  {!humidvarClicked ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                  ):(
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  )}
                </button>
              </div>
            </div>
            {prototypeData && humidvarClicked && (
              <>
                <h1 className='text-xs'>Set the variable (ranges) for humidity</h1>
                {prototypeData.map((data) => (
                  <div className='w-full' key={data.proto_number}>
                    <div className='w-[35%]'>
                      <h1 className='py-1 px-3 bg-gray-900 rounded-2xl text-white text-center font-bold'>{data.proto_name}</h1>
                    </div>
                    <div className='grid grid-rows-3 w-full mt-2 gap-2 px-1'>
                      {variableRenderer('Normal', data, 'normal', 'humidity', data.proto_number, data.id)}
                      {variableRenderer('High', data, 'high', 'humidity', data.proto_number, data.id)}
                      {variableRenderer('Danger', data, 'danger', 'humidity', data.proto_number, data.id)}
                    </div>
                  </div>
                ))}
                <div className='w-full flex justify-end'>
                  <div className='w-1/2 grid grid-cols-2 gap-2'>
                    <button onClick={humidityUpdateDB} className='w-full bg-blue-600 rounded-full text-white'>Apply</button>
                    <button onClick={humidityCancelBtn} className='w-full bg-gray-300 rounded-full text-gray-800'>Cancel</button>
                  </div>
                </div>
              </>
            )}
          </div>
          <div className={`flex flex-col justify-center gap-2 ${!smokeGasVarClicked ? 'bg-gray-300' : 'bg-gray-200'} w-full rounded-lg px-4 py-3 text-gray-700`}>
            <div className='flex items-center justify-between w-full'>
              <div className='flex items-center gap-1'>
                <svg xmlns="http://www.w3.org/2000/svg" fill='#374151' width="20" height="24" viewBox="0 0 640 512"><path d="M32 144c0 79.5 64.5 144 144 144l123.3 0c22.6 19.9 52.2 32 84.7 32s62.1-12.1 84.7-32l27.3 0c61.9 0 112-50.1 112-112s-50.1-112-112-112c-10.7 0-21 1.5-30.8 4.3C443.8 27.7 401.1 0 352 0c-32.6 0-62.4 12.2-85.1 32.3C242.1 12.1 210.5 0 176 0C96.5 0 32 64.5 32 144zM616 368l-336 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l336 0c13.3 0 24-10.7 24-24s-10.7-24-24-24zm-64 96l-112 0c-13.3 0-24 10.7-24 24s10.7 24 24 24l112 0c13.3 0 24-10.7 24-24s-10.7-24-24-24zm-192 0L24 464c-13.3 0-24 10.7-24 24s10.7 24 24 24l336 0c13.3 0 24-10.7 24-24s-10.7-24-24-24zM224 392c0-13.3-10.7-24-24-24L96 368c-13.3 0-24 10.7-24 24s10.7 24 24 24l104 0c13.3 0 24-10.7 24-24z"/></svg>
                <h1 className='text-xl font-bold'>Smoke and Gas</h1>
              </div>
              <div className='flex items-center'>
                <button data-name='smokegasvar' onClick={!smokeGasVarClicked ? variableBoxFunc : smokeGasCancelBtn}>
                  {!smokeGasVarClicked ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-more-horizontal"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                  ):(
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                  )}
                </button>
              </div>
            </div>
            {prototypeData && smokeGasVarClicked && (
              <>
                <h1 className='text-xs'>Set the threshold for smoke (default 300)</h1>
                {prototypeData.map((data) => (
                  <div className='w-full' key={data.proto_number}>
                    <div className='w-[35%]'>
                      <h1 className='py-1 px-3 bg-gray-900 rounded-2xl text-white text-center font-bold'>{data.proto_name}</h1>
                    </div>
                    <div className='grid grid-rows-1 w-full mt-2 gap-2 px-1'>
                      {variableRenderer('Threshold', data, 'threshold', 'smoke_gas', data.proto_number, data.id)}
                    </div>
                  </div>
                ))}
                <div className='w-full flex justify-end'>
                  <div className='w-1/2 grid grid-cols-2 gap-2'>
                    <button onClick={smokeGasUpdateDB} className='w-full bg-blue-600 rounded-full text-white'>Apply</button>
                    <button onClick={smokeGasCancelBtn} className='w-full bg-gray-300 rounded-full text-gray-800'>Cancel</button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
