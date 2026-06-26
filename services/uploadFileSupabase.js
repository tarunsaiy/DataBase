import supabaseAdmin from "../config/supabaseAdmin.js";

const uploadFileSupabase = async (file) => {
  console.log("Storage exists:", !!supabaseAdmin.storage); // DEBUG

  const fileName = `${Date.now()}-${file.originalname}`;

  const { data, error } = await supabaseAdmin.storage
    .from("AttendanceTracker") 
    .upload(fileName, file.buffer, {
      contentType: file.mimetype
    });

  if (error) throw error;

  const { data: publicUrl } = supabaseAdmin.storage
    .from("AttendanceTracker")
    .getPublicUrl(fileName);

  return {
    path: data.path,
    previewLink: publicUrl.publicUrl
  };
};

export default uploadFileSupabase;
