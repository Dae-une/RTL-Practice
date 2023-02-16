import { render, screen } from "../../../test-utils/testing-library-utils";
import OrderEntry from "../OrderEntry";
import { rest } from "msw";
import { server } from "../../../mocks/server";
import { BASE_URL } from "../../../constants/api";
import userEvent from "@testing-library/user-event";

test("스쿱 및 토핑 라우트 에러 핸들링", async () => {
  server.resetHandlers(
    rest.get(`${BASE_URL}/scoops`, (req, res, ctx) => res(ctx.status(500))),
    rest.get(`${BASE_URL}/toppings`, (req, res, ctx) => res(ctx.status(500)))
  );

  render(<OrderEntry setOrderPhase={jest.fn()} />);
  const alerts = await screen.findAllByRole("alert");

  expect(alerts).toHaveLength(2);
});

test("스쿱을 추가하지않으면 주문 버튼 비활성화", async () => {
  render(<OrderEntry setOrderPhase={jest.fn()} />);
  const user = userEvent.setup();

  const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
  const orderButton = screen.getByRole("button", { name: /order sundae/i });
  //초기에는 버튼 활성화
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "0");
  expect(orderButton).toBeDisabled();
  // 스쿱 추가하면 버튼 활성화
  await user.type(vanillaInput, "2");
  expect(orderButton).toBeEnabled();
  // 스쿱 제거하면 다시 비활성화
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "0");
  expect(orderButton).toBeDisabled();
});
