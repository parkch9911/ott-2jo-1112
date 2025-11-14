import { Link } from "react-router-dom";
import { useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import './selectProfile.css'
import { LoginContext } from "../../context/LoginContext";
import logoLong from '../../assets/img/logoLong.png'
import profile1 from '../../assets/img/profileImg.png'
import profile2 from '../../assets/img/profileImg2.png'
import profile3 from '../../assets/img/profileImg3.png'

export default function SelectProfile(){
    const {user1click,user2click,user3click,user1,user2,user3}=useContext(LoginContext)
    const nomore =()=>{
        alert('프로필을 추가하시려면 프리미엄 패밀리 요금제를 구매하세요')

    }   
            console.log(user1)
        console.log(user2)
        console.log(user3)
    return(


        <>
           <div className="select-wrap">
                <Link to='/'><img className="toplogo" src={logoLong}/></Link>
                <h1>넷플릭스를 시청할 프로필을 선택하세요.</h1>
                <div className="profile-div">
                    <ul className="profile-ul">
                        <li className="profile-li">
                            <Link to='/home' onClick={user1click} ><img className="pro-img" src={profile1}/></Link>
                            <p>박찬하</p>
                        </li>
                        <li className="profile-li">
                            <Link to='/home' onClick={user2click}><img className="pro-img" src={profile2}/></Link>
                            <p>김성중</p>
                        </li>
                        <li className="profile-li">
                            <Link to='/home' onClick={user3click}><img className="pro-img" src={profile3}/></Link>
                            <p>신동현</p>
                        </li>
                        <li className="profile-li">
                            <div className="profile-add" onClick={nomore}>
                                <p>➕︎</p>
                            </div>
                            <p>프로필 추가</p>
                        </li>
                    </ul>
                    
                </div>
            </div> 
        </>
    )
}