package models;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
/**
 * Created by Poli on 19/02/2017.
 */
public class UserStore {
    private static UserStore instance;
    private Map<String, User> users = new HashMap<>();

    public static UserStore getInstance() {
        if(instance == null) {
            instance = new UserStore();
        }

        return instance;
    }

    public User addUser(User user) {
        String username = user.getUsername();
        users.put(username, user);
        return user;
    }

    public User getUser(String username) {
        return users.get(username);
    }

    public Set<User> getAllUsers() {
        return new HashSet<>(users.values());
    }

    public User updateUser(User user) {
        String username = user.getUsername();
        if(users.containsKey(username)) {
            users.put(username, user);
            return user;
        }
        return null;

    }

    public boolean deleteUser(String username) {
        return users.remove(username) != null;
    }
}

