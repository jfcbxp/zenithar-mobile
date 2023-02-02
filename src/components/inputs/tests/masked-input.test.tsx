import React from "react";
import renderer from "react-test-renderer";
import { MaskedInput } from "../masked-input";

it("MaskedInput renders without crashing", () => {
    const rendered = renderer
        .create(
            <MaskedInput type="only-numbers" />
        ).toJSON();
    expect(rendered).toBeTruthy();
});