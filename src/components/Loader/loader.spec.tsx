import { render } from "@testing-library/react";
import { Loader } from ".";

describe("Loader Component", () => {
  it("should not render Loader component when isLoading is true", () => {
    const wrapper = render(<Loader isLoading={true} />);

    const container = wrapper.getByTestId("overlay");

    expect(container).toBeInTheDocument();
  });
});
