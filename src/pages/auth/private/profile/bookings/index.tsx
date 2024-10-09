import { useEffect, useState } from "react";
import PageTitle from "../../../../../components/page-title";
import { BookingType } from "../../../../../interfaces";
import { message, Popconfirm, Table } from "antd";
import {
  cancelBooking,
  getUserBookings,
} from "../../../../../api-services/booking-service";
import { getDateTimeFormat } from "../../../../../helpers/date-time-farmat";
import { EventType } from "../../../../../interfaces";

function UserBookingsPage() {
  const [bookings, setBookings] = useState<BookingType[]>([]);
  const [loading, setLoading] = useState(false);

  const getData = async () => {
    try {
      setLoading(true);
      const response = await getUserBookings();
      console.log(response.data);
      setBookings(response.data);
    } catch (error: any) {
      message.error(error?.message || "Failed to fetch bookings");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const onCancelBooking = async (booking: BookingType) => {
    try {
      if (!booking._id || (booking.totalAmount > 0 && !booking.paymentId)) {
        message.error("Missing booking or payment information");
        return;
      }

      setLoading(true);
      const payload = {
        eventId: booking.event._id,
        ticketTypeName: booking.ticketType,
        ticketsCount: booking.ticketsCount,
        bookingId: booking._id,
        paymentId: booking.paymentId,
        totalAmount: booking.totalAmount,
      };
      if (booking.totalAmount > 0) {
        payload.paymentId = booking.paymentId;
      }
      await cancelBooking(payload);
      message.success("Booking cancelled successfully");
      getData();
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Event Name",
      dataIndex: "event",
      key: "event",
      render: (event: EventType) => event.name,
    },
    {
      title: "Date & Time",
      dataIndex: "event",
      key: "event",
      render: (event: EventType) =>
        getDateTimeFormat(`${event.date} ${event.time}`),
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
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status: string) => status.toUpperCase(),
    },
    {
      title: "Booked On",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (createdAt: string) => getDateTimeFormat(createdAt),
    },
    {
      title: "Action",
      key: "action",
      render: (record: BookingType) => {
        if (record.status === "booked") {
          return (
            <Popconfirm
              title="Are you sure you want to cancel this booking?"
              onConfirm={() => onCancelBooking(record)}
              okText="Yes"
              cancelText="No"
            >
              <span className="text-gray-600 text-sm underline font-semibold cursor-pointer">
                Cancel
              </span>
            </Popconfirm>
          );
        } else {
          return "";
        }
      },
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

export default UserBookingsPage;
