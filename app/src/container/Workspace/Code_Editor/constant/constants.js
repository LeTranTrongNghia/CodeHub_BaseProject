export const LANGUAGE_VERSIONS = {
	javascript: '18.15.0',
	typescript: '5.0.3',
	python: '3.10.0',
	java: '15.0.2',
	csharp: '6.12.0',
	php: '8.2.3',
};

export const CODE_SNIPPETS = {
	javascript: `
function greet(name) {
  console.log("Hello, " + name + "!");
}

greet("ivel");
`,
	typescript: `
type Params = {
  name: string;
}

function greet(data: Params) {
  console.log("Hello, " + data.name + "!");
}

greet({ name: "ivel" });
`,
	python: `
def greet(name):
  print("Hello, " + name + "!")

greet("ivel")
`,
	java: `
public className HelloWorld {
  public static void main(String[] args) {
    System.out.println("Hello ivel!");
  }
}
`,
	csharp: `
using System;

namespace HelloWorld {
  className Hello { 
    static void Main(string[] args) {
      Console.WriteLine("Hello ivel!");
    }
  }
}
`,
	php: `<?php

$name = 'Hello ivel!';
echo $name;
`,
};
