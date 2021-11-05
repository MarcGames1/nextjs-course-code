export function getFeaturedEvents(events) {
  return events.filter((event) => event.isFeatured);
}

export function getAllEvents(events) {
  return events;
}

export function getFilteredEvents(events, dateFilter) {
  const { year, month } = dateFilter;

  let filteredEvents = events.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

export function getEventById(events, id) {
  return events.find((event) => event.id === id);
}
