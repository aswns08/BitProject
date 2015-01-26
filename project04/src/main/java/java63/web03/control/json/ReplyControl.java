package java63.web03.control.json;

import java.util.HashMap;
import java63.web03.domain.Reply;
import java63.web03.service.ReplyService;

import javax.servlet.ServletContext;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller("json.replyControl")
@RequestMapping("/json/reply")
public class ReplyControl {
  static Logger log = Logger.getLogger(ReplyControl.class);
  static final int PAGE_DEFAULT_SIZE = 5;
  
  @Autowired ReplyService replyService;
  @Autowired ServletContext servletContext;

  @RequestMapping(value="/add", method=RequestMethod.POST)
  public Object add(Reply reply) throws Exception {  
    
    System.out.println("---------------------------" + reply);
	  
    replyService.add(reply);

	  HashMap<String,Object> resultMap = new HashMap<>();
	  resultMap.put("status", "success");

	  return resultMap;
  }

  @RequestMapping("/delete")
  public Object delete(Reply reply) throws Exception {
    replyService.delete(reply);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    
    return resultMap;
  }
  
  @RequestMapping("/list")
  public Object list(
      int bno,
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="5") int pageSize) throws Exception { 
    
    if (pageSize <= 0)
      pageSize = PAGE_DEFAULT_SIZE;
    
    int maxPageNo = replyService.getMaxPageNo(pageSize);
    
    if (pageNo <= 0) pageNo = 1;
    if (pageNo > maxPageNo) pageNo = maxPageNo;
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("currPageNo", pageNo);
    resultMap.put("maxPageNo", maxPageNo);
    resultMap.put("replies", replyService.getList(pageNo, pageSize, bno));
    return resultMap;
  }
  
  
  @RequestMapping("/view")
  public Object view(int rno, Model model) throws Exception {
    Reply reply = replyService.get(rno);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("reply", reply);
    
    return resultMap;
  }
}












