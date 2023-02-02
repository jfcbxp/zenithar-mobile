import React from "react";
import renderer from "react-test-renderer";
import { Portrait } from "../portrait";

it("Portrait renders without crashing", () => {
    const rendered = renderer
        .create(
            <Portrait onPress={() => { }} />
        ).toJSON();
    expect(rendered).toBeTruthy();
});