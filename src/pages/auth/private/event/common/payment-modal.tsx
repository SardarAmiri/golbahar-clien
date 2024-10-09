import { Button, message, Modal } from "antd";
import { EventType } from "../../../../../interfaces";
import {
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useState } from "react";
import { formatDateForGoogleCalendar } from "../../../../../helpers/date-time-farmat";
import { createBooking } from "../../../../../api-services/booking-service";
import { useNavigate } from "react-router-dom";
import { PaymentModalProps } from "../../../../../interfaces/index";

function PaymentModal({
  showPaymentModal,
  setShowPaymentModal,
  selectedTicketType,
  selectedTicketCount,
  totalAmount,
  event,
}: PaymentModalProps) {
  const [loading, setLoading] = useState<boolean>(false);
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      e.preventDefault();

      if (!stripe || !elements) {
        return;
      }

      const result = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: "https://example.com/order/123/complete",
        },
        redirect: "if_required",
      });

      if (result.error) {
        message.error(result.error.message);
      } else {
        message.success("Payment Successful");
        const bookingPayload = {
          event: event,
          ticketType: selectedTicketType,
          ticketsCount: selectedTicketCount,
          totalAmount,
          paymentId: result.paymentIntent.id,
          status: "booked",
        };

        await createBooking(bookingPayload);
        message.success("Booking Successful");
        navigate("/profile/bookings");

        setTimeout(() => {
          addToGoogleCalendar(event);
          setShowPaymentModal(false);
        }, 2000);
      }
    } catch (error: any) {
      const errorMessage = error.message || "An error occurred.";
      message.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const addToGoogleCalendar = (event: EventType) => {
    const eventName = encodeURIComponent(event.name);
    const eventDescription = encodeURIComponent(event.description || "");
    const eventAddress = encodeURIComponent(event.address || "");
    const eventCity = encodeURIComponent(event.city || "");
    const eventPostCode = encodeURIComponent(event.postcode || "");

    const startDateTime = new Date(`${event.date}T${event.time}`);
    const endDateTime = new Date(startDateTime);
    endDateTime.setHours(startDateTime.getHours() + 1);

    const formattedStartDateTime = formatDateForGoogleCalendar(startDateTime);
    const formattedEndDateTime = formatDateForGoogleCalendar(endDateTime);

    const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventName}&dates=${formattedStartDateTime}/${formattedEndDateTime}&details=${eventDescription}&location=${eventAddress}%20${eventCity}%20${eventPostCode}`;
    window.open(googleCalendarUrl, "_blank");
  };
  return (
    <Modal
      open={showPaymentModal}
      onCancel={() => setShowPaymentModal(false)}
      title="MAKE PAYMENT"
      centered
      footer={null}
    >
      <form onSubmit={handleSubmit}>
        <PaymentElement />
        <AddressElement
          options={{
            mode: "shipping",
            allowedCountries: ["UK"],
          }}
        />
        <div className="mt-7 flex justify-end gap-7">
          <Button onClick={() => setShowPaymentModal(false)} disabled={loading}>
            Cancel
          </Button>
          <Button type="primary" htmlType="submit" loading={loading}>
            Pay
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default PaymentModal;
