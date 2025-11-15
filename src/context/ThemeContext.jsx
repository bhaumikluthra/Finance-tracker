import React,{createContext,useState,useEffect, use} from 'react';

//theme ka context bna dia abh harr jaghah yahi theme use kr skta hoon
export const ThemeContext=createContext();

export function ThemeProvider({children}){


    //local storage m theme store krre hain
    const[theme,setTheme]=useState(()=>{
        try{
            return localStorage.getItem("ft_theme")||"light";
        }catch{
            return "light";
        }
    });

    //using use effect when theme changes
    useEffect(()=>{
        document.documentElement.setAttribute("data-theme",theme);
        try{
            localStorage.setItem("ft_theme",theme);}catch{}
    },[theme]);


    //theme toggle krne k liye function
    const toggleTheme=()=>setTheme(t=>(t==="light"?"dark":"light"));
    
    return(
        <ThemeContext.Provider value={{theme,toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    );
}