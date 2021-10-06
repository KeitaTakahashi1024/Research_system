// 送信する情報
var postInfo = {
    "keyword" : "",       //検索ワード
    'jinbutsu': "false",  //人物伝にチェック入れているか
    "shishi": "false",    //函館市史にチェック入れているか
    "webmap": "false",    //道南文化財にチェック入れているか
    "digital": "false"    //デジタル資料館にチェック入れているか
};


if(localStorage.length >= 0){
    var web_list = ["jinbutsu","shishi","webmap","digital"];
    var info = JSON.parse(localStorage.getItem("search"));
    console.log(info);
    checkSearchBoxText (info.keyword);
    setCheckBox(info.jinbutsu, web_list[0]);
    setCheckBox(info.shishi, web_list[1]);
    setCheckBox(info.webmap, web_list[2]);
    setCheckBox(info.digital, web_list[3]);
    localStorage.removeItem('search');
}

var jsonData = [];


// 前の検索でヒットした資料の数
var oldJsonLength = 0;

/* 検索ボックスに検索ワードが入れられた際にテキストを変数に入れる関数"*/
function checkSearchBoxText (text) {
    var _input_text = text
    postInfo.keyword = _input_text;
    postJson(postInfo);
}

/* チェックボックスがどこにチェックされているか確認する関数 */
function isCheckBox (isChecked, element_id) {
    var _isChecked = isChecked;

    // チェックされたら反対の値を返す
    if(_isChecked == "true"){
        _isChecked = "false";
    }else{
        _isChecked = "true";
    }

    var _element_id = element_id;
    var _element_checkbox = document.getElementById(_element_id); //チェックボックスの場所をidで探す

    //どこのチェックボックスに入れられたか
    switch (_element_id) {
        case 'jinbutsu': //函館ゆかりの人物伝の場合
            _element_checkbox.setAttribute("value", _isChecked);
            postInfo.jinbutsu = _isChecked;
            postJson(postInfo);
            break;
        case 'shishi': //函館市史デジタル版の場合
            _element_checkbox.setAttribute("value", _isChecked);
            postInfo.shishi = _isChecked;
            postJson(postInfo);
            break;
        case 'webmap': //道南文化財の場合
            _element_checkbox.setAttribute("value", _isChecked);
            postInfo.webmap = _isChecked;
            postJson(postInfo);
            break;
        case 'digital': //デジタル資料館の場合
            _element_checkbox.setAttribute("value", _isChecked);
            postInfo.digital = _isChecked;
            postJson(postInfo);
            break;
        default: //その他
          console.log("選択されてない");
      }
}

/* チェックボックスがどこにチェックされているか確認する関数 */
function setCheckBox (isChecked, element_id) {
    var _isChecked = isChecked;

    var _element_id = element_id;
    var _element_checkbox = document.getElementById(_element_id); //チェックボックスの場所をidで探す

    //どこのチェックボックスに入れられたか
    switch (_element_id) {
        case 'jinbutsu': //函館ゆかりの人物伝の場合
            console.log("aaii")
            _element_checkbox.setAttribute("value", _isChecked);
            postInfo.jinbutsu = _isChecked;
            postJson(postInfo);
            break;
        case 'shishi': //函館市史デジタル版の場合
            _element_checkbox.setAttribute("value", _isChecked);
            postInfo.shishi = _isChecked;
            postJson(postInfo);
            break;
        case 'webmap': //道南文化財の場合
            _element_checkbox.setAttribute("value", _isChecked);
            postInfo.webmap = _isChecked;
            postJson(postInfo);
            break;
        case 'digital': //デジタル資料館の場合
            _element_checkbox.setAttribute("value", _isChecked);
            postInfo.digital = _isChecked;
            postJson(postInfo);
            break;
        default: //その他
          console.log("選択されてない");
      }
}

/* APIサーバーにデータを送り、返り値を受け取る関数 */
async function postJson (data){
    var _data = data;
    var _url = 'http://localhost:5000/locations'; // APIサーバーのURL
    // 送るデータ
    var response = await fetch(_url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(_data)
    }).then(function(response) {
        return response.json();
        /* 受け取ったデータをHTMLに反映させる処理 */
    }).then(function(result) {
        var _json = JSON.parse(JSON.stringify(result));
        jsonData = _json;
        var _json_length = _json.length;
        //createJson();

        var _card_parent = document.getElementById('card_main');
        var _card_child = document.querySelectorAll('.card');
        var _error_text = document.getElementById('error');


        // 取得した資料の数に応じて行う処理

        if(_json_length == 0) { // 資料がゼロだったら
            //カードを隠す
            _card_parent.style.display = "none";
            //エラー文を表示
            _error_text.style.display = "block";

            // 前の検索でヒットした資料の数だけ、カードを削除する処理
            for(var i = oldJsonLength - 1; i > 0; i --) {
                _card_parent.removeChild(_card_child[i]);
            }
        //
        } else { // 資料が複数あったら
            // カードを表示
            _card_parent.style.display = "block";
            // エラー文を隠す
            _error_text.style.display = "none";
            for(var i = oldJsonLength - 1; i > 0; i --) {
                _card_parent.removeChild(_card_child[i]);
            }

        }

        // 前の検索結果の数を入れる
        oldJsonLength = _json_length;


        // 資料の数だけ、HTMLに表示するカードを複製する。
        for (var i = 0; i < _json_length - 1; i++) {
            var _clone = _card_parent.firstElementChild.cloneNode(true);
            _card_parent.appendChild(_clone);
        }

        // 要素の中で、タイトルを表示する部分を全て取得
        var _card_title = document.querySelectorAll('.card-title');

        // 要素の中で、説明文を表示する部分を全て取得
        var _card_description = document.querySelectorAll('.card-text');

        // 要素の中で、画像を表示する部分を全て取得
        var _card_image = document.querySelectorAll('#card-image');
        
        // 資料の数だけ、HTMLに表示するカードの中にタイトルや説明文などを挿入する
        for (var i = 0; i < _json_length; i++) {
            // 資料のタイトルを入力
            _card_title[i].textContent = _json[i].title;
            _card_title[i].id = "title_" + i.toString();
            // 資料の説明文を入力する
            _card_description[i].innerHTML = _json[i].description;
            _card_description[i].id = "text_" + i.toString();
            

            // 資料の画像を入力する
            // 画像のURLがない場合は、no_imageの画像にする
            if(_json[i].img == '' || _json[i].img == null) {
                _card_image[i].src = "./images/no_image.png";
            } else { // 画像のURLがある場合は、その画像にする
                //console.log(i, _json[i].title, _json[i].img);
                _card_image[i].src = _json[i].img;
            }
        }

        // エラーハンドリング
    }).catch((error) => {
        console.error('Error:', error);
    });
}

function clickButton(id) {
    // 要素の中で、タイトルを表示する部分を全て取得
    var _card_title = document.querySelectorAll('.card-title');
    // 要素の中で、説明文を表示する部分を全て取得
    var _card_description = document.querySelectorAll('.card-text');
    _index = id.replace(/[^0-9]/g, '');
    var _list = [_card_title[_index].textContent, _card_description[_index].innerHTML];
    console.log(postInfo);
    localStorage.setItem("search", JSON.stringify(postInfo));
    localStorage.setItem("first", JSON.stringify(_list));
    localStorage.setItem("all", JSON.stringify(jsonData[_index]));
    location.href = "http://localhost:5500/maplat/index.html";
}