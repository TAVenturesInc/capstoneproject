export default function appURL() {
    if (process.env.NODE_ENV === "development") {
      return "http://localhost:3000";
    } else {
      return "https://taventures.onrender.com";
    }
  }
