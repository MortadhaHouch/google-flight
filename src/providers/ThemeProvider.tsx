import React, { createContext, Dispatch, SetStateAction, useState } from "react"

interface Theme{
    isDark: boolean
    setIsDark:Dispatch<SetStateAction<boolean>>
}
const theme = {
    isDark: false,
    setIsDark: () => {}
}
const ThemeContext = createContext<Theme>(theme)
export function ThemeContextProvider({children}:{children:React.ReactNode}){
    const [isDark, setIsDark] = useState(theme.isDark)
    return(
        <ThemeContext.Provider value={{isDark, setIsDark}}>
            {children}
        </ThemeContext.Provider>
    )
}
export {ThemeContext}