import { useState } from "react";
import General from "./general";
import LocationAndDate from "./location-and-date";
import Media from "./media";
import Tickets from "./tickets";
import { message, Steps } from "antd";
import { Form } from "antd";
import { uploadFileAndReturnUrl } from "../../../../../../../api-services/storage-service";
import {
  createEvent,
  updateEvent,
} from "../../../../../../../api-services/events-service";
import { useNavigate, useParams, Params } from "react-router-dom";
import { EventType } from "../../../../../../../interfaces";

// export interface EventFormStepProps {
//   eventData: any;
//   setEventData: any;
//   setCurrentStep: any;
//   currentStep: number;
//   selectedMediaFiles?: any;
//   setSelectedMediaFiles?: any;
//   loading?: boolean;
//   onFinish?: any;
// }
export interface EventFormStepProps {
  eventData: EventType;
  setEventData: React.Dispatch<React.SetStateAction<EventType>>;
  setCurrentStep: React.Dispatch<React.SetStateAction<number>>;
  currentStep: number;
  selectedMediaFiles: File[];
  setSelectedMediaFiles: React.Dispatch<React.SetStateAction<File[]>>;
  loading: boolean;
  onFinish: () => Promise<void>;
}

function EventForm({
  initialData = {},
  type = "create",
}: {
  initialData?: any;
  type?: "create" | "edit";
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [eventData, setEventData] = useState<EventType>(initialData);
  const [selectedMediaFiles, setSelectedMediaFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const params = useParams<Params<"id">>();

  const onFinish = async () => {
    try {
      setLoading(true);
      const [...urls] = await Promise.all(
        selectedMediaFiles.map(async (file: File) => {
          return await uploadFileAndReturnUrl(file);
        })
      );
      eventData.media = [...(eventData?.media || []), ...urls];
      if (type === "edit") {
        await updateEvent(params.id!, eventData);
        message.success("Event Updated Successfully");
      } else {
        await createEvent(eventData);
        message.success("Event Created Successfully");
      }

      navigate("/staff/events");
    } catch (error: any) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const commonProps = {
    eventData,
    setEventData,
    setCurrentStep,
    currentStep,
    selectedMediaFiles,
    setSelectedMediaFiles,
    loading,
    setLoading,
    onFinish,
  };

  const stepsData = [
    {
      name: "General",
      component: <General {...commonProps} />,
    },
    {
      name: "Location And Date",
      component: <LocationAndDate {...commonProps} />,
    },
    {
      name: "Media",
      component: <Media {...commonProps} />,
    },
    {
      name: "Tickets",
      component: <Tickets {...commonProps} />,
    },
  ];

  return (
    <Form layout="vertical">
      <Steps
        current={currentStep}
        onChange={(step: any) => setCurrentStep(step)}
      >
        {stepsData.map((step, index) => (
          <Steps.Step
            key={index}
            title={step.name}
            className="text-xs"
            disabled={index > currentStep}
          />
        ))}
      </Steps>
      <div className="mt-5"> {stepsData[currentStep].component}</div>
    </Form>
  );
}

export default EventForm;
