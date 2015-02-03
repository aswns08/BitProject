package java63.web03.domain;

import java.io.Serializable;
import java.util.Date;

public class ReplyListItem implements Serializable {
  private static final long serialVersionUID = 1L;

  protected int             rno;
  protected int             bno;
  protected int             uno;
  protected String          rContent;
  protected Date            rDate;
  protected String          name;
  
  
  @Override
  public String toString() {
    return "ReplyListItem [rno=" + rno + ", bno=" + bno + ", uno=" + uno
        + ", rContent=" + rContent + ", rDate=" + rDate + ", name=" + name
        + "]";
  }
  
  public int getRno() {
    return rno;
  }
  public void setRno(int rno) {
    this.rno = rno;
  }
  public int getBno() {
    return bno;
  }
  public void setBno(int bno) {
    this.bno = bno;
  }
  public int getUno() {
    return uno;
  }
  public void setUno(int uno) {
    this.uno = uno;
  }
  public String getrContent() {
    return rContent;
  }
  public void setrContent(String rContent) {
    this.rContent = rContent;
  }
  public Date getrDate() {
    return rDate;
  }
  public void setrDate(Date rDate) {
    this.rDate = rDate;
  }
  public String getName() {
    return name;
  }
  public void setName(String name) {
    this.name = name;
  }
  
  
  
  
}
