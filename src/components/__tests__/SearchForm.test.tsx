import { screen } from "@testing-library/react";
import '@testing-library/jest-dom'
import renderWithContext from "../../util/test-utils";
import SearchForm from "../SearchForm";

describe("SearchForm Component", () => {
    it("renders correctly", () => {
        renderWithContext(<SearchForm />);
        const nameElement = screen.getByText("Number of results")
        expect(nameElement).toBeInTheDocument();
    })
})

