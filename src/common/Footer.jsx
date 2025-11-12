import { Link } from "react-router-dom";

export default function Footer(){
    return(
        <>
            <div className="footer-box">
                <div className="footer-wrap">
                    <div className="footer-top-box">
                        <p>질문이 있으신가요? 문의 전화:00-308-321-0161 (수신자 부담)(무료 전화)</p>
                        <div className="footer-top-linkbox">
                            <Link>자주 묻는 질문</Link>
                            <Link>고객 센터</Link>
                            <Link>이용 약관</Link>
                            <Link>개인정보 처리방침</Link>
                            <Link>쿠키 설정</Link>
                            <Link>기업 정보</Link>
                        </div>
                    </div>
                    <div className="footer-bottom-box">
                        <p>넷플릭스서비시스코리아 유한회사 통신판매업신고번호: 제2018-서울종로-0426호 전화번호: 00-308-321-0161 (수신자 부담)<br/>
                        대표: 레지널드 숀 톰슨<br/>
                        이메일 주소: korea@netflix.com<br/>
                        주소: 대한민국 서울특별시 종로구 우정국로 26, 센트로폴리스 A동 20층 우편번호 03161<br/>
                        사업자등록번호: 165-87-00119<br/>
                        클라우드 호스팅: Amazon Web Services Inc.<br/>
                        공정거래위원회 웹사이트</p>
                    </div>
                </div>
            </div>
        </>
    )
}