import { Fragment, useEffect, useState } from 'react'
import {useRouter} from 'next/router'
import { getFilteredEvents } from '../../helpers/api-util'
import EventList from '../../components/events/event-list'
import ResultsTitle from '../../components/events/results-title'
import Button from '../../components/Ui/button'
import ErrorAlert from '../../components/Ui/error-alert'
import useSWR from 'swr'

function FilteredEventsPage(props) {
  const [loadedEvents, setLoadedEvents] = useState()
  const router = useRouter()

  const filterData = router.query.slug

  const {data, error} = useSWR('https://nextjs-course-9aba0-default-rtdb.firebaseio.com/events.json');
  useEffect(() => {
    if(data){
      const events = []
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        })
      }
      setLoadedEvents(events)
    }
  }, [data]) 


  if(!loadedEvents) {
    return <p className='center'>Loading</p>
  }

  const filteredYear = filterData[0]
  const filteredMonth = filterData[1]

  const numYear = +filteredYear
  const numMonth =+filteredMonth

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (eventDate.getFullYear() === numYear && eventDate.getMonth() === numMonth - 1);
    })


  
  if (isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12){
    return (
      <>
        <ErrorAlert>
          <p>Invalid Filter please adjust your values</p>
          <div className="center">
            <Button link="/events">Show All Events</Button>
          </div>
        </ErrorAlert>
      </>
    );

  }

    

  if(!filteredEvents || filteredEvents.length === 0){

    return (
      <>
      <ErrorAlert>
        <p>No Events found for the chosen filter</p>
      </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );

  }
  const date = new Date(props.date.year, props.date.month -1)


  return <Fragment>
  <ResultsTitle date={date}/>
  <EventList items={filteredEvents}/>
  </Fragment>;
}

// export async function getServerSideProps (context) {

//   const {params} = context

//   const filterData = params.slug

  

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: {
//         hasError: true,
//       },
//     };
//   }

//    const filteredEvents = await getFilteredEvents({
//      year: numYear,
//      month: numMonth,
//    });
//     return {
//       props: {
//         events: filteredEvents,
//         date: {
//           year: numYear,
//           month: numMonth
//         }
//       },
//     };
// }

export default FilteredEventsPage;
