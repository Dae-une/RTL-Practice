import { rest } from "msw";
import { BASE_URL } from "../constants/api";

export const handler = [
  rest.get(`${BASE_URL}/scoops`, (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Chocolate", imagePath: "/images/chocolate.png" },
        { name: "Vanilla", imagePath: "/images/vanilla.png" },
      ])
    );
  }),

  rest.get(`${BASE_URL}/toppings`, (req, res, ctx) => {
    return res(
      ctx.json([
        { name: "Cherries", imagePath: "/images/cherries.png" },
        { name: "M&Ms", imagePath: "/images/m-and-ms.png" },
        { name: "Hot fudge", imagePath: "/images/hot-fudge.png" },
      ])
    );
  }),

  rest.post(`${BASE_URL}/order`, (req, res, ctx) => {
    return res(ctx.json({ orderNumber: 1234 }));
  }),
];
