import React from "react";
import renderer, { act } from "react-test-renderer";
import { UserLogs } from "../../../models/user.logs.model";
import { LogsItem } from "../logs-item";

it("LogsItem renders without crashing", async () => {
  let DATA: UserLogs = {
    id: "1",
    date: "Test",
    title: "Test",
    description: "Test",
    type: "DESCONTO_ORCAMENTO",
  };

  const rendered = renderer.create(<LogsItem data={DATA} />).toJSON();

  expect(rendered).toBeTruthy();
});

it("LogsItem with DESCONTO_ORCAMENTO type", async () => {
  let DATA: UserLogs = {
    id: "1",
    date: "Test",
    title: "Test",
    description: "Test",
    type: "DESCONTO_ORCAMENTO",
  };

  const rendered = renderer.create(<LogsItem data={DATA} />);

  await act(() => rendered.update(<LogsItem data={DATA} />));

  const icon = rendered.root.findAllByProps({ testID: "icon" })[0];

  const title = rendered.root.findAllByProps({ testID: "title" })[0];

  const description = rendered.root.findAllByProps({
    testID: "description",
  })[0];

  const date = rendered.root.findAllByProps({ testID: "date" })[0];

  expect(icon.props.name).toBe("attach-money");
  expect(title.props.children).toBe("Test 1");
  expect(description.props.children).toBe("Test");
  expect(date.props.children).toBe("Test");
});

it("LogsItem with LIBERACAO_ORCAMENTO type", async () => {
  let DATA: UserLogs = {
    id: "2",
    date: "Test",
    title: "Test",
    description: "Test",
    type: "LIBERACAO_ORCAMENTO",
  };

  const rendered = renderer.create(<LogsItem data={DATA} />);

  await act(() => rendered.update(<LogsItem data={DATA} />));

  const icon = rendered.root.findAllByProps({ testID: "icon" })[0];

  expect(icon.props.name).toBe("check-box");
});
