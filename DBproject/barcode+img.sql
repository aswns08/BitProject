-- 댓글
DROP TABLE IF EXISTS REPLY RESTRICT;

-- 회원정보
DROP TABLE IF EXISTS USERS RESTRICT;

-- 보관함
DROP TABLE IF EXISTS STORAGE RESTRICT;

-- 게시판
DROP TABLE IF EXISTS BOARD RESTRICT;

-- 바코드
DROP TABLE IF EXISTS BARCODE RESTRICT;

-- 게시판사진
DROP TABLE IF EXISTS BOARD_PHOTS RESTRICT;

-- 댓글
CREATE TABLE REPLY (
  RNO      INTEGER  NOT NULL COMMENT '댓글번호', -- 댓글번호
  BNO      INTEGER  NOT NULL COMMENT '게시글번호', -- 게시글번호
  UNO      INTEGER  NOT NULL COMMENT '회원번호', -- 회원번호
  RCONTENT TEXT     NOT NULL COMMENT '내용', -- 내용
  RDATE    DATETIME NOT NULL COMMENT '등록일' -- 등록일
)
COMMENT '댓글';

-- 댓글
ALTER TABLE REPLY
  ADD CONSTRAINT PK_REPLY -- 댓글 기본키
    PRIMARY KEY (
      RNO -- 댓글번호
    );

ALTER TABLE REPLY
  MODIFY COLUMN RNO INTEGER NOT NULL AUTO_INCREMENT COMMENT '댓글번호';

-- 회원정보
CREATE TABLE USERS (
  UNO   INTEGER      NOT NULL COMMENT '회원번호', -- 회원번호
  EMAIL VARCHAR(255) NOT NULL COMMENT '이메일', -- 이메일
  NAME  VARCHAR(255) NOT NULL COMMENT '별명', -- 별명
  PWD   VARCHAR(255) NOT NULL COMMENT '비밀번호' -- 비밀번호
)
COMMENT '회원정보';

-- 회원정보
ALTER TABLE USERS
  ADD CONSTRAINT PK_USERS -- 회원정보 기본키
    PRIMARY KEY (
      UNO -- 회원번호
    );

-- 회원정보 유니크 인덱스
CREATE UNIQUE INDEX UIX_USERS
  ON USERS ( -- 회원정보
    EMAIL ASC, -- 이메일
    NAME ASC   -- 별명
  );

ALTER TABLE USERS
  MODIFY COLUMN UNO INTEGER NOT NULL AUTO_INCREMENT COMMENT '회원번호';

-- 보관함
CREATE TABLE STORAGE (
  SNO      INTEGER      NOT NULL COMMENT '보관함번호', -- 보관함번호
  CATEGORY VARCHAR(255) NULL     COMMENT '분류', -- 분류
  SDATE    VARCHAR(255) NULL     COMMENT '출시일/등록일', -- 출시일/등록일
  LINK     VARCHAR(255) NULL     COMMENT '링크', -- 링크
  UNO      INTEGER      NULL     COMMENT '회원번호', -- 회원번호
  PRICE    INTEGER      NULL     COMMENT '최저가', -- 최저가
  TITLE    VARCHAR(255) NULL     COMMENT '상품명', -- 상품명
  IMG_URL  VARCHAR(255) NULL     COMMENT '이미지경로', -- 이미지경로
  DOCID    VARCHAR(255) NULL     COMMENT '상품아이디' -- 상품아이디
)
COMMENT '보관함';

-- 보관함
ALTER TABLE STORAGE
  ADD CONSTRAINT PK_STORAGE -- 보관함 기본키
    PRIMARY KEY (
      SNO -- 보관함번호
    );

ALTER TABLE STORAGE
  MODIFY COLUMN SNO INTEGER NOT NULL AUTO_INCREMENT COMMENT '보관함번호';

-- 게시판
CREATE TABLE BOARD (
  BNO     INTEGER      NOT NULL COMMENT '게시글번호', -- 게시글번호
  UNO     INTEGER      NOT NULL COMMENT '회원번호', -- 회원번호
  PNO     VARCHAR(255) NULL     COMMENT '제품번호', -- 제품번호
  IFLIKE  BOOLEAN      NOT NULL COMMENT '좋아요여부', -- 좋아요여부
  TITLE   VARCHAR(255) NOT NULL COMMENT '제목', -- 제목
  CONTENT TEXT         NOT NULL COMMENT '내용', -- 내용
  BDATE   DATETIME     NOT NULL COMMENT '등록일', -- 등록일
  COUNT   INTEGER      default '0' NOT NULL COMMENT '조회수', -- 조회수
  RECO    INTEGER      default '0' NOT NULL COMMENT '추천수', -- 추천수
  IMG     VARCHAR(255) NULL     COMMENT '이미지URL' -- 이미지URL
)
COMMENT '게시판';

-- 게시판
ALTER TABLE BOARD
  ADD CONSTRAINT PK_BOARD -- 게시판 기본키
    PRIMARY KEY (
      BNO -- 게시글번호
    );

ALTER TABLE BOARD
  MODIFY COLUMN BNO INTEGER NOT NULL AUTO_INCREMENT COMMENT '게시글번호';

-- 바코드
CREATE TABLE BARCODE (
  BARCODENO VARCHAR(255) NOT NULL COMMENT '바코드번호', -- 바코드번호
  PNO       VARCHAR(255) NULL     COMMENT '제품번호', -- 제품번호
  PNAME     VARCHAR(255) NULL     COMMENT '제품명' -- 제품명
)
COMMENT '바코드';

-- 바코드
ALTER TABLE BARCODE
  ADD CONSTRAINT PK_BARCODE -- 바코드 기본키
    PRIMARY KEY (
      BARCODENO -- 바코드번호
    );

-- 게시판사진
CREATE TABLE BOARD_PHOTS (
  BBNO INTEGER      NOT NULL COMMENT '사진번호', -- 사진번호
  URL  VARCHAR(255) NOT NULL COMMENT '사진경로', -- 사진경로
  BNO  INTEGER      NULL     COMMENT '게시글번호' -- 게시글번호
)
COMMENT '게시판사진';

-- 게시판사진
ALTER TABLE BOARD_PHOTS
  ADD CONSTRAINT PK_BOARD_PHOTS -- 게시판사진 기본키
    PRIMARY KEY (
      BBNO -- 사진번호
    );

ALTER TABLE BOARD_PHOTS
  MODIFY COLUMN BBNO INTEGER NOT NULL AUTO_INCREMENT COMMENT '사진번호';

-- 댓글
ALTER TABLE REPLY
  ADD CONSTRAINT FK_BOARD_TO_REPLY -- 게시판 -> 댓글
    FOREIGN KEY (
      BNO -- 게시글번호
    )
    REFERENCES BOARD ( -- 게시판
      BNO -- 게시글번호
    );

-- 댓글
ALTER TABLE REPLY
  ADD CONSTRAINT FK_USERS_TO_REPLY -- 회원정보 -> 댓글
    FOREIGN KEY (
      UNO -- 회원번호
    )
    REFERENCES USERS ( -- 회원정보
      UNO -- 회원번호
    );

-- 보관함
ALTER TABLE STORAGE
  ADD CONSTRAINT FK_USERS_TO_STORAGE -- 회원정보 -> 보관함
    FOREIGN KEY (
      UNO -- 회원번호
    )
    REFERENCES USERS ( -- 회원정보
      UNO -- 회원번호
    );

-- 게시판
ALTER TABLE BOARD
  ADD CONSTRAINT FK_USERS_TO_BOARD -- 회원정보 -> 게시판
    FOREIGN KEY (
      UNO -- 회원번호
    )
    REFERENCES USERS ( -- 회원정보
      UNO -- 회원번호
    );

-- 게시판사진
ALTER TABLE BOARD_PHOTS
  ADD CONSTRAINT FK_BOARD_TO_BOARD_PHOTS -- 게시판 -> 게시판사진
    FOREIGN KEY (
      BNO -- 게시글번호
    )
    REFERENCES BOARD ( -- 게시판
      BNO -- 게시글번호
    );