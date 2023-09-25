import AdminNavBar from "@/components/AdminNavBar";
import { getAdminToken } from "@/utils/getAdminToken";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import calculation from "../../../helpers/calculation";

function AdminEventPage() {
  const router = useRouter();
  const eventId = router.query.eventId;
  const [eventData, setEventData] = useState([]);
  const createdAt = eventData.createdAt;
  const date = new Date(createdAt);
  const adminId = getAdminToken();
  const [noOfGuest, setNoOfGuest] = useState(100);
  const [totalPrice, setTotalPrice] = useState(0);
  const [allEvents, setAllEvents] = useState([]);

  // function to handle share button click
  const share = () => {
    if (navigator.share) {
      navigator
        .share({
          title: eventData?.title,
          text: "Check out this event!",
          url: window.location.href,
        })
        .then(() => console.log("Successful share"))
        .catch((error) => console.log("Error sharing", error));
    }
  };

  // function that fetches the event data on load
  const fetchEvent = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/event/${eventId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.ok) {
        const data = await response.json();
        const { totalPrice, event } = calculation(
          data?.noOfGuest,
          data?.eventType
        );
        setAllEvents(event);
        setTotalPrice(totalPrice);
        setNoOfGuest(data?.noOfGuest);
        setEventData(data);
      } else {
        // throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error fetching event data:", error.message);
    }
  };
  // function that fetches the event data on load
  const deleteEvent = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/event/${eventId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);
      if (response.status == 200) {
        alert("Event Deleted Successfully");
        router.push(`/admin/dashboard`);
      } else {
        // throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error fetching event data:", error.message);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, []); // fetch event on component mount and when eventId changes

  // if (!eventData || !eventData.cover)
  //   // If event data isn't loaded correctly, it should recall API
  //   return <div onLoad={fetchEvent()}>loading...</div>;
  // else
  return (
    <div className="pt-20 lg:pt-8 bg-[color:var(--primary-color)]">
      <AdminNavBar />
      <div className="flex flex-col items-center justify-center">
        <Head>
          <title>{eventData?.title}</title>
        </Head>
        {/* Top div with image */}
        <div className="relative h-40 sm:h-[25rem] overflow-hidden container shadow-lg">
          {/* blurred image background */}
          <Image
            src={eventData?.coverImage}
            alt={eventData?.title}
            fill
            // placeholder="blur"
            // blurDataURL={eventData.coverImage}
            className="h-[25rem] container filter blur hidden lg:block object-cover"
          />
          <div className="absolute inset-0 w-full h-40 sm:h-[25rem] container">
            <Image
              src={eventData?.coverImage}
              alt="Event image"
              fill
              className="absolute object-contain object-center"
            />
          </div>
        </div>

        {/* Second div with event details and ticket pricing */}
        <div className="container bg-white py-4 mt-4 rounded-lg shadow-md">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between">
              <div className="flex flex-col">
                <h1 className="text-4xl font-bold text-gray-900 mb-2">
                  {eventData?.title}
                </h1>
                <div className="flex flex-col md:flex-row">
                  <div className="text-md text-gray-800 mr-4">
                    <span className="font-bold">Date:</span> {eventData?.date}
                  </div>
                  <div className="text-md text-gray-800 mr-4">
                    <span className="font-bold">Time:</span> {eventData?.time}
                  </div>
                  <div className="text-md text-gray-800 mr-4">
                    <span className="font-bold">Venue:</span> {eventData?.venue}
                  </div>
                  <div className="text-md text-gray-800 mr-4">
                    <span className="font-bold">Organizer:</span>{" "}
                    {eventData?.organizer}
                  </div>
                </div>
              </div>
              <div className="text-left lg:text-right mt-4 lg:mt-0">
                <button
                  onClick={() => deleteEvent()}
                  className="px-6 py-2 bg-[color:var(--darker-secondary-color)] text-white rounded hover:bg-[color:var(--secondary-color)] focus:outline-none"
                >
                  Delete Event
                </button>
              </div>
              <div className="text-left lg:text-right mt-4 lg:mt-0">
                <button
                  onClick={() =>
                    router.push(`/event/${eventData.id}/registration`)
                  }
                  className="px-6 py-2 bg-[color:var(--darker-secondary-color)] text-white rounded hover:bg-[color:var(--secondary-color)] focus:outline-none"
                >
                  Automatic Budgeting System
                </button>
              </div>
            </div>
            <div className="border-b border-gray-300 mt-8 mb-4"></div>
            <div className="flex flex-col md:flex-row md:items-center justify-between">
              <div className="flex flex-col">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Pricing
                </h3>
                <p className="text-gray-800">${eventData?.price}</p>
              </div>
              {eventData?.price > totalPrice ? (
                <div className="flex flex-col ">
                  <h3 className="text-xl font-semibold text-green-500 mb-2">
                    Accepting it will give you a profit of $
                    {eventData?.price - totalPrice}
                  </h3>
                </div>
              ) : (
                <div
                  className="flex flex-col"
                  style={{ width: "500px", height: "50px" }}
                >
                  <h3 className="text-xl font-semibold text-red-500 mb-2">
                    Accepting it will give you a loss of $
                    {totalPrice - eventData?.price} reject it
                  </h3>
                </div>
              )}
              <div className="flex mt-4 md:mt-0">
                <button
                  onClick={share}
                  className="px-6 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 focus:outline-none"
                >
                  Share
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Third div with major event details */}
        <div className="container mt-4 bg-[color:var(--primary-color)]">
          <div className="container">
            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-4">
              <div className="mb-4 max-w-5xl bg-white px-6 py-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  About the Event
                </h3>
                <p className="text-gray-600 text-md">{eventData.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {!allEvents.length ? (
                    <p>No events yet</p>
                  ) : (
                    allEvents?.map((event) => (
                      <div
                        className="hover:scale-105 cursor-pointer transition-all mt-5 bg-[color:var(--white-color)] rounded-lg shadow-md px-3 py-3"
                        key={event.id}
                      >
                        <div className="relative h-[15rem]">
                          {event.image && (
                            <Image
                              fill
                              className="object-cover h-full w-full rounded-md"
                              src={
                                event.image != "test.com"
                                  ? event?.image
                                  : "https://images.unsplash.com/photo-1472653431158-6364773b2a56?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1738&q=80"
                              }
                              alt=""
                              sizes="(min-width: 640px) 100vw, 50vw"
                              priority
                            />
                          )}
                        </div>
                        <div className="flex flex-row justify-between items-start mt-4">
                          <div className="px-2">
                            <p className="text-sm text-gray-800 font-bold">
                              {event.title.length > 30
                                ? event.title.slice(0, 30) + "..."
                                : event.title}
                            </p>
                          </div>

                          <div className="flex flex-col justify-end items-center">
                            <p className="text-sm text-gray-800 mt-2">
                              <strong className="whitespace-nowrap">
                                ${" "}
                                {(
                                  event?.percentage * eventData?.price
                                )?.toFixed(2)}
                              </strong>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              <div className="mb-4 bg-white px-6 py-4 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Event Overview
                </h3>
                <ul className="text-gray-600">
                  {[
                    {
                      type: "Total Registrations",
                      price: noOfGuest,
                    },
                    {
                      type: "Event At",
                      price: eventData?.date,
                    },
                  ].map((item, index) => (
                    <li
                      className="flex items-center h-16 py-1 rounded-md p-4 mb-2 hover:shadow-md"
                      key={index}
                    >
                      <span className="w-1/2">{item.type}</span>
                      <span className="w-1/2 text-center">{item.price}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-sm text-[color:var(--darker-secondary-color)] mt-6">
                  *Caution: This action will permanently delete the event and
                  all associated data. Are you sure you want to proceed?
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminEventPage;
