---
title: "Using Listview on Android"
date: 2012-03-14 04:16:00 +07:00
categories:
- Archive
tags:
- Android
- Programming
layout: post
toc: true
---

During my holidays, sometimes i got bored with my computer. So I decided to learn some Android's component. ListView it is. Seems to be little difficult to program the listview, I learn from another source to understand and solve this problem.

- [Using Array to control ListView's Data](http://kahdev.wordpress.com/2010/02/16/using-an-arrayadapter-to-control-a-listviews-data/)

- [Android ListView](http://www.vogella.de/articles/AndroidListView/article.html)

Lets go to the point, first, you must initialize the array to input the data. Use arrayadapter to set the array.

> private ArrayAdapter<string> dataAdapter;

> dataAdapter = new ArrayAdapter<string>(this, android.R.layout.simple_expandable_list_item_1);

> list = (ListView) findViewById(R.id.listView1);

> list.setAdapter(dataAdapter);

On my project, listView1 is my listView.Change the variable inside the function findViewById to your ListView's name on your project. If you want to add some data inside the list, add this function :

> dataAdapter.add("Hello World");

Compile and run the program. Next step, set event listener to component, so we can get the event when list is pressed.

> list.setOnItemClickListener(new AdapterView.OnItemClickListener() {

> public void onItemClick(AdapterView? arg0, View arg1, int arg2,

> long arg3) {

> Object o = list.getItemAtPosition(arg2);

> // get clicked string by using o.toString();

> }

 Ok done, Im sorry its not perfect at all.
