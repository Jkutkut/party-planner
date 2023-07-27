import { useEffect, useState } from 'react'
import CalendarDay from './CalendarDay';
import CalendarModel from '../../model/CalendarModel';
import DayModel from '../../model/CalendarDayModel';

interface Props {
    calendar: CalendarModel;
};

const Calendar = ({calendar}: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [days, setDays] = useState<DayModel[]>([]);

    const addWeek: () => void = () => {
        setIsLoading(true);
        calendar.loadDays().then((calendar) => {
            setDays(calendar.getDays());
            setIsLoading(false);
        });
    };

    const handleScroll = () => {
        if (isLoading) return;
        if (window.innerHeight + document.documentElement.scrollTop <
            document.documentElement.offsetHeight - 300)
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

export default Calendar;