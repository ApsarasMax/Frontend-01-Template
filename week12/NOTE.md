# 每周总结可以写在这里



### General



*   regex
    *   /a(b)c/.exec(“abc”)  //  get things like [“abc”, “b”, xxx]
    *   /a(?:b)c/.exec(“abc”)  //  get things like [“abc”, xxx]
    *   use regex.lastIndex can change the exec point
    *   [\s\S]  //  match all characters
*   Wild Card
    *   “*” means any characters
    *   “?” means any single character
    *   a*b*c*d  //  early “*”s need to match as few as possible, the last “*” needs to match as many characters as possible
