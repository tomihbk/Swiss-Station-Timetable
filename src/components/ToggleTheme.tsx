import { useDarkMode } from '../hook/useDarkMode'
import { ReactComponent as Moon } from '../images/moon.svg'
import { ReactComponent as Sun }  from '../images/sun.svg'

const ToggleTheme = (): React.ReactElement => {
    const [colorTheme,setTheme] = useDarkMode()
    return (
        <div onClick={ ()=> setTheme(colorTheme)} className="rounded-full bg-blue-900  dark:bg-blue-200 p-3 w-12 m-2 inline-block hover:cursor-pointer">
            { colorTheme !== 'light' ? 
            <Moon className="stroke-current text-blue-200 w-auto" /> :
            <Sun className="fill-current dark:text-blue-700 w-auto"/>
            }
        </div>
    )
}

export default ToggleTheme
