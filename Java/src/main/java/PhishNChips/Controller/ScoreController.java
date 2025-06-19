package PhishNChips.Controller;

import PhishNChips.SO.ScoreSO;
import PhishNChips.TO.ScoreTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
//sets the path to /score
@RequestMapping("/score")
@CrossOrigin(origins = "http://localhost:3000")
public class ScoreController {
    @Autowired
    private ScoreSO scoreSO;

    //sets the path to /score/userLogs and retrieves the normal logs for the signed in user
    @GetMapping("/userLogs")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<ScoreTO> getUserData() {
        //grabs authentication information for current user   
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return scoreSO.getUserScore(authentication.getName());
    }

    @PostMapping("/addLog")
    @CrossOrigin(origins = "http://localhost:3000")
    public ResponseEntity<String> addScoreLog(@RequestBody ScoreTO data) {
        scoreSO.addScoreLog(data);
        return ResponseEntity.ok("Data log inserted successfully");
    }
    

}
