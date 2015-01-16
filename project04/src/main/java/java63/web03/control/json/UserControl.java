package java63.web03.control.json;

import java.util.HashMap;
import java63.web03.domain.User;
import java63.web03.service.UserService;

import javax.servlet.ServletContext;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller("json.userControl")
@RequestMapping("/json/user")
public class UserControl {
  static Logger log = Logger.getLogger(UserControl.class);
  static final int PAGE_DEFAULT_SIZE = 5;

  @Autowired UserService     userService;
  @Autowired ServletContext servletContext;

  @RequestMapping(value="/add", method=RequestMethod.POST)
  public Object add(User user) throws Exception {  
    userService.add(user);
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");

    return resultMap;
  }
  
  @RequestMapping(value="/update", method=RequestMethod.POST)
  public Object update(User user) throws Exception {
    
    System.out.println("UserControl Update 시작" + user);
    
    userService.update(user);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    
    System.out.println("UserControl Update 끝" + user);
    
    return resultMap;
  }


}












