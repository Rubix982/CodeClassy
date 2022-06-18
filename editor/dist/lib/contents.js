"use strict";

var cLanguageDefaultContents = "#include <stdio.h>\n\nint main() {\n    printf(\"Hello, World!\");\n    return 0;\n}";
var cppLanguageDefaultContents = "#include <iostream>\n\nint main() {\n    std::cout << \"Hello, World!\";\n    return 0;\n}";
var javaLanguageDefaultContents = "class HelloWorld {\n    public static void main(String[] args) {\n        System.out.println(\"Hello, World!\"); \n    }\n}";
var pythonLanguageDefaultContents = "def main():\n    print(\"Hello, World!\")\n\nif __name__ = __main__:\n    main()";
var defaultSTDIN = "\n5\n1 2 \n3\n4 5";