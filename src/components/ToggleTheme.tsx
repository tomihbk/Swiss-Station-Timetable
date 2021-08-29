import { useDarkMode } from '../hook/useDarkMode'
import { ReactComponent as Moon } from '../images/moon.svg'
import { ReactComponent as Sun } from '../images/sun.svg'

const ToggleTheme = (): React.ReactElement => {
    const [colorTheme, setTheme] = useDarkMode()
    return (
        <div onClick={() => setTheme(colorTheme)} className="absolute z-30 rounded-full bg-blue-900 dark:bg-blue-200 p-1 w-8 md:p-2 md:w-10 lg:w-12 m-3 inline-block hover:cursor-pointer right-0 top-0">
            {colorTheme !== 'light' ?
                <Moon className="stroke-current text-blue-200 w-auto" /> :
                <Sun className="fill-current dark:text-blue-700 w-auto" />
            }
        </div>
    )
}

export default ToggleTheme
