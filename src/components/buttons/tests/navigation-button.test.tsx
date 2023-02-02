import React from "react";
import renderer from "react-test-renderer";
import { NavigationButton } from "../navigation-button";

it("NavigationButton renders without crashing", () => {
    const rendered = renderer
        .create(
            <NavigationButton icon="check-box" title="Test"/>
        ).toJSON();
    expect(rendered).toBeTruthy();
});