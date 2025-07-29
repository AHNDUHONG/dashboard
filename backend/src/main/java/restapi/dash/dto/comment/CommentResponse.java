package restapi.dash.dto.comment;

import java.time.LocalDateTime;

//클라이언트에 댓글을 보여줄 때 id, content, createdAt만 노출한다.
public class CommentResponse {
    private Long id;
    private String content;
    private LocalDateTime createdAt;

    public CommentResponse() {}

    public CommentResponse(Long id, String content, LocalDateTime createdAt) {
        this.id = id;
        this.content = content;
        this.createdAt = createdAt;
    }

    // getter, setter
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}
