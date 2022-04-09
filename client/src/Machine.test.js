import { render, screen } from "@testing-library/react";
import Machine from "./Machine";

test("renders learn react link", () => {
  render(<Machine />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
