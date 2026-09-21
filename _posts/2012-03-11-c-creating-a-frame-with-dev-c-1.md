---
title: "[C++] Creating a Frame with Dev-C++"
date: 2012-03-11 03:24:00 +07:00
categories:
- Archive
tags:
- Programming
layout: post
toc: true
---

Just for fun, actually, I was looking at the problems the TA gave during lab, and there was one asking us to make a picture frame drawing with the side as input.

If you input 3, it outputs:

X--X

|    |

|    |

X--X

If you input 4, it outputs:

X---X

|     |

|     |

|     |

X---X

It's actually simple to make, you just use a loop and it can be done right away. So, this is my code, if you have more efficient or powerfull code, you can share with us ! :D

> #include
> #include
> int main ()
> {
>    int input;
>    printf("Masukkan input : "); scanf("%i", &input);
>    printf("X");
>    for (int i=0; i <= input -2; i++) {
>        printf("-");
>    }
>    printf("X\n");
>    for (int i=0; i <= input - 2; i++) {
>        printf("|");
>        for (int a=0; a<= input - 2; a++) {
>            printf(" ");
>        }
>        printf("|\n");
>    }
>    printf("X");
>    for (int i=0; i <= input - 2; i++) {
>        printf("-");
>    }
>    printf("X\n");
>    getch();
> }

Yup, thats all, if you have any critiques and suggestions feel free to post them below :D
