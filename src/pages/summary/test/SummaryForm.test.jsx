import { render, screen } from "@testing-library/react";
import SummaryForm from "../SummaryForm";
import userEvent from "@testing-library/user-event";

test("Initial Conditions", () => {
  render(<SummaryForm />);
  const checkbox = screen.getByRole("checkbox", { name: /terms and conditions/i });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });
  expect(checkbox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
});

test("체크박스가 활성화일 때만, 버튼이 활성화 된다", async () => {
  render(<SummaryForm />);
  const user = userEvent.setup();
  const checkbox = screen.getByRole("checkbox", { name: /terms and conditions/i });
  const confirmButton = screen.getByRole("button", { name: /confirm order/i });

  await user.click(checkbox);
  expect(checkbox).toBeChecked();
  expect(confirmButton).toBeEnabled();

  await user.click(checkbox);
  expect(checkbox).not.toBeChecked();
  expect(confirmButton).toBeDisabled();
});

test("마우스를 올리면 호버가 된다", async () => {
  const user = userEvent.setup();
  render(<SummaryForm />);
  //호버 전에는 안보이기
  const nullPopover = screen.queryByText(/no ice cream will actually be delivered/i);
  expect(nullPopover).not.toBeInTheDocument();
  //호버 중에는 보이기
  const TOC = screen.getByText(/terms and conditions/i);
  await user.hover(TOC);
  const popover = screen.getByText(/no ice cream will actually be delivered/i);
  expect(popover).toBeInTheDocument();
  //호버 끝나면 사라지기
  await user.unhover(TOC);
  expect(popover).not.toBeInTheDocument();
});
