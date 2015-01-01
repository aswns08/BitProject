package java63.web03.service;

import java.util.List;
import java63.web03.dao.MakerDao;
import java63.web03.domain.Maker;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MakerService {
  
  @Autowired MakerDao makerDao;
  
  public List<Maker> getList() {
    return makerDao.selectNameList(); 
  }
}
