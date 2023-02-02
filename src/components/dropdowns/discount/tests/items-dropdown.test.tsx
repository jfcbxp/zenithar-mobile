import React from "react";
import renderer from "react-test-renderer";
import { ItemsDropdown } from "../items-dropdown";

it("ItemsDropdown renders without crashing", () => {
    const rendered = renderer
        .create(
            <ItemsDropdown />
        ).toJSON();
    expect(rendered).toBeTruthy();
});