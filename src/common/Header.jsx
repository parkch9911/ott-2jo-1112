import { useState, useContext } from "react";
import "./Header.css";
import { SearchContext } from "../context/SearchContext";

import { LoginContext } from "../context/LoginContext";
import { Link } from "react-router-dom";


export default function Header() {

    const {user1,user2,user3,headerToggleBtn,headerToggle,user1click,user2click,user3click,logout}=useContext(LoginContext)


    const [showSearch, setShowSearch] = useState(false);
    const [modalOn, setModalOn] = useState(false);



    // 프로필 사진 클릭시 계정 관련 창 토글
    const profileToggle = () => {
        setModalOn((prev) => !prev);
    };

    const changeUser=()=>{
        alert('프로필이 변경되었습니다.')
    }

    return (
        <>
     
        <div className="header-wrap">
            <header className="header">
                <div className="header-left">
                    <Link to='/home'><img src="../../public/img/logoLong.png" /></Link>
                    <nav className="menu">
                    <Link to='/home'>홈</Link>
                    <Link to='/tv'>시리즈</Link>
                    <Link to='/movie'>영화</Link>
                    <Link to='/reco'>NEW! 요즘 대세 콘텐츠</Link>
                    <Link to='/test'>내가 찜한 리스트</Link>
                    </nav>
                </div>
                <div className="header-right">
                    <button className="search-btn">
                    <Link to="/search">
                        <svg viewBox="0 0 24 24" width="26" height="26" fill="none">
                            <path
                            fill="white"
                            fillRule="evenodd"
                            d="M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0m-1.38 7.03a9 9 0 1 1 1.41-1.41l5.68 5.67-1.42 1.42z"
                            clipRule="evenodd"
                            />
                        </svg>
                    </Link>
                    </button>
                    <div className="dropdown-container">
                        <button className="bell">
                            <svg viewBox="0 0 24 24" width="29" height="29" fill="none">
                            <path
                                fill="currentColor"
                                d="M13 4.07A7 7 0 0 1 19 11v4.25q1.58.12 3.1.28l-.2 2a93 93 0 0 0-19.8 0l-.2-2q1.52-.15 3.1-.28V11a7 7 0 0 1 6-6.93V2h2zm4 11.06V11a5 5 0 0 0-10 0v4.13a97 97 0 0 1 10 0m-8.37 4.24C8.66 20.52 10.15 22 12 22s3.34-1.48 3.37-2.63c.01-.22-.2-.37-.42-.37h-5.9c-.23 0-.43.15-.42.37"
                            ></path>
                            </svg>
                        </button>
                        <div className="dropdown-menu">
                            {user1 ? (
                                    <p>최근 알림 메세지가 없습니다.</p>
                                ) : user2 ? (
                                    <p>잠깐, 찜 목록 확인해볼까요?</p>
                                ) : user3 ? (
                                    <p>찜 목록이 비어 있어요. 좋아하는 콘텐츠를 찾아보세요!</p>
                                ) : null}
                        </div>
                    </div>
                    <div className="profile" onClick={profileToggle}>
                        {user1?
                        <img
                            className="profile-img-main"
                            src="../../public/img/profileImg.png"
                            alt="profile"
                        />:
                        user2?<img
                            className="profile-img-main"
                            src="../../public/img/profileImg2.png"
                            alt="profile"
                        />:
                        user3?<img
                            className="profile-img-main"
                            src="../../public/img/profileImg3.png"
                            alt="profile"
                        />:null}
                        <span className={modalOn?'spinTab':'basicTab'}  >▼</span>
                        {/* 프로필 모달 */}
                        {modalOn && (
                        <div className="profile-menu">
                            <div className="profile-others">
                                {/* 프로필 2, 프로필 이름2 */}
                                {user1?
                                <Link to='/home' className="isLink">
                                    <div className="profile-indiviual" onClick={()=>{user2click();changeUser();}}>
                                        <img
                                            className="profile-img-menu"
                                            src="../../public/img/profileImg2.png"
                                            alt="profile1"
                                        />
                                        <span className="username">성중님</span>
                                    </div>
                                </Link>
                                :user2?
                                <Link to='/home' className="isLink">
                                    <div className="profile-indiviual" onClick={()=>{user1click();changeUser();}}>
                                        <img
                                            className="profile-img-menu"
                                            src="../../public/img/profileImg.png"
                                            alt="profile1"
                                        />
                                        <span className="username">찬하님</span>
                                    </div>
                                </Link>
                                :user3?
                                <Link to='/home' className="isLink">
                                    <div className="profile-indiviual" onClick={()=>{user1click();changeUser();}}>
                                        <img
                                            className="profile-img-menu"
                                            src="../../public/img/profileImg.png"
                                            alt="profile1"
                                        />
                                        <span className="username">찬하님</span>
                                    </div>
                                </Link>
                                :null}
                                {/* 프로필 3, 프로필 이름3 */}
                                {user1?
                                <Link to='/home' className="isLink">
                                    <div className="profile-indiviual" onClick={()=>{user3click();changeUser();}}>
                                        <img
                                            className="profile-img-menu"
                                            src="../../public/img/profileImg3.png"
                                            alt="profile1"
                                        />
                                        <span className="username">동현님</span>
                                    </div>
                                </Link>
                                :user2?
                                <Link to='/home' className="isLink">
                                    <div className="profile-indiviual" onClick={()=>{user3click();changeUser();}}>
                                        <img
                                            className="profile-img-menu"
                                            src="../../public/img/profileImg3.png"
                                            alt="profile1"
                                        />
                                        <span className="username">동현님</span>
                                    </div>
                                </Link >
                                :user3?
                                <Link to='/home' className="isLink">
                                    <div className="profile-indiviual" onClick={()=>{user2click();changeUser();}}>
                                        <img
                                            className="profile-img-menu"
                                            src="../../public/img/profileImg2.png"
                                            alt="profile1"
                                        />
                                        <span className="username">성중님</span>
                                    </div>
                                </Link>
                                :null}
                            </div>
                            <p><i className="fa-solid fa-user"></i> 프로필 관리</p>
                            <p><i className="fa-solid fa-user-gear"></i> 계정 관리</p>
                            <p><i className="fa-solid fa-headset"></i> 고객센터</p>
                            <p><Link to='/' className="logout" onClick={logout}><i className="fa-solid fa-right-from-bracket"></i> 로그아웃</Link></p>
                        </div>
                        )}
                    </div>
                </div>
            </header>
        </div>
        </>
    );
}
