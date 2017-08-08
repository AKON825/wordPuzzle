var myArgs = process.argv.slice(2);
console.log('輸入的配對字串為: ', myArgs[0]);
var inputWord = myArgs[0]


var inputAry = []
var row1 = 'ABCE'
var row2 = 'SFCS'
var row3 = 'ADEE'

// var word = 'ASADB' // shell be false
// var word2 = 'ABCCED' // shell be true
// var word3 = 'ABCF' // shell be false
// var word4 = 'BFDECCESC' // shell be false

inputAry.push(row1)
inputAry.push(row2)
inputAry.push(row3)

var indexs = findAllIndex(row2, 'S')
var alreadyUsePosts = []

// 符合的路線記錄物件陣列
var matchRoutes = []
var matchRoutesIndex = 0

var alreadyHasResult = false
var macthSuccess = false

step1()

// step1. 先在每個row字串搜尋word的第一個字
function step1 () {
  var gridPositions = []
  word = inputWord
  for(var i = 0; i < inputAry.length; i++) {
    var valueIndexs = findAllIndex(inputAry[i], word[0])

    // 將搜尋到第一個字的位置存入
    if (valueIndexs.length > 0) {
      for(var j = 0; j < valueIndexs.length; j++) {
        var x = valueIndexs[j]
        var y = i

        gridPositions.push({x: x, y: y})

        matchRoutes.push({routeNum: matchRoutesIndex,routeHistory: [{x: x, y: y}]})
        matchRoutesIndex = matchRoutesIndex +1
      }
    } 
  }

  iterator()
}

function iterator() {
  // 對allHistory中每個history做stepOnce操作
  var matchRoutesLength = matchRoutes.length
  for (var i = 0; i < matchRoutesLength; i++) {
    stepOnce(matchRoutes[i])

    // 刪除這個舊的macthRoute
    delete matchRoutes[i];
  }
  matchRoutes = matchRoutes.filter(function(n){ return n != undefined });

  checkIfEnd()
}

function checkIfEnd(){
  if(macthSuccess == true) {
    console.log('配對結果:成功')
  } else if(matchRoutes.length == 0) {
    console.log('配對結果:失敗')
  } else {
    iterator()
  }
}

// stepOnce. 在這個搜尋到的位子, 上下左右找是否有下一個字母
// 每一輪處理一次配對
function stepOnce (matchRoute) {

  var routeHistory = matchRoute.routeHistory
  var lastGridPosition = routeHistory[routeHistory.length -1]
  var x, y

  // 往上搜尋
  x = lastGridPosition.x
  y = lastGridPosition.y - 1
  matchOneDirect(x, y, 'UP')

  // 往下搜尋
  x = lastGridPosition.x
  y = lastGridPosition.y + 1
  matchOneDirect(x, y, 'DOWN')

  // 往左搜尋
  x = lastGridPosition.x - 1
  y = lastGridPosition.y
  matchOneDirect(x, y, 'LEFT')

  // 往右搜尋
  x = lastGridPosition.x + 1
  y = lastGridPosition.y
  matchOneDirect(x, y, 'RIGHT')

  function matchOneDirect (x, y, direct) {
    if (inputAry[y] && inputAry[y][x]) {
      console.log('往', direct, '搜尋', inputAry[y][x], '是否等於', word[routeHistory.length])

      for(var i = 0; i <= (routeHistory.length - 2); i++) {
        var previousPosition = routeHistory[i]

        if (previousPosition && previousPosition.x == x && previousPosition.y == y) {
          return
        }
      }

      // // 檢查倒數第二個是不是等於這次路線, 因為不能重複
      // var previousPosition = routeHistory[routeHistory.length - 2]

      // console.log('檢查路線是否重複')
      // if (previousPosition && previousPosition.x == x && previousPosition.y == y) {
      //   return
      // }

      if(inputAry[y][x] == word[routeHistory.length]) {
        // 成功就寫新的mactchRoute進去
        var cpRouteHistory = routeHistory.slice(0);
        cpRouteHistory.push({x: x, y: y})

        matchRoutes.push({routeNum: matchRoutesIndex, routeHistory: cpRouteHistory})
        matchRoutesIndex = matchRoutesIndex + 1

        var wordSuccessTime = routeHistory.length + 1
        completeCheck(wordSuccessTime)
        // 成功就把位子傳到下一步
      }
    }
  }

  function completeCheck(wordSuccessTime){
    if (wordSuccessTime === word.length) {
      // 總結果回傳true
      alreadyHasResult = true
      macthSuccess = true
      //return
    } else {
      //return
    }
  }
}

// 找出字串中所有符合的index, 而不是first
function findAllIndex(str, value) {
  var valueIndexs = []
  //console.log('ha')
  //console.log(str.length)
  for (var i = 0; i < str.length; i++) {
    //console.log('直',str[i], '指定職', value)
    if(str[i] === value) {
      valueIndexs.push(i)
    }
  }

  return valueIndexs
}