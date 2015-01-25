package java63.web03.control.json;

import java.util.HashMap;
import java63.web03.domain.Storage;
import java63.web03.service.StorageService;

import javax.servlet.ServletContext;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller("json.storageControl")
@RequestMapping("/json/storage")
public class StorageControl {
  static Logger log = Logger.getLogger(StorageControl.class);
  static final int PAGE_DEFAULT_SIZE = 5;
  
  @Autowired StorageService storageService;
  @Autowired ServletContext servletContext;

  @RequestMapping(value="/add", method=RequestMethod.POST)
  public Object add(Storage storage) throws Exception {  
	  
    storageService.add(storage);

	  HashMap<String,Object> resultMap = new HashMap<>();
	  resultMap.put("status", "success");

	  return resultMap;
  }

  @RequestMapping("/delete")
  public Object delete(int sno) throws Exception {
    storageService.delete(sno);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    
    return resultMap;
  }
  
  @RequestMapping("/list")
  public Object list(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="5") int pageSize) throws Exception {
    
    if (pageSize <= 0)
      pageSize = PAGE_DEFAULT_SIZE;
    
    int maxPageNo = storageService.getMaxPageNo(pageSize);
    
    if (pageNo <= 0) pageNo = 1;
    if (pageNo > maxPageNo) pageNo = maxPageNo;
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("currPageNo", pageNo);
    resultMap.put("maxPageNo", maxPageNo);
    resultMap.put("storages", storageService.getList(pageNo, pageSize));
    
    return resultMap;
  }
  
  @RequestMapping("/update")
  public Object update(Storage storage) throws Exception {
    storageService.update(storage);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    
    return resultMap;
  }
  
  @RequestMapping("/view")
  public Object view(int sno, Model model) throws Exception {
    Storage storage = storageService.get(sno);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("storage", storage);
    
    return resultMap;
  }
}












