export const editorConfig = [
  {
    name: "JavaScript",
    value: `// Online JavaScript Editor
// Write, Edit and Run your JavaScript code using an online compiler

console.log("Hello, World!");`,
  },
  {
    name: "Python",
    value: `# Online Python Editor
# Write, Edit and Run your Python code using an online compiler

print("Hello, World!")`,
  },
  {
    name: "Java",
    value: `// Online Java Compiler
// Write, Edit and Run your Java code using an online compiler

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, World!");
    }
}`,
  },
  {
    name: "Rust",
    value: `// Online Rust Compiler
// Write, Edit and Run your Rust code using an online compiler

fn main() {
    println!("Hello, World!");
}`,
  },
  {
    name: "Go",
    value: `// Online Go Compiler
// Write, Edit and Run your Go code using an online compiler

package main
import "fmt"

func main() {
    fmt.Println("Hello, World!")
}`,
  },
  {
    name: "C",
    value: `/* Online C Compiler
   Write, Edit and Run your C code using an online compiler */

#include <stdio.h>

int main() {
    printf("Hello, World!\n");
    return 0;
}`,
  },
  {
    name: "CPP",
    value: `// Online C++ Compiler
// Write, Edit and Run your C++ code using an online compiler

#include <iostream>
using namespace std;

int main() {
    cout << "Hello, World!" << endl;
    return 0;
}`,
  },
  {
    name: "Sqlite",
    value: `-- Online SQLite Editor
-- Write, Edit and Run your SQL queries using an online compiler

-- Create a simple table
CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE
);

-- Insert sample data
INSERT INTO users (name, email) VALUES ('Test User', 'test@example.com');

-- Query the data
SELECT * FROM users;`,
  },
];
