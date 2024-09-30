import { EventFormStepProps } from ".";
import { Form, Input, Button } from "antd";

function LocationAndDate({
  eventData,
  setEventData,
  currentStep,
  setCurrentStep,
}: EventFormStepProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
      <Form.Item label="Address">
        <Input
          placeholder="Address"
          value={eventData.address}
          onChange={(e: any) =>
            setEventData({ ...eventData, address: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="City">
        <Input
          placeholder="City"
          value={eventData.city}
          onChange={(e: any) =>
            setEventData({ ...eventData, city: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Postal Code">
        <Input
          placeholder="Postal Code"
          value={eventData.postcode}
          onChange={(e: any) =>
            setEventData({ ...eventData, postcode: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Date">
        <Input
          placeholder="Date"
          value={eventData.date}
          type="date"
          onChange={(e: any) =>
            setEventData({ ...eventData, date: e.target.value })
          }
          min={new Date().toISOString().split("T")[0]}
        />
      </Form.Item>
      <Form.Item label="Time">
        <Input
          placeholder="Time"
          value={eventData.time}
          type="time"
          onChange={(e: any) =>
            setEventData({ ...eventData, time: e.target.value })
          }
        />
      </Form.Item>
      <div className="flex justify-between col-span-3">
        <Button onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>
        <Button
          type="primary"
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={
            !eventData.address ||
            !eventData.city ||
            !eventData.postcode ||
            !eventData.date ||
            !eventData.time
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default LocationAndDate;
