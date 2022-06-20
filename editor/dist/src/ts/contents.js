const cLanguageDefaultContents = `#include <stdio.h>

int main(int argc, char** argv) {
    printf("Hello, World!");
    return 0;
}
`;
const cppLanguageDefaultContents = `#include <iostream>
using namespace std;

int main(int argc, char** argv) {
    cout << "Hello, World!";
    return 0;
}
`;
const javaLanguageDefaultContents = `class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello, World!"); 
    }
}
`;
const pythonLanguageDefaultContents = `def main():
    print("Hello, World!")

if __name__ = __main__:
    main()
`;
//# sourceMappingURL=contents.js.map