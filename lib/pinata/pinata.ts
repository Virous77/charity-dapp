import axios from "axios";

const JWT = process.env.NEXT_PUBLIC_PINATA_SECRET_API_KEY;

const pinFileToIPFS = async (image: File) => {
  const formData = new FormData();
  formData.append("file", image);

  const pinataMetadata = JSON.stringify({
    name: image.name || `image-${Date.now()}`,
  });
  formData.append("pinataMetadata", pinataMetadata);

  const pinataOptions = JSON.stringify({
    cidVersion: 0,
  });
  formData.append("pinataOptions", pinataOptions);

  try {
    const res = await axios.post(
      "https://api.pinata.cloud/pinning/pinFileToIPFS",
      formData,
      {
        maxBodyLength: Infinity,
        headers: {
          "Content-Type": `multipart/form-data`,
          Authorization: `Bearer ${JWT}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    return error;
  }
};

export default pinFileToIPFS;
