import { render, screen } from "@testing-library/react";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import { BASE_URL } from "../../../constants/api";

test("스쿱 및 토핑 라우트 에러 핸들링", async () => {
  server.resetHandlers(
    rest.get(`${BASE_URL}/scoops`, (req, res, ctx) => res(ctx.status(500))),
    rest.get(`${BASE_URL}/toppings`, (req, res, ctx) => res(ctx.status(500)))
  );

  render(<OrderEntry />);
  const alerts = await screen.findAllByRole("alert");

  expect(alerts).toHaveLength(2);
});
