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

public class Storage implements Serializable {
  private static final long serialVersionUID = 1L;
  
  protected int             sno;
  protected String          category;
  protected String          sdate;
  protected String          link;
  protected int             uno;
  protected int             price;
  protected String          title;
  protected String          img_url;
  protected String          docid;
  
  
  @Override
  public String toString() {
    return "Storage [sno=" + sno + ", category=" + category + ", sdate="
        + sdate + ", link=" + link + ", uno=" + uno + ", price=" + price
        + ", title=" + title + ", img_url=" + img_url + ", docid=" + docid
        + "]";
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


  public String getSdate() {
    return sdate;
  }


  public void setSdate(String sdate) {
    this.sdate = sdate;
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


  public String getImg_url() {
    return img_url;
  }


  public void setImg_url(String img_url) {
    this.img_url = img_url;
  }


  public String getDocid() {
    return docid;
  }


  public void setDocid(String docid) {
    this.docid = docid;
  }


  @Override
  public int hashCode() {
    final int prime = 31;
    int result = 1;
    result = prime * result + ((category == null) ? 0 : category.hashCode());
    result = prime * result + ((docid == null) ? 0 : docid.hashCode());
    result = prime * result + ((img_url == null) ? 0 : img_url.hashCode());
    result = prime * result + ((link == null) ? 0 : link.hashCode());
    result = prime * result + price;
    result = prime * result + ((sdate == null) ? 0 : sdate.hashCode());
    result = prime * result + sno;
    result = prime * result + ((title == null) ? 0 : title.hashCode());
    result = prime * result + uno;
    return result;
  }


  @Override
  public boolean equals(Object obj) {
    if (this == obj)
      return true;
    if (obj == null)
      return false;
    if (getClass() != obj.getClass())
      return false;
    Storage other = (Storage) obj;
    if (category == null) {
      if (other.category != null)
        return false;
    } else if (!category.equals(other.category))
      return false;
    if (docid == null) {
      if (other.docid != null)
        return false;
    } else if (!docid.equals(other.docid))
      return false;
    if (img_url == null) {
      if (other.img_url != null)
        return false;
    } else if (!img_url.equals(other.img_url))
      return false;
    if (link == null) {
      if (other.link != null)
        return false;
    } else if (!link.equals(other.link))
      return false;
    if (price != other.price)
      return false;
    if (sdate == null) {
      if (other.sdate != null)
        return false;
    } else if (!sdate.equals(other.sdate))
      return false;
    if (sno != other.sno)
      return false;
    if (title == null) {
      if (other.title != null)
        return false;
    } else if (!title.equals(other.title))
      return false;
    if (uno != other.uno)
      return false;
    return true;
  }

  
}













