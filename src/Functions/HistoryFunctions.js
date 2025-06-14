import { supabase } from "../Essentials/Supabase";

// Use the RPC function you created on Supabase
async function fetchAggregatedData(fromDate, toDate) {
    const { data, error } = await supabase
        .rpc("fetch_aggregated_readings", { from_date: fromDate, to_date: toDate });

    if (error) {
        console.error("Error calling RPC:", error);
        return null;
    }
    return data[0];
}

// Helper: Get days in a month safely
function getDaysInMonth(year, month) {
    return new Date(year, month, 0).getDate();
}

// Helper: Get next date string safely
function getNextDay(year, month, day) {
    const currentDate = new Date(year, month - 1, day);
    const nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);
    return nextDate.toISOString().split('T')[0];
}

// Fully refactored fetchMonthly
export const fetchMonthly = async (yearValue) => {
    const monthlyData = await Promise.all(
        Array.from({ length: 12 }, async (_, i) => {
            const month = i + 1;
            const startDate = `${yearValue}-${String(month).padStart(2, '0')}-01`;
            const daysInMonth = getDaysInMonth(yearValue, month);
            const endDate = getNextDay(yearValue, month, daysInMonth);

            const data = await fetchAggregatedData(startDate, endDate);

            return {
                month,
                dataExists: data.count > 0,
                temperature: data.temperature_exceeded,
                vibrationDetected: data.vibration_detected,
                smokeDetected: data.smoke_detected,
                flameDetected: data.flame_detected,
                averageTemp: parseFloat(data.average_temp || 0),
                averageHumidity: parseFloat(data.average_humidity || 0),
                lowTemp: parseFloat(data.low_temp || 0),
                highTemp: parseFloat(data.high_temp || 0),
                lowHumidity: parseFloat(data.low_humidity || 0),
                highHumidity: parseFloat(data.high_humidity || 0),
            };
        })
    );

    return monthlyData;
};

// Fully refactored fetchWeekly
export const fetchWeekly = async (yearValue, monthValue) => {
    const daysInMonth = getDaysInMonth(yearValue, monthValue);
    const weekRanges = [
        [1, 7],
        [8, 14],
        [15, 21],
        [22, daysInMonth]
    ];

    const weeklyData = await Promise.all(
        weekRanges.map(async ([startDay, endDay], i) => {
            const startDate = `${yearValue}-${String(monthValue).padStart(2, '0')}-${String(startDay).padStart(2, '0')}`;
            const nextEndDate = getNextDay(yearValue, monthValue, endDay);

            const data = await fetchAggregatedData(startDate, nextEndDate);

            console.log(startDate, + ' - ', + nextEndDate);
            console.log(`Weekly`);
            console.log(data);

            return {
                month: monthValue,
                week: i + 1,
                dataExists: data.count > 0,
                temperature: data.temperature_exceeded,
                vibrationDetected: data.vibration_detected,
                smokeDetected: data.smoke_detected,
                flameDetected: data.flame_detected,
                averageTemp: parseFloat(data.average_temp || 0),
                averageHumidity: parseFloat(data.average_humidity || 0),
                lowTemp: parseFloat(data.low_temp || 0),
                highTemp: parseFloat(data.high_temp || 0),
                lowHumidity: parseFloat(data.low_humidity || 0),
                highHumidity: parseFloat(data.high_humidity || 0),
            };
        })
    );

    return weeklyData;
};

// Fully refactored fetchDaily
export const fetchDaily = async (yearValue, monthValue) => {
    const daysInMonth = getDaysInMonth(yearValue, monthValue);

    const dailyData = await Promise.all(
        Array.from({ length: daysInMonth }, async (_, i) => {
            const day = i + 1;
            const startDateObj = new Date(`${yearValue}-${String(monthValue).padStart(2, '0')}-${String(day).padStart(2, '0')}T00:00:00Z`);
            const endDateObj = new Date(startDateObj);
            endDateObj.setDate(endDateObj.getDate() + 1);

            const startDate = startDateObj.toISOString();
            const endDate = endDateObj.toISOString();

            const data = await fetchAggregatedData(startDate, endDate);

            console.log(`${startDate} - ${endDate}`);
            console.log(`Daily:`);
            console.log(data);

            return {
                date: day,
                month: monthValue,
                dataExists: data?.count > 0,
                temperature: data?.temperature_exceeded,
                vibrationDetected: data?.vibration_detected,
                smokeDetected: data?.smoke_detected,
                flameDetected: data?.flame_detected,
                averageTemp: parseFloat(data?.average_temp || 0),
                averageHumidity: parseFloat(data?.average_humidity || 0),
                lowTemp: parseFloat(data?.low_temp || 0),
                highTemp: parseFloat(data?.high_temp || 0),
                lowHumidity: parseFloat(data?.low_humidity || 0),
                highHumidity: parseFloat(data?.high_humidity || 0),
            };
        })
    );

    return dailyData;
};

// Fully refactored fetchMonthlyHistory
export const fetchMonthlyHistory = async (yearValue) => {
    const monthRanges = [];
    const currentDate = new Date();

    for (let i = 0; i < 3; i++) {
        let currentMonth = currentDate.getMonth() + 1 - i;
        let currentYear = yearValue;

        if (currentMonth <= 0) {
            currentMonth += 12;
            currentYear -= 1;
        }

        const daysInMonth = getDaysInMonth(currentYear, currentMonth);
        const startDate = `${currentYear}-${String(currentMonth).padStart(2, '0')}-01`;
        const endDate = getNextDay(currentYear, currentMonth, daysInMonth);

        monthRanges.push({ year: currentYear, month: currentMonth, startDate, endDate });
    }

    const dataRetrieved = await Promise.all(
        monthRanges.map(async (range) => {
            const data = await fetchAggregatedData(range.startDate, range.endDate);

            return {
                month: range.month,
                year: range.year,
                dataExists: data.count > 0,
                temperature: data.temperature_exceeded,
                vibrationDetected: data.vibration_detected,
                smokeDetected: data.smoke_detected,
                flameDetected: data.flame_detected,
                averageTemp: parseFloat(data.average_temp || 0),
                averageHumidity: parseFloat(data.average_humidity || 0),
                lowTemp: parseFloat(data.low_temp || 0),
                highTemp: parseFloat(data.high_temp || 0),
                lowHumidity: parseFloat(data.low_humidity || 0),
                highHumidity: parseFloat(data.high_humidity || 0),
            };
        })
    );

    return dataRetrieved;
};