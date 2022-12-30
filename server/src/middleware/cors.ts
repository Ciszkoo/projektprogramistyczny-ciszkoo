import cors from "cors";

const allowedOrigins = ['http://localhost:3000']

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins
}

export default cors(corsOptions);