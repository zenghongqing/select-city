# select-city

城市选择定位组件，技术栈为vue+axios+sass+koa2；主要是熟悉vue父子间通信，better-scroll插件用法以及koa2的辅助作用
难点：
1.滚动的插件继续采用better-scroll，滚动的联动与美团项目的一致，依旧是首先计算dom节点高度数组，再用scrollTo方法或者scrollToElement滚动到目标点；
2.搜索匹配城市，主要是通过正则匹配，判断是字母还是汉字，返回匹配的城市数组，此过程需要注意节流。

下章介绍平时前端使用的静态数据怎么通过爬虫得到。
