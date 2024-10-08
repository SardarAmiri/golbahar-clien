import { useNavigate } from "react-router-dom";
import PageTitle from "../../../../../components/page-title";
import { Button, message, Table } from "antd";
import { useEffect, useState } from "react";
import {
  deleteEvent,
  getEvents,
} from "../../../../../api-services/events-service";
import { getDateTimeFormat } from "../../../../../helpers/date-time-farmat";
import { Pen, Trash } from "lucide-react";
import { EventType } from "../../../../../interfaces";
function EventsPage() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  const getData = async () => {
    try {
      setLoading(true);
      const response = await getEvents();
      setEvents(response.data);
    } catch (error) {
      message.error("Failed to fetch events");
    } finally {
      setLoading(false);
    }
  };

  const deleteEventHandler = async (id: string) => {
    try {
      setLoading(true);
      await deleteEvent(id);
      getData();
      message.success("Event deleted successfully");
    } catch (error) {
      message.error("Failed to delete event");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Event Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Date & Time",
      dataIndex: "date",
      render: (date: string, record: EventType) => {
        return getDateTimeFormat(`${date} ${record.time}`);
      },
      key: "date",
    },
    {
      title: "Organizer",
      dataIndex: "organizer",
      key: "organizer",
    },
    {
      title: "Created At",
      dataIndex: "createdAt",
      render: (createdAt: string) => getDateTimeFormat(createdAt),
      key: "createdAt",
    },
    {
      title: "Actions",
      dataIndex: "actions",
      render: (_text: any, record: EventType) => (
        <div className="flex gap-5">
          <Trash
            className="cursor-pointer text-red-700"
            size={16}
            onClick={() => deleteEventHandler(record._id)}
          />
          <Pen
            className="cursor-pointer text-yellow-700"
            size={16}
            onClick={() => navigate(`/staff/events/edit/${record._id}`)}
          />
        </div>
      ),
    },
  ];
  return (
    <div>
      <div className="flex justify-between items-center">
        <PageTitle title="Events" />
        <Button type="primary" onClick={() => navigate("/staff/events/create")}>
          Create Event
        </Button>
      </div>
      <Table dataSource={events} columns={columns} loading={loading} />
    </div>
  );
}

export default EventsPage;
