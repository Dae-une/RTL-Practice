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
