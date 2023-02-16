import { rest } from "msw";
import { BASE_URL } from "../../../constants/api";
import { server } from "../../../mocks/server";
import { render, screen } from "../../../test-utils/testing-library-utils";
import OrderConfirmation from "../orderConfirmation";

test("주문확인 에러 처리", async () => {
  server.resetHandlers(rest.post(`${BASE_URL}/order`, (req, res, ctx) => res(ctx.status(500))));
  render(<OrderConfirmation setOrderPhase={jest.fn()} />);
  const alerts = await screen.findByRole("alert");

  expect(alerts).toBeInTheDocument(1);
});
