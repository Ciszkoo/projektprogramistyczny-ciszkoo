import cors from "cors";

const allowedOrigins = ["http://localhost:3000"];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  methods: ["POST", "GET", "PUT", "DELETE", "PATCH"],
  credentials: true,
};

export default cors(corsOptions);
