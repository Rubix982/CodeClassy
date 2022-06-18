const cLanguageDefaultContents = `#include <stdio.h>

int main() {
    printf("Hello, World!");
    return 0;
}`;

const cppLanguageDefaultContents = `#include <iostream>

int main() {
    std::cout << "Hello, World!";
    return 0;
}`;

const javaLanguageDefaultContents = `class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!"); 
    }
}`;

const pythonLanguageDefaultContents = `def main():
    print("Hello, World!")

if __name__ = __main__:
    main()`;

const defaultSTDIN = `5
1 2 
3
4 5`;
