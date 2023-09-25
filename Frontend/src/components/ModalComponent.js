import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";

const ModalComponent = ({ handleClose }) => {
  const router = useRouter();
  const [user, setUser] = useState({});
  const eventId = router.query.eventId;
  const [allEvents, setAllEvents] = useState([]);
  const [eventDetails, setEventDetails] = useState([]);
  const [eventData, setEvent] = useState({});
  //   const fetchEvent = async () => {
  //     try {
  //       const response = await fetch(
  //         `${process.env.NEXT_PUBLIC_API_URL}/v1/event/${eventId}`,
  //         {
  //           method: "GET",
  //           headers: {
  //             "Content-Type": "application/json",
  //           },
  //         }
  //       );
  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log(data);
  //         setEventData(data);
  //         if (data?.details && data?.details?.length) {
  //           setEventDetails(data?.details);
  //         } else {
  //           const { totalPrice, event } = calculation(
  //             data?.noOfGuest,
  //             data?.eventType
  //           );
  //           setAllEvents(event);
  //         }
  //       } else {
  //         // throw new Error(`${response.status} ${response.statusText}`);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching event data:", error.message);
  //     }
  //   };

  //   useEffect(() => {
  //     if (eventId) {
  //       fetchEvent();
  //     }
  //   }, [eventId]);
  useEffect(() => {
    console.log(eventDetails, allEvents);
    // If cookie found, Redirect to dashboard
    let user = localStorage.getItem("user");
    user = user?.length ? JSON.parse(user) : null;
    setUser(user);
    let event = localStorage.getItem("event");
    event = event?.length ? JSON.parse(event) : null;
    console.log(event, "event");
    setEvent(event);
  }, []);
  return (
    <div className="modal">
      <div className="modal-content">
        {/* <>{user}</> */}
        {/* <img src={eventData?.profileImage}></img> */}
        <h2 className="mb-5 text-xl">Name: {user.name}</h2>
        <p className="mb-5 text-xl">Email: {user.email}.</p>
        <p className="mb-5 text-xl">Title: {eventData?.title}</p>
        <p className="mb-5 text-xl">Venue: {eventData?.venue}</p>
        <p className="mb-5 text-xl">Organizer: {eventData?.organizer}</p>
        <p className="mb-5 text-xl">Event Type: {eventData?.eventType}</p>
        <p className="mb-5 text-xl">No of Guests: {eventData?.noOfGuest}</p>
        <p className="mb-5 text-xl">Price: {eventData?.price}</p>
      </div>
    </div>
  );
};

export default ModalComponent;
