---
title: "[C++] Finding the Middle Number of 3 Numbers"
date: 2012-03-11 03:34:00 +07:00
categories:
- Archive
tags:
- Programming
layout: post
toc: true
---

Since I've got nothing better to do, I'll share a very simple program; it might be useful for you when you're told to make the same program but are too lazy to write it, since you can just copy-paste it from here..

hahahahaha.............

Without further ado, the user is asked to input 3 numbers, and the output will display the middle number of those 3 numbers. Example : 3 4 5, the output will be 4. By comparing them with each other, this program will run smoothly .. (HOPEFULLY)

Comparison using if :

> int main() {
>    int a,c;
>    int b = 0;
>    printf ("Inputkan 3 bilangan berbeda \n\n");
>    printf ("Bilangan pertama : ");
>    scanf("%i",&a);
>    printf ("Bilangan kedua : ");
>    scanf("%i", &b);
>    printf ("Bilangan ketiga : ");
>    scanf("%i", &c);
>    printf ("\n");
>    if (b>a && a>c) {
>      printf("%i", a);
>    } else if (a>b && b>c) {
>      printf("%i", b);
>    } else if (c>a && b>c) {
>      printf("%i", c);
>    } else printf("%i", b);
>    getch();
> }

Maybe if you want a bit of a challenge, you can replace the if above with switch. Of course, there are other rules when using switch. In switch, 0 = false, and 1 = true.

> int main() {
>    int a,c;
>    int b = 0;
>    printf ("Input 3 different numbers \n\n");
>    printf ("First number : ");
>    scanf("%i",&a);
>    printf ("Second number : ");
>    scanf("%i", &b);
>    printf ("Third number : ");
>    scanf("%i", &c);
>    printf ("\n");
>    switch (b>a && a > c) {
>      case 1 : default: printf("%i is the middle number",a); break;
>      default : switch (a>b && b>c) {
>                 case 1 : printf("%i is the middle number",b); break;
>                  case 0 : switch(c>a && b>c) {
>                             case 1 : printf("%i is the middle number",c); break;
>                             case 0  : printf("%i is the middle number",b); break;
>                            }
>    }
>    getch();
> }
