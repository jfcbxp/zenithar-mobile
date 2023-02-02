import renderer from "react-test-renderer";
import Routes from "..";

it("Routes renders without crashing", () => {
    const rendered = renderer.create(
        <Routes />
    ).toJSON()
    expect(rendered).toBeTruthy()
})