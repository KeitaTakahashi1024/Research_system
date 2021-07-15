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
  //enableHideMarker: true,   //マーカー非表示
  enableBorder: true,       //地図境界表示
  enableShare: true,        //共有
};

Maplat.createObject(option).then(function (app) {
  const viewpoint = {
    zoom: 3, //古地図倍率
  };
  const ratio = 20; //透明度

  //window.addEventListener("load", function () {
  //});

  window.setTimeout(function () {
    app.core.setViewpoint(viewpoint);
    app.core.setTransparency(ratio);
    console.log("読んだ？");

    location_data = JSON.parse(data2);
    console.log(location_data[0].places);

    for(var i = 0 ;i < location_data.length; i++) {
      if(location_data[i].places.length > 0) {
        for(var j = 0; j < location_data[i].places.length; j++) {
          app.core.addMarker({
            "id": location_data[i].places[j].id,
            "lat": location_data[i].places[j].lat,
            "lng": location_data[i].places[j].lng,
            "name": location_data[i].places[j].id,
            "desc": location_data[i].places[j].id,
            "image": location_data[i].imageUrl,
            "icon": "assets/images/9ac6d81f417d6a5626b7c8d5a087c32b.png",
            "selected_icon": "assets/images/f115726e6249018905cca51653e1262c.png"
          },"main");
        }
      }
    }
    console.log("追加した");
  }, 1);

  //ボタンで地図を切り替え
  document.getElementById("osm").addEventListener("click", function (e) {
    app.core.changeMap("osm");
  });
  document.getElementById("hakodate_1878").addEventListener("click", function (e) {
    app.core.changeMap("hakodate_1878");
  });
});
