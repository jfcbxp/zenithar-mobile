import React from "react";
import renderer from "react-test-renderer";
import { Button } from "../button";

it("Button renders without crashing", () => {
    const rendered = renderer
        .create(
            <Button title="Test"/>
        ).toJSON();
    expect(rendered).toBeTruthy();
});