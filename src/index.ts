import express from "express"
import dotenv from "dotenv"
import routeruser from "./routes/users.routes"

dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

app.use("/users", routeruser)

app.listen(PORT, () => {
    console.log(`la api esta corriendo correctamente en el http://localhost:${PORT}`);
}) 