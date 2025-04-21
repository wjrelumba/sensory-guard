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
                averageTemp: (totalTempValue / allData.length).toFixed(2),
                averageHumidity: (totalHumidValue / allData.length).toFixed(2),
            };
        })
    );

    console.log('Final Data:', dataRetrieved);

    return dataRetrieved;
};

export const fetchWeekly = async (yearValue, monthValue) => {
    const weekRanges = [
        { month: 1, weeks: [[1, 7], [8, 14], [15, 21], [22, 31]] },
        { month: 2, weeks: [[1, 7], [8, 14], [15, 21], [22, 28]] },
        { month: 3, weeks: [[1, 7], [8, 14], [15, 21], [22, 31]] },
        { month: 4, weeks: [[1, 7], [8, 14], [15, 21], [22, 30]] },
        { month: 5, weeks: [[1, 7], [8, 14], [15, 21], [22, 31]] },
        { month: 6, weeks: [[1, 7], [8, 14], [15, 21], [22, 30]] },
        { month: 7, weeks: [[1, 7], [8, 14], [15, 21], [22, 31]] },
        { month: 8, weeks: [[1, 7], [8, 14], [15, 21], [22, 31]] },
        { month: 9, weeks: [[1, 7], [8, 14], [15, 21], [22, 30]] },
        { month: 10, weeks: [[1, 7], [8, 14], [15, 21], [22, 31]] },
        { month: 11, weeks: [[1, 7], [8, 14], [15, 21], [22, 30]] },
        { month: 12, weeks: [[1, 7], [8, 14], [15, 21], [22, 31]] },
    ];

    const weeklyData = [];

    for (let i = 0; i < weekRanges[monthValue - 1].weeks.length; i++) { // Traverse the weeks key array
        const [startDay, endDay] = weekRanges[monthValue - 1].weeks[i]; // Extract the start day and end day from the given values in the array
        let allData = [];
        let from = 0;
        let to = 999;
        let hasMore = true;

        while (hasMore) {
            const { data, error } = await supabase
                .from('readings')
                .select('*', { count: 'exact' })
                .gte('created_at', `${yearValue}-${weekRanges[monthValue - 1].month}-${String(startDay).padStart(2, '0')}`)
                .lte('created_at', `${yearValue}-${weekRanges[monthValue - 1].month}-${String(endDay).padStart(2, '0')}`)
                .range(from, to);

            if (error) {
                console.error(`Error fetching data for week ${i + 1} of month ${weekRanges[monthValue - 1].month}:`, error);
                break;
            }

            allData = [...allData, ...data];

            if (data.length < 1000) hasMore = false;
            from += 1000;
            to += 1000;
        }

        let totalTempValue = 0, totalHumidValue = 0;
        allData.forEach((item) => {
            totalTempValue += item.temperature;
            totalHumidValue += item.humidity;
        });

        weeklyData.push({
            month: weekRanges[monthValue - 1].month, // Get the month value using indexing month value = 1 - 1 = 0 {Meaning first item or object in the array}
            week: i + 1,
            dataExists: allData.length > 0,
            temperature: allData.some((d) => d.temperature > sampleTempThreshold),
            vibrationDetected: allData.some((d) => d.vibration > 0),
            smokeDetected: allData.some((d) => d.smoke_gas > sampleSmokeThreshold),
            flameDetected: allData.some((d) => d.flame > 0),
            averageTemp: (totalTempValue / allData.length).toFixed(2) || 0,
            averageHumidity: (totalHumidValue / allData.length).toFixed(2) || 0,
        });
    }

    console.log("Weekly Data:", weeklyData);
    return weeklyData;
};

export const fetchDaily = async (yearValue, monthValue) => {
    const daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    const dailyData = [];
    const totalDays = daysInMonth[monthValue - 1]; // Assign totalDays from the daysInMonth array using what month is the loop on

    for (let day = 1; day <= totalDays; day++) { // Loop through each day of the month
        let allData = [];
        let from = 0;
        let to = 999;
        let hasMore = true;

        const startDate = `${yearValue}-${String(monthValue).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        const endDate = `${yearValue}-${String(monthValue).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

        while (hasMore) {
            const { data, error } = await supabase
                .from('readings')
                .select('*', { count: 'exact' })
                .gte('created_at', startDate)
                .lt('created_at', `${yearValue}-${String(monthValue).padStart(2, '0')}-${String(day + 1).padStart(2, '0')}`)
                .range(from, to);

            if (error) {
                console.error(`Error fetching data for ${startDate}:`, error);
                break;
            }

            allData = [...allData, ...data];

            if (data.length < 1000) hasMore = false;
            from += 1000;
            to += 1000;
        }

        let totalTempValue = 0, totalHumidValue = 0;
        allData.forEach((item) => {
            totalTempValue += item.temperature;
            totalHumidValue += item.humidity;
        });

        dailyData.push({
            date: day,
            month: monthValue,
            dataExists: allData.length > 0,
            temperature: allData.some((d) => d.temperature > sampleTempThreshold),
            vibrationDetected: allData.some((d) => d.vibration > 0),
            smokeDetected: allData.some((d) => d.smoke_gas > sampleSmokeThreshold),
            flameDetected: allData.some((d) => d.flame > 0),
            averageTemp: (totalTempValue / allData.length).toFixed(2) || 0,
            averageHumidity: (totalHumidValue / allData.length).toFixed(2) || 0,
        });
    }

    console.log("Daily Data:", dailyData);
    return dailyData;
};
