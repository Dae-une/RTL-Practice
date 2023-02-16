import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "../App";

test("order phases for happy path", async () => {
  //앱 렌더링
  render(<App />);
  const user = userEvent.setup();

  // 아이스크림,토핑 추가
  const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  const chocolateInput = screen.getByRole("spinbutton", { name: "Chocolate" });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  const cherriesCheckbox = await screen.findByRole("checkbox", { name: "Cherries" });
  await user.click(cherriesCheckbox);
  // 주문입력 버튼 클릭
  const orderButton = screen.getByRole("button", { name: /order sundae/i });
  await user.click(orderButton);
  // 주문내용 확인
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $6.00" });
  expect(scoopsHeading).toBeInTheDocument();
  const toppingHeading = screen.getByRole("heading", { name: "Toppings: $1.50" });
  expect(toppingHeading).toBeInTheDocument();

  expect(screen.getByText("1 Vanilla")).toBeInTheDocument();
  expect(screen.getByText("2 Chocolate")).toBeInTheDocument();
  expect(screen.getByText("Cherries")).toBeInTheDocument();

  //이용약관 확인 및 확인 버튼 클릭
  const tcCheckBox = screen.getByRole("checkbox", { name: /terms and conditions/i });
  await user.click(tcCheckBox);

  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  await user.click(confirmButton);
  // 확인페이지에서 데이터를 불러오기 전 로딩 페이지
  const loading = screen.getByText(/loading/i);
  expect(loading).toBeInTheDocument();

  // 확인페이지에서 주문번호 확인
  const thankyouHeading = await screen.findByRole("heading", { name: "Thank You!" });
  expect(thankyouHeading).toBeInTheDocument();

  // 로딩페이지 사라짐
  const notLoading = screen.queryByText(/loading/i);
  expect(notLoading).not.toBeInTheDocument();

  const orderNumber = await screen.findByText(/order number/i);
  expect(orderNumber).toBeInTheDocument();
  //새 주문 버튼 클릭
  const newOrderButton = screen.getByRole("button", { name: /new order/i });
  await user.click(newOrderButton);
  //아이스크림과 토핑 소계 가 초기화 되었는지 확인
  const scoopTotal = await screen.findByText("Scoops total: $0.00");
  const toppingsTotal = screen.getByText("Toppings total: $0.00");
  expect(scoopTotal).toBeInTheDocument();
  expect(toppingsTotal).toBeInTheDocument();

  await screen.findByRole("spinbutton", { name: "Vanilla" });
  await screen.findByRole("checkbox", { name: "Cherries" });
});

test("토핑을 추가 하지않으면, summary에서 토핑 정보가 없어야 한다.", async () => {
  render(<App />);
  const user = userEvent.setup();

  const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2");

  const orderButton = screen.getByRole("button", { name: /order sundae/i });
  await user.click(orderButton);

  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $4.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.queryByRole("heading", { name: /toppings/i });
  expect(toppingsHeading).not.toBeInTheDocument();
});

test("토핑이 추가 되었다가 삭제 되었을때 토핑정보가 없어야 한다.", async () => {
  render(<App />);
  const user = userEvent.setup();

  const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2");

  //토핑 추가
  const cherriesCheckbox = await screen.findByRole("checkbox", { name: "Cherries" });
  await user.click(cherriesCheckbox);
  expect(cherriesCheckbox).toBeChecked();
  const toppingsTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsTotal).toHaveTextContent("1.50");

  //토핑제거
  await user.click(cherriesCheckbox);
  expect(cherriesCheckbox).not.toBeChecked();
  expect(toppingsTotal).toHaveTextContent("0.00");

  //주문하기
  const orderButton = screen.getByRole("button", { name: /order sundae/i });
  await user.click(orderButton);

  //주문 확인에 토핑만 없어야함
  const summaryHeading = screen.getByRole("heading", { name: "Order Summary" });
  expect(summaryHeading).toBeInTheDocument();

  const scoopsHeading = screen.getByRole("heading", { name: "Scoops: $4.00" });
  expect(scoopsHeading).toBeInTheDocument();

  const toppingsHeading = screen.queryByRole("heading", { name: /toppings/i });
  expect(toppingsHeading).not.toBeInTheDocument();
});
