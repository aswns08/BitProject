package java63.web03.domain;

import java.io.Serializable;

public class BoardPhoto implements Serializable {
  private static final long serialVersionUID = 1L;
  
  protected int     no;
  protected int     boardNo;
  protected String  url;
  
  @Override
  public String toString() {
    return "BoardPhoto [no=" + no + ", boardNo=" + boardNo + ", url="
        + url + "]";
  }
  public int getNo() {
    return no;
  }
  public void setNo(int no) {
    this.no = no;
  }
  public int getBoardNo() {
    return boardNo;
  }
  public void setBoardNo(int boardNo) {
    this.boardNo = boardNo;
  }
  public String getUrl() {
    return url;
  }
  public void setUrl(String url) {
    this.url = url;
  }
  
  
}
