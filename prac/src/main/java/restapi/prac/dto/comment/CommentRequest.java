package restapi.prac.dto.comment;

// 클라이언트에서 댓글 작성하거나 수정할 때 JSON으로 { "content": "댓글 내용" } 형태로 보낸다.
public class CommentRequest {
    private String content;

    public CommentRequest() {}

    public CommentRequest(String content) {
        this.content = content;
    }

    // getter, setter
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }
}
