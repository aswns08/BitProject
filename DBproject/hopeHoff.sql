-- 사용자정보
DROP TABLE IF EXISTS USER RESTRICT;

-- 가게리스트
DROP TABLE IF EXISTS SHOP RESTRICT;

-- 예약정보
DROP TABLE IF EXISTS RESERVATION RESTRICT;

-- 메뉴
DROP TABLE IF EXISTS MENU RESTRICT;

-- 후기
DROP TABLE IF EXISTS BOARD RESTRICT;

-- 사용자정보
CREATE TABLE USER (
  UID       VARCHAR(50) NOT NULL COMMENT '사용자아이디', -- 사용자아이디
  UNAME     VARCHAR(50) NOT NULL COMMENT '이름', -- 이름
  UTYPE     VARCHAR(30) NOT NULL COMMENT '타입', -- 타입
  UPASSWORD VARCHAR(50) NOT NULL COMMENT '암호', -- 암호
  UEMAIL    VARCHAR(40) NOT NULL COMMENT '이메일', -- 이메일
  UPHONE    VARCHAR(30) NOT NULL COMMENT '전화' -- 전화
)
COMMENT '사용자정보';

-- 사용자정보
ALTER TABLE USER
  ADD CONSTRAINT PK_USER -- 사용자정보 기본키
    PRIMARY KEY (
      UID -- 사용자아이디
    );

-- 사용자정보 유니크 인덱스
CREATE UNIQUE INDEX UIX_USER
  ON USER ( -- 사용자정보
    UEMAIL ASC -- 이메일
  );

-- 가게리스트
CREATE TABLE SHOP (
  BBNO   VARCHAR(20)  NOT NULL COMMENT '사업자번호', -- 사업자번호
  UID    VARCHAR(50)  NOT NULL COMMENT '사용자아이디', -- 사용자아이디
  SNAME  VARCHAR(50)  NOT NULL COMMENT '이름', -- 이름
  SADDR  VARCHAR(255) NOT NULL COMMENT '주소', -- 주소
  SPHONE VARCHAR(30)  NOT NULL COMMENT '전화번호', -- 전화번호
  STIME  VARCHAR(30)  NOT NULL COMMENT '운영시간', -- 운영시간
  SINTRO VARCHAR(255) NOT NULL COMMENT '소개', -- 소개
  SPHOTO VARCHAR(30)  NOT NULL COMMENT '사진', -- 사진
  SAREA  VARCHAR(30)  NOT NULL COMMENT '지역', -- 지역
  STYPE  VARCHAR(30)  NOT NULL COMMENT '장소타입', -- 장소타입
  SSNACK VARCHAR(30)  NOT NULL COMMENT '안주' -- 안주
)
COMMENT '가게리스트';

-- 가게리스트
ALTER TABLE SHOP
  ADD CONSTRAINT PK_SHOP -- 가게리스트 기본키
    PRIMARY KEY (
      BBNO -- 사업자번호
    );

-- 가게리스트 유니크 인덱스
CREATE UNIQUE INDEX UIX_SHOP
  ON SHOP ( -- 가게리스트
  );

-- 예약정보
CREATE TABLE RESERVATION (
  RNO      INTEGER      NOT NULL COMMENT '예약번호', -- 예약번호
  BBNO     VARCHAR(20)  NOT NULL COMMENT '사업자번호', -- 사업자번호
  RDATE    DATE         NOT NULL COMMENT '날짜', -- 날짜
  RCONTENT VARCHAR(255) NOT NULL COMMENT '내용', -- 내용
  UID      VARCHAR(50)  NOT NULL COMMENT '사용자아이디' -- 사용자아이디
)
COMMENT '예약정보';

-- 예약정보
ALTER TABLE RESERVATION
  ADD CONSTRAINT PK_RESERVATION -- 예약정보 기본키
    PRIMARY KEY (
      RNO -- 예약번호
    );

-- 예약정보 유니크 인덱스
CREATE UNIQUE INDEX UIX_RESERVATION
  ON RESERVATION ( -- 예약정보
  );

ALTER TABLE RESERVATION
  MODIFY COLUMN RNO INTEGER NOT NULL AUTO_INCREMENT COMMENT '예약번호';

-- 메뉴
CREATE TABLE MENU (
  MID    INTEGER     NOT NULL COMMENT '메뉴아이디', -- 메뉴아이디
  BBNO   VARCHAR(20) NOT NULL COMMENT '사업자번호', -- 사업자번호
  MNAME  VARCHAR(50) NOT NULL COMMENT '이름', -- 이름
  MPRICE INTEGER     NOT NULL COMMENT '가격', -- 가격
  MPHOTO VARCHAR(30) NOT NULL COMMENT '사진' -- 사진
)
COMMENT '메뉴';

-- 메뉴
ALTER TABLE MENU
  ADD CONSTRAINT PK_MENU -- 메뉴 기본키
    PRIMARY KEY (
      MID -- 메뉴아이디
    );

-- 메뉴 유니크 인덱스
CREATE UNIQUE INDEX UIX_MENU
  ON MENU ( -- 메뉴
  );

ALTER TABLE MENU
  MODIFY COLUMN MID INTEGER NOT NULL AUTO_INCREMENT COMMENT '메뉴아이디';

-- 후기
CREATE TABLE BOARD (
  RNO      INTEGER      NOT NULL COMMENT '예약번호', -- 예약번호
  BCONTENT VARCHAR(255) NOT NULL COMMENT '내용', -- 내용
  BDATE    DATE         NOT NULL COMMENT '날짜', -- 날짜
  BPHOTO   VARCHAR(30)  NOT NULL COMMENT '사진' -- 사진
)
COMMENT '후기';

-- 후기
ALTER TABLE BOARD
  ADD CONSTRAINT PK_BOARD -- 후기 기본키
    PRIMARY KEY (
      RNO -- 예약번호
    );

-- 후기 유니크 인덱스
CREATE UNIQUE INDEX UIX_BOARD
  ON BOARD ( -- 후기
  );

-- 가게리스트
ALTER TABLE SHOP
  ADD CONSTRAINT FK_USER_TO_SHOP -- 사용자정보 -> 가게리스트
    FOREIGN KEY (
      UID -- 사용자아이디
    )
    REFERENCES USER ( -- 사용자정보
      UID -- 사용자아이디
    );

-- 예약정보
ALTER TABLE RESERVATION
  ADD CONSTRAINT FK_SHOP_TO_RESERVATION -- 가게리스트 -> 예약정보
    FOREIGN KEY (
      BBNO -- 사업자번호
    )
    REFERENCES SHOP ( -- 가게리스트
      BBNO -- 사업자번호
    );

-- 예약정보
ALTER TABLE RESERVATION
  ADD CONSTRAINT FK_USER_TO_RESERVATION -- 사용자정보 -> 예약정보
    FOREIGN KEY (
      UID -- 사용자아이디
    )
    REFERENCES USER ( -- 사용자정보
      UID -- 사용자아이디
    );

-- 메뉴
ALTER TABLE MENU
  ADD CONSTRAINT FK_SHOP_TO_MENU -- 가게리스트 -> 메뉴
    FOREIGN KEY (
      BBNO -- 사업자번호
    )
    REFERENCES SHOP ( -- 가게리스트
      BBNO -- 사업자번호
    );

-- 후기
ALTER TABLE BOARD
  ADD CONSTRAINT FK_RESERVATION_TO_BOARD -- 예약정보 -> 후기
    FOREIGN KEY (
      RNO -- 예약번호
    )
    REFERENCES RESERVATION ( -- 예약정보
      RNO -- 예약번호
    );