import React from "react";
import renderer from "react-test-renderer";
import { CommandLink } from "../command-link";

it("CommandLink renders without crashing", () => {
    const rendered = renderer
        .create(
            <CommandLink title="Test" />
        ).toJSON();
    expect(rendered).toBeTruthy();
});