
import { createContext } from "react";
import { useEffect } from "react";
import { useState } from "react";

export const WishContext = createContext();

export default function WishProvider({children}){

    //빈배열 user1 
    const [wishMovies1,setWishMovies1]=useState(()=>{
        const saving = localStorage.getItem('wishMovie1')
        return saving? JSON.parse(saving) : []
    });
    useEffect(()=>{
        localStorage.setItem('wishMovie1',JSON.stringify(wishMovies1))
    },[wishMovies1])

    
    //빈배열 user2
    const [wishMovies2,setWishMovies2]=useState(()=>{
        const saving = localStorage.getItem('wishMovie2')
        return saving? JSON.parse(saving) : []
    });
    useEffect(()=>{
        localStorage.setItem('wishMovie2',JSON.stringify(wishMovies2))
    },[wishMovies2])


    //빈배열 user3
    const [wishMovies3,setWishMovies3]=useState(()=>{
        const saving = localStorage.getItem('wishMovie3')
        return saving? JSON.parse(saving) : []
    });
    useEffect(()=>{
        localStorage.setItem('wishMovie3',JSON.stringify(wishMovies3))
    },[wishMovies3])



    //찜목록 추가하는함수
    const addwish1 = (mov)=>{
        //찾으려는거 ( 빈배열에 있는 아이템의 id랑 내가 선택한 항목의 id가 같은거)
        const wishFind = wishMovies1.find((item)=>item.id === mov.id)
        let wishCopy =[...wishMovies1]
        //만약에 내가 선택한 항목이 배열에 없다면 push 하기
        if(wishFind === undefined){
            wishCopy.push(mov)
        }
        setWishMovies1(wishCopy)
    }
    const addwish2 = (mov)=>{
        //찾으려는거 ( 빈배열에 있는 아이템의 id랑 내가 선택한 항목의 id가 같은거)
        const wishFind = wishMovies2.find((item)=>item.id === mov.id)
        let wishCopy =[...wishMovies2]
        //만약에 내가 선택한 항목이 배열에 없다면 push 하기
        if(wishFind === undefined){
            wishCopy.push(mov)
        }
        setWishMovies2(wishCopy)
    }
    const addwish3 = (mov)=>{
        //찾으려는거 ( 빈배열에 있는 아이템의 id랑 내가 선택한 항목의 id가 같은거)
        const wishFind = wishMovies3.find((item)=>item.id === mov.id)
        let wishCopy =[...wishMovies3]
        //만약에 내가 선택한 항목이 배열에 없다면 push 하기
        if(wishFind === undefined){
            wishCopy.push(mov)
        }
        setWishMovies3(wishCopy)
    }

    //찜목록 삭제하는 함수 user1
    const removewish1 = (id)=>{
        setWishMovies1(wishMovies1.filter((item)=>item.id !== id))
    }
    //찜목록 삭제하는 함수 user2
    const removewish2 = (id)=>{
        setWishMovies2(wishMovies2.filter((item)=>item.id !== id))
    }
    //찜목록 삭제하는 함수 user3
    const removewish3 = (id)=>{
        setWishMovies3(wishMovies3.filter((item)=>item.id !== id))
    }

    // 찜 목록이 이미 있는지 보는 함수
    const isinwish1 = (id)=>{
        const findWish = wishMovies1.find((item)=>item.id === id)
        if(findWish === undefined){
            return false;
            //(아직 없으면)안찾아지면 false
            //(이미 존재하면)찾아지면 true
        }else{
            return true;
        }}

    // 찜 목록이 이미 있는지 보는 함수
    const isinwish2 = (id)=>{
        const findWish = wishMovies2.find((item)=>item.id === id)
        if(findWish === undefined){
            return false;
            //(아직 없으면)안찾아지면 false
            //(이미 존재하면)찾아지면 true
        }else{
            return true;
        }}

    // 찜 목록이 이미 있는지 보는 함수
    const isinwish3 = (id)=>{
        const findWish = wishMovies3.find((item)=>item.id === id)
        if(findWish === undefined){
            return false;
            //(아직 없으면)안찾아지면 false
            //(이미 존재하면)찾아지면 true
        }else{
            return true;
        }}

    return(
    <WishContext.Provider value={{addwish1,isinwish1,removewish1,wishMovies1,setWishMovies1,
                            addwish2,isinwish2,removewish2,wishMovies2,setWishMovies2,
                            addwish3,isinwish3,removewish3,wishMovies3,setWishMovies3
    }}>
        {children}
    </WishContext.Provider>
    )
}