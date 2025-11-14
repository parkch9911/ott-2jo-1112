import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './common.css'
import { LoginContext } from "../context/LoginContext";
import { useContext } from "react";
import Nlogo from '../assets/img/Netflix_N.png'
import logoLong from '../assets/img/logoLong.png'

export default function LoginPage(){

    const [id,setId]= useState('')
    const [pw,setPw]= useState('')
    const {login,user} = useContext(LoginContext)
    //네비 설정
    const navigate = useNavigate();

    const loginHandler = ()=>{
        if(id==='1234' && pw==='1234'){
            login(id)
            alert('로그인 되었습니다.')
            navigate('/selectProfile')
        }else{
            alert('이메일 혹은 비밀번호를 다시 확인해주세요')
            //입력값 초기화 
            setId('')
            setPw('')
        }
    }
    return(
        <>
            <div className="background-img">
                <Link to='/'><img className="toplogo" src={logoLong}/></Link>
                <form onSubmit={loginHandler} className="login-form">
                    <img className="logo" src={Nlogo}/>
                    <h1 className="loglogo">로그인</h1>
                    <input type="text"
                     placeholder="이메일 주소 또는 휴대폰 번호"
                     value={id}
                     onChange={(e)=>setId(e.target.value)}/>
                    <input type="password"
                     placeholder="비밀번호"
                     value={pw}
                     onChange={(e)=>setPw(e.target.value)}/>
                    <button type="submit" className="login-btn">로그인</button>
                    <p>또는</p>
                    <button type="submit" className="usecode">로그인 코드 사용하기</button>
                    <Link className="lost-pw">비밀번호를 잊으셨나요?</Link>
                    <div className="login-form-bottom">
                        <div className="check-box">
                            <input type="checkbox" className="checking"/>
                            <p className="save-log">로그인 정보 저장</p>
                        </div>
                        <span>넷플릭스 회원이 아닌가요?<em> 지금 가입하세요.</em></span>
                        <p className="dep">이 페이지는 Google reCAPTCHA의 보호를 받아 사용자가 <br/>
                        로봇이 아님을 확인합니다.</p>
                        <Link className="todetail">자세히 알아보기</Link>
                    </div>
                </form>
            </div>
        </>
    )
}
