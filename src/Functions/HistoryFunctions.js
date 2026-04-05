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
    // Define the date range for the entire year
    const startDate = `${yearValue}-01-01`;
    const endDate = `${yearValue}-12-31`;

    const { data, error } = await supabase
        .from("monthly_readings_summary")
        .select("*")
        .gte("month_start_date", startDate)
        .lte("month_start_date", endDate)
        .order("month_start_date", { ascending: true });

    if (error) {
        console.error("Error fetching monthly aggregated data:", error);
        return null;
    }

    // Process the fetched data to match your desired output format
    const monthlyData = data.map((item) => {
        const month = new Date(item.month_start_date).getMonth() + 1; // getMonth() is 0-indexed
        return {
            month,
            dataExists: !!item.average_temp, // Check if any data exists
            temperature: item.temperature_exceeded,
            vibrationDetected: item.vibration_detected,
            smokeDetected: item.smoke_detected,
            flameDetected: item.flame_detected,
            averageTemp: parseFloat(item.average_temp || 0),
            averageHumidity: parseFloat(item.average_humidity || 0),
            lowTemp: parseFloat(item.low_temp || 0),
            highTemp: parseFloat(item.high_temp || 0),
            lowHumidity: parseFloat(item.low_humidity || 0),
            highHumidity: parseFloat(item.high_humidity || 0),
        };
    });

    return monthlyData;
};

// Fully refactored fetchWeekly
export const fetchWeekly = async (yearValue, monthValue) => {
    // Determine the date range for the specified month
    const startOfMonth = `${yearValue}-${String(monthValue).padStart(2, '0')}-01`;
    const daysInMonth = getDaysInMonth(yearValue, monthValue);
    const endOfMonth = `${yearValue}-${String(monthValue).padStart(2, '0')}-${String(daysInMonth).padStart(2, '0')}`;

    const { data, error } = await supabase
        .from("weekly_readings_summary")
        .select("*")
        .gte("week_start_date", startOfMonth)
        .lte("week_start_date", endOfMonth)
        .order("week_start_date", {ascending: true});

    if (error) {
        console.error("Error fetching weekly aggregated data:", error);
        return null;
    }

    // Process the fetched data to match your desired output format
    const weeklyData = data.map((item, i) => {
        return {
            month: monthValue,
            week: i + 1,
            dataExists: !!item.average_temp,
            temperature: item.temperature_exceeded,
            vibrationDetected: item.vibration_detected,
            smokeDetected: item.smoke_detected,
            flameDetected: item.flame_detected,
            averageTemp: parseFloat(item.average_temp || 0),
            averageHumidity: parseFloat(item.average_humidity || 0),
            lowTemp: parseFloat(item.low_temp || 0),
            highTemp: parseFloat(item.high_temp || 0),
            lowHumidity: parseFloat(item.low_humidity || 0),
            highHumidity: parseFloat(item.high_humidity || 0),
        };
    });

    return weeklyData;
};

// Fully refactored fetchDaily
export const fetchDaily = async (yearValue, monthValue) => {
    // Determine the date range for the specified month
    const startOfMonth = `${yearValue}-${String(monthValue).padStart(2, '0')}-01`;
    const daysInMonth = getDaysInMonth(yearValue, monthValue);
    const endOfMonth = `${yearValue}-${String(monthValue).padStart(2, '0')}-${String(daysInMonth).padStart(2, '0')}`;

    const { data, error } = await supabase
        .from("daily_readings_summary")
        .select("*")
        .gte("date", startOfMonth)
        .lte("date", endOfMonth)
        .order("date", {ascending: true});

    if (error) {
        console.error("Error fetching daily aggregated data:", error);
        return null;
    }

    // Process the fetched data to match your desired output format
    const dailyData = data.map((item) => {
        const date = new Date(item.date).getDate();
        return {
            date,
            month: monthValue,
            dataExists: !!item.average_temp,
            temperature: item.temperature_exceeded,
            vibrationDetected: item.vibration_detected,
            smokeDetected: item.smoke_detected,
            flameDetected: item.flame_detected,
            averageTemp: parseFloat(item.average_temp || 0),
            averageHumidity: parseFloat(item.average_humidity || 0),
            lowTemp: parseFloat(item.low_temp || 0),
            highTemp: parseFloat(item.high_temp || 0),
            lowHumidity: parseFloat(item.low_humidity || 0),
            highHumidity: parseFloat(item.high_humidity || 0),
        };
    });

    return dailyData;
};

// Fully refactored fetchMonthlyHistory
export const fetchMonthlyHistory = async (yearValue) => {
    // Determine the date for 3 months ago from the current date.
    // This creates a single, efficient date range for the query.
    const currentDate = new Date();
    const threeMonthsAgo = new Date();
    threeMonthsAgo.setMonth(currentDate.getMonth() - 2); // get data for the last 3 months

    const startDate = `${threeMonthsAgo.getFullYear()}-${String(threeMonthsAgo.getMonth() + 1).padStart(2, '0')}-01`;
    const endDate = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(currentDate.getDate()).padStart(2, '0')}`;

    const { data, error } = await supabase
        .from("monthly_readings_summary")
        .select("*")
        .gte("month_start_date", startDate)
        .lte("month_start_date", endDate)
        .order("month_start_date", { ascending: true });

    if (error) {
        console.error("Error fetching monthly history data:", error);
        return null;
    }

    // Process the fetched data to match your desired output format
    const dataRetrieved = data.map((item) => {
        const date = new Date(item.month_start_date);
        return {
            month: date.getMonth() + 1,
            year: date.getFullYear(),
            dataExists: !!item.average_temp,
            temperature: item.temperature_exceeded,
            vibrationDetected: item.vibration_detected,
            smokeDetected: item.smoke_detected,
            flameDetected: item.flame_detected,
            averageTemp: parseFloat(item.average_temp || 0),
            averageHumidity: parseFloat(item.average_humidity || 0),
            lowTemp: parseFloat(item.low_temp || 0),
            highTemp: parseFloat(item.high_temp || 0),
            lowHumidity: parseFloat(item.low_humidity || 0),
            highHumidity: parseFloat(item.high_humidity || 0),
        };
    });

    return dataRetrieved;
};