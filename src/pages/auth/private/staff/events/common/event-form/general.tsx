import { useNavigate } from "react-router-dom";
import { EventFormStepProps } from ".";
import { Form, Input, Button } from "antd";

function General({
  currentStep,
  setCurrentStep,
  eventData,
  setEventData,
}: EventFormStepProps) {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5">
      <Form.Item label="Event Name" required>
        <Input
          placeholder="Event Name"
          value={eventData.name}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEventData({ ...eventData, name: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Description" required>
        <Input.TextArea
          placeholder="Description"
          value={eventData.description}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setEventData({ ...eventData, description: e.target.value })
          }
        />
      </Form.Item>
      <Form.Item label="Organizer" required>
        <Input.TextArea
          placeholder="Organizer"
          value={eventData.organizer}
          onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
            setEventData({ ...eventData, organizer: e.target.value })
          }
        />
      </Form.Item>
      <div className="flex gap-10 justify-between">
        <Button onClick={() => navigate("/staff/events")}>Back</Button>
        <Button
          type="primary"
          onClick={() => setCurrentStep(currentStep + 1)}
          disabled={
            !eventData.name || !eventData.description || !eventData.organizer
          }
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default General;
