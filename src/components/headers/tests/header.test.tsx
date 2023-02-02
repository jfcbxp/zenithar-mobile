import React from "react";
import renderer from "react-test-renderer";
import { Header } from "../header";

it("Header renders without crashing", () => {
    const rendered = renderer
        .create(
            <Header returnOption={false} />
        ).toJSON();
    expect(rendered).toBeTruthy();
});