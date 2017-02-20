package controllers;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import models.User;
import models.UserStore;
import play.libs.Json;
import play.mvc.Controller;
import play.mvc.Result;
import util.Util;

import javax.jws.soap.SOAPBinding;
import java.util.Set;

/**
 * Created by Poli on 19/02/2017.
 */
public class UserController extends Controller{
    private User toUser(JsonNode jsonNode) {
        return Json.fromJson(jsonNode, User.class);
    }

    public Result create() {
        JsonNode json = request().body().asJson();
        if(json == null) {
            return badRequest(
                    Util.createResponse("Expecting Json data",
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
