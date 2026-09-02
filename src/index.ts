import express from "express"
import dotenv from "dotenv"
import routeruser from "./routes/users.routes"
import routerpacientes from "./routes/pacientes.routes"
import routerestado_cita from "./routes/estado_cita.routes"
import routerespecialidad from "./routes/especialidades.routes"
import routercitas from "./routes/citas.routes"


dotenv.config()

const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json())

app.use("/users", routeruser)
app.use("/pacientes", routerpacientes)
app.use("/estadocita", routerestado_cita)
app.use("especialidad", routerespecialidad)
app.use("/citas", routercitas)


app.listen(PORT, () => {
    console.log(`la api esta corriendo correctamente en el http://localhost:${PORT}`);
}) 