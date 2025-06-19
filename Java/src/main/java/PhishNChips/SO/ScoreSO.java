package PhishNChips.SO;

import PhishNChips.DAO.ScoreDAO;
import PhishNChips.TO.ScoreTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScoreSO {

    @Autowired
    private ScoreDAO scoreDAO;

    //calling the dao to get all the normal Data
    public List<ScoreTO> getData() {
        return scoreDAO.getData();
    }

    //calling the dao to get all the normal Data for a specific user
    public List<ScoreTO> getUserScore(String email) {
        return scoreDAO.getUserScore(email);
    }

    public void addScoreLog(ScoreTO data) {
        scoreDAO.insertScore(data);
    }

    public List<ScoreTO> getWeeklyData() {
        return scoreDAO.getWeeklyData();
    }

}