
var data1 = JSON.parse(localStorage.getItem("first"));

var data2 = localStorage.getItem("all");

var choumei_list = [];


localStorage.removeItem('first');
localStorage.removeItem('all');


// 要素の中で、タイトルを表示する部分を全て取得
var _title = document.querySelector('.title');
_title.textContent = data1[0];

// 要素の中で、説明文を表示する部分を全て取得
var _text = document.querySelector('.text');
_text.innerHTML = data1[1];



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
  }, 1);

  location_data = JSON.parse(data2);
  console.log(location_data);
  var choumei_list = [];
  var under_lines = document.querySelectorAll('#under_line');
  for(let i = 0; i < under_lines.length; i++) {
    choumei_list.push(under_lines[i].textContent);
    under_lines[i].addEventListener('click',function(e){
    alert(choumei_list[i]);
      for(let j = 0; j < location_data.places.length; j++) {
        if(choumei_list[i] == location_data.places[j].name) {
          //var name = location_data.places[j].name;
          //alert(name);
          app.core.clearMarker("main");
          var data = {
            "id": location_data.places[j].id,
            "lat": location_data.places[j].lat,
            "lng": location_data.places[j].lng,
            "name": location_data.places[j].name,
            "desc": location_data.places[j].name,
            "image": location_data.img,
            "icon": "assets/images/9ac6d81f417d6a5626b7c8d5a087c32b.png",
            "selected_icon": "assets/images/f115726e6249018905cca51653e1262c.png"
          };
          app.core.addMarker(data, "main");
        }
      }
    });
  }
});