import renderer from "react-test-renderer";
import { PaymentMethodDropdown } from "../payment-method-dropdown";

it("PaymentMethodDropdown renders without crashing", () => {
    const rendered = renderer
        .create(
            <PaymentMethodDropdown />
        ).toJSON();
    expect(rendered).toBeTruthy();
});