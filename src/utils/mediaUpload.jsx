import { createClient } from "@supabase/supabase-js";

const anon_key =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5xbGp3eXNsYmJ0aXdrdGxwdnd3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYwODY3MTAsImV4cCI6MjA2MTY2MjcxMH0.Q3rRYfDUsWuM_bCZOZcCpKGIEcDDA9SOkRqVFPdyrdw";
const supabase_url = "https://nqljwyslbbtiwktlpvww.supabase.co";

const supabase = createClient(supabase_url, anon_key);

export default function mediaUpload(files) {
  return new Promise((resolve, reject) => {
    if (files == null) {
      reject("No file selected");
      return;
    }

    const timeStamp = new Date().getTime();
    const fileName = timeStamp + files.name;

    supabase.storage
      .from("images")
      .upload(fileName, files, {
        cacheControl: "3600",
        upsert: false,
      })
      .then((response) => {
        if (response.error) {
          reject("Error uploading file");
        } else {
          const { data } = supabase.storage.from("images").getPublicUrl(fileName);
          resolve(data.publicUrl);
        }
      })
      .catch((error) => {
        reject("Error uploading file");
      });
  });
}
