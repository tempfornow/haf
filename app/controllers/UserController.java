package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import models.User;
import models.UserStore;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import util.Util;

import java.util.Set;

/**
 * Created by Poli on 19/02/2017.
 */
public class UserController extends Controller{
    private User toUser(JsonNode jsonNode) {
        return Json.fromJson(jsonNode, User.class);
    }


    //Checks if aname(first or last) is valid
    private boolean isValidName(String name) {
        return name != null && name.matches("[a-zA-Z]+");
    }

    private boolean isValidUsername(String username) {
        return username != null && username.matches("[a-zA-z0-9]+");
    }

    private boolean isValidPassword(String password) {
        return password != null && password.length() > 8&& password.matches("[^\\s]+");
    }

    private boolean isValidAge(Integer age) {
        return age != null && 18 <= age && age <= 120;
    }



//    Checks if user is valid(all thefields are valid)
    private boolean isValidJson(JsonNode jsonNode) {

        User user;

        try {
            user = toUser(jsonNode);
        } catch (Exception e) {
            return false;
        }

        return user != null &&
                isValidUsername(user.getUsername()) &&
                isValidName(user.getfirstname()) &&
                isValidName(user.getsurname()) &&
                isValidPassword(user.getPassword()) &&
                isValidAge(user.getAge()) &&
                user.getPagesTurn() >= 0 &&
                user.getSortNum() >= 0;
    }

    public Result create() {
        JsonNode json = request().body().asJson();
        if(json == null) {
            return badRequest(
                    Util.createResponse("Expecting Json data",
                            false));
        }

        if(!isValidJson(json)) {
            return badRequest(
                    Util.createResponse("Invalid user format",
                            false));
        }

        User user = UserStore.getInstance().addUser(toUser(json));
        JsonNode jsonObject = Json.toJson(user);
        return created(Util.createResponse(jsonObject, true));
    }

    public Result update() {
        JsonNode json = request().body().asJson();
        if(json == null) {
            return badRequest(
                    Util.createResponse("Expecting Json data",
                            false));
        }

        if(!isValidJson(json)) {
            return badRequest(
                    Util.createResponse("Invalid user format",
                            false));
        }

        User user = UserStore.getInstance().updateUser(toUser(json));

        if(user == null) {
            return notFound(Util.createResponse("User not found", false));
        }

        JsonNode jsonObject = Json.toJson(user);
        return ok(Util.createResponse(jsonObject,true));
    }

    public Result retrieve(String username) {
        if(UserStore.getInstance().getUser(username) == null) {
            return notFound(Util.createResponse("Username " +username + " not found", false));
        }

        JsonNode jsonObject = Json.toJson(UserStore.getInstance().getUser(username));
        return ok(Util.createResponse(jsonObject, true));
    }

    public Result listUsers() {
        Set<User> result = UserStore.getInstance().getAllUsers();
        ObjectMapper mapper = new ObjectMapper();

        JsonNode jsonData = mapper.convertValue(result, JsonNode.class);
        return  ok(Util.createResponse(jsonData, true));
    }

    public Result delete(String username) {
        if(!UserStore.getInstance().deleteUser(username)) {
            return notFound(Util.createResponse("Username '" + username + "' not found", false));
        }

        return ok(Util.createResponse("Username " + username + " deleted",true));

    }

}
