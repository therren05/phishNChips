package PhishNChips.DAO;

import PhishNChips.TO.ScoreTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class ScoreDAO {

    //used to connect to the database
    private JdbcTemplate template;

    public JdbcTemplate getTemplate() {
        return template;
    }

    @Autowired
    public void setTemplate(JdbcTemplate template) {
        this.template = template;
    }

    public List<ScoreTO> getData() {
        //sql to get all the score logs
        String sql = "select * from score_logs ORDER BY score DESC";

        RowMapper<ScoreTO> mapper = new RowMapper<ScoreTO>() {
            @Override
            public ScoreTO mapRow(ResultSet rs, int rowNum) throws SQLException {
                //sets the values of the data based on the values in each column in the database
                ScoreTO score = new ScoreTO();
                score.setArcadeName(rs.getString("arcadeName"));
                score.setScore(rs.getInt("score"));
                score.setUsername(rs.getString("username"));

                return score;
            }
        };
        return template.query(sql, mapper);
    }

    public List<ScoreTO> getDailyData() {
        //sql to get all the score logs
        String sql = "select * from score_logs" +
         " WHERE created_at::date = CURRENT_DATE" +
         " ORDER BY score DESC";

        RowMapper<ScoreTO> mapper = new RowMapper<ScoreTO>() {
            @Override
            public ScoreTO mapRow(ResultSet rs, int rowNum) throws SQLException {
                //sets the values of the data based on the values in each column in the database
                ScoreTO score = new ScoreTO();
                score.setArcadeName(rs.getString("arcadeName"));
                score.setScore(rs.getInt("score"));
                score.setUsername(rs.getString("username"));

                return score;
            }
        };
        return template.query(sql, mapper);
    }

    public List<ScoreTO> getUserScore(String username) {
        //sql to get all scores from the signed in user
        String sql = "select * from score_logs WHERE username = ? ORDER BY score DESC";

        RowMapper<ScoreTO> mapper = new RowMapper<ScoreTO>() {
            @Override
            public ScoreTO mapRow(ResultSet rs, int rowNum) throws SQLException {
                //sets the values of the data based on the values in each column in the database
               ScoreTO score = new ScoreTO();
                score.setArcadeName(rs.getString("arcadeName"));
                score.setScore(rs.getInt("score"));
                score.setUsername(rs.getString("username"));

                return score;
            }
        };
        //the username and sql are combined here rather than just in the sql string to prevent sql injections
        return template.query(sql, mapper, username);
    }

    public void insertScore(ScoreTO data) {
        // SQL to insert a new log entry into the database
        String sql = "INSERT INTO score_logs (arcadeName, username, score) VALUES (?, ?, ?)";
    
        // Execute the update query
        template.update(sql, data.getArcadeName(), data.getUsername(), data.getScore());
    }
    
    

}
