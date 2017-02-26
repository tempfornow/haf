package models;

/**
 * Created by Poli on 19/02/2017.
 */
public class User {
    private String username;
    private String firstname;
    private String surname;
    private String password;
    private int age;
    private int sortNum;
    private int pagesTurn;

    public User() {}
    public User(String username, String firstname, String surname, String password, int age, int sortNum, int pagesTurn) {
        this.username = username;
        this.firstname = firstname;
        this.surname = surname;
        this.password = password;
        this.age = age;
        this.sortNum = sortNum;
        this.pagesTurn = pagesTurn;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getfirstname() {
        return firstname;
    }

    public void setfirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getsurname() {
        return surname;
    }

    public void setsurname(String surname) {
        this.surname = surname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public int getSortNum() {
        return sortNum;
    }

    public void setSortNum(int sortNum) {
        this.sortNum = sortNum;
    }

    public int getPagesTurn() {
        return pagesTurn;
    }

    public void setPagesTurn(int pagesTurn) {
        this.pagesTurn = pagesTurn;
    }
}
