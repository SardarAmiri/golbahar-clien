import { useEffect, useState } from "react";
import userGlobalStore, { UsersStoreType } from "../../../../store/user-store";
import { message } from "antd";
import { getEvents } from "../../../../api-services/events-service";
import { EventType } from "../../../../interfaces";
import EventCard from "./common/event-card";
import Spinner from "../../../../components/spinner";
function HomePage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(false);
  const { currentUser } = userGlobalStore() as UsersStoreType;

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getEvents();
      console.log(response.data);
      if (Array.isArray(response.data)) {
        setEvents(response.data); // Set the array of events directly
      } else {
        message.error("Invalid response format");
      }
    } catch (error: any) {
      message.error(error?.message || "Failed to fetch data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div>
      <p>Welcome, {currentUser?.name} !</p>
      {/* <Filters filters={filters} setFilters={setFilters} onFilters={getData} /> */}
      <div className="flex flex-col gap-7 mt-7">
        {events.map((event: EventType) => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    </div>
  );
}

export default HomePage;
