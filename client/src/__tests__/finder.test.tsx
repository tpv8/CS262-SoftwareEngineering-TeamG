// `renderRouter` boots the real expo-router route tree (from src/app) instead
// of rendering the Finder component in isolation, so these tests exercise
// actual navigation the same way a user would trigger it.
import { renderRouter, screen, fireEvent } from "expo-router/testing-library";

import { LOCATIONS, POINTS_OF_INTEREST } from "../app/finder";

describe("Finder screen", () => {
  it("shows the first mocked location selected by default", () => {
    // Jump straight to "/finder" so this test doesn't depend on the landing
    // screen's navigation working correctly.
    renderRouter("src/app", { initialUrl: "/finder" });

    expect(screen.getByTestId("finder-screen")).toBeTruthy();
    expect(screen.getByTestId("result-card")).toBeTruthy();
    // LOCATIONS[0] is the initial `selected` state, so its name should
    // appear both in the dropdown trigger and the result card.
    expect(screen.getAllByText(LOCATIONS[0].name).length).toBeGreaterThan(0);
  });

  it("renders every hard-coded point of interest", () => {
    renderRouter("src/app", { initialUrl: "/finder" });

    // Guards against someone adding/removing a POI in the mock data without
    // updating the horizontal checklist that displays it.
    for (const poi of POINTS_OF_INTEREST) {
      expect(screen.getByTestId(`poi-${poi}`)).toBeTruthy();
    }
  });

  it("toggles a point of interest checkbox on press", () => {
    renderRouter("src/app", { initialUrl: "/finder" });

    const restrooms = screen.getByTestId("poi-Restrooms");
    // No checkbox starts checked, so no checkmark glyph should exist yet.
    expect(screen.queryByText("✓", { includeHiddenElements: true })).toBeNull();

    // Pressing once checks it...
    fireEvent.press(restrooms);
    expect(screen.getByText("✓")).toBeTruthy();

    // ...and pressing again unchecks it (the toggle is a Set add/remove).
    fireEvent.press(restrooms);
    expect(screen.queryByText("✓")).toBeNull();
  });

  it("opens the dropdown and selects a different location", () => {
    renderRouter("src/app", { initialUrl: "/finder" });

    // Open the location dropdown.
    fireEvent.press(screen.getByTestId("location-dropdown-trigger"));
    expect(screen.getByTestId("location-dropdown-list")).toBeTruthy();

    // Pick a location other than the default (index 0) to confirm selection
    // actually changes state rather than always matching by coincidence.
    const target = LOCATIONS[3];
    fireEvent.press(screen.getByTestId(`location-option-${target.name}`));

    // Choosing an option closes the dropdown and updates the selection.
    expect(screen.queryByTestId("location-dropdown-list")).toBeNull();
    expect(screen.getAllByText(target.name).length).toBeGreaterThan(0);
  });

  it("navigates back to the landing screen", () => {
    renderRouter("src/app", { initialUrl: "/" });

    // Go landing -> finder first, then verify the back button reverses it.
    fireEvent.press(screen.getByTestId("get-started-button"));
    expect(screen.getByTestId("finder-screen")).toBeTruthy();

    fireEvent.press(screen.getByTestId("back-button"));
    expect(screen.getByTestId("landing-screen")).toBeTruthy();
  });
});
