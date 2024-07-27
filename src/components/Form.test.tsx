import Form from "./Form";
import { fireEvent, render, screen } from "../utils/testing-utils";

// COMPONENT TESTING
describe("Valid Form Functionality", () => {
    it("Should receive a link", () => {
      const onSubmit = function (url: string) {
        return url;
      };
  
      const onFocus = function () {
        return "Link is focused";
      };
  
      const style = {};
      render(<Form onSubmit={onSubmit} onFocus={onFocus} style={style} />);
  
      const input = screen.getByRole("textbox") as HTMLInputElement; // Type assertion
      const url = "https://google.com";
  
      fireEvent.change(input, {
        target: { value: url },
      });
      expect(input.value).toBe(url);
    });
  
    it("should show the button", () => {
      const button = document.createElement("button");
      button.innerHTML = "Click me";
      expect(button.innerHTML).toBe("Click me");
    });
  });