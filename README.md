# wordPuzzle
在2D板子上尋找文字fetch的題目

Given a 2D board and a word, 
find if the word exists in the grid. 
The word can be constructed from letters of sequentially adjacent cell,
 where adjacent cells are those horizontally or vertically neighboring.
 The same letter cell may not be used more than once.

給一個2D板子和一個字
如果格子裡有字將他找出來
這個單字可以由鄰近格子的字母們組成(垂直和水平)
相同的字母格子不能使用超過一次

目前預設的2D Board:

row1 = 'ABCE'
row2 = 'SFCS'
row3 = 'ADEE'

輸入 'ASADB' // shell be false
輸入 'ABCCED' // shell be true
輸入 'ABCF' // shell be false


## 使用方式

以輸入ABCCED來判斷為例子

```sh
$ node bin/start.js ABCCED
```

將會顯示配對結果: 成功