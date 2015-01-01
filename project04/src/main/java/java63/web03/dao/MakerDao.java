package java63.web03.dao;

import java.util.List;
import java63.web03.domain.Maker;

public interface MakerDao {
  List<Maker> selectNameList();
}
