import { UploadClient } from "@uploadcare/upload-client";

const client = new UploadClient({
  publicKey: process.env.REACT_APP_UPLOADCARE_PUBLIC_KEY as string,
});

export default client;
