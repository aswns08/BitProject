
/* 회원정보 입력 */
insert into USERS(email,name,pwd) values('test01@test.com', '홍길동','1111');
insert into USERS(email,name,pwd) values('test02@test.com', '임꺽정','2222');
insert into USERS(email,name,pwd) values('test03@test.com', '이순신','3333');

select * from USERS;

/* 게시판정보 입력 */

insert into BOARD(UNO,IFLIKE,TITLE,CONTENT,BDATE)
values(1,true,'java책 추천','이 책 좋아요!!!!','2014-12-25');

insert into BOARD(UNO,IFLIKE,TITLE,CONTENT,BDATE)
values(2,false,'java책 비추','이 책 진짜 별로~~!','2014-12-27');

select * from BOARD;


/* 댓글 */
insert into REPLY(BNO,UNO,RCONTENT,RDATE)
values(1,1,'좋아요!!', '2014-12-29');

insert into REPLY(BNO,UNO,RCONTENT,RDATE)
values(1,2,'별로네..', '2014-12-30');

insert into REPLY(BNO,UNO,RCONTENT,RDATE)
values(1,3,'OHHORA..!!!!', '2014-12-30');

insert into REPLY(BNO,UNO,RCONTENT,RDATE)
values(2,1,'오호라~~~~~', '2014-12-31');

insert into REPLY(BNO,UNO,RCONTENT,RDATE)
values(2,3,'그냥 그렇네요.....', '2014-12-31');



select * from REPLY;


/* 바코드 정보 */
insert into BARCODE(BARCODENO, PNAME)
values(9788995379493, 'Java의 정석');

insert into BARCODE(BARCODENO, PNAME)
values(9788968480423, '모던 웹을 위한 JavaScript jQuery입문');

insert into BARCODE(BARCODENO, PNAME)
values(8801619046180, 'Vaseline');




