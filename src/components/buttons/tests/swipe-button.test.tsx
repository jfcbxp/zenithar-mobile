import React from "react";
import renderer from "react-test-renderer";
import { SwipeButton } from "../swipe-button";

it("SwipeButton renders without crashing", () => {
    const rendered = renderer
        .create(
            <SwipeButton onComplete={() => { }} title="Test" underlayTitle="Test" />
        ).toJSON();
    expect(rendered).toBeTruthy();
});