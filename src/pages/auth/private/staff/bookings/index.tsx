import { useEffect, useState } from "react";
import PageTitle from "../../../../../components/page-title";
import { BookingType } from "../../../../../interfaces";
import { message, Table } from "antd";
import { getAllBookings } from "../../../../../api-services/booking-service";
import { getDateTimeFormat } from "../../../../../helpers/date-time-farmat";

function AminBookings() {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getAllBookings();
      setBookings(response.data);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const columns = [
    {
      title: "Event",
      dataIndex: "event",
      key: "event",
      render: (event: any) => event.name,
    },
    {
      title: "User",
      dataIndex: "user",
      key: "user",
      render: (event: any) => event.name,
    },
    {
      title: "Date & Time",
      dataIndex: "event",
      key: "event",
      render: (event: any) => getDateTimeFormat(`${event.date} ${event.time}`),
    },
    {
      title: "Ticket Type",
      dataIndex: "ticketType",
      key: "ticketType",
      render: (ticketType: string) =>
        ticketType === "Free" ? "Free Event" : ticketType,
    },
    {
      title: "Ticket Count",
      dataIndex: "ticketsCount",
      key: "ticketsCount",
      render: (ticketsCount: number) =>
        ticketsCount === 0 ? "N/A" : ticketsCount,
    },
    {
      title: "Total Amount",
      dataIndex: "totalAmount",
      key: "totalAmount",
      render: (totalAmount: number) =>
        totalAmount === 0 ? "Free" : `£${totalAmount}`,
    },
    {
      title: "Booked On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => getDateTimeFormat(createdAt),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => status.toUpperCase(),
    },
  ];
  return (
    <div>
      <PageTitle title="Bookings" />
      <Table
        dataSource={bookings}
        columns={columns}
        loading={loading}
        rowKey="_id"
        pagination={false}
      />
    </div>
  );
}

export default AminBookings;
