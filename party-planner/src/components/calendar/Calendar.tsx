import { useEffect, useState } from 'react'
import CalendarDay from './CalendarDay';
import DayModel from '../../model/calendar/CalendarDayModel';
import Session from '../../model/session/Session';

interface Props {
    session: Session;
};

const Calendar = ({session}: Props) => {
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [days, setDays] = useState<DayModel[]>([]);

    const calendar = session.getCalendar();

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
            <CalendarDay key={index} day={day} session={session} />
        )}
        {isLoading && <p>Loading...</p>}
    </>;
};

export default Calendar;