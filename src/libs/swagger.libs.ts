import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    title: "API de Clinica",
    description: "Documentación automática generada para el bootcamp",
    version: "1.0.0",
  },
  host: "Localhost:3000",
  schemes: ["http"],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
  },
};
const outputFile = "swagger-output.json";
const endpointFiles = ["./src/index.ts"];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointFiles, doc).then(
  async () => {
    await import("../index.js");
  },
);
