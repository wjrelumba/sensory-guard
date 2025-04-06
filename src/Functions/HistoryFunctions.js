import { supabase } from "../Essentials/Supabase";

const sampleSmokeThreshold = 600;
const sampleTempThreshold = 17;

export const fetchMonthly = async (yearValue) => {
    const monthRanges = [ // Month ranges for fetching data by month
        { month: 1, startDay: 1, endDay: 31 },
        { month: 2, startDay: 1, endDay: 28 },
        { month: 3, startDay: 1, endDay: 31 },
        { month: 4, startDay: 1, endDay: 30 },
        { month: 5, startDay: 1, endDay: 31 },
        { month: 6, startDay: 1, endDay: 30 },
        { month: 7, startDay: 1, endDay: 31 },
        { month: 8, startDay: 1, endDay: 31 },
        { month: 9, startDay: 1, endDay: 30 },
        { month: 10, startDay: 1, endDay: 31 },
        { month: 11, startDay: 1, endDay: 30 },
        { month: 12, startDay: 1, endDay: 31 },
    ];

    const dataRetrieved = await Promise.all( // This is the array that will receive individual reports per month
        monthRanges.map(async (value) => {
            let allData = [];
            let from = 0;
            let to = 999;
            let hasMore = true; 

            while (hasMore) { // While this is true, the system will keep fetching data
                const { data, error } = await supabase
                    .from('readings')
                    .select('*', { count: 'exact' })
                    .gte('created_at', `${yearValue}-${value.month}-${value.startDay}`)
                    .lt('created_at', `${yearValue}-${value.month}-${value.endDay}`)
                    .range(from, to);

                if (error) {
                    console.error(`Error fetching data for month ${value.month}:`, error);
                    break;
                }

                allData = [...allData, ...data];

                if (data.length < 1000) hasMore = false;

                from += 1000;
                to += 1000;

                console.log(`Total Entries for Month ${value.month}:`, allData.length);
            };

            let totalTempValue = 0;
            for(let i = 0 ; i < allData.length; i++){
                totalTempValue += allData[i].temperature;
            }
            
            let totalHumidValue = 0;
            for(let i = 0 ; i < allData.length; i++){
                totalHumidValue += allData[i].humidity;
            }

            console.log(`Sum: ${totalTempValue}, Length: ${allData.length}, Average: ${totalTempValue / allData.length}`);
            return {
                month: value.month,
                dataExists: allData.length > 0 ? true : false,
                temperature: allData.some((value) => value.temperature > sampleTempThreshold),
                vibrationDetected: allData.some((value) => value.vibration > 0), // Check if vibration was detected
                smokeDetected: allData.some((value) => value.smoke_gas > sampleSmokeThreshold), // Check if the analog smoke exceeded the threshold
                flameDetected: allData.some((value) => value.flame > 0), // Check if flame was detected
                averageTemp: totalTempValue / allData.length,
                averageHumidity: totalHumidValue / allData.length,
            };
        })
    );

    console.log('Final Data:', dataRetrieved);

    return dataRetrieved;
};