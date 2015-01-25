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

public class Barcode implements Serializable {
  private static final long serialVersionUID = 1L;
  
  protected String          barcodeNo;
  protected int             pno;
  protected String          pname;
  
  
  @Override
  public String toString() {
    return "Barcode [barcodeNo=" + barcodeNo + ", pno=" + pno + ", pname="
        + pname + "]";
  }
  public String getBarcodeNo() {
    return barcodeNo;
  }
  public void setBarcodeNo(String barcodeNo) {
    this.barcodeNo = barcodeNo;
  }
  public int getPno() {
    return pno;
  }
  public void setPno(int pno) {
    this.pno = pno;
  }
  public String getPname() {
    return pname;
  }
  public void setPname(String pname) {
    this.pname = pname;
  }
  
  
}




