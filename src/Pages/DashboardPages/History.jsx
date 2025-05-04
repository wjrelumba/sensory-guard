import React, { useEffect, useState } from 'react'
import HistoryCard from '../../components/shared-components/HistoryCard/HistoryCard';
import { showSuccessToast } from '../../Essentials/ShowToast';
import ReportsCard from '../../components/shared-components/ReportsCard/ReportsCard';
import { fetchDaily, fetchMonthly, fetchMonthlyHistory, fetchWeekly } from '../../Functions/HistoryFunctions';
import monthExtractor from '../../Essentials/MonthExtractor';
import Loader from '../../components/shared-components/Loader/Loader';
import { useNavigate } from 'react-router-dom';

const sampleHistory = [{
    date: 'December 3, 2024',
    status: 'Normal Levels',
    detection: 'No unusual detection.'
  },{
    date: 'December 2, 2024',
    status: 'Normal Levels',
    detection: 'No unusual detection.'
  },{
    date: 'December 1, 2024',
    status: 'Normal Levels',
    detection: 'Vibration detected.'
  },
  {
    date: 'November 1, 2024',
    status: 'Normal Levels',
    detection: 'Vibration detected.'
  },
];

export default function History() {
  const navigate = useNavigate();

  const navigateToShow = (data) => {
    navigate('/dashboard/viewReport', {state: {data, chosenYear, monthlyMode, dailyMode, weeklyMode}})
  }

  const showToast = () => {
    console.log('clicked');
    showSuccessToast('Clicked');
  }

  const [reportsToShow, setReportsToShow] = useState(null);
  const [historyToShow, setHistoryToShow] = useState(null);

  const [chosenYear, setChosenYear] = useState(new Date().getFullYear());
  const [historyChosenYear, setHistoryChosenYear] = useState(new Date().getFullYear());
  const [chosenMonth, setChosenMonth] = useState(1);

  const [isReportsLoading, setIsReportsLoading] = useState(true);
  const [isHistoryLoading, setIsHistoryLoading] = useState(true);

  const [modeObject, setModeObject] = useState(null);

  const [monthlyMode, setMonthlyMode] = useState(true);
  const [weeklyMode, setWeeklyMode] = useState(false);
  const [dailyMode, setDailyMode] = useState(false);

  const getData = async() => {
    const dataRetrieved = await (monthlyMode ? fetchMonthly(chosenYear) : weeklyMode ? fetchWeekly(chosenYear, chosenMonth) : dailyMode ? fetchDaily(chosenYear, chosenMonth) : null);
    const historyDataRetrieved = await fetchMonthlyHistory(historyChosenYear);

    console.log(dataRetrieved);

    setHistoryToShow(historyDataRetrieved);
    setReportsToShow(dataRetrieved);
    setIsReportsLoading(false);
    setIsHistoryLoading(false);
  };

  useEffect(() => {
    getData();
    setModeObject({
      monthlyMode,
      weeklyMode,
      dailyMode,
    })
  },[chosenYear, chosenMonth, monthlyMode, weeklyMode, dailyMode, historyChosenYear]);

  const setYearFunction = (e) => {
    const {value, name} = e.target;
    switch(name){
      case 'reports':
        setIsReportsLoading(true);
        console.log(value);
        setChosenYear(value);
        break;
      case 'history':
        setIsHistoryLoading(true);
        console.log(value);
        setHistoryChosenYear(value);
        break;
    }
  };

  const setMonthFunction = (e) => {
    setIsReportsLoading(true);
    const {value} = e.target;
    console.log(value);
    setChosenMonth(value);
  }

  const setReportModeFunc = (e) => {
    setIsReportsLoading(true);
    const {value} = e.target;
    switch(value){
      case 'monthly':
        setMonthlyMode(true);
        setWeeklyMode(false);
        setDailyMode(false);
        break;
      case 'weekly':
        setMonthlyMode(false);
        setWeeklyMode(true);
        setDailyMode(false);
        setChosenMonth(1);
        break;
      case 'daily':
        setMonthlyMode(false);
        setWeeklyMode(false);
        setDailyMode(true);
        setChosenMonth(1);
        break;
    }
  }

  const yearsOptions = () => {
    const currentYear = new Date().getFullYear();
    const yearOptions = [];

    for(var i = 0; i < 5; i++){
      yearOptions.push(
        <option value={currentYear - i} key={i}>
          {currentYear - i}
        </option>
      );
    }

    return yearOptions;
  };

  const monthlyOptions = () => (
    <>
      <option value={1}>January</option>
      <option value={2}>February</option>
      <option value={3}>March</option>
      <option value={4}>April</option>
      <option value={5}>May</option>
      <option value={6}>June</option>
      <option value={7}>July</option>
      <option value={8}>August</option>
      <option value={9}>September</option>
      <option value={10}>October</option>
      <option value={11}>November</option>
      <option value={12}>December</option>
    </>
  )

  return (
    <div className='w-full h-full p-2'>
      {/* History Section */}
      <div className=''>
        <h1 className='text-xl font-bold'>History</h1>
        <div className='w-full flex justify-end gap-1'>
          <select 
          onChange={setYearFunction} 
          className='border border-gray-600 py-1 px-2 rounded-lg' 
          name="history" id="" 
          defaultValue={historyChosenYear}
          >
            {yearsOptions()}
          </select>
          <select className='border border-gray-600 py-1 px-2 rounded-lg' name="" id="">
            <option value="">Latest - oldest</option>
          </select>
        </div>

        <div className='flex flex-col w-full gap-2 mt-4 h-[20rem] pb-2 overflow-scroll'>
          {historyToShow && historyToShow.map((data, index) => (
            <HistoryCard
            key={index}
            dataObject={data}
            index={index}
            onClick={showToast}
            />
          ))}
        </div>
      </div>
      

      {/* Reports section */}
      <div className='w-full border-y-[2px] border-gray-300'>
        <div className='w-full flex gap-1 items-center mt-2'>
          <h1 className='text-xl font-bold'>Reports</h1>
          {!monthlyMode && (
            <h1 className='text-xl font-bold text-gray-600'> - {monthExtractor(chosenMonth)} {chosenYear}</h1>
          )}
        </div>
        <div className='w-full flex gap-1 mt-1'>
          <select 
          onChange={monthlyMode ? setYearFunction : weeklyMode ? setMonthFunction : dailyMode ? setMonthFunction : null} 
          className='border border-gray-600 py-1 px-2 rounded-lg w-[23%]' 
          name="reports" 
          id=""
          value={monthlyMode ? chosenYear : weeklyMode ? chosenMonth : dailyMode ? chosenMonth : null}
          >
            {monthlyMode ? yearsOptions() : weeklyMode ? monthlyOptions() : dailyMode ? monthlyOptions() : null}
          </select>
          <select className='border border-gray-600 py-1 px-2 rounded-lg w-[45%]' name="" id="">
            <option value="">Latest - oldest</option>
          </select>
          <select onChange={setReportModeFunc} className='border border-blue-600 bg-blue-600 text-white font-bold py-1 px-2 rounded-lg w-[33%]' name="" id="">
            <option value="monthly">Monthly</option>
            <option value="weekly">Weekly</option>
            <option value="daily">Daily</option>
          </select>
        </div>
        <div className='flex flex-col w-full gap-2 mt-4 h-[20rem] pb-2 overflow-scroll'>
          {isReportsLoading ? <Loader/> : (
            <>
              {reportsToShow?.map((data, index) => (
                <ReportsCard
                key={index}
                dataObject={data}
                index={index}
                onClick={navigateToShow}
                mode={modeObject}
                />
              ))}
            </>
            )}
        </div>
      </div>
    </div>
  )
}
