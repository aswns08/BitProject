var saveList = null;
var community = false;
var searchKey = null;

/** ********** 검색 결과 ***************** */
var currPageNo;
var maxPageNo;
var saveOrderBy = "";
var ifLike = "";

$(function() {
	$("#left-panel").load("../auth/menu.html", function() {
		$("#myPage").page("destroy").page();
	});

	searchKey = decodeURI(url('?searchKey'));
	console.log(searchKey);

	/* 최초 검색 결과 */
	daumShoppingSearch.init();
	daumShoppingSearch.search();
	loadAddMoreBtn();

	$('#searchPrice').click(function(event) {
		// alert('가격검색결과');
		/* 최초 검색 결과 */
		community = false;
		console.log(community);

		daumShoppingSearch.init();
		daumShoppingSearch.search();
		loadAddMoreBtn();
	});

	$('#good').click(function(event) {
		// alert('좋아요');
		community = true;
		ifLike = true;
		loadGoodboard(1, searchKey);
	});

	$('#bad').click(function(event) {
		// alert('나빠요');
		community = true;
		ifLike = false;
		loadBadboard(1, searchKey);
	});
});

$(document).on('click', '.data-row a', function() {
	// console.log($(this).attr('data-no'));
	plusCount($(this).attr('data-no'));
});

$(document).on("click", "#select-choice", function() {
	// alert($("#select-choice").val());
	daumShopping.sort = $("#select-choice").val();
	daumShoppingSearch.search();
});

$(document).on("click", ".heart", function(){
  console.log('하트클릭' + $('.heart').index(this));
  var index = $('.heart').index(this);
  var style = {
      'opacity' : '1',
      'filter' : 'none',
      '-webkit-filter' : 'grayscale(0%)'
  };
  var color = $('.heart:eq(' + index + ')').css("-webkit-filter"); //버튼 위치의 대한 색
  var red = "grayscale(0)"; //red
  var gray = "grayscale(1)"; //gray

  $.post('../json/storage/view.do'  
      , { 
        docid: saveList[index].docid //세션안에 있는 uno
      }
      , function(result){  
        if (result.status == "success") {
          console.log("성공?????");
          if(result.storage == null & color == gray){
            console.log("성공22222?????");
            $('.heart:eq(' + index + ')').css(style); //하트색 변경(빨간색)

            $.post('../json/storage/add.do'   
                , {   
                  uno :  1,//세션안에 있는 uno
                  title : saveList[index].title,
                  price : saveList[index].price_min,
                  category : saveList[index].category_name,
                  sdate: saveList[index].publish_date,
                  link: saveList[index].link,
                  img_url: saveList[index].image_url,
                  docid: saveList[index].docid

                }

                , function(result){  
                  if (result.status == "success") {
                    alert("상품등록 성공!!");
                  } else {
                    alert("등록 실패!");
                  }
                } 
                , 'json'  )

                .fail(function(jqXHR, textStatus, errorThrown){ 
                  alert(textStatus + ":" + errorThrown);
                });

          }else if(result.storage == null & color == red){
            console.log("이상한 조건..");
          }else{
            if(color == gray){
              $('.heart:eq(' + index + ')').css(style);
              alert("이미 등록된 상품입니다.");
            }else{
              $('.heart:eq(' + index + ')').css("opacity", "0.2").css("-webkit-filter","grayscale(100%)"); //하트색 변경(그레이)
              $.post('../json/storage/delete.do'  
                  , { 
                    docid: saveList[index].docid //세션안에 있는 uno
                  }
                  , function(result){  
                    if (result.status == "success") {
                      console.log("제거성공!");
                      alert("보관함 목록에서 제거되었습니다.");

                    } else {
                      alert("등록 실패!");
                    }
                  } 
                  , 'json'     )
                  .fail(function(jqXHR, textStatus, errorThrown){ 
                    alert(textStatus + ":" + errorThrown);
                  });
            }
          }

        } else {
          alert("등록 실패!");
        }
      } 
      , 'json'     )
      .fail(function(jqXHR, textStatus, errorThrown){ 
        alert(textStatus + ":" + errorThrown);
      });
});


$(document).on(
		"click",
		"#addMoreBtn",
		function() {
			if (community) {
				loadBoardList(currPageNo + 1, 'new', ifLike, true, false,
						false, searchKey);
			} else {
				daumShopping.pgno += 1;
				daumShopping.pingSearch(daumShopping.pgno);
			}
		});

var daumShoppingSearch = {
	/** 초기화. * */
	init : function() {
		console.log('daumShoppingSearch 초기화');

		this.apikey = "e38e5c77dea80a89e0e857cf0ee268dd4879734c";

		this.q = "'" + searchKey + "'";
		console.log("검색 키워드 : " + this.q);

		// 검색 객체들 초기화.
		daumShopping.init(6);
	},
	/** 검색 * */
	search : function() {
		console.log('daumShoppingSearch search()');

		this.query = '?apikey=' + this.apikey + '&output=json&q='
				+ this.q;
		console.log(this.query);

		// 검색어에 맞게 각각 첫페이지를 띄움.
		daumShopping.pingSearch(1);
	},
	/** callback 함수 호출. * */
	pingSearch : function(api, pgno, callback, result, sort) {
		$.ajax({
			url : api + this.query + encodeURI(this.q) + '&pageno=' + pgno
					+ '&result=' + result + '&sort=' + sort,
			type : "GET",
			dataType : "jsonp",
			crossDomain : true,
			contentType : "text/json;charset=UTF-8",
			success : function(responseData, textStatus, errorThrown) {
				if (saveList == null) {
					saveList = responseData.channel.item;
					/*
					 * resultNav(responseData);
					 */} else {
					$.merge(saveList, responseData.channel.item);
				}

				var transfromData = yyyyMMddpriceResultFormat(responseData);
				transfromData = priceFormat(transfromData);

				daumShoppingSearch.pongSearch(transfromData);
			},
			error : function(responseData, textStatus, errorThrown) {
				alert('POST failed.');
			}
		});

	},
	/** 결과를 뿌려줌. * */
	pongSearch : function(data) {
	  console.log("결과 데이터------------>",data);
		if (daumShopping.pgno == 1) {
			require([ 'text!templates/api-top.html' ], function(html) {
				var template = Handlebars.compile(html);
				$('#listDiv').html(template(data));
			});
		}

		require([ 'text!templates/api-table.html' ], function(html) {
			var template = Handlebars.compile(html);

			$("#listDiv").append(template(data));

			$('#myPage').page('destroy').page();
		});
	}
};

/** 쇼핑 검색. * */
var daumShopping = {
	/** 초기화. * */
	init : function(r) {
		console.log('daumShopping 초기화');

		daumShopping.api = 'http://apis.daum.net/shopping/search';
		daumShopping.pgno = 1;
		daumShopping.result = r;
		daumShopping.sort = 'min_price';
	},
	/** callback 함수 호출. * */
	pingSearch : function(pgno) {
		daumShopping.pgno = pgno;

		var callback = 'daumShopping.pongSearch';

		daumShoppingSearch.pingSearch(daumShopping.api, daumShopping.pgno,
				callback, daumShopping.result, daumShopping.sort);
	}
};

function yyyyMMddpriceResultFormat(data) {
	var str;
	var date;

	for ( var i in data.channel.item) {
		date = data.channel.item[i].publish_date;
		str = date.substr(0, 4) + "." + date.substr(4, 2) + "."
				+ date.substr(6, 2);
		data.channel.item[i].publish_date = str;
	}

	return data;
}

function priceFormat(data) {
	var price;
	for ( var i in data.channel.item) {
		price = data.channel.item[i].price_min;
		data.channel.item[i].price_min = price.split(/(?=(?:\d{3})+(?:\.|$))/g)
				.join(',');
	}

	return data
}

/** ********** 검색 결과 ***************** */
function loadGoodboard(pageNo, data) {
	loadBoardList(pageNo, 'new', ifLike, true, true, false, data);
}

function loadBadboard(pageNo, data) {
	loadBoardList(pageNo, 'new', ifLike, true, true, false, data);
}

function setPageNo(pageNo, maxPageNo) {
	window.currPageNo = pageNo;
	window.maxPageNo = maxPageNo;
}

function plusCount(bno) {
	console.log('조회수증가 ' + bno);
	$.post('../json/board/plusCount.do' /* URL */
	, { /* 서버에 보낼 데이터를 객체에 담아 넘긴다 */
		no : bno
	}, function(result) { /* 서버로부터 응답을 받았을 때 호출될 메서드 */
		if (result.status == "success") {
			$('#btnCancel').click(); // click 이벤트 발생시킴.
			location.href = '../board/boardView.html?no=' + bno;
		} else {
			alert("등록 실패!");
		}
	}, 'json' /* 서버가 보낸 데이터를 JSON 형식으로 처리 */)
	/* 서버 요청이 실패했을 때 호출될 함수 등록 */
	.fail(function(jqXHR, textStatus, errorThrown) {
		alert(textStatus + ":" + errorThrown);
	});
}

function loadBoardList(pageNo, orderBy, ifLike, title, content, writer, search) {
	// console.log($("#select-native-1").val());
	saveOrderBy = orderBy;

	if (pageNo <= 0)
		pageNo = currPageNo;

	if (orderBy == null)
		orderBy = "";
	if (ifLike == null)
		ifLike = "";
	if (title == null)
		title = "";
	if (content == null)
		content = "";
	if (writer == null)
		writer = "";
	if (search == null)
		search = "";

	$.getJSON('../json/board/list.do?pageNo=' + pageNo + '&orderBy=' + orderBy
			+ '&ifLike=' + ifLike + '&title=' + title + '&writer=' + writer
			+ '&content=' + content + '&search=' + search, function(data) {
		var boards = data.boards;

		console.log("불러온 데이터 수: " + boards.length);
		// console.log(boards);
		if (boards.length == 0) {
			var msg = '검색된 결과가 없습니다.';
			$('#listDiv').html(msg);
			setPageNo(null, null);

		} else {
			yyyyMMddList(boards);

			require([ 'text!../board/templates/board-table.html' ], function(
					html) {
				var template = Handlebars.compile(html);

				if (currPageNo == 1) {
					$('#listDiv').html(template(data));
				} else {
					$('#listDiv').append(template(data));
				}

				$('#myPage').page('destroy').page();
			});
			setPageNo(data.currPageNo, data.maxPageNo);
		}
		loadAddMoreBtn();
	});
}

/* 날짜 포맷 */
function yyyyMMddList(boards) {
	if (boards) {
		// 현재날짜
		var currentDate = new Date();
		// console.log("현재날짜 :" + currentDate);

		var str;
		for ( var board in boards) {
			// 데이터베이스 날짜
			var dbDate = new Date(boards[board].date);

			str = "";
			if (!compareDate(currentDate, dbDate)) {
				str = dbDate.getFullYear() + '.';

				if (dbDate.getMonth() < 9)
					str += '0';
				str += (dbDate.getMonth() + 1) + '.';

				if (dbDate.getDate() < 10)
					str += '0';
				str += dbDate.getDate();
			} else {
				if (dbDate.getHours() < 10)
					str += '0';
				str += dbDate.getHours() + ":";

				if (dbDate.getMinutes() < 10)
					str += '0';
				str += dbDate.getMinutes();
			}

			boards[board].date = str;
		}
	} else {
		return '';
	}
}

function compareDate(currentDate, dbDate) {
	if (yyyyMMdd(currentDate) == yyyyMMdd(dbDate))
		return true;
	else
		false;
}

function yyyyMMdd(date) {
	if (date) {
		var date = new Date(date);
		var str = date.getFullYear();

		if (date.getMonth() < 9)
			str += '0';
		str += (date.getMonth() + 1);

		if (date.getDate() < 10)
			str += '0';
		str += date.getDate();

		return str;

	} else {
		return '';
	}
}

function loadAddMoreBtn() {
	if (community) {
		/*
		 * console.log("currPageNo : " + currPageNo + "\nmaxPageNo : " +
		 * maxPageNo);
		 */
		if ((currPageNo + 1) < maxPageNo) {
			$('#addMoreA').css('display', '');
		} else {
			$('#addMoreA').css('display', 'none');
		}
	} else {
		$('#addMoreA').css('display', '');
	}
}
