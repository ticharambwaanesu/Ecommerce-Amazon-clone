import { supabase } from "@/supabase";

export const imageUpload = async (imageUri: string | null) => {
  if (!imageUri) throw new Error("No image URI provideed");
  const fileName = `${Date.now()}.jpg`;

  const formData = new FormData();
  formData.append("file", {
    uri: imageUri,
    name: fileName,
    type: "image/jpeg",
  } as any);
  const response = await fetch(
    `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/user-data/user-uploads/${fileName}`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY}`,
        "Content-Type": "multipart/form-data",
      },
      body: formData,
    }
  );
  if (!response.ok) {
    const text = await response.text();
    console.error("Uplaod error response:", text);
    throw new Error("Upload failed");
  }
  const { data: publicData } = supabase.storage
    .from("user-data")
    .getPublicUrl(`user-uploads/${fileName}`);

  console.log("image uploaded:", publicData.publicUrl);
  return publicData.publicUrl;
};
