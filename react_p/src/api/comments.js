import axios from "axios";

export const fetchComments = async (postId) => {
    const res = await axios.get(`/api/posts/${postId}/comments`);
    return res.data;
};

export const postComment = async (postId, content) => {
    const res = await axios.post(`/api/posts/${postId}/comments`, { content });
    return res.data;
};
