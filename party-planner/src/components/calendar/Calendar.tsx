import { useEffect, useState } from 'react'
import CalendarDay from './CalendarDay';

interface Props {

};

const Calendar = ({}: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [days, setDays] = useState<string[]>([]);

    const addWeek: () => void = () => {
        setIsLoading(true);
        setTimeout(() => {
            setDays(addWeekManual(days));
            setIsLoading(false);
        }, 1000); // TODO debug
    };

    const handleScroll = () => {
        if (isLoading) return;
        if (window.innerHeight + document.documentElement.scrollTop <
            document.documentElement.offsetHeight - 200)
            return;
        addWeek();
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [isLoading]);

    useEffect(() => addWeek(), []);

    return <>
        <h1>Calendar</h1>
        {days.map((day, index) => 
            <CalendarDay key={index} day={day} />
        )}
        {isLoading && <p>Loading...</p>}
    </>;
};

const addWeekManual: (days: string[]) => string[] = (days) => {
    const week = days.length / 7 + 1;
    const newWeek: string[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    newWeek.forEach((day, index) => {
        newWeek[index] = `${day} ${week}`;
    });
    return [...days, ...newWeek];
};

export default Calendar;