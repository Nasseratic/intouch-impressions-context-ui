import { BlockBlobClient } from "@azure/storage-blob";
const account = "prod00intouch";
const containerName = "pos-data";

export const uploadToBlob = async ({
  file,
  sas,
  store,
  startDate,
  endDate,
}) => {
  try {
    const blobServiceClient = new BlockBlobClient(
      `https://prod00intouch.blob.core.windows.net/pos-data/${store}/${startDate
        .toLocaleDateString()
        .replace(/\//g, "-")}_${endDate
        .toLocaleDateString()
        .replace(/\//g, "-")}/${store}.csv?${sas}`
    );
    await blobServiceClient.uploadData(file);
    alert("File Uploaded");
  } catch (error) {
    alert("Error, please make sure the sas token is correct");
    console.log(error);
  }
};
