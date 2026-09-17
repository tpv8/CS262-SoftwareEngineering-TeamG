import { renderRouter, screen, fireEvent } from "expo-router/testing-library";

import { LOCATIONS, POINTS_OF_INTEREST } from "../finder";

describe("Finder screen", () => {
  it("shows the first mocked location selected by default", () => {
    renderRouter("src/app", { initialUrl: "/finder" });

    expect(screen.getByTestId("finder-screen")).toBeTruthy();
    expect(screen.getByTestId("result-card")).toBeTruthy();
    expect(screen.getAllByText(LOCATIONS[0].name).length).toBeGreaterThan(0);
  });

  it("renders every hard-coded point of interest", () => {
    renderRouter("src/app", { initialUrl: "/finder" });

    for (const poi of POINTS_OF_INTEREST) {
      expect(screen.getByTestId(`poi-${poi}`)).toBeTruthy();
    }
  });

  it("toggles a point of interest checkbox on press", () => {
    renderRouter("src/app", { initialUrl: "/finder" });

    const restrooms = screen.getByTestId("poi-Restrooms");
    expect(screen.queryByText("✓", { includeHiddenElements: true })).toBeNull();

    fireEvent.press(restrooms);
    expect(screen.getByText("✓")).toBeTruthy();

    fireEvent.press(restrooms);
    expect(screen.queryByText("✓")).toBeNull();
  });

  it("opens the dropdown and selects a different location", () => {
    renderRouter("src/app", { initialUrl: "/finder" });

    fireEvent.press(screen.getByTestId("location-dropdown-trigger"));
    expect(screen.getByTestId("location-dropdown-list")).toBeTruthy();

    const target = LOCATIONS[3];
    fireEvent.press(screen.getByTestId(`location-option-${target.name}`));

    expect(screen.queryByTestId("location-dropdown-list")).toBeNull();
    expect(screen.getAllByText(target.name).length).toBeGreaterThan(0);
  });

  it("navigates back to the landing screen", () => {
    renderRouter("src/app", { initialUrl: "/" });

    fireEvent.press(screen.getByTestId("get-started-button"));
    expect(screen.getByTestId("finder-screen")).toBeTruthy();

    fireEvent.press(screen.getByTestId("back-button"));
    expect(screen.getByTestId("landing-screen")).toBeTruthy();
  });
});
