package PhishNChips.Controller;

import PhishNChips.SO.UserSO;
import PhishNChips.SO.ScoreSO;
import PhishNChips.TO.ScoreTO;
import PhishNChips.TO.UserTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
//sets the path to /admin
@RequestMapping("/admin")
@CrossOrigin(origins = "http://localhost:3000")
public class AdminController {
    @Autowired
    private UserSO userSO;
    @Autowired
    private ScoreSO scoreSO;

    //sets the path to /admin/getAllUsers and returns all user information
    @GetMapping("/getAllUsers")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<UserTO> displayUsers() {
        return userSO.getUsers();
    }

    //sets the path to /admin/getUserByUsername/ and revieves a specific user by the given username
    @GetMapping("/getUserByUsername/{username}")
    @CrossOrigin(origins = "http://localhost:3000")
    public UserTO getUserByUsername(@PathVariable String username) {
        return userSO.getUserByUsername(username);
    }

    //sets the path to /admin/deleteUserByUsername and deletes a specific user
    @GetMapping("/deleteUserByUsername/{username}")
    @CrossOrigin(origins = "http://localhost:3000")
    public String deleteUserByUsername(@PathVariable String username) {
        userSO.deleteUserByUsername(username);
        return "User with username " + username + " deleted.";
    }

    //sets the path to /score/viewLogs and retrieves the normal logs for all users
    @GetMapping("/viewLogs")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<ScoreTO> getData() {
        return scoreSO.getData();
    }

    @GetMapping("/viewDailyLogs")
    @CrossOrigin(origins = "http://localhost:3000")
    public List<ScoreTO> getDailyData() {
        return scoreSO.getDailyData();
    }
} 
