import { screen } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import renderWithContext from "../../util/test-utils"
import SearchForm, { getAllStations } from "../SearchForm"

describe("SearchForm Component", () => {

    test("render 5 fields with 1 submit button", () => {
        renderWithContext(<SearchForm />)

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
    })

    it("should fail if submitting without filling fields", () => {
        renderWithContext(<SearchForm />)
        const stationInput = screen.getByLabelText("station name")
        const directionInput = screen.getByLabelText("direction")
        const resultInput = screen.getByLabelText("result quantity")

        const user = userEvent.setup()

        const submitInput = screen.getByDisplayValue("Search")
        user.click(submitInput)

        expect(directionInput).toBeInvalid()
        expect(stationInput).toBeInvalid()
        expect(resultInput).toBeInvalid()
    })

    test('fetch API should be running', async () => {
        renderWithContext(<SearchForm />)
        
    })

    it("should pass if submitting with filling fields", async () => {
        renderWithContext(<SearchForm />)
        const user = userEvent.setup()

        const stationInput = screen.getByLabelText("station name")
        const directionInput = screen.getByLabelText("direction")
        const resultInput = screen.getByLabelText("result quantity")


        await user.type(stationInput, "Bulle")
        await user.selectOptions(directionInput, "arrival")
        await user.selectOptions(resultInput, "10")

        const submitInput = screen.getByDisplayValue("Search")
        user.click(submitInput)

        expect(directionInput).toBeValid()
        expect(stationInput).toBeValid()
        expect(resultInput).toBeValid()
    })
})

