import { screen, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import renderWithContext from "../../util/test-utils"
import SearchForm from "../SearchForm"

describe("SearchForm Component", () => {

    test("render 5 fields with 1 submit button", async () => {

        renderWithContext(<SearchForm />)

        await waitFor(() => {
            const stationInput = screen.getByLabelText("station name")
            const timeInput = screen.getByLabelText("time")
            const dateInput = screen.getByLabelText("date")
            const directionInput = screen.getByLabelText("direction")
            const resultInput = screen.getByLabelText("result quantity")
            const submitInput = screen.getByDisplayValue("Search")

            expect(stationInput).toBeInTheDocument()
            expect(timeInput).toBeInTheDocument()
            expect(dateInput).toBeInTheDocument()
            expect(directionInput).toBeInTheDocument()
            expect(resultInput).toBeInTheDocument()
            expect(submitInput).toBeInTheDocument()
        });
    })

    it("should fail if submitting without filling fields", () => {
        renderWithContext(<SearchForm />)
        const stationInput = screen.getByLabelText("station name")
        const directionInput = screen.getByLabelText("direction")
        const resultInput = screen.getByLabelText("result quantity")

        const user = userEvent.setup()

        const submitButton = screen.getByDisplayValue("Search")
        user.click(submitButton)

        expect(directionInput).toBeInvalid()
        expect(stationInput).toBeInvalid()
        expect(resultInput).toBeInvalid()
    })


    it("should pass if submitting with prefilled fields", async () => {

        renderWithContext(<SearchForm />)

        const user = userEvent.setup()

        const stationInput = screen.getByLabelText("station name")
        const directionInput = screen.getByLabelText("direction")
        const resultInput = screen.getByLabelText("result quantity")

        await user.type(stationInput, "Aadorf")
        await user.selectOptions(directionInput, "arrival")
        await user.selectOptions(resultInput, "10")

        expect(stationInput).toBeValid()
        expect(directionInput).toBeValid()
        expect(resultInput).toBeValid()
    })
})

