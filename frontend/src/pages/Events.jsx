// import { Link } from "react-router-dom";

// const EventPage = () => {
//   const DUMMY_EVENTS = [
//     {
//         id:'e1',
//         title:'some event'
//     },
//     {
//         id:'e2',
//         title:'another event'
//     }
// ];
//   return(
//     <>
//     <h1>Event Page</h1>
//     <ul>
//         {DUMMY_EVENTS.map(event=> <li key={event.id}>
//             <Link to={event.id}>{event.title}</Link>
//         </li>)}
//     </ul>
//     </>

//   )
// };
// export default EventPage;

// import { json, useLoaderData } from "react-router-dom";
// import EventsList from "../components/EventsList";

// function EventsPage() {
//   const data = useLoaderData();
//   // if(data.isError){
//   //     return <p>{data.message}</p>
//   // }
//   const events = data.events;

//   return <EventsList events={events} />;
// }

// export default EventsPage;
// export async function eventLoader() {
//   const response = await fetch("http://localhost:8080/events");
//   if (!response.ok) {
//     // throw new Response(JSON.stringify({message:'could not work'}),
//     // {status:500});

//     // return {isError: true, message:'there is an error'}

//     return json({ message: "could not work" }, { status: 500 });
//   } else {
//     return response;
//   }
// }

import { Suspense } from 'react';
import { useLoaderData, json, defer, Await } from 'react-router-dom';

import EventsList from '../components/EventsList';

function EventsPage() {
  const { events } = useLoaderData();

  return (
    <Suspense fallback={<p style={{ textAlign: 'center' }}>Loading...</p>}>
      <Await resolve={events}>
        {(loadedEvents) => <EventsList events={loadedEvents} />}
      </Await>
    </Suspense>
  );
}

export default EventsPage;

async function loadEvents() {
  const response = await fetch('http://localhost:8080/events');

  if (!response.ok) {
    // return { isError: true, message: 'Could not fetch events.' };
    // throw new Response(JSON.stringify({ message: 'Could not fetch events.' }), {
    //   status: 500,
    // });
    throw json(
      { message: 'Could not fetch events.' },
      {
        status: 500,
      }
    );
  } else {
    const resData = await response.json();
    return resData.events;
  }
}

export function loader() {
  return defer({
    events: loadEvents(),
  });
}