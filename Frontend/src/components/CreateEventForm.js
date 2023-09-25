import { getAdminToken } from "@/utils/getAdminToken";
import { useRouter } from "next/router";
import { useState } from "react";

const CreateEvent = () => {
  const router = useRouter();
  const admin_id = getAdminToken();

  const [formData, setFormData] = useState({
    name: "",
    venue: "",
    organizer: "",
    datetime: "",
    price: "",
    profile: "",
    cover: "",
    description: "",
    noOfGuest: "",
    eventType: "",
  });

  // function to handle the event form submission
  const handleEventFormSubmit = async (e) => {
    e.preventDefault();

    // Format date and time for server request
    const datetemp = new Date(formData.datetime);
    const formattedDate = datetemp.toLocaleDateString("en-IN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });
    const formattedTime = datetemp.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
    const date = `${formattedDate}`;
    const time = `${formattedTime}`;

    // Set up request body with form data and admin ID
    const requestBody = {
      title: formData.name,
      venue: formData.venue,
      organizer: formData.organizer,
      date: date,
      noOfGuest: formData?.noOfGuest,
      eventType: formData?.eventType != "" ? formData?.eventType : "party",
      description: formData.description,
      price: formData.price,
      profileImage: formData.profile != "" ? formData.profile : undefined,
      coverImage: formData.cover != "" ? formData.cover : undefined,
      id: 1,
    };

    // Send POST request to server with request body
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/v1/event`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      }
    );
    const data = await response.json();
    if (response.status === 200) {
      // If request was successful, show success message and redirect to dashboard
      alert("Event Created Successfully");
      router.push("/users/dashboard");
    } else {
      // If request failed, log error message to console
      console.error(`Failed with status code ${response.status}`);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="flex h-full text-left bg-white rounded-lg shadow-lg items-center">
      <div className="p-8 w-full">
        <form
          id="event-form"
          onSubmit={handleEventFormSubmit}
          className="space-y-3"
        >
          <div>
            <label
              htmlFor="name"
              className="block font-medium text-gray-500 mt-12"
            >
              Title:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="adminDropDownInput"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label
                htmlFor="venue"
                className="block font-medium text-gray-500"
              >
                Venue:
              </label>
              <input
                type="text"
                id="venue"
                name="venue"
                className="adminDropDownInput"
                value={formData.venue}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="organizer"
                className="block font-medium text-gray-500"
              >
                Organizer:
              </label>
              <input
                type="text"
                id="organizer"
                name="organizer"
                className="adminDropDownInput"
                value={formData.organizer}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="datetime"
                className="block font-medium text-gray-500"
              >
                Date and Time:
              </label>
              <input
                type="datetime-local"
                id="datetime"
                name="datetime"
                className="adminDropDownInput"
                value={formData.datetime}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="price"
                className="block font-medium text-gray-500"
              >
                Price:
              </label>
              <input
                type="number"
                id="price"
                name="price"
                min="0"
                className="adminDropDownInput"
                value={formData.price}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label
                htmlFor="profile"
                className="block font-medium text-gray-500"
              >
                Profile Image URL:
              </label>
              <input
                type="url"
                id="profile"
                name="profile"
                className="adminDropDownInput"
                value={formData.profile}
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="cover"
                className="block font-medium text-gray-500"
              >
                Cover Image URL:
              </label>
              <input
                type="url"
                id="cover"
                name="cover"
                className="adminDropDownInput"
                value={formData.cover}
                onChange={handleChange}
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="event-type"
              className="block font-medium text-gray-500"
            >
              Event Type:
            </label>
            <select
              id="event-type"
              name="eventType"
              className="adminDropDownInput"
              value={formData?.eventType}
              onChange={handleChange}
              required
            >
              <option value="party">Party</option>
              <option value="ceremony">Ceremony</option>
              <option value="conference">Conference</option>
              <option value="wedding">Wedding</option>
              <option value="concert">Concert</option>
              {/* Add more event types here */}
            </select>
          </div>
          <div>
            <label htmlFor="price" className="block font-medium text-gray-500">
              No of Guest:
            </label>
            <input
              type="number"
              id="noOfGuest"
              name="noOfGuest"
              min="0"
              className="adminDropDownInput"
              value={formData.noOfGuest}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block font-medium text-gray-500"
            >
              Description:
            </label>
            <textarea
              id="description"
              name="description"
              className="adminDropDownInput"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="text-center w-full px-4 py-2 bg-[color:var(--darker-secondary-color)] hover:bg-[color:var(--secondary-color)] transition-all ease-in-out text-white font-bold rounded-lg"
          >
            Create Event
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
