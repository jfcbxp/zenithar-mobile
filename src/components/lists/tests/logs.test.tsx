import React from "react";
import renderer from "react-test-renderer";
import { Logs } from "../logs";

it("Logs renders without crashing", () => {
    const rendered = renderer
        .create(
            <Logs />
        ).toJSON();
    expect(rendered).toBeTruthy();
});