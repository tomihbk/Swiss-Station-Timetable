import { ReactComponent as Home } from '../images/home.svg'
import { useHistory } from 'react-router'

const HomeButton = (): React.ReactElement => {
    const history = useHistory();

    const goHomePage = () => {
        history.push("/")
    }
    return (
        <div onClick={goHomePage} className="fixed rounded-full bg-blue-900 dark:bg-blue-200 p-1 w-8 md:p-2 md:w-10 lg:w-12 m-3 inline-block hover:cursor-pointer left-0 top-0" style={{ zIndex: 999 }}>
            <Home className="stroke-current text-blue-200 w-auto dark:text-blue-700" />
        </div>
    )
}

export default HomeButton
