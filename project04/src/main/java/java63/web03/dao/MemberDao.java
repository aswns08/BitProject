package java63.web03.dao;

import java.util.Map;
import java63.web03.domain.Users;

public interface MemberDao {
  Users existUser(Map<String,String> params);
}
