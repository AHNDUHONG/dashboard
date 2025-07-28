import axios from "axios";

export const fetchComments = async (postId) => {
    const res = await axios.get(
        `${process.env.REACT_APP_API_URL}/posts/${postId}/comments`
    );
    return res.data;
};

export const postComment = async (postId, content) => {
    const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/posts/${postId}/comments`,
        { content}
    );
    return res.data;
};
