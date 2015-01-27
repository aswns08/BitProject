
/* 회원정보 입력 */
insert into USERS(email,name,pwd) values('test01@test.com', '홍길동','1111');
insert into USERS(email,name,pwd) values('test02@test.com', '임꺽정','2222');
insert into USERS(email,name,pwd) values('test03@test.com', '이순신','3333');

select * from USERS;

/* 게시판정보 입력 */

insert into BOARD(UNO,IFLIKE,TITLE,CONTENT,DATE)
values(1,true,'java책 추천','이 책 좋아요!!!!','2014-12-25');

insert into BOARD(UNO,IFLIKE,TITLE,CONTENT,DATE)
values(2,false,'java책 비추','이 책 진짜 별로~~!','2014-12-27');



select * from BOARD;


/* 보관함 */
insert into STORAGE(DOCID,UNO,TITLE,PRICE,CATEGORY,SDATE,LINK,IMG_URL)
values('a12',1,'지갑',250000,'패션잡화','2014-12-28','G마켓','이미지');



select * from STORAGE;

/* 업데이트 할 경우 */
update STORAGE set 
UNO=1
where DOCID='a12';



/* 댓글 */
insert into REPLY(GNO,UNO,RCONTENT,DATE)
values(1,1,'좋아요!!', '2014-12-29');

insert into REPLY(GNO,UNO,RCONTENT,DATE)
values(2,2,'별로네..', '2014-12-30');

insert into REPLY(GNO,UNO,RCONTENT,DATE)
values(3,3,'좋아요.....', '2014-12-31');

select * from REPLY;


/* 바코드 정보 */
insert into BARCODE(BARCODENO, PNAME)
values(9788968480423, '모던 웹을 위한 JavaScript jQuery입문');

insert into BARCODE(BARCODENO, PNAME)
values(8801619046180, 'Vaseline');

insert into BARCODE(BARCODENO, PNAME)
values(8801382129608, '하늘보리');

insert into BARCODE(BARCODENO, PNAME)
values(3401399372346, 'Bioderma Atoderm Lips Moisturising Stick');

insert into BARCODE(BARCODENO, PNAME)
values(3605970008857,'kiehls lip balm');

insert into BARCODE(BARCODENO, PNAME)
values();


COUNT   INTEGER      default '0' NOT NULL COMMENT '조회수', -- 조회수
  RECO    INTEGER      default '0' NOT NULL COMMENT '추천수', -- 추천수


