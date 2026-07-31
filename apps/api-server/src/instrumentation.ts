import { initOtelForGcp } from "@cirruscrmio/opentelemetry";

await initOtelForGcp({
  gcpProjectId: process.env.GCP_PROJECT_ID!,
  serviceName: "cirrus-service-template-api-server",
});
