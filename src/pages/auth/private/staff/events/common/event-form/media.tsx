import { Upload, Button } from "antd";
import { EventFormStepProps } from ".";
import { uploadFileAndReturnUrl } from "../../../../../../../api-services/storage-service";

function Media({
  currentStep,
  setCurrentStep,
  selectedMediaFiles,
  setSelectedMediaFiles,
  eventData,
  setEventData,
}: EventFormStepProps) {
  const onSelectedMediaRemove = (index: number) => {
    const existingSelectedMeiaFiles = [...selectedMediaFiles];
    const newSelectedMediaFiles = existingSelectedMeiaFiles.filter(
      (_, i) => i !== index
    );
    setSelectedMediaFiles(newSelectedMediaFiles);
  };

  const onAlreadyUploadedMdeiaRemove = (index: number) => {
    const existingMediaFiles = [...eventData.media];
    const newMediaFiles = existingMediaFiles.filter((_, i) => i !== index);
    setEventData({ ...eventData, media: newMediaFiles });
  };

  const handleUpload = async () => {
    try {
      const uploadedMediaUrls = await Promise.all(
        selectedMediaFiles.map(async (file: File) => {
          const url = await uploadFileAndReturnUrl(file);
          return url;
        })
      );

      setEventData((prevEventData) => {
        const updatedData = {
          ...prevEventData,
          media: [...(prevEventData?.media || []), ...uploadedMediaUrls],
        };
        console.log("Updated event data with media:", updatedData);
        return updatedData;
      });

      setSelectedMediaFiles([]);
    } catch (error) {
      console.error("Error uploading media:", error);
    }
  };
  return (
    <div>
      <Upload
        listType="picture-card"
        multiple
        beforeUpload={(file: File) => {
          setSelectedMediaFiles((prev: File[]) => [...prev, file]);
          return false;
        }}
        onChange={({ fileList }) => {
          const newFiles = fileList.map((file) => file.originFileObj as File);
          setSelectedMediaFiles(newFiles);
        }}
        showUploadList={false}
      >
        <span className="text-gray-500 text-xs">Click here to Upload</span>
      </Upload>
      <div className="flex flex-wrap gap-5 mt-5">
        {selectedMediaFiles.map((file: File, index: number) => (
          <div
            className="border p-3 border-solid border-gray-200 flex flex-col gap-2"
            key={file.name}
          >
            <img
              src={URL.createObjectURL(file)}
              alt="media"
              className="w-40 h-40"
            />
            <span
              className="underline text-sm text-center cursor-pointer"
              onClick={() => onSelectedMediaRemove(index)}
            >
              Remove
            </span>
          </div>
        ))}
      </div>

      <div className="flex flex-wrap gap-5 mt-5">
        {eventData.media?.map(
          (mediaItem: string | { url: string }, index: number) => {
            const mediaUrl =
              typeof mediaItem === "string" ? mediaItem : mediaItem.url;

            return (
              <div
                className="border p-3 border-solid border-gray-200 flex flex-col gap-2"
                key={mediaUrl}
              >
                <img src={mediaUrl} alt="media" className="w-40 h-40" />
                <span
                  className="underline text-sm text-center cursor-pointer"
                  onClick={() => onAlreadyUploadedMdeiaRemove(index)}
                >
                  Remove
                </span>
              </div>
            );
          }
        )}
      </div>
      <div className="flex justify-between col-span-3 mt-5">
        <Button onClick={() => setCurrentStep(currentStep - 1)}>Back</Button>
        <Button
          type="primary"
          onClick={async () => {
            await handleUpload();
            setCurrentStep(currentStep + 1);
          }}
        >
          Next
        </Button>
      </div>
    </div>
  );
}

export default Media;
