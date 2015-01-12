package java63.web03.domain;

import java.io.Serializable;

public class Users implements Serializable {
  private static final long serialVersionUID = 1L;
  
  protected int       uno;
  protected String    email;
  protected String    name;
  protected String    pwd;
  
  
  @Override
  public String toString() {
    return "Users [uno=" + uno + ", email=" + email + ", name=" + name
        + ", pwd=" + pwd + "]";
  }
  public int getUno() {
    return uno;
  }
  public void setUno(int uno) {
    this.uno = uno;
  }
  public String getEmail() {
    return email;
  }
  public void setEmail(String email) {
    this.email = email;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  public String getPwd() {
    return pwd;
  }
  public void setPwd(String pwd) {
    this.pwd = pwd;
  }
  
  
 
  
  }











