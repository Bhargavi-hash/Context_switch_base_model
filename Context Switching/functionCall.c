#include <stdio.h>

int addition(int a, int b) {
    return a + b;
}

int main() {
    int a, b;
    scanf("%d %d", &a, &b);
    int c = addition(a, b);
    return c;
}