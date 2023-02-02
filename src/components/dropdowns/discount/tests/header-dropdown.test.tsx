import renderer from "react-test-renderer";
import { HeaderDropdown } from "../header-dropdown";

it("HeaderDropdown renders without crashing", () => {
    const rendered = renderer.create(
        <HeaderDropdown />
    ).toJSON();
    expect(rendered).toBeTruthy();
});

