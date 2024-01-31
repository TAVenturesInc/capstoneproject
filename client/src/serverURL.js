export default function serverURL() {
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:5000";
  } else {
    return "https://taventuresinc-backend.onrender.com/";
  }
}
