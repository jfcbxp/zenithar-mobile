import React from "react";
import renderer from "react-test-renderer";
import { Divider } from "../divider";

it("Divider renders without crashing", () => {
    const rendered = renderer
        .create(
            <Divider />
        ).toJSON();
    expect(rendered).toBeTruthy();
});