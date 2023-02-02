import React from "react";
import renderer from "react-test-renderer";
import { EmailInput } from "../email-input";

it("EmailInput renders without crashing", () => {
    const rendered = renderer
        .create(
            <EmailInput />
        ).toJSON();
    expect(rendered).toBeTruthy();
});