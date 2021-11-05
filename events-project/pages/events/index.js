import { getAllEvents } from '../../helpers/api-util';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/events-search';
import { Fragment } from 'react';
import { useRouter } from 'next/router';

function AllEventsPage(props) {
  const router = useRouter();
  const {events} = props

  function findEventsHandler(year, month) {
    const fullPath = `/events/${year}/${month}`;

    router.push(fullPath);
  }

  return (
    <Fragment>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </Fragment>
  );
}

export async function getStaticProps() {
  const events = await getAllEvents();
  return {
    props: {
      events: events,
    },
    revalidate: 60,
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map((event) => ({ params: { 
    eventId: event.id 
  } }));

return {
  paths: paths,
  fallback: true
}

}

export default AllEventsPage;
