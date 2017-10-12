#include <stdio.h>

int sum(int n1, int n2) {
    return n1 + n2;
}

int sub(int n1, int n2) {
    return n1 - n2;
}

int mult(int n1, int n2) {
    return n1 * n2;
}

int div(int n1, int n2) {
    return n1 / n2;
}

int main(int argc, char ** argv) {
    printf("Sum 2 + 2 >>> %d\n", sum(2,2));
    printf("Sub 8 - 2 >>> %d\n", sub(8,2));
    printf("Mult 4 * 4 >>> %d\n", mult(4,4));
    printf("Div 20 / 5 >>> %d\n", div(20,5));
}