package restapi.dash.dto.post;

import org.springframework.security.core.context.SecurityContextHolder;

import java.time.LocalDateTime;

public class PostResponse {
    private Long id;
    private String title;
    private String content;
    private LocalDateTime createdAt;
    private String authorUsername;

    public PostResponse() {}

    public PostResponse(Long id, String title, String content, LocalDateTime createdAt, String authorUsername) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.createdAt = createdAt;
        this.authorUsername = authorUsername;
    }

    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getContent() {
        return content;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public String getAuthorUsername() { return authorUsername; }
}
