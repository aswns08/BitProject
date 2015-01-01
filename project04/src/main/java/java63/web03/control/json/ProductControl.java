package java63.web03.control.json;

import java.io.File;
import java.util.HashMap;
import java63.web03.domain.Storage;
import java63.web03.service.MakerService;
import java63.web03.service.ProductService;

import javax.servlet.ServletContext;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller("json.productControl")
@RequestMapping("/json/product")
public class ProductControl {
  static Logger log = Logger.getLogger(ProductControl.class);
  static final int PAGE_DEFAULT_SIZE = 5;
  
  @Autowired MakerService makerService;
  @Autowired ProductService productService;
  @Autowired ServletContext servletContext;

  @RequestMapping(value="/add", method=RequestMethod.POST)
  public Object add(Storage product) throws Exception {  
	  
	  if (product.getPhotofile() != null
			  && !product.getPhotofile().isEmpty()) {
		  String fileuploadRealPath = 
				  servletContext.getRealPath("/fileupload");
		  String filename = System.currentTimeMillis() + "_"; 
		  File file = new File(fileuploadRealPath + "/" + filename);

		  product.getPhotofile().transferTo(file);
		  product.setPhoto(filename);
	  }
	  
	  productService.add(product);

	  HashMap<String,Object> resultMap = new HashMap<>();
	  resultMap.put("status", "success");

	  return resultMap;
  }

  @RequestMapping("/delete")
  public Object delete(int no) throws Exception {
    productService.delete(no);
    
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
    
    int maxPageNo = productService.getMaxPageNo(pageSize);
    
    if (pageNo <= 0) pageNo = 1;
    if (pageNo > maxPageNo) pageNo = maxPageNo;
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("currPageNo", pageNo);
    resultMap.put("maxPageNo", maxPageNo);
    resultMap.put("products", productService.getList(pageNo, pageSize));
    
    return resultMap;
  }
  
  @RequestMapping("/update")
  public Object update(Storage product) throws Exception {
    productService.update(product);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    
    return resultMap;
  }
  
  @RequestMapping("/view")
  public Object view(int no, Model model) throws Exception {
    Storage product = productService.get(no);
    
    HashMap<String,Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("product", product);
    resultMap.put("photos", product.getPhotoList());
    
    return resultMap;
  }
}












