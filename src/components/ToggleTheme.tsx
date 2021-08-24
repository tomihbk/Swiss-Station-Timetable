import { useDarkMode } from '../hook/useDarkMode'
import { ReactComponent as Moon } from '../images/moon.svg'
import { ReactComponent as Sun }  from '../images/sun.svg'

const ToggleTheme = (): React.ReactElement => {
    const [colorTheme,setTheme] = useDarkMode()
    return (
        <div onClick={ ()=> setTheme(colorTheme)}>
            { colorTheme !== 'light' ? 
            <Moon className="stroke-current text-black dark:text-white w-12 m-2" /> :
            <Sun className="fill-current text-black dark:text-white w-12 m-2"/>
            }
        </div>
    )
}

export default ToggleTheme
