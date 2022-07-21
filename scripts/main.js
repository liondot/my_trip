$(function () {

    // 스크롤을 내릴때 메뉴 영역배경 변경
    $(window).scroll(function () {
        let top = $(window).scrollTop();

        if (top > 0) {
            $('#header').addClass('inverted')
        } else {
            $('#header').removeClass('inverted')
        }
    })

    // 새로고침할 경우 스크롤 이벤트 핸들러가 실행되도록 이벤트를 임의로 발생
    $(window).trigger('scroll');

    let dpFrom = $('#from').datepicker({
        dateFormat: 'yy-mm-dd',
        minDate: 0,
        // 종료 날짜가 시작 날짜보다 더 이전으로 선택 할 수 없는 코드 
        onSelect: function () {
            dpTo.datepicker('option', 'minDate', dpFrom.datepicker('getDate'))
        }
    });


    let dpTo = $('#to').datepicker({
        dateFormat: 'yy-mm-dd',
        minDate: 0
    })

    dpFrom.datepicker('setDate', new Date())

    // 3박4일 표시: 오늘 날짜에 4일을 더한 날짜로 설정 
    dpTo.datepicker('setDate', 4)

    $('#form_search').submit(function(e) {
        e.preventDefault();

        let from = $('#from').val();
        let to = $('#to').val();

        search(from, to)
    })

    function search(from, to) {
        let url = 'https://javascript-basic.appspot.com/searchLocation'

        $.getJSON(url, {
            from: from,
            to: to
        }, function (r) {
            let $list = $('#list_panel');

            for(let i = 0; i < r.length; i++){
                let data = r[i];
                let $item = createListItem(data);

                $list.append($item);
            }

            $('#list_bg').show();
        })
    }

    function createListItem(data) {
        let $tmpl = $('#list_item_template').clone().removeAttr('id');

        $tmpl.find('.list_item_image').attr('src', data.titleImageUrl);
        $tmpl.find('.list_item_name').html(data.name);
        $tmpl.find('.list_item_city_name').html(data.cityName);

        $tmpl.click(function(e) {
            let url = 'detail.html?id =' + data.id;
            window.location = url;
        })

        return $tmpl
    }

})