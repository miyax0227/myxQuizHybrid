'use strict';

var appName = "myxQuizMain";
var app = angular.module(appName);

/*******************************************************************************
 * rule - ラウンド特有のクイズのルール・画面操作の設定
 ******************************************************************************/
app.factory('rule', ['qCommon', function(qCommon) {

  var rule = {};
  var win = qCommon.win;
  var lose = qCommon.lose;
  var rolling = qCommon.rolling;
  var timerStop = qCommon.timerStop;
  var setMotion = qCommon.setMotion;
  var addQCount = qCommon.addQCount;

  rule.judgement = judgement;
  rule.calc = calc;

  /*****************************************************************************
   * header - ルール固有のヘッダ
   ****************************************************************************/
  rule.head = [];

  /*****************************************************************************
   * items - ルール固有のアイテム
   ****************************************************************************/
  rule.items = [{
      "key": "paperPts",
      "value": 0,
      "style": "number",
      "css": "paperPts"
    },
    {
      "key": "priority",
      "order": []
    }
  ];

  /*****************************************************************************
   * tweet - ルール固有のツイートのひな型
   ****************************************************************************/
  rule.tweet = {};

  /*****************************************************************************
   * lines - ルール固有のプレイヤー配置
   ****************************************************************************/
  rule.lines = {
    "line_left": {
      "x": 0.25,
      "top": 0.15,
      "bottom": 0.8,
      "zoom": 1,
      "orderBy": "keyIndex"
    },
    "line_center": {
      "x": 0.5,
      "top": 0.15,
      "bottom": 0.8,
      "zoom": 1,
      "orderBy": "keyIndex"
    },
    "line_right": {
      "x": 0.75,
      "top": 0.15,
      "bottom": 0.8,
      "zoom": 1,
      "orderBy": "keyIndex"
    },
    "line_center_big": {
      "x": 0.5,
      "top": 0.15,
      "bottom": 0.8,
      "zoom": 2,
      "orderBy": "keyIndex"
    },
    "line_left_small": {
      "x": 0.17,
      "top": 0.15,
      "bottom": 0.8,
      "zoom": 0.66,
      "orderBy": "keyIndex"
    },
    "line_center_small": {
      "x": 0.5,
      "top": 0.15,
      "bottom": 0.8,
      "zoom": 0.66,
      "orderBy": "keyIndex"
    },
    "line_right_small": {
      "x": 0.83,
      "top": 0.15,
      "bottom": 0.8,
      "zoom": 0.66,
      "orderBy": "keyIndex"
    }
  };

  /*****************************************************************************
   * actions - プレイヤー毎に設定する操作の設定
   ****************************************************************************/
  rule.actions = [];

  /*****************************************************************************
   * global_actions - 全体に対する操作の設定
   ****************************************************************************/
  rule.global_actions = [{
    "name": "",
    "button_css": "btn btn-default",
    "group": "rule",
    "indexes0": function(players, header, property) {
      return property.lotsName;
    },
    "enable1": function(index, players, header, property) {
      return true;
    },
    "action1": function(index, players, header, property) {
      header.nowLot = property.lotsName.indexOf(index);
    },
    "nowait": false
  }];

  /*****************************************************************************
   * judgement - 操作終了時等の勝敗判定
   * 
   * @param {Array} players - players
   * @param {Object} header - header
   * @param {Object} property - property
   ****************************************************************************/
  function judgement(players, header, property) {
    angular.forEach(players.filter(function(item) {
      /* rankがない人に限定 */
      return (item.rank === 0);
    }), function(player, i) {

    });
  }

  /*****************************************************************************
   * calc - 従属変数の計算をする
   * 
   * @param {Array} players - players
   * @param {Object} items - items
   ****************************************************************************/
  function calc(players, header, items, property) {
    header.mode = property.lotsName[header.nowLot];

    var key = 0;

    angular.forEach(players, function(player) {
      player.nameLat = player.name;
      player.handleNameLat = player.handleName;
      player.keyIndex = 999;
      player.line = "left";
      player.paperPts = player.paperPts1 + "/" + player.paperPts2;
    });

    angular.forEach(property.lotConfigs, function(lotConfig) {
      key = 0;

      if (lotConfig.lot === header.nowLot) {
        if (lotConfig.hasOwnProperty("paperRanks")) {
          for (var i in lotConfig.paperRanks) {
            var player = players.filter(function(p) {
              return p.paperRank === lotConfig.paperRanks[i];
            })[0];
            player.keyIndex = (key++);
            player.line = lotConfig.line;
          }

        } else {
          for (var i = lotConfig.min; i <= lotConfig.max; i++) {
            var player = players.filter(function(p) {
              return p.paperRank === i;
            })[0];
            player.keyIndex = (key++);
            player.line = lotConfig.line;
          }

        }
      }
    })
  }

  return rule;
}]);