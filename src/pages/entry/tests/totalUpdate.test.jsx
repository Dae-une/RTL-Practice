import { render, screen } from "../../../test-utils/testing-library-utils";
import userEvent from "@testing-library/user-event";
import Options from "../Options";
import OrderEntry from "../OrderEntry";

test("update scoop subtotal when scoops change", async () => {
  render(<Options optionType="scoops" />);
  const user = userEvent.setup();
  const scoopsSubtotal = screen.getByText("Scoops total: $", { exact: false });
  expect(scoopsSubtotal).toHaveTextContent("0.00");

  const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
  await user.clear(vanillaInput);
  await user.type(vanillaInput, "1");

  expect(scoopsSubtotal).toHaveTextContent("2.00");

  const chocolateInput = await screen.findByRole("spinbutton", { name: "Chocolate" });
  await user.clear(chocolateInput);
  await user.type(chocolateInput, "2");

  expect(scoopsSubtotal).toHaveTextContent("6.00");
});

test("update toppings subtotal when topping change", async () => {
  render(<Options optionType="toppings" />);
  const user = userEvent.setup();
  const toppingsSubTotal = screen.getByText("Toppings total: $", { exact: false });
  expect(toppingsSubTotal).toHaveTextContent("0.00");

  const cherriesInput = await screen.findByRole("checkbox", { name: "Cherries" });
  await user.click(cherriesInput);

  expect(toppingsSubTotal).toHaveTextContent("1.50");

  const MandMsInput = screen.getByRole("checkbox", { name: "M&Ms" });
  await user.click(MandMsInput);
  expect(toppingsSubTotal).toHaveTextContent("3.00");

  await user.click(MandMsInput);
  expect(toppingsSubTotal).toHaveTextContent("1.50");
});

describe("grand total", () => {
  const user = userEvent.setup();

  test("grand total updates if scoop is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /grand total: \$/i });
    expect(grandTotal).toHaveTextContent("0.00");
    const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "2");

    expect(grandTotal).toHaveTextContent("4.00");
    const cherriesCheckbox = await screen.findByRole("checkbox", { name: "Cherries" });
    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("5.50");
  });
  test("grand total updates if topping is added first", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /grand total: \$/i });
    const cherriesCheckbox = await screen.findByRole("checkbox", { name: "Cherries" });
    const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });

    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("1.50");
    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");

    expect(grandTotal).toHaveTextContent("3.50");
  });

  test("grand total updates if item is removed", async () => {
    render(<OrderEntry />);
    const grandTotal = screen.getByRole("heading", { name: /grand total: \$/i });
    const cherriesCheckbox = await screen.findByRole("checkbox", { name: "Cherries" });
    const vanillaInput = await screen.findByRole("spinbutton", { name: "Vanilla" });

    await user.clear(vanillaInput);
    await user.click(cherriesCheckbox);
    await user.type(vanillaInput, "2");

    await user.clear(vanillaInput);
    await user.type(vanillaInput, "1");
    expect(grandTotal).toHaveTextContent("3.50");

    await user.click(cherriesCheckbox);
    expect(grandTotal).toHaveTextContent("2.00");
  });
});
