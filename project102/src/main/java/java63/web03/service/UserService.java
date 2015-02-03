package java63.web03.service;

import java.util.HashMap;
import java63.web03.dao.UserDao;
import java63.web03.domain.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

/* Service 컴포넌트의 역할
 * => 비즈니스 로직 수행
 * => 트랜잭션 관리
 */

@Service
public class UserService {
  @Autowired
  UserDao userDao;
  
  
  /* @Transactional 선언
   * => 메서드 안의 입력/변경/삭제(manipluation) 작업을 하나의 작업을 묶는다.
   * => 모든 작업이 성공했을 때만 서버에 반영한다. 
   */
  @Transactional(
      rollbackFor=Exception.class, 
      propagation=Propagation.REQUIRED)
  public void add(User user) {
    userDao.insert(user);
    
  }
  
  public User validate(String email, String pwd) {
    System.out.println("userService 실행");
    HashMap<String,String> params = new HashMap<>();
    params.put("email", email);
    params.put("pwd", pwd);
    return userDao.existUser(params);
  }
  
  @Transactional(
      rollbackFor=Exception.class, 
      propagation=Propagation.REQUIRED)
  public void update(User user) {  
    userDao.update(user);
  }
  
  @Transactional(
      rollbackFor=Exception.class, 
      propagation=Propagation.REQUIRED)
  public void changePwd(User user) {
    userDao.changePwd(user);
  }
  
}
















