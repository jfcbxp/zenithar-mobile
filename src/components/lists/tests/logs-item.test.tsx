import React from "react";
import renderer from "react-test-renderer";
import { UserLogs } from "../../../models/user.logs.model";
import { LogsItem } from "../logs-item";

it("LogsItem renders without crashing", () => {
    const DATA: UserLogs = {
        id: "1",
        date: "Test",
        title: "Test",
        description: "Test",
        type: "Test"
    }
    const rendered = renderer.create(
        <LogsItem data={DATA} />
    ).toJSON();
    expect(rendered).toBeTruthy();
});