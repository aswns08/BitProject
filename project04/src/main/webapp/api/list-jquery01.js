var saveList = null;

$(function() {
	/* 최초 검색 결과 */
	daumShoppingSearch.init();
	daumShoppingSearch.search();

	$('#minPrice').click(function(event) {
		// alert('낮은가격순');
		daumShopping.sort = 'min_price';
		daumShoppingSearch.search();
	});	

	$('#max_price').click(function(event) {
		// alert('높은가격순');
		daumShopping.sort = 'max_price';
		daumShoppingSearch.search();
	});

	$('#pop').click(function(event) {
		// alert('인기순');
		daumShopping.sort = 'pop';
		daumShoppingSearch.search();
	});

	$('#searchPrice').click(function(event) {
		alert('가격검색결과');
	});

	$('#good').click(function(event) {
		alert('좋아요');
	});

	$('#bad').click(function(event) {
		alert('나빠요');
	});
});

$(document).on("click", ".heart", function(){
	console.log('하트클릭' + $('.heart').index(this));
	var index = $('.heart').index(this);
	var style = { 
			'opacity' : '1', 
			'filter' : 'none',
			 '-webkit-filter' : 'grayscale(0%)' 
				 };
	$('.heart:eq(' + index +')').css(style);
	
	console.log("하트 선택 : " + saveList[index].title);
});

$(document).on("click", "#addMoreBtn", function(){
	alert('더보기');	
	daumShopping.pgno += 1;
	alert('더보기' + daumShopping.pgno);	

	daumShopping.pingSearch(daumShopping.pgno);	
});

// 데이터 뽑아내기
function parseDate(index) {
	console.log($('ul#listView li:eq(' + index +')').html());
}

var daumShoppingSearch = {
	/** 초기화. * */
	init : function() {
		console.log('daumShoppingSearch 초기화');

		this.apikey = "e38e5c77dea80a89e0e857cf0ee268dd4879734c";

		// this.q = document.getElementById('daumShoppingSearch');
		/* 추가 : 입력한 searchKey 에 따라 검색 */
		this.q = getURLParameter('searchKey');
		console.log("검색 키워드 : " + this.q);

		// 검색 객체들 초기화.
		daumShopping.init(6);
	},
	/** 검색 * */
	search : function() {
		console.log('daumShoppingSearch search()');
		
		this.query = '?apikey=' + this.apikey + '&output=json&q='
				+ encodeURI(this.q);

		console.log(this.query);

		// 검색어에 맞게 각각 첫페이지를 띄움.
		daumShopping.pingSearch(1);
	},
	/** callback 함수 호출. * */
	pingSearch : function(api, pgno, callback, result, sort) {
		console.log("daumShoppingSearch pingSearch()");
		// $("#daumShoppingScript").html() = " ";

		$.ajax({
			url : api + this.query + encodeURI(this.q) + '&pageno=' + pgno
					+ '&result=' + result + '&sort=' + sort,
			type : "GET",
			dataType : "jsonp",
			crossDomain : true,
			// jsonp : "callback",
			contentType : "text/json;charset=UTF-8",

			success : function(responseData, textStatus, errorThrown) {
				// console.log('성공');				
				if (saveList == null) {
					saveList = responseData.channel.item;
					console.log("1");
				} else {
					saveList += responseData.channel.item;

				}
				//console.log(saveList);

				daumShoppingSearch.pongSearch(responseData);
			},
			error : function(responseData, textStatus, errorThrown) {
				alert('POST failed.');
			}
		});

	},
	/** 결과를 뿌려줌. * */
	pongSearch : function(data) {
		console.log("daumShoppingSearch pongSearch()");
		// console.log(data);
		var item = data.channel.item;

		//console.log(item);

		require([ 'text!templates/api-table.html' ], function(html) {
			var template = Handlebars.compile(html);
			$('#listDiv').html(template(data));
			$('#board').page('destroy').page();
		});
	},
	/** PageNumber를 그려줌. * */
	pongPgno : function(pgno, max, func) {
		var maxpg = (pgno + 6 < max) ? pgno + 6 : max;

		var div = document.createElement('div');
		div.align = 'center';
		div.style.clear = 'left';

		// 좌측 화살표.
		var left = document.createElement('a');
		left.innerHTML = "<< ";
		if (pgno - 5 > 1)
			this.onMouseDown(left, pgno - 6, func);
		else {
			// left.style.color = "gray";
			left.style.cursor = "default";
		}
		div.appendChild(left);

		// 페이지 번호.
		for (var i = (pgno - 5 > 1) ? pgno - 5 : 1; i < maxpg; i++) {
			var a = document.createElement('a');
			a.innerHTML = " " + i + " ";

			if (i == pgno) {
				// a.style.color = 'yellow';
				a.style.cursor = "default";
			} else
				this.onMouseDown(a, i, func);

			div.appendChild(a);
		}

		// 우측 화살표.
		var right = document.createElement('a');
		right.innerHTML = ">> ";
		if (pgno + 6 < max)
			this.onMouseDown(right, pgno + 7, func);
		else {
			right.style.color = "gray";
			right.style.cursor = "default";
		}
		div.appendChild(right);

		return div;
	},

	/* 더보기 : 다음페이지로 */
	nextPage : function(pgno, max, func) {
		var div = document.createElement('div');
		div.align = 'center';

		// if (pageno+1 < max) {
		div.innerHTML = '더보기';
		this.onMouseDown(div, pgno + 1, func);
		// }

		return div;
	},

	/** 마우스 이벤트. * */
	onMouseDown : function(a, i, func) {
		a.style.cursor = 'pointer';
		a.onmousedown = function() {
			func(i);
		}
	},
	/** HTML태그 안 먹게 하는 함수 * */
	escapeHtml : function(str) {
		str = str.replace(/&amp;/g, "&");
		str = str.replace(/&lt;/g, "<");
		str = str.replace(/&gt;/g, ">");
		return str;
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
		console.log("daumShopping pingSearch()\n" + "page 번호 : " + pgno);
		daumShopping.pgno = pgno;

		var callback = 'daumShopping.pongSearch';

		daumShoppingSearch.pingSearch(daumShopping.api, daumShopping.pgno,
				callback, daumShopping.result, daumShopping.sort);
	}	
};

/* url parse */
function getURLParameter(name) {
	return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [
			, null ])[1]);
}