// PostDetail.js
import "./css/detail.css";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";

let PostDetail = () => {
    const {id} = useParams();

    let navigate = useNavigate();

    let [post, setPost] = useState({
        title: "",
        content: ""
    });

    const getPost = () => {
        axios.get(`${process.env.REACT_APP_API_URL}/posts/${id}`)
            .then(res => {
                console.log(res.data);
                setPost(res.data);
            }).catch(err => {
                console.error(err);
        });
    }

    useEffect(() => {
        getPost();
    }, []);

    const handleDelete = () => {
        if(!window.confirm("정말 삭제하시겠습니까?")){
            return;
        }

        axios.delete(`${process.env.REACT_APP_API_URL}/posts/${id}`)
            .then(res => {
                console.log(res.data);
                alert("삭제가 완료되었습니다.");
                navigate("/");
            }).catch(err => {
                console.error(err);
                alert("삭제 중 오류가 발생했습니다.")
        });
    }

    return(
        <div className={"post-detail-container"}>
            <h1 className={"post-detail-title"}>{post.title}</h1>
            <p className={"post-detail-content"}>{post.content}</p>
            <div className={"button-group"}>
                <Link to={`/post/edit/${id}`} className={"edit-button"}>
                    수정하기
                </Link>
                <button onClick={handleDelete} className={"delete-button"}>
                    삭제하기
                </button>
            </div>
            <Link to={"/"} className={"back-link"}>목록으로 돌아가기</Link>
        </div>
    )
}

export default PostDetail;