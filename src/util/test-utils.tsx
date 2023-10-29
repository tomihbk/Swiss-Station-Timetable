import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";
import { store } from "../state/store";
import { render } from "@testing-library/react";

const renderWithContext = (element: React.ReactElement) => {
    return render(
    <Provider store={store}>
        <Router>{element}</Router>
    </Provider>
    )
}

export default renderWithContext