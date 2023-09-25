import AdminNavBar from "@/components/AdminNavBar";
import Dashboard_Filter from "@/components/Dashboard_Filter";
import Popup_Filter from "@/components/Popup_Filter";
import { getAdminToken } from "@/utils/getAdminToken";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { FaUsers } from "react-icons/fa";
import { RxHamburgerMenu } from "react-icons/rx";
import {
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Button,
  ListItemSecondaryAction,
} from "@mui/material";
import { Work as WorkIcon } from "@mui/icons-material";

function Deal() {
  const router = useRouter();

  const [allEvents, setAllEvents] = useState();
  //     [
  //     {
  //       _id: 1,
  //       profile:
  //         "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1548&q=80",
  //       name: "Summer Music Festival",
  //       username: "Henry Gill",
  //       date: "2023-09-10",
  //       price: 35.0,
  //     },
  //     {
  //       _id: 2,
  //       profile:
  //         "https://images.unsplash.com/photo-1527529482837-4698179dc6ce?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  //       name: "Art Exhibition: Abstract",
  //       username: "Mike Son",
  //       date: "2023-09-15",
  //       price: 20.0,
  //     },
  //     {
  //       _id: 3,
  //       profile:
  //         "https://plus.unsplash.com/premium_photo-1679591002315-cbe428ca5109?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
  //       name: "Food Truck Fiesta",
  //       username: "John Plaza",
  //       date: "2023-09-20",
  //       price: 10.0,
  //     },
  //     {
  //       _id: 4,
  //       profile:
  //         "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  //       name: "Tech Conference 2023",
  //       username: "Michel Jordon",
  //       date: "2023-09-25",
  //       price: 50.0,
  //     },
  //     {
  //       _id: 5,
  //       profile:
  //         "https://images.unsplash.com/photo-1536940385103-c729049165e6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
  //       name: "Movie Night Under the Stars",
  //       username: "Kim Luis",
  //       date: "2023-09-30",
  //       price: 5.0,
  //     },
  //     {
  //       _id: 6,
  //       profile:
  //         "https://images.unsplash.com/photo-1496024840928-4c417adf211d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  //       name: "Summer Music Festival",
  //       username: "Henry Gill",
  //       date: "2023-09-10",
  //       price: 35.0,
  //     },
  //     {
  //       _id: 7,
  //       profile:
  //         "https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1760&q=80",
  //       name: "Art Exhibition: Abstract",
  //       username: "Mike Son",
  //       date: "2023-09-15",
  //       price: 20.0,
  //     },
  //     {
  //       _id: 8,
  //       profile:
  //         "https://images.unsplash.com/photo-1509315811345-672d83ef2fbc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1587&q=80",
  //       name: "Food Truck Fiesta",
  //       username: "John Plaza",
  //       date: "2023-09-20",
  //       price: 10.0,
  //     },
  //     {
  //       _id: 9,
  //       profile:
  //         "https://images.unsplash.com/photo-1594122230689-45899d9e6f69?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1740&q=80",
  //       name: "Tech Conference 2023",
  //       username: "Michel Jordon",
  //       date: "2023-09-25",
  //       price: 50.0,
  //     },
  //     {
  //       _id: 10,
  //       profile:
  //         "https://images.unsplash.com/photo-1516339901601-2e1b62dc0c45?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1571&q=80",
  //       name: "Movie Night Under the Stars",
  //       username: "Kim Luis",
  //       date: "2023-09-30",
  //       price: 5.0,
  //     },
  //     // Add more events as needed
  // ]
  const adminIdCookie = getAdminToken();
  const [popupFilterOpen, setPopupFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    keyword: "",
    category: "",
    dateRange: "",
    price: [10, 3000],
  });
  const [originalEvents, setOriginalEvents] = useState([]);
  //   const data = [
  //     {
  //       id: 1,
  //       title: "Birthday",
  //       description: "Description for Item 1",
  //       username: "Henry",
  //       budget: 564,
  //     },
  //     {
  //       id: 2,
  //       title: "Wedding",
  //       description: "Description for Item 2",
  //       username: "Mike",
  //       budget: 1000,
  //     },
  //     {
  //       id: 3,
  //       title: "Conferene",
  //       description: "Description for Item 1",
  //       username: "Henry",
  //       budget: 564,
  //     },
  //     {
  //       id: 4,
  //       title: "High Event",
  //       description: "Description for Item 2",
  //       username: "Mike",
  //       budget: 1000,
  //     },
  //     {
  //       id: 5,
  //       title: "Reception",
  //       description: "Description for Item 1",
  //       username: "Henry",
  //       budget: 564,
  //     },
  //     {
  //       id: 6,
  //       title: "Concert",
  //       description: "Description for Item 2",
  //       username: "Mike",
  //       budget: 1000,
  //     },
  //     // Add more data items as needed
  //   ];
  const fetchAllEvents = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/admin/details`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          admin_id: adminIdCookie,
        }),
      }
    );
    if (!response.ok)
      // throw new Error(`${response.status} ${response.statusText}`);

      // Admin Details fetched from API `/admin/details`
      try {
        const data = await response.json();
        setAllEvents(data.eventCreated);
        setOriginalEvents(data.eventCreated);
      } catch (error) {
        console.error("Invalid JSON string:", error.message);
      }
  };

  useEffect(() => {
    fetchAllEvents();
  }, []);

  // dont move this state becoz it needs allevents
  const [filteredEvents, setFilteredEvents] = useState(allEvents);

  // Update filteredEvents state whenever allEvents or filterOptions change
  useEffect(() => {
    const newFilteredEvents = allEvents.filter((event) => {
      // Check if keyword filter matches
      if (
        filterOptions.keyword.toLowerCase() &&
        !event.name.toLowerCase().includes(filterOptions.keyword.toLowerCase())
      ) {
        return false;
      }

      // Check if date range filter matches
      if (filterOptions.dateRange) {
        const date = filterOptions.dateRange;
        // Split the date string into an array of substrings
        const dateParts = event.date.split("/");
        // Rearrange the array elements to get yyyy-mm-dd format
        const formattedDate = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
        if (formattedDate < date) {
          return false;
        }
      }

      // Check if price filter matches
      if (
        event.price < filterOptions.price[0] ||
        event.price > filterOptions.price[1]
      ) {
        return false;
      }

      return true;
    });

    setFilteredEvents(newFilteredEvents);
  }, [allEvents, filterOptions]);

  const handleFilterClear = () => {
    setFilterOptions({
      keyword: "",
      category: "",
      dateRange: "",
      price: [10, 3000],
    });
    setFilteredEvents(allEvents);
    setPopupFilterOpen(false);
  };

  return (
    <div className="pt-20 lg:pt-8 overflow-y-hidden bg-[color:var(--primary-color)]">
      <AdminNavBar />
      <div className="flex m-auto">
        <div className="flex mx-auto container ">
          <div className="flex m-auto gap-4 lg:gap-8 overflow-y-hidden w-full h-[calc(88vh)]">
            {/* Render the regular filter for medium screens and above */}
            <div className="hidden md:flex flex-col p-4 sticky top-0 w-1/6 md:w-1/4">
              <Dashboard_Filter
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
                handleFilterClear={handleFilterClear}
              />
            </div>
            {/* Render the popup filter for small screens */}
            {popupFilterOpen && (
              <div className="md:hidden fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center">
                <div className="bg-white rounded-lg p-4 w-5/6">
                  <Popup_Filter
                    filterOptions={filterOptions}
                    setFilterOptions={setFilterOptions}
                    handleFilterClear={handleFilterClear}
                    handleClose={() => setPopupFilterOpen(false)}
                  />
                </div>
              </div>
            )}
            {/* Render the main content of the dashboard */}
            <div className="flex w-full md:w-3/4 mx-auto justify-between container">
              <div className="p-4 overflow-y-auto w-full h-[calc(80vh)]">
                <h2 className="text-lg font-medium mb-4">Events</h2>
                {/* <List>
                  {data.map((item) => (
                    <ListItem key={item.id} style={{ marginTop: 5 }}>
                      <ListItemAvatar>
                        <Avatar></Avatar>
                      </ListItemAvatar>
                      <ListItemText
                        primary={item.title}
                        style={{ width: 10 }}
                      />
                      <ListItemText
                        primary={item.username}
                        style={{ width: 10 }}
                      />
                      <ListItemText
                        primary={item.budget}
                        style={{ width: 10 }}
                      />

                      <ListItemSecondaryAction>
                        <Button
                          variant="outlined"
                          color="primary"
                          onClick={() => handleAccept(item)}
                          style={{
                            padding: "8px 16px",
                            border: "none",
                            borderRadius: "50px", // Round the edges of the button
                            fontSize: "14px",
                            marginLeft: "10px", // Apply a gap between buttons
                            backgroundColor: "#4caf50", // Green background color for "Accept"
                            color: "white", // Text color
                          }}
                        >
                          Accept
                        </Button>
                        <Button
                          variant="outlined"
                          color="secondary"
                          onClick={() => handleReject(item)}
                          style={{
                            padding: "8px 16px",
                            border: "none",
                            borderRadius: "50px", // Round the edges of the button
                            fontSize: "14px",
                            marginLeft: "10px", // Apply a gap between buttons
                            backgroundColor: "#f44336", // Red background color for "Reject"
                            color: "white", // Text color
                          }}
                        >
                          Reject
                        </Button>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List> */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {filteredEvents.length === 0 ? (
                    <p>No events yet</p>
                  ) : (
                    filteredEvents.map((event) => (
                      <div
                        onClick={() => {
                          router.push(`/event/${event.event_id}/adminevents`);
                        }}
                        className="hover:scale-105 cursor-pointer transition-all mt-5 bg-[color:var(--white-color)] rounded-lg shadow-md px-3 py-3"
                        key={event._id}
                      >
                        <div className="relative h-[15rem]">
                          {event.profile && (
                            <Image
                              fill
                              className="object-cover h-full w-full rounded-md"
                              src={event.profile}
                              alt=""
                              sizes="(min-width: 640px) 100vw, 50vw"
                              priority
                            />
                          )}
                        </div>
                        <div className="flex flex-row justify-between items-start mt-4">
                          <div className="px-2">
                            <p className="text-sm text-gray-800 font-bold">
                              {event.name.length > 30
                                ? event.name.slice(0, 30) + "..."
                                : event.name}
                            </p>
                            <p className="text-sm text-gray-800">
                              {event.username}
                            </p>
                            <p className="text-sm text-gray-800">
                              {event.date}
                            </p>
                          </div>

                          <div className="flex flex-col justify-end items-center">
                            <span className="w-full flex flex-row items-center">
                              <FaUsers />
                              <span className="ml-2 text-sm">4,92</span>
                            </span>
                            <p className="text-sm text-gray-800 mt-2">
                              <strong className="whitespace-nowrap">
                                $ {event.price}
                              </strong>
                            </p>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-center">
                          <button
                            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-5 rounded mr-7"
                            onClick={() => handleAccept(event._id)} // Replace with your accept function
                          >
                            Accept
                          </button>
                          <button
                            className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-5 rounded"
                            onClick={() => handleReject(event._id)} // Replace with your reject function
                          >
                            Reject
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </div>
            {/* Bottom buttons */}
            <div className="fixed bottom-3 right-3">
              {/* Button to open the popup filter */}
              <button
                onClick={() => setPopupFilterOpen(true)}
                className="md:hidden flex items-center justify-center w-[4rem] h-[4rem] text-white rounded-full bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] hover:scale-105 shadow-lg cursor-pointer transition-all ease-in-out focus:outline-none"
                title="Filter Events"
              >
                <RxHamburgerMenu className="w-6 h-6" />
              </button>
              {/* Button to open the event form */}
              <button
                onClick={() => router.push("/admin/eventform")}
                className="mt-4 flex items-center justify-center w-[4rem] h-[4rem] text-white rounded-full bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] hover:scale-105 shadow-lg cursor-pointer transition-all ease-in-out focus:outline-none"
                title="Create Events"
              >
                <AiOutlinePlus className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Deal;
