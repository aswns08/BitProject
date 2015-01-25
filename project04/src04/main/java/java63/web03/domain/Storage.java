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
import java.util.List;

public class Storage implements Serializable {
  private static final long serialVersionUID = 1L;
  
  protected int             sno;
  protected String          category;
  protected String          sDate;
  protected String          link;
  protected int             uno;
  protected int             price;
  protected String          title;
  protected String          imgUrl;
  
  
  @Override
  public String toString() {
    return "Storage [sno=" + sno + ", category=" + category + ", sDate="
        + sDate + ", link=" + link + ", uno=" + uno + ", price=" + price
        + ", title=" + title + ", imgUrl=" + imgUrl + "]";
  }
  
  public int getSno() {
    return sno;
  }
  public void setSno(int sno) {
    this.sno = sno;
  }
  public String getCategory() {
    return category;
  }
  public void setCategory(String category) {
    this.category = category;
  }
  public String getsDate() {
    return sDate;
  }
  public void setsDate(String sDate) {
    this.sDate = sDate;
  }
  public String getLink() {
    return link;
  }
  public void setLink(String link) {
    this.link = link;
  }
  public int getUno() {
    return uno;
  }
  public void setUno(int uno) {
    this.uno = uno;
  }
  public int getPrice() {
    return price;
  }
  public void setPrice(int price) {
    this.price = price;
  }
  public String getTitle() {
    return title;
  }
  public void setTitle(String title) {
    this.title = title;
  }
  public String getImgUrl() {
    return imgUrl;
  }
  public void setImgUrl(String imgUrl) {
    this.imgUrl = imgUrl;
  }
  
  
  

  
  
  
  
}













