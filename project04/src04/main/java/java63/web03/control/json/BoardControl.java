package java63.web03.control.json;

import java.util.HashMap;
import java63.web03.domain.Board;
import java63.web03.service.BoardService;

import javax.servlet.ServletContext;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@Controller("json.boardControl")
@RequestMapping("/json/board")
public class BoardControl {
  static Logger log = Logger.getLogger(BoardControl.class);
  static final int PAGE_DEFAULT_SIZE = 5;

  @Autowired
  BoardService boardService;
  @Autowired
  ServletContext servletContext;

  @RequestMapping(value = "/add", method = RequestMethod.POST)
  public Object add(Board board) throws Exception {

    /*
     * if (board.getPhotofile() != null && !board.getPhotofile().isEmpty()) {
     * 
     * String fileuploadRealPath = servletContext.getRealPath("/fileupload");
     * String filename = System.currentTimeMillis() + "_"; File file = new
     * File(fileuploadRealPath + "/" + filename);
     * 
     * board.getPhotofile().transferTo(file); board.setPhoto(filename); }
     */

    boardService.add(board);

    HashMap<String, Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");

    return resultMap;
  }

  @RequestMapping("/delete")
  public Object delete(int no) throws Exception {
    boardService.delete(no);

    HashMap<String, Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");

    return resultMap;
  }

  // required = false // 파라미터가 필요 없다면
  // defaultValue = "new" // default 값 설정
  @RequestMapping("/list")
  public Object list(@RequestParam(defaultValue = "1") int pageNo,
      @RequestParam(defaultValue = "7") int pageSize,
      @RequestParam(required = false) Boolean title,
      @RequestParam(required = false) Boolean content,
      @RequestParam(required = false) Boolean writer,
      @RequestParam(required = false) String search,
      @RequestParam(required = false) Boolean ifLike,
      @RequestParam(defaultValue = "new") String orderBy      
      ) throws Exception {
    
    System.out.println(">> control 쿼리입력값" 
    + " | " + title 
    + " | " + content
    + " | "+ writer
    + " | "+ search
    + " | "+ ifLike
    + " | "+ orderBy);
    
    if (pageSize <= 0)
      pageSize = PAGE_DEFAULT_SIZE;

    int maxPageNo = boardService.getMaxPageNo(pageSize, ifLike);

    if (pageNo <= 0)
      pageNo = 1;
    if (pageNo > maxPageNo)
      pageNo = maxPageNo;

    HashMap<String, Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("currPageNo", pageNo);
    resultMap.put("maxPageNo", maxPageNo);

    // 수정
    resultMap.put("boards", boardService.getList(pageNo, pageSize, 
        title, content, writer, search, ifLike, orderBy));

    return resultMap;
  }

  @RequestMapping("/update")
  public Object update(Board board) throws Exception {
    boardService.update(board);

    HashMap<String, Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    return resultMap;
  }

  @RequestMapping("/plusCount")
  public Object plusCount(int no) throws Exception {
    Board board = boardService.get(no);

    boardService.plusCount(board);

    HashMap<String, Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    return resultMap;
  }
  
  @RequestMapping("/plusReco")
  public Object plusReco(int no) throws Exception {
    Board board = boardService.get(no);

    int reco = boardService.plusReco(board);
    System.out.println("추천수 : " + reco);
    
    HashMap<String, Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("reco", reco);

    return resultMap;
  }

  @RequestMapping("/updateForm")
  public Object updateForm(int no, Model model) throws Exception {
    Board board = boardService.get(no);

    HashMap<String, Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("board", board);
    return resultMap;
  }

  @RequestMapping("/view")
  public Object view(int no, Model model) throws Exception {
    Board board = boardService.get(no);

    HashMap<String, Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("board", board);
    return resultMap;
  }

  @RequestMapping("/moveBoard")
  public Object moveBoard(@RequestParam(required = false) int no)
      throws Exception {
    Board board = boardService.get(no);
    int prev = boardService.getBoardNo(board, "prev");
    int next = boardService.getBoardNo(board, "next");

    HashMap<String, Object> resultMap = new HashMap<>();
    resultMap.put("status", "success");
    resultMap.put("prevBoard", prev);
    resultMap.put("nextBoard", next);

    return resultMap;
  }
}
