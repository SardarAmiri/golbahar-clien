import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import firebaseApp from "../config/firebase-config";
import { UploadFileResponse } from "../interfaces/index";

export const uploadFileAndReturnUrl = async (
  file: File
): Promise<UploadFileResponse> => {
  const storage = getStorage(firebaseApp);
  const storageRef = ref(storage, `images/${file.name}`);
  await uploadBytes(storageRef, file);
  const url = await getDownloadURL(storageRef);
  return { url };
};
