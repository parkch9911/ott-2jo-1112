import { Link } from "react-router-dom";

export default function Footer(){
    return(
        <>
            <div className="footer-box">
                <div className="footer-wrap">
                    <div className="footer-top-box">
                        <div className="footer-icons">
                            <svg className="ficon" viewBox="0 0 24 24" width="24" height="24" data-icon="FacebookMedium" data-icon-id=":r2:" aria-hidden="true" class="svg-icon svg-icon-facebook-logo" xmlns="http://www.w3.org/2000/svg" fill="none" role="img"><path fill="rgb(204, 204, 204)" fill-rule="evenodd" d="M13.99 13.16v8.82h-3.95v-8.82h-3.2V9.51h3.2V6.73c0-3.16 1.9-4.91 4.78-4.91q1.42.02 2.82.25v3.1h-1.6A1.82 1.82 0 0 0 14 7.15V9.5h3.5l-.56 3.65z" clip-rule="evenodd"></path></svg>
                            <svg className="ficon" viewBox="0 0 24 24" width="24" height="24" data-icon="InstagramMedium" data-icon-id=":r3:" aria-hidden="true" class="svg-icon svg-icon-instagram-logo" xmlns="http://www.w3.org/2000/svg" fill="none" role="img"><path fill="rgb(204, 204, 204)" fill-rule="evenodd" d="M21.93 16.123a5.96 5.96 0 0 1-1.615 4.189 5.9 5.9 0 0 1-4.19 1.615c-1.651.094-6.6.094-8.25 0a5.96 5.96 0 0 1-4.19-1.615 5.92 5.92 0 0 1-1.615-4.189c-.093-1.651-.093-6.6 0-8.25a5.94 5.94 0 0 1 1.615-4.19 5.95 5.95 0 0 1 4.19-1.61c1.651-.094 6.6-.094 8.25 0a5.96 5.96 0 0 1 4.19 1.615 5.92 5.92 0 0 1 1.615 4.189c.093 1.651.093 6.595 0 8.246M20.2 12c0-1.455.12-4.578-.4-5.894a3.37 3.37 0 0 0-1.9-1.9c-1.312-.517-4.439-.4-5.894-.4s-4.578-.121-5.894.4a3.38 3.38 0 0 0-1.9 1.9c-.517 1.312-.4 4.439-.4 5.894s-.121 4.578.4 5.894a3.38 3.38 0 0 0 1.9 1.9c1.312.517 4.44.4 5.894.4s4.578.121 5.894-.4a3.38 3.38 0 0 0 1.9-1.9c.519-1.312.4-4.439.4-5.894m-3.07 0A5.127 5.127 0 1 1 12 6.873 5.12 5.12 0 0 1 17.129 12zm-1.794 0a3.333 3.333 0 1 0-6.664 0 3.333 3.333 0 0 0 6.663 0zm2-4.141a1.2 1.2 0 1 1 1.2-1.2 1.193 1.193 0 0 1-1.197 1.2z" clip-rule="evenodd"></path></svg>
                            <svg className="ficon" viewBox="0 0 24 24" width="24" height="24" data-icon="TwitterMedium" data-icon-id=":r4:" aria-hidden="true" class="svg-icon svg-icon-twitter-logo" xmlns="http://www.w3.org/2000/svg" fill="none" role="img"><path fill="rgb(204, 204, 204)" fill-rule="evenodd" d="M20.77 8.2A12.65 12.65 0 0 1 8.03 20.96c-2.44 0-4.83-.7-6.88-2.01q.54.06 1.08.05a9 9 0 0 0 5.56-1.91 4.5 4.5 0 0 1-4.19-3.1q.42.06.85.06.6 0 1.17-.15a4.5 4.5 0 0 1-3.58-4.4v-.06a4.5 4.5 0 0 0 2.02.57 4.5 4.5 0 0 1-1.38-5.99c2.27 2.8 5.63 4.5 9.23 4.69a4.48 4.48 0 0 1 7.64-4.09q1.51-.3 2.84-1.08A4.5 4.5 0 0 1 20.42 6q1.34-.15 2.58-.69a10 10 0 0 1-2.25 2.32q.02.28.02.58" clip-rule="evenodd"></path></svg>
                            <svg className="ficon" viewBox="0 0 24 24" width="24" height="24" data-icon="YoutubeMedium" data-icon-id=":r5:" aria-hidden="true" class="svg-icon svg-icon-youtube-logo" xmlns="http://www.w3.org/2000/svg" fill="none" role="img"><path fill="rgb(204, 204, 204)" fill-rule="evenodd" d="M22.54 6.67c-.25-.95-1-1.7-1.94-1.96-1.72-.46-8.6-.46-8.6-.46s-6.88 0-8.6.46c-.95.26-1.69 1-1.94 1.96A29 29 0 0 0 1 12q-.02 2.69.46 5.33c.25.95 1 1.7 1.94 1.96 1.72.46 8.6.46 8.6.46s6.89 0 8.6-.46c.95-.26 1.69-1 1.94-1.96q.48-2.64.46-5.33.02-2.69-.46-5.33m-12.79 8.6V8.73L15.5 12z" clip-rule="evenodd"></path></svg>
                        </div>
                        <div className="footer-top-linkbox">
                            <span>자주 묻는 질문</span>
                            <span>고객 센터</span>
                            <span>이용 약관</span>
                            <span>개인정보 처리방침</span>
                            <span>쿠키 설정</span>
                            <span>기업 정보</span>
                        </div>
                    </div>
                    <div className="footer-bottom-box">
                        <p>넷플릭스서비시스코리아 유한회사 통신판매업신고번호: 제2018-서울종로-0426호 전화번호: 00-308-321-0161 (수신자 부담)<br/>
                        대표: 레지널드 숀 톰슨<br/>
                        이메일 주소: korea@netflix.com<br/>
                        주소: 대한민국 서울특별시 종로구 우정국로 26, 센트로폴리스 A동 20층 우편번호 03161<br/>
                        사업자등록번호: 165-87-00119<br/>
                        클라우드 호스팅: Amazon Web Services Inc.<br/>
                        웹사이트 제작: 2조</p>
                        
                    </div>
                </div>
            </div>
        </>
    )
}