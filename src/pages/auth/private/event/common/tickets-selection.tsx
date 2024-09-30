import { useState } from "react";
import { EventType } from "../../../../../interfaces";
import { Input, Button, message } from "antd";
import PaymentModal from "./payment-modal";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { getClientSecret } from "../../../../../api-services/payment-service";
import { formatDateForGoogleCalendar } from "../../../../../helpers/date-time-farmat";
import { createBooking } from "../../../../../api-services/booking-service";
import { useNavigate } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

function TicketsSelection({ eventData }: { eventData: EventType }) {
  const [selectedTicketType, setSelectedTicketType] = useState<string>("");
  const [maxCount, setMaxCount] = useState<number>(1);
  const [selectedTicketCount, setSelectedTicketCount] = useState<number>(1);
  const [showPaymentModal, setShowPaymentModal] = useState<boolean>(false);
  const [stripeOption, setStripeOption] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const ticketTypes = eventData.ticketTypes;
  const selectedTicketPrice = ticketTypes.find(
    (ticketType) => ticketType.name === selectedTicketType
  )?.price;

  const totalAmount = (selectedTicketPrice || 0) * selectedTicketCount;

  const getClientSecretAndOpenPaymentModal = async () => {
    try {
      setLoading(true);
      const response = await getClientSecret(totalAmount);
      setStripeOption({
        clientSecret: response.clientSecret,
      });
      setShowPaymentModal(true);
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleJoinFree = async () => {
    try {
      const bookingPayload = {
        event: eventData._id,
        ticketType: "Free",
        ticketsCount: 0,
        totalAmount: 0,
        status: "booked",
      };

      await createBooking(bookingPayload);
      message.success("You have successfully booked the event for free!");
      navigate("/profile/bookings");

      const eventName = encodeURIComponent(eventData.name);
      const eventDescription = encodeURIComponent(eventData.description || "");
      const eventAddress = encodeURIComponent(eventData.address || "");
      const eventCity = encodeURIComponent(eventData.city || "");
      const eventPostCode = encodeURIComponent(eventData.postcode || "");

      const startDateTime = new Date(`${eventData.date}T${eventData.time}`);
      const endDateTime = new Date(startDateTime);
      endDateTime.setHours(startDateTime.getHours() + 1);

      const formattedStartDateTime = formatDateForGoogleCalendar(startDateTime);
      const formattedEndDateTime = formatDateForGoogleCalendar(endDateTime);

      const googleCalendarUrl = `https://www.google.com/calendar/render?action=TEMPLATE&text=${eventName}&dates=${formattedStartDateTime}/${formattedEndDateTime}&details=${eventDescription}&location=${eventAddress}%20${eventCity}%20${eventPostCode}`;

      setTimeout(() => {
        window.open(googleCalendarUrl, "_blank");
      }, 2000);
    } catch (error) {
      message.error("Failed to join the event for free.");
    }
  };
  return (
    <div>
      <div>
        <h1 className="text-sm text-info font-bold">Select Ticket Type</h1>
        <div className="flex flex-wrap gap-5 mt-3">
          {ticketTypes?.length ? (
            ticketTypes.map((ticketType, index) => {
              const available = ticketType.available ?? ticketType.limit;
              return (
                <div
                  key={index}
                  className={`p-2 border border-gray-100 bg-gray-100 lg:w-96 w-full cursor-pointer ${
                    selectedTicketType === ticketType.name
                      ? "border-primary border-solid border-2"
                      : ""
                  }`}
                  onClick={() => {
                    setSelectedTicketType(ticketType.name);
                    setMaxCount(available);
                  }}
                >
                  <h1 className="text-sm text-gray-500 uppercase">
                    {ticketType.name}
                  </h1>
                  <div className="flex justify-between">
                    <h1 className="text-sm font-bold">£{ticketType.price}</h1>
                    <h1 className="text-xs">{available} Left</h1>
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500">This event is free to join!</p>
          )}
        </div>

        {ticketTypes?.length ? (
          <>
            <div className="flex flex-col gap-1">
              <h1 className="text-sm text-info font-bold mt-10">
                Select Ticket Count
              </h1>
              <Input
                type="number"
                value={selectedTicketCount}
                className="w-96"
                onChange={(e: any) => {
                  setSelectedTicketCount(parseInt(e.target.value));
                }}
                min={1}
                max={maxCount}
              />
              <span className="text-gray-600 text-sm mt-2 font-bold">
                {selectedTicketType && selectedTicketCount > maxCount
                  ? `Only ${maxCount} tickets available`
                  : ""}
              </span>
            </div>
            <div className="mt-7 flex justify-between bg-gray-200 border border-solid p-3 items-center">
              <h1 className="text-xl text-gray-500 font-bold">
                Total Amount: £{totalAmount}
              </h1>
              <Button
                type="primary"
                onClick={() => getClientSecretAndOpenPaymentModal()}
                disabled={
                  !selectedTicketType ||
                  !selectedTicketCount ||
                  loading ||
                  selectedTicketCount > maxCount
                }
                loading={loading}
              >
                Book Now
              </Button>
            </div>
          </>
        ) : (
          <div className="mt-7 flex justify-between bg-gray-200 border border-solid p-3 items-center">
            <Button type="primary" onClick={handleJoinFree} loading={loading}>
              Join Free
            </Button>
          </div>
        )}
      </div>
      {stripeOption?.clientSecret && (
        <Elements stripe={stripePromise} options={stripeOption}>
          {showPaymentModal && (
            <PaymentModal
              showPaymentModal={showPaymentModal}
              setShowPaymentModal={setShowPaymentModal}
              selectedTicketType={selectedTicketType}
              selectedTicketCount={selectedTicketCount}
              totalAmount={totalAmount}
              event={eventData}
            />
          )}
        </Elements>
      )}
    </div>
  );
}

export default TicketsSelection;
