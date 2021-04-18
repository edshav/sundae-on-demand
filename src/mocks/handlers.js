import { rest } from "msw";
import { baseUrl } from "api/localApi";

export const handlers = [
  rest.get(`${baseUrl}/scoops`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { name: "Chocolate", imagePath: "/images/chocolate.png" },
        { name: "Vanilla", imagePath: "/images/vanilla.png" },
      ])
    );
  }),

  rest.get(`${baseUrl}/toppings`, (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { name: "Cherries", imagePath: "/images/cherries.png" },
        { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
        { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
      ])
    );
  }),

  rest.post(`${baseUrl}/order`, (req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ orderNumber: 1234567890 }));
  }),
];
