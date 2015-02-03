/* Value Object
 * => Class 문법을 사용하여 사용자 정의 데이터 타입 만들기
 * 
 * 1) Serializable 인터페이스 구현
 *    => SerialVersionUID 스태틱 변수 선언
 * 
 * 2) 인스턴스 변수 선언
 * 
 * 3) setter/getter 생성
 * 
 * 4) 기본 생성자와 파라미터 값을 받는 생성자 선언
 * 
 * 5) equals()/hashCode() 메서드 오버라이딩
 * 
 * 6) toString() 오버라이딩
 */
package java63.web03.domain;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

public class Reply implements Serializable {
  private static final long serialVersionUID = 1L;
  
  protected int             rno;
  protected int             bno;
  protected int             uno;
  protected String          rContent;
  protected Date            rDate;
  
  @Override
  public String toString() {
    return "Reply [rno=" + rno + ", bno=" + bno + ", uno=" + uno
        + ", rContent=" + rContent + ", rDate=" + rDate + "]";
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
  
  
  
  
  
  
}













