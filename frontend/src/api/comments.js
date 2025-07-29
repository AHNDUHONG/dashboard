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

export const updateComment = async (postId, commentId, content) => {
    const res = await axios.put(
        `${process.env.REACT_APP_API_URL}/posts/${postId}/comments/${commentId}`,
        { content }
    );
    return res.data;
};

export const deleteComment = async (postId, commentId) => {
    await axios.delete(
        `${process.env.REACT_APP_API_URL}/posts/${postId}/comments/${commentId}`
    );
};