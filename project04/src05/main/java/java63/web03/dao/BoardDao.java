package java63.web03.dao;

import java.util.List;
import java.util.Map;
import java63.web03.domain.Board;

public interface BoardDao {
  Board selectOne(int no);
  void update(Board board);
  void plusCount(Board board);
  void plusReco(Board board);

  void delete(int no);
  
  List<?> selectList(Map<String,Object> params);  
 
  Integer  prevBoard(Board board);
  Integer  nextBoard(Board board);
  
  void insert(Board board);
  
  void insertPhoto(Board board);
  List<?> selectPhoto(int boardNo);
  void deletePhoto(int boardNo);
  
  int totalSize();
  int goodSize();
  int badSize();
  //void insertImg(Board board);

}


















