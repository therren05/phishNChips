package PhishNChips.TO;

import org.springframework.stereotype.Component;

@Component
//Transfer Object for a user
public class UserTO {
    private String username;
    private String password;
    private String role;

    public UserTO(String username, String password, String role) {
        this.username = username;
        this.password = password;
        this.role = role;
    }

    public UserTO() {
        username = "000000";
        password = "invalidPassword";
        role = "noRole";
    }

    //getters and setter for all values in a user
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    //to string to be able to print out a user
    @Override
    public String toString() {
        return "UserTO{" +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", role='" + role + '\'' +
                '}';
    }
}
