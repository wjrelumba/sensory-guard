import { supabase } from "../Essentials/Supabase"

export const fetchMonthly = async() => {
    const startDate = new Date();
    startDate.setMonth(startDate.getMonth() - 1);
    const startDateString = String(startDate);

    startDateString.replace('GMT+0800', '+08:00');
    
    console.log(startDateString);

    const endDate = new Date();
    const endDateString = String(endDate);

    endDateString.replace('GMT+0800', '+08:00');

    console.log(endDateString);
    const {data, error} = await supabase.from('readings').select().gte('created_at', startDateString).lt('created_at', endDateString);
    if(data){
        console.log(data);
    }
    if(error){
        console.log(error);
    }
}