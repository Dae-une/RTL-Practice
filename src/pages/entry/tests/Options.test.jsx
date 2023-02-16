import userEvent from "@testing-library/user-event";
import { render, screen } from "../../../test-utils/testing-library-utils";
import Options from "../Options";

test("서버로부터 받아온 스쿱 옵션의 이미지가 보여져야 한다.", async () => {
  render(<Options optionType="scoops" />);

  // find images
  const scoopImages = await screen.findAllByRole("img", { name: /scoop$/i });
  expect(scoopImages).toHaveLength(2);

  // confirm alt text of images
  const altText = scoopImages.map((ele) => ele.alt);
  expect(altText).toEqual(["Chocolate scoop", "Vanilla scoop"]);
});

test("서버로부터 받아온 토핑 옵션의 이미지가 보여져야 한다.", async () => {
  render(<Options optionType="toppings" />);

  const toppingImages = await screen.findAllByRole("img", { name: /topping$/i });
  expect(toppingImages).toHaveLength(3);

  const altText = toppingImages.map((ele) => ele.alt);
  expect(altText).toEqual(["Cherries topping", "M&Ms topping", "Hot fudge topping"]);
});

test("스쿱에 유효하지 않은 값이 들어올 경우, 경고를 보여준다", async () => {
  render(<Options optionType="scoops" />);
  const user = userEvent.setup();

  const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");
  expect(vanillaInput).toHaveClass("is-invalid");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2.5");
  expect(vanillaInput).toHaveClass("is-invalid");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "2");
  expect(vanillaInput).not.toHaveClass("is-invalid");
});

test("스쿱에 유효하지 않은 값이 들어올 경우, 스쿱의 값이 계산되지 않는다", async () => {
  render(<Options optionType="scoops" />);
  const user = userEvent.setup();

  const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
  const scoopsTotal = screen.getByText(/scoops total: \$/i);
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "-1");

  expect(scoopsTotal).toHaveTextContent("0.00");

  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1.5");

  expect(scoopsTotal).toHaveTextContent("0.00");
});
