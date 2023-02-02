import React from "react";
import renderer from "react-test-renderer";
import { HomeContainer } from "../home-container";

it("HomeContainer renders without crashing", () => {
    const rendered = renderer
        .create(
            <HomeContainer title="Test" />
        ).toJSON();
    expect(rendered).toBeTruthy();
});