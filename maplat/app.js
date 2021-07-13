console.log(localStorage.length);
var data1 = JSON.parse(localStorage.getItem("first"));
console.log(data1);

var data2 = localStorage.getItem("all");
console.log(JSON.parse(data2));

localStorage.removeItem('first');
localStorage.removeItem('all');


// 要素の中で、タイトルを表示する部分を全て取得
var _title = document.querySelector('.title');
_title.textContent = data1[0];

// 要素の中で、説明文を表示する部分を全て取得
var _text = document.querySelector('.text');
_text.textContent = data1[1];


var option = {
  appid: "Maplat_test_core",
  enableHideMarker: true,   //マーカー非表示
  enableBorder: true,       //地図境界表示
  enableShare: true,        //共有
};

Maplat.createObject(option).then(function (app) {
  const viewpoint = {
    zoom: 3, //古地図倍率
  };
  const ratio = 20; //透明度

  window.setTimeout(function () {
    app.core.setViewpoint(viewpoint);
    app.core.setTransparency(ratio);
  }, 1);

  //ボタンで地図を切り替え
  document.getElementById("osm").addEventListener("click", function (e) {
    app.core.changeMap("osm");
  });
  document.getElementById("hakodate_1878").addEventListener("click", function (e) {
    app.core.changeMap("hakodate_1878");
  });
});
