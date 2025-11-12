import { useState } from "react";
import { createContext } from "react";
import { useEffect } from "react";

export const LoginContext = createContext();

export default function LoginProvider({children}){
    const[ user, setUser]= useState(null)
    
    //로그인 함수
    const login = (userinput)=>{
        setUser(userinput)
    };

    //로그아웃
    const logout =()=>{
        setUser(null);
        alert('로그아웃 되었습니다.')
    }


    //각 프로필 마다 값 주기
    const [user1,setUser1]=useState(false)
    const [user2,setUser2]=useState(false)
    const [user3,setUser3]=useState(false)
    //해당 프로필 로그인 시 해당 user값 set으로 true값 주고
    //나중에 찜 목록이나 그런거 보여줄때는
    useEffect(() => {
    const savedUser1 = localStorage.getItem("user1") === "true";
    const savedUser2 = localStorage.getItem("user2") === "true";
    const savedUser3 = localStorage.getItem("user3") === "true";

    setUser1(savedUser1);
    setUser2(savedUser2);
    setUser3(savedUser3);
    }, []);

    useEffect(() => {
    localStorage.setItem("user1", user1);
    localStorage.setItem("user2", user2);
    localStorage.setItem("user3", user3);
    }, [user1, user2, user3]);

    const user1click =()=>{
        setUser1(true);
        setUser2(false)
        setUser3(false)
    }
    const user2click =()=>{
        setUser1(false);
        setUser2(true)
        setUser3(false)
    }
    const user3click =()=>{
        setUser1(false);
        setUser2(false)
        setUser3(true)
    }



    return(
        <LoginContext.Provider value={{login,logout,user1click,user2click,user3click,user1,user2,user3}}>
            {children}
        </LoginContext.Provider>
    )
}