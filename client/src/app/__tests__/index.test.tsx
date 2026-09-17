import { renderRouter, screen, fireEvent } from "expo-router/testing-library";

import { FEATURES } from "../index";

describe("Landing screen", () => {
  it("renders the hero copy and every feature card", () => {
    renderRouter("src/app", { initialUrl: "/" });

    expect(screen.getByTestId("landing-screen")).toBeTruthy();
    expect(
      screen.getByText("Never get lost on campus again."),
    ).toBeTruthy();

    for (const feature of FEATURES) {
      expect(screen.getByText(feature.title)).toBeTruthy();
    }
  });

  it("navigates to the finder screen when 'Find a Room' is pressed", () => {
    renderRouter("src/app", { initialUrl: "/" });

    fireEvent.press(screen.getByTestId("get-started-button"));

    expect(screen.getByTestId("finder-screen")).toBeTruthy();
  });
});
