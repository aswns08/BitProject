package java63.web03.control.json;

import java.util.HashMap;

import java63.web03.domain.Barcode;
import java63.web03.domain.Reply;
import java63.web03.service.BarcodeService;

import javax.servlet.ServletContext;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller("json.barcodeControl")
@RequestMapping("/json/barcode")
public class BarcodeControl {
  static Logger log = Logger.getLogger(BarcodeControl.class);
  static final int PAGE_DEFAULT_SIZE = 5;
  
  @Autowired BarcodeService barcodeService;
  @Autowired ServletContext servletContext;
  
  @RequestMapping("/list")
  public Object list(
      @RequestParam(defaultValue="1") int pageNo,
      @RequestParam(defaultValue="5") int pageSize) throws Exception { 
    
    if (pageSize <= 0)
      pageSize = PAGE_DEFAULT_SIZE;
    
    int maxPageNo = barcodeService.getMaxPageNo(pageSize);
    
    if (pageNo <= 0) pageNo = 1;
    if (pageNo > maxPageNo) pageNo = maxPageNo;
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("currPageNo", pageNo);
    resultMap.put("maxPageNo", maxPageNo);
    resultMap.put("barcodes", barcodeService.getList(pageNo, pageSize));
    return resultMap;
  }
  
  
  @RequestMapping("/view")
  public Object view(String barcodeNo, Model model) throws Exception {
    System.out.println("바코드넘버: "+barcodeNo);
    
    Barcode barcode = barcodeService.get(barcodeNo);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("barcode", barcode);
    
    System.out.println("resultMap---- !!!!"+ resultMap );
    return resultMap;
  }
}




