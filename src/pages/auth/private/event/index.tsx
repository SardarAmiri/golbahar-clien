import { EventType } from "../../../../interfaces";
import { useParams } from "react-router-dom";
import { message } from "antd";
import { getEventById } from "../../../../api-services/events-service";
import { useEffect, useState } from "react";
import Spinner from "../../../../components/spinner";
import { MapPin, Timer } from "lucide-react";
import { getDateTimeFormat } from "../../../../helpers/date-time-farmat";
import TicketsSelection from "./common/tickets-selection";

function EventInforPage() {
  const [eventData, setEventData] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(false);
  const params = useParams<Record<string, string | undefined>>();

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getEventById(params.id!);
      setEventData(response.data);
    } catch (error) {
      message.error("Failed to fetch event");
    } finally {
      setLoading(false);
    }
  };

  const renderEventProperty = (label: string, value: any) => {
    return (
      <div className="flex flex-col text-sm">
        <span className="text-gray-500">{label}</span>
        <span className="text-gray-800 font-semibold">{value}</span>
      </div>
    );
  };

  useEffect(() => {
    getData();
  }, [params.id]);
  if (loading) {
    return (
      <div className="flex h-screen justify-center items-center">
        <Spinner />
      </div>
    );
  }
  return (
    eventData && (
      <div>
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-bold text-gray-600">{eventData?.name}</h1>
          <div className="flex gap-10">
            <div className="flex gap-1 text-gray-500 items-center">
              <MapPin size={16} />
              <span className="text-gray-500 text-xs">
                {`${eventData?.address} ${eventData?.city} ${eventData?.postcode}`}
              </span>
            </div>
            <div className="flex gap-1 items-center text-gray-500">
              <Timer size={16} />
              <span className="text-gray-500 text-xs">
                {getDateTimeFormat(`${eventData?.date} ${eventData?.time}`)}
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-3 mt-7">
          {eventData.media?.map(
            (mediaItem: string | { url: string }, index: number) => {
              const mediaUrl =
                typeof mediaItem === "string" ? mediaItem : mediaItem.url;

              return (
                <img
                  src={mediaUrl}
                  height={220}
                  className="object-cover rounded"
                  key={index}
                  alt={`Event media ${index}`}
                />
              );
            }
          )}
        </div>
        <div className="mt-7">
          <p className="text-gray-600 text-sm">{eventData?.description}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 p-3 bg-gray-100 mt-7 gap-5">
          {renderEventProperty("Organizer", eventData?.organizer)}
          {renderEventProperty("Address", eventData?.address)}
          {renderEventProperty("City", eventData?.city)}
          {renderEventProperty("PostCode", eventData?.postcode)}
          {renderEventProperty("Date", getDateTimeFormat(eventData?.date))}
          {renderEventProperty("Time", eventData?.time)}
        </div>
        <div className="mt-7">
          <TicketsSelection eventData={eventData} />
        </div>
      </div>
    )
  );
}

export default EventInforPage;
