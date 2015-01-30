package java63.web03.dao;

import java.util.List;
import java.util.Map;
import java63.web03.domain.Reply;

/* myBatis에서 DAO 클래스를 만들 때 
 * 다음 인터페이스에 선언된 규칙에 따라 만들 것이다.
 * 따라서 인터페이스 선언시 약간의 규칙을 따라야 한다.
 * 
 * 규칙:
 * => 파라미터는 하나여야 한다. 또한 맵퍼 파일의 파라미터 타입과 일치해야 한다.
 * => 메서드 이름은 SQL 아이디와 같아야 한다.
 * => 인터페이스 패키지도 SQL 맵퍼 파일의 네임스페이스와 같아야 한다. 
 */
public interface ReplyDao {
  Reply selectOne(int bno);
  void delete(Reply reply);
  List<?> selectList(Map<String,Object> params);
  void insert(Reply reply);
  int totalSize();
  void deleteAll(int bno);
}


















