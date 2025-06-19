package PhishNChips.TO;

import org.springframework.stereotype.Component;

@Component
public class ScoreTO {
    private String arcadeName;
    private String username;
    private int score;
    //private String timestamp;

    public ScoreTO(String arcadeName, String username, int score, String timestamp) {
        this.arcadeName = arcadeName;
        this.username = username;
        this.score = score;
        //this.timestamp = timestamp;
    }

    public ScoreTO() {
        this.arcadeName = "AAA";
        this.username = "000000";
        this.score = 0;
    }

    public String getArcadeName() {
        return arcadeName;
    }

    public void setArcadeName(String arcadeName) {
        this.arcadeName = arcadeName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
    }

    // public String getTimestamp() {
    //     return timestamp;
    // }

    // public void setTimestamp(String timestamp) {
    //     this.timestamp = timestamp;
    // }
}
