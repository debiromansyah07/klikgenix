import { builder } from "@netlify/functions";
import { handleCreatePayment } from "../../server/routes/payment";

export const handler = builder(async (event) => {
  const req = {
    body: JSON.parse(event.body || "{}"),
    method: event.httpMethod,
    headers: event.headers,
  } as any;

  const res = {
    status: (code: number) => ({
      json: (data: any) => ({
        statusCode: code,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
  } as any;

  return handleCreatePayment(req, res);
});
