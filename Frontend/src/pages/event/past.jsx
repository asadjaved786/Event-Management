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

function PastEvents() {
  const router = useRouter();
  const [otherEvents, setOtherEvents] = useState([]);
  const [allEvents, setAllEvents] = useState([]);

  const adminIdCookie = getAdminToken();
  const [popupFilterOpen, setPopupFilterOpen] = useState(false);
  const [filterOptions, setFilterOptions] = useState({
    keyword: "",
    category: "",
    dateRange: "",
    price: [10, 3000],
  });

  const fetchAllEvents = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/event/notApprovedEvents`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setAllEvents(data);
  };
  const fetchOtherEvents = async () => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/event`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
    setOtherEvents(data);
  };
  const handleAccept = async (id) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/event/approve/${id}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    alert("Event Accepted Successfully");
    fetchAllEvents();
  };

  useEffect(() => {
    fetchAllEvents();
    fetchOtherEvents();
  }, []);

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

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {otherEvents?.length &&
                    otherEvents?.map((event) => (
                      <div
                        onClick={() => {
                          // event?.isApproved
                          // ?
                          router.push(`/event/${event.id}/adminevents`);
                          // : console.log("Not allowed");
                        }} // Replace with your reject function
                        className="hover:scale-105 cursor-pointer transition-all mt-5 bg-[color:var(--white-color)] rounded-lg shadow-md px-3 py-3"
                        key={event.id}
                      >
                        <div className="relative h-[25rem]">
                          {event.profileImage && (
                            <Image
                              fill
                              className="object-cover h-full w-full rounded-md"
                              src={
                                event.profileImage != "test.com"
                                  ? event?.profileImage
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
                              {event?.title?.length > 30
                                ? event?.title.slice(0, 30) + "..."
                                : event?.title}
                            </p>
                            <p className="text-sm text-gray-800">
                              {event?.venue}
                            </p>
                            <p className="text-sm text-gray-800">
                              {event?.date}
                            </p>
                          </div>
                          {/* Star component */}
                          <div className="flex flex-col justify-end items-center">
                            <span className="w-full flex flex-row items-center">
                              <FaUsers />
                              <span className="ml-2 text-sm">
                                {event.noOfGuest}
                              </span>
                            </span>
                            <p className="text-sm text-gray-800 mt-2">
                              <strong className="whitespace-nowrap">
                                $ {event?.price}
                              </strong>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
            {/* Bottom buttons */}
            {/* <div className="fixed bottom-3 right-3">
         
              <button
                onClick={() => setPopupFilterOpen(true)}
                className="md:hidden flex items-center justify-center w-[4rem] h-[4rem] text-white rounded-full bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] hover:scale-105 shadow-lg cursor-pointer transition-all ease-in-out focus:outline-none"
                title="Filter Events"
              >
                <RxHamburgerMenu className="w-6 h-6" />
              </button>
              
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PastEvents;
