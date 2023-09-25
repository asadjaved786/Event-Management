import AdminNavBar from "@/components/AdminNavBar";
import dummyUsers from "@/utils/dummyUsers";
import { useState, useEffect, useRef } from "react";
import { FaCheck } from "react-icons/fa";
import { useRouter } from "next/router";
import calculation from "../../../helpers/calculation";
import ModalComponent from "@/components/ModalComponent";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
// import Button from "@mui/material/Button";

const Registration = () => {
  const router = useRouter();
  const eventId = router.query.eventId;
  const [showChecklist, setShowChecklist] = useState(false);
  const [eventData, setEventData] = useState([]);
  const [allEvents, setAllEvents] = useState([]);
  const [eventDetails, setEventDetails] = useState([]);
  const [formData, setFormData] = useState({});
  const [open, setOpen] = useState(false);
  const handleOpenModal = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const inputRef = useRef(null);
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "johndoe@example.com",
      contactNo: "123-456-7890",
      checked: false,
    },
    {
      id: 2,
      name: "Alice Smith",
      email: "alice.smith@example.com",
      contactNo: "987-654-3210",
      checked: true,
    },
    {
      id: 3,
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      contactNo: "555-123-4567",
      checked: false,
    },
    {
      id: 4,
      name: "Emily Davis",
      email: "emily.davis@example.com",
      contactNo: "777-888-9999",
      checked: true,
    },
    {
      id: 5,
      name: "Sarah Brown",
      email: "sarah.brown@example.com",
      contactNo: "222-333-4444",
      checked: false,
    },
    {
      id: 6,
      name: "Michael Wilson",
      email: "michael.wilson@example.com",
      contactNo: "111-222-3333",
      checked: false,
    },
    {
      id: 7,
      name: "Ella Martinez",
      email: "ella.martinez@example.com",
      contactNo: "555-555-5555",
      checked: true,
    },
    {
      id: 8,
      name: "Daniel Lee",
      email: "daniel.lee@example.com",
      contactNo: "999-888-7777",
      checked: false,
    },
    {
      id: 9,
      name: "Olivia Clark",
      email: "olivia.clark@example.com",
      contactNo: "777-333-1111",
      checked: true,
    },
    {
      id: 10,
      name: "Liam Garcia",
      email: "liam.garcia@example.com",
      contactNo: "444-999-6666",
      checked: false,
    },
  ]);
  const [searchQuery, setSearchQuery] = useState("");

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
        setEventData(data);
        localStorage.setItem("event", JSON.stringify(data));
        if (data?.details && data?.details?.length) {
          setEventDetails(data?.details);
        } else {
          const { totalPrice, event } = calculation(
            data?.noOfGuest,
            data?.eventType
          );
          setAllEvents(event);
        }
      } else {
        // throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error fetching event data:", error.message);
    }
  };

  useEffect(() => {
    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  function handleCheckboxChange(userId) {
    setUsers(
      users.map((user) => {
        if (user.id === userId) {
          return {
            ...user,
            checked: !user.checked,
          };
        }
        return user;
      })
    );
  }
  function addProducts(event, index) {
    console.log(event);

    const inputPrice = parseInt(formData[index]);
    const allowedPrice = event?.percentage * eventData?.price;
    const fundsUsed = event?.used ?? 0;

    if (!inputPrice) {
      alert(`Please enter valid number`);
      return;
    }
    if (inputPrice + fundsUsed > allowedPrice) {
      alert(`You can not use amount greater than the one alloted`);
      return;
    }

    if (eventDetails?.length) {
      const indexToRemove = eventDetails.findIndex(
        (val) => val?.title == event?.title
      );
      const arr = [...eventDetails];
      event.used = inputPrice + fundsUsed;
      if (indexToRemove !== -1) {
        arr.splice(indexToRemove, 1);
      }
      const newArr = [];
      for (let i = 0; i < eventDetails?.length; i++) {
        if (i == indexToRemove) {
          newArr.push(event);
        } else {
          newArr.push(arr[0]);
          arr.splice(0, 1);
        }
      }
      setEventDetails(newArr);
    } else {
      const indexToRemove = allEvents.findIndex(
        (val) => val?.title == event?.title
      );
      const arr = [...allEvents];
      event.used = inputPrice + fundsUsed;
      if (indexToRemove !== -1) {
        arr.splice(indexToRemove, 1);
      }
      const newArr = [];
      for (let i = 0; i < allEvents?.length; i++) {
        if (i == indexToRemove) {
          newArr.push(event);
        } else {
          newArr.push(arr[0]);
          arr.splice(0, 1);
        }
      }
      setAllEvents(newArr);
    }
  }

  const handleSubmit = async () => {
    const checkedUsers = users
      .filter((user) => user.checked)
      .map((user) => user.id);
    console.log(checkedUsers);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/event/checkin`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            event_id: eventId,
            checkInList: checkedUsers,
          }),
        }
      );
      if (response.ok) {
        const data = await response.json();
        if (data.msg == "success") {
          router.reload();
        }
      } else {
        // throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error("Error fetching event data:", error.message);
    }
  };
  const submit = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/v1/event/${eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            eventDetails: eventDetails.length ? eventDetails : allEvents,
          }),
        }
      );
      alert(`budget successfully submitted`);
      if (response.ok) {
        const data = await response.json();
        if (data.msg == "success") {
          router.reload();
        }
      } else {
        // throw new Error(`${response.status} ${response.statusText}`);
      }
    } catch (error) {
      alert(`some error occured`);
      console.error("Error fetching event data:", error.message);
    }
  };
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="pt-20 lg:pt-8 bg-[color:var(--primary-color)]">
      <AdminNavBar />
      <div className="container h-screen mx-auto my-4">
        <div className="flex flex-col gap-y-3 sm:flex-row sm:gap-y-0 justify-between items-center mb-4">
          <div className="flex space-x-2">
            <button
              className={`px-4 py-2 rounded ${
                showChecklist
                  ? "bg-gray-300 text-gray-800"
                  : "bg-[color:var(--darker-secondary-color)] text-white hover:bg-[color:var(--secondary-color)]"
              }`}
              onClick={() => setShowChecklist(false)}
            >
              Budgeting System
            </button>
            {/* <button
              className={`px-4 py-2 rounded ${
                showChecklist
                  ? "bg-[color:var(--darker-secondary-color)] text-white hover:bg-[color:var(--secondary-color)]"
                  : "bg-gray-300 text-gray-800"
              }`}
              onClick={() => setShowChecklist(true)}
            >
              Check List
            </button> */}
            <button
              className="bg-green-400 hover:bg-green-400 text-white font-bold py-2 px-20 rounded "
              onClick={() => submit()}
            >
              Submit Budget
            </button>
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              onClick={handleOpenModal}
            >
              Project Detail Report
            </button>
            <Backdrop
              sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
              open={open}
              onClick={handleCloseModal}
            >
              <ModalComponent
                allEvents={allEvents}
                eventDetails={eventDetails}
              />
            </Backdrop>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search by name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-[3%] py-1 border border-gray-400 rounded-md focus:border-[color:var(--darker-secondary-color)] focus:outline-none focus:ring-1 focus:ring-[color:var(--darker-secondary-color)]"
            />
          </div>
        </div>

        {showChecklist ? (
          <div className="overflow-x-auto overflow-y-auto">
            <table className="w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="p-2 bg-gray-100 border border-gray-300">#</th>
                  <th className="p-2 bg-gray-100 border border-gray-300">
                    Name
                  </th>
                  <th className="p-2 bg-gray-100 border border-gray-300">
                    Email
                  </th>
                  <th className="p-2 bg-gray-100 border border-gray-300">
                    Reg. No.
                  </th>
                  <th className="p-2 bg-gray-100 border border-gray-300">
                    Checked
                  </th>
                </tr>
              </thead>
              <tbody>
                {/* .filter((user) => user.checked) */}
                {users
                  .filter(
                    (user) =>
                      user.name
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase()) && !user.entry
                  )
                  .map((user, index) => (
                    <tr
                      key={user.id}
                      className={user.checked ? "line-through" : ""}
                    >
                      <td className="p-2 border border-gray-300">
                        {index + 1}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {user.name}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {user.email}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {user.contactNo}
                      </td>
                      <td className="p-2 border border-gray-300 text-center w-1/4">
                        <label
                          htmlFor={`checkbox-${user.id}`}
                          className="flex cursor-pointer"
                        >
                          <div className="relative">
                            <input
                              id={`checkbox-${user.id}`}
                              type="checkbox"
                              value={user.id}
                              onChange={() => handleCheckboxChange(user.id)}
                              className="sr-only"
                            />
                            <div
                              className={`bg-white border border-[color:var(--darker-secondary-color)] rounded-md shadow-sm w-6 h-6 flex items-center justify-center mr-2 ${
                                user.checked
                                  ? "ring-1 ring-[color:var(--darker-secondary-color)]"
                                  : ""
                              }`}
                            >
                              {user.checked && (
                                <FaCheck className="text-[color:var(--secondary-color)]" />
                              )}
                            </div>
                          </div>
                          <div className="select-none">{user.passID}</div>
                        </label>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="overflow-x-auto overflow-y-auto">
            <table className="w-full border border-gray-300">
              <thead>
                <tr>
                  <th className="p-2 bg-gray-100 border border-gray-300">#</th>
                  <th className="p-2 bg-gray-100 border border-gray-300">
                    Name
                  </th>
                  <th className="p-2 bg-gray-100 border border-gray-300">
                    Funds Alloted
                  </th>
                  <th className="p-2 bg-gray-100 border border-gray-300">
                    Funds Utilized
                  </th>
                  {/* <th className="p-2 bg-gray-100 border border-gray-300">
                    Input
                  </th> */}
                </tr>
              </thead>

              <tbody>
                {allEvents?.length &&
                  !eventDetails?.length &&
                  allEvents
                    .filter((event) =>
                      event?.title
                        .toLowerCase()
                        .includes(searchQuery.toLowerCase())
                    )
                    .map((eventVal, index) => (
                      <tr key={eventVal?.id}>
                        <td className="p-2 border border-gray-300">
                          {index + 1}
                        </td>
                        <td className="p-2 border border-gray-300">
                          {eventVal?.title}
                        </td>
                        <td className="p-2 border border-gray-300">
                          {(eventVal?.percentage * eventData?.price).toFixed(2)}
                        </td>
                        <td className="p-2 border border-gray-300">
                          <div>{eventVal?.used ?? 0}</div>
                          <div>
                            {eventVal?.percentage * eventData?.price * 0.9 >
                            (eventVal?.used ?? 0) ? (
                              <span className="text-green-300">Remaining</span>
                            ) : (
                              <span className="text-red-300">Alert</span>
                            )}
                          </div>
                        </td>
                        <input
                          className="p-2 border border-gray-300"
                          name={index}
                          onChange={handleChange}
                          type="number"
                          ref={inputRef}
                        />

                        <button
                          className="bg-red-200 hover:bg-red-400 text-white font-bold py-2 px-20 rounded ml-10"
                          onClick={() => {
                            addProducts(eventVal, index);
                          }}
                          // Replace with your accept function
                        >
                          Add
                        </button>
                      </tr>
                    ))}
              </tbody>
              <tbody>
                {eventDetails?.length &&
                  eventDetails?.map((eventVal, index) => (
                    <tr key={eventVal?.id}>
                      <td className="p-2 border border-gray-300">
                        {index + 1}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {eventVal?.title}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {eventVal?.percentage * eventData?.price}
                      </td>
                      <td className="p-2 border border-gray-300">
                        {eventVal?.used ?? 0}
                      </td>
                      <input
                        className="p-2 border border-gray-300"
                        name={index}
                        onChange={handleChange}
                        type="number"
                        ref={inputRef}
                      />

                      <button
                        className="bg-red-200 hover:bg-red-400 text-white font-bold py-2 px-20 rounded ml-10"
                        onClick={() => {
                          addProducts(eventVal, index);
                        }}
                        // Replace with your accept function
                      >
                        Add
                      </button>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
        {showChecklist ? (
          <center>
            <button
              onClick={handleSubmit}
              className="bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] mt-3 text-white py-3 px-[15%] rounded-md transition duration-300 ease-in-out"
            >
              Submit list
            </button>
          </center>
        ) : null}
      </div>
    </div>
  );
};

export default Registration;
