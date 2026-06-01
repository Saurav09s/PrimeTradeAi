import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Task Management API",
      version: "1.0.0",
      description:
        "Backend Developer Internship Assignment"
    },
    servers: [
      {
        url: "http://localhost:5000/api/v1"
      }
    ]
  },
  apis: ["./src/routes/*.js"]
};

const specs = swaggerJsdoc(options);

export default specs;