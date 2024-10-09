import { MapPin, Timer } from "lucide-react";
import { EventType } from "../../../../../interfaces";
import { Button } from "antd";
import { getDateTimeFormat } from "../../../../../helpers/date-time-farmat";
import { useNavigate } from "react-router-dom";

function EventCard({ event }: { event: EventType }) {
  const navigate = useNavigate();
  // const mainImage = event.media[0];
  const mainImage =
    typeof event.media[0] === "string" ? event.media[0] : event.media[0]?.url;
  return (
    <div className="grid lg:grid-cols-3 grid-cols-1 border border-solid border-gray-200 items-center gap-5">
      <div className="col-span-1">
        <img
          src={mainImage}
          alt={event.name}
          className="w-full h-56 object-cover rounded-l"
        />
      </div>
      <div className="col-span-2 flex flex-col gap-5 p-3">
        <h1 className="text-primary text-sm font-bold">{event.name}</h1>
        <p className="text-gray-600 text-sm line-clamp-3">
          {event.description}
        </p>
        <div className="flex justify-between items-center">
          <div className="bg-gray-200 p-2 rounded flex flex-col gap-1">
            <div className="flex gap-2">
              <MapPin size={16} />
              <p className="text-xs">
                {event.address}, {event.city}, {event.postcode}
              </p>
            </div>
            <div className="flex gap-2 items-center">
              <Timer size={16} />
              <p className="text-xs">
                {getDateTimeFormat(`${event.date} ${event.time}`)}
              </p>
            </div>
          </div>
          <Button onClick={() => navigate(`/event/${event._id}`)}>
            View Details
          </Button>
        </div>
      </div>
    </div>
  );
}
export default EventCard;
