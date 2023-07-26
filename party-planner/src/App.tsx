import { useState } from 'react';
import Calendar from './components/calendar/Calendar'
import CalendarModel from './model/CalendarModel'

function App() {
  const [calendar, setCalendar] = useState<CalendarModel | undefined>();

  if (!calendar) {
    const today = new Date();
    setCalendar(new CalendarModel(today));
    return <p>Loading...</p>;
  }

  return (
    <>
      <Calendar calendar={calendar}/>
    </>
  )
}

export default App
