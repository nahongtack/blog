import logo from './logo.svg';
import './App.css';
import { useState } from "react";

function App() {
    let [title, setTitle] = useState(["글제목1", "글제목2", "글제목3"]);
    let [btnLike, setBtnLike] = useState([0, 0, 0]);
    let [detailViewModal, setDetailViewModal] = useState(false);
    let [insertViewModal, setInsertViewModal] = useState(false);
    let [idx, setIdx] = useState(0);

    return (
        <div className="App">
            <div className="header">블로그</div>
            <CompButtonZone
                setInsertViewModal={setInsertViewModal}
                title={title}
                setTitle={setTitle}
            />
            {title.map(function (item, index) {
                return (
                    <div className="post" key={index}>
                        <h2
                            className="post-title"
                            onClick={() => {
                                setDetailViewModal(detailViewModal == true ? false : true);
                                setIdx(index);
                            }}
                        >
                            {item}
                        </h2>
                        <div className="post-meta">
                            <span className="post-date">최종 수정일: 2022-01-01</span>
                            <span className="post-likes">
                                좋아요 수 : {btnLike[index]}
                                <span
                                    className="ml"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        let copyBtnLike = [...btnLike];
                                        copyBtnLike[index] += 1;
                                        setBtnLike(copyBtnLike);
                                    }}
                                >
                                    👍
                                </span>
                            </span>
                            <span className="post-comments">댓글 수: 5</span>
                        </div>
                    </div>
                );
            })}
            {insertViewModal == true ? (
                <CompInsertViewModal
                    btnLike={btnLike}
                    setBtnLike={setBtnLike}
                    title={title}
                    setTitle={setTitle}
                    setInsertViewModal={setInsertViewModal}
                />
            ) : null}
            {detailViewModal == true ? (
                <CompDetailViewModal
                    title={title}
                    setTitle={setTitle}
                    idx={idx}
                    setDetailViewModal={setDetailViewModal}
                />
            ) : null}
        </div>
    );
}

/**
 * 콤포넌트 : 상단 글쓰기, 제목순정렬 버튼
 * @param {*} props
 * @returns
 */
function CompButtonZone(props) {
    return (
        <div className="button-container">
            <button
                className="button write"
                onClick={() => {
                    props.setInsertViewModal(true);
                }}
            >
                글쓰기
            </button>
            <button
                className="button sort"
                onClick={() => {
                    let copyTitle = [...props.title];
                    copyTitle.sort();
                    props.setTitle(copyTitle);
                }}
            >
                제목순 정렬
            </button>
        </div>
    );
}

/**
 * 콤포넌트 : 글쓰기 모달창
 * @param {*} props
 * @returns
 */
function CompInsertViewModal(props) {
    let [insertTitle, setInsertTitle] = useState("");
    return (
        <div className="modal">
            <button
                className="close"
                onClick={() => {
                    props.setInsertViewModal(false);
                }}
            >
                X
            </button>
            <div className="modal-content">
                <div className="form-container">
                    <div>
                        <label>글제목</label>
                        <input
                            type="text"
                            onChange={(e) => {
                                setInsertTitle(e.target.value);
                            }}
                        ></input>
                    </div>
                    <div>
                        <label>상세내용</label>
                        <textarea></textarea>
                    </div>
                    <button
                        onClick={(e) => {
                            let copyTitle = [...props.title]; // 부모의 제목 배열 복사
                            let copyBtnLike = [...props.btnLike]; // 부모의 좋아요버튼 배열 복사

                            // 복사항 배열에 제일앞에 제목, 좋아요값 추가
                            copyTitle.unshift(insertTitle);
                            copyBtnLike.unshift(0);

                            // 부모의 제목, 좋아요 업데이트
                            props.setTitle(copyTitle);
                            props.setBtnLike(copyBtnLike);

                            // 글쓰기 모달창 닫기
                            props.setInsertViewModal(false);
                        }}
                    >
                        글쓰기
                    </button>
                </div>
            </div>
        </div>
    );
}

/**
 * 콤포넌트 : 상세 모달창
 * @param {*} props
 * @returns
 */
function CompDetailViewModal(props) {
    return (
        <div className="modal">
            <button
                className="close"
                onClick={() => {
                    props.setDetailViewModal(false);
                }}
            >
                X
            </button>
            <div className="modal-content">
                <h4>{props.title[props.idx]}</h4>
                <p>날짜</p>
                <p>상세내용</p>
                <button
                    onClick={() => {
                        let copyTitle = [...props.title];
                        copyTitle[0] = "변경된 글제목";
                        props.setTitle(copyTitle);
                    }}
                >
                    글수정
                </button>
            </div>
        </div>
    );
}


export default App;
