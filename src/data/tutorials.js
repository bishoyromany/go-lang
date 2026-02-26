function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const tutorials = [
  // ─── MODULE 1: FOUNDATIONS ───
  {
    id: 1,
    module: "Foundations",
    title: "Introduction to Go",
    slug: "introduction-to-go",
    description: "Learn why Go was created, its key strengths, philosophy, and how to set up your first Go development environment with modules.",
    difficulty: "beginner",
    duration: "15 min",
    content: `
## Why Go?

Go (Golang) was created at Google in 2007 by Robert Griesemer, Rob Pike, and Ken Thompson. It was designed to solve real-world software engineering problems at scale.

### Key Strengths

- **Simplicity** — Small language spec, easy to learn
- **Concurrency** — First-class support via goroutines and channels
- **Performance** — Compiled to native machine code
- **Fast compilation** — Large projects compile in seconds
- **Strong standard library** — HTTP servers, JSON, crypto, testing built in
- **Static typing with inference** — Safety without verbosity
- **Single binary deployment** — No runtime dependencies

### Go's Philosophy

> *"Less is exponentially more."* — Rob Pike

Go intentionally omits features like inheritance, generics (added in 1.18), operator overloading, and implicit conversions. Every feature carries a cost of complexity — Go only pays that cost when the benefit is overwhelming.

### When to Use Go

| Use Case | Why Go Excels |
|----------|--------------|
| Microservices | Small binaries, fast startup, low memory |
| CLI tools | Single binary, cross-compilation |
| DevOps/Infrastructure | Docker, Kubernetes, Terraform all written in Go |
| API servers | Excellent net/http stdlib, high concurrency |
| Data pipelines | Goroutines for parallel processing |

### Installing Go

\`\`\`bash
# macOS
brew install go

# Linux
wget https://go.dev/dl/go1.22.0.linux-amd64.tar.gz
sudo tar -C /usr/local -xzf go1.22.0.linux-amd64.tar.gz
export PATH=$PATH:/usr/local/go/bin

# Verify installation
go version
\`\`\`

### Your First Go Program

\`\`\`go
package main

import "fmt"

func main() {
    fmt.Println("Hello, Go!")
}
\`\`\`

Run it:

\`\`\`bash
go run main.go
\`\`\`

### Go Workspace & Modules

\`\`\`bash
mkdir myproject && cd myproject
go mod init github.com/yourname/myproject
\`\`\`

This creates a \`go.mod\` file — the foundation of Go's dependency management system.
`
  },
  {
    id: 2,
    module: "Foundations",
    title: "Variables, Types & Constants",
    slug: "variables-types-constants",
    description: "Master Go's type system including variable declarations, zero values, basic types, type conversions, constants, and iota for enumerated constants.",
    difficulty: "beginner",
    duration: "20 min",
    content: `
## Variables & Type System

Go is statically typed with type inference. Every variable has a definite type at compile time.

### Variable Declaration

\`\`\`go
// Explicit type
var name string = "Gopher"
var age int = 10

// Type inference
var city = "San Francisco" // inferred as string

// Short declaration (most common, only inside functions)
count := 42
pi := 3.14159
active := true
\`\`\`

### Zero Values

Uninitialized variables get a **zero value** — never garbage data:

\`\`\`go
var i int       // 0
var f float64   // 0.0
var b bool      // false
var s string    // "" (empty string)
var p *int      // nil
\`\`\`

### Basic Types

\`\`\`go
// Integers
int8, int16, int32, int64
uint8, uint16, uint32, uint64
int, uint  // platform-dependent (32 or 64 bit)
byte       // alias for uint8
rune       // alias for int32 (Unicode code point)

// Floating point
float32, float64

// Complex numbers
complex64, complex128

// Boolean
bool

// String (immutable sequence of bytes)
string
\`\`\`

### Type Conversions (No Implicit Casting!)

\`\`\`go
var i int = 42
var f float64 = float64(i)   // explicit conversion required
var u uint = uint(f)

// String conversions
s := strconv.Itoa(42)        // int -> string: "42"
n, err := strconv.Atoi("42") // string -> int: 42
\`\`\`

### Constants

\`\`\`go
const Pi = 3.14159
const (
    StatusOK    = 200
    StatusNotFound = 404
)

// iota — auto-incrementing constant generator
type Weekday int
const (
    Sunday Weekday = iota  // 0
    Monday                 // 1
    Tuesday                // 2
    Wednesday              // 3
    Thursday               // 4
    Friday                 // 5
    Saturday               // 6
)

// Bit flags with iota
type Permission uint8
const (
    Read    Permission = 1 << iota // 1
    Write                          // 2
    Execute                        // 4
)
\`\`\`

### Multiple Assignment

\`\`\`go
x, y := 10, 20
x, y = y, x  // swap — no temp variable needed

// Blank identifier discards values
_, err := doSomething()
\`\`\`
`
  },
  {
    id: 3,
    module: "Foundations",
    title: "Control Flow",
    slug: "control-flow",
    description: "Learn Go control flow: if/else with init statements, for loops (the only loop), switch statements, type switches, defer, panic, and recover.",
    difficulty: "beginner",
    duration: "20 min",
    content: `
## Control Flow in Go

Go has a minimal set of control structures — no while, no do-while, no ternary operator.

### If / Else

\`\`\`go
if x > 10 {
    fmt.Println("big")
} else if x > 5 {
    fmt.Println("medium")
} else {
    fmt.Println("small")
}

// If with init statement (scoped variable)
if err := doSomething(); err != nil {
    log.Fatal(err)
}
// err is not accessible here
\`\`\`

### For Loop (The Only Loop)

\`\`\`go
// Classic for
for i := 0; i < 10; i++ {
    fmt.Println(i)
}

// While-style
n := 1
for n < 100 {
    n *= 2
}

// Infinite loop
for {
    // break or return to exit
}

// Range over slice
nums := []int{2, 4, 6, 8}
for index, value := range nums {
    fmt.Printf("index=%d value=%d\\n", index, value)
}

// Range over map
m := map[string]int{"a": 1, "b": 2}
for key, value := range m {
    fmt.Printf("%s: %d\\n", key, value)
}

// Range over string (yields runes)
for i, ch := range "Hello, 世界" {
    fmt.Printf("%d: %c\\n", i, ch)
}
\`\`\`

### Switch

\`\`\`go
// Switch with no condition (cleaner if/else chain)
switch {
case score >= 90:
    grade = "A"
case score >= 80:
    grade = "B"
default:
    grade = "C"
}

// Switch on value (no fallthrough by default!)
switch os := runtime.GOOS; os {
case "darwin":
    fmt.Println("macOS")
case "linux":
    fmt.Println("Linux")
default:
    fmt.Printf("Unknown: %s\\n", os)
}

// Type switch
switch v := i.(type) {
case int:
    fmt.Printf("int: %d\\n", v)
case string:
    fmt.Printf("string: %s\\n", v)
default:
    fmt.Printf("unknown type: %T\\n", v)
}
\`\`\`

### Defer, Panic, Recover

\`\`\`go
// Defer — executes when surrounding function returns (LIFO)
func readFile(path string) ([]byte, error) {
    f, err := os.Open(path)
    if err != nil {
        return nil, err
    }
    defer f.Close() // guaranteed cleanup

    return io.ReadAll(f)
}

// Panic — unrecoverable error (use sparingly)
func mustEnv(key string) string {
    v := os.Getenv(key)
    if v == "" {
        panic(fmt.Sprintf("missing required env var: %s", key))
    }
    return v
}

// Recover — catch a panic (only works inside deferred function)
func safeDiv(a, b int) (result int, err error) {
    defer func() {
        if r := recover(); r != nil {
            err = fmt.Errorf("recovered: %v", r)
        }
    }()
    return a / b, nil
}
\`\`\`
`
  },
  {
    id: 4,
    module: "Foundations",
    title: "Functions & Closures",
    slug: "functions-closures",
    description: "Deep dive into Go functions: multiple return values, variadic functions, closures, method receivers, and the init function pattern.",
    difficulty: "beginner",
    duration: "25 min",
    content: `
## Functions

Functions are first-class citizens in Go.

### Basic Functions

\`\`\`go
func add(a int, b int) int {
    return a + b
}

// Shortened parameter list (same type)
func add(a, b int) int {
    return a + b
}
\`\`\`

### Multiple Return Values

\`\`\`go
func divide(a, b float64) (float64, error) {
    if b == 0 {
        return 0, errors.New("division by zero")
    }
    return a / b, nil
}

result, err := divide(10, 3)
if err != nil {
    log.Fatal(err)
}
\`\`\`

### Named Return Values

\`\`\`go
func split(sum int) (x, y int) {
    x = sum * 4 / 9
    y = sum - x
    return // naked return — returns x, y
}
\`\`\`

### Variadic Functions

\`\`\`go
func sum(nums ...int) int {
    total := 0
    for _, n := range nums {
        total += n
    }
    return total
}

sum(1, 2, 3)          // 6
nums := []int{1, 2, 3}
sum(nums...)           // spread slice
\`\`\`

### Functions as Values

\`\`\`go
func apply(nums []int, fn func(int) int) []int {
    result := make([]int, len(nums))
    for i, v := range nums {
        result[i] = fn(v)
    }
    return result
}

doubled := apply([]int{1, 2, 3}, func(n int) int {
    return n * 2
})
// [2, 4, 6]
\`\`\`

### Closures

\`\`\`go
func makeCounter() func() int {
    count := 0
    return func() int {
        count++
        return count
    }
}

counter := makeCounter()
fmt.Println(counter()) // 1
fmt.Println(counter()) // 2
fmt.Println(counter()) // 3
\`\`\`

### Method Functions

\`\`\`go
type Rect struct {
    Width, Height float64
}

// Value receiver — works on a copy
func (r Rect) Area() float64 {
    return r.Width * r.Height
}

// Pointer receiver — can modify the original
func (r *Rect) Scale(factor float64) {
    r.Width *= factor
    r.Height *= factor
}

r := Rect{Width: 10, Height: 5}
fmt.Println(r.Area()) // 50
r.Scale(2)
fmt.Println(r.Area()) // 200
\`\`\`

### Init Functions

\`\`\`go
// init() runs automatically before main()
// Each file can have multiple init() functions
func init() {
    // setup code, validation, registration
    log.SetFlags(log.LstdFlags | log.Lshortfile)
}
\`\`\`
`
  },
  // ─── MODULE 2: DATA STRUCTURES ───
  {
    id: 5,
    module: "Data Structures",
    title: "Arrays & Slices",
    slug: "arrays-slices",
    description: "Understand Go arrays vs slices, slice internals, append, copy, and common slice manipulation patterns for production code.",
    difficulty: "beginner",
    duration: "25 min",
    content: `
## Arrays & Slices

### Arrays (Fixed Size)

\`\`\`go
// Arrays have a fixed size — part of the type
var a [5]int                  // [0,0,0,0,0]
b := [3]string{"a", "b", "c"}
c := [...]int{1, 2, 3, 4}    // size inferred: [4]int

// Arrays are values — assignment copies
x := [3]int{1, 2, 3}
y := x       // y is a full copy
y[0] = 99    // x is unchanged
\`\`\`

### Slices (Dynamic, Reference Type)

\`\`\`go
// Slice — a view into an underlying array
s := []int{1, 2, 3, 4, 5}

// make(type, length, capacity)
s := make([]int, 5)      // len=5, cap=5
s := make([]int, 0, 10)  // len=0, cap=10

// Slicing operations
a := []int{0, 1, 2, 3, 4, 5}
b := a[2:4]   // [2, 3]     — shares underlying array!
c := a[:3]    // [0, 1, 2]
d := a[3:]    // [3, 4, 5]

// Full slice expression (controls capacity)
e := a[1:3:4] // len=2, cap=3
\`\`\`

### Append & Copy

\`\`\`go
s := []int{1, 2, 3}
s = append(s, 4)           // [1,2,3,4]
s = append(s, 5, 6, 7)     // [1,2,3,4,5,6,7]

// Append another slice
other := []int{8, 9}
s = append(s, other...)

// Copy (does not grow destination)
src := []int{1, 2, 3}
dst := make([]int, len(src))
n := copy(dst, src) // n = 3
\`\`\`

### Slice Internals

\`\`\`go
// A slice header is a struct:
// type slice struct {
//     ptr *array  // pointer to underlying array
//     len int     // number of elements
//     cap int     // capacity before reallocation
// }

s := make([]int, 3, 5)
fmt.Println(len(s)) // 3
fmt.Println(cap(s)) // 5

// When append exceeds capacity, Go allocates a new
// underlying array (typically 2x growth)
\`\`\`

### Common Slice Patterns

\`\`\`go
// Delete element at index i (order preserved)
s = append(s[:i], s[i+1:]...)

// Delete element at index i (order not preserved)
s[i] = s[len(s)-1]
s = s[:len(s)-1]

// Insert at index i
s = append(s[:i], append([]int{val}, s[i:]...)...)

// Filter in place
n := 0
for _, v := range s {
    if keepCondition(v) {
        s[n] = v
        n++
    }
}
s = s[:n]

// Avoid memory leak with pointer slices
// When shrinking, nil out removed elements
for i := newLen; i < len(s); i++ {
    s[i] = nil
}
s = s[:newLen]
\`\`\`
`
  },
  {
    id: 6,
    module: "Data Structures",
    title: "Maps",
    slug: "maps",
    description: "Master Go maps: creation, CRUD operations, iteration, nil map gotchas, sets, counting, grouping, and ordered iteration patterns.",
    difficulty: "beginner",
    duration: "20 min",
    content: `
## Maps

Maps are Go's built-in hash table / dictionary type.

### Creating Maps

\`\`\`go
// Literal
m := map[string]int{
    "alice": 25,
    "bob":   30,
}

// make
m := make(map[string]int)
m := make(map[string]int, 100) // hint initial capacity
\`\`\`

### Operations

\`\`\`go
// Set
m["charlie"] = 35

// Get (returns zero value if key missing)
age := m["alice"]

// Check existence
age, ok := m["dave"]
if !ok {
    fmt.Println("dave not found")
}

// Delete
delete(m, "bob")

// Length
fmt.Println(len(m))

// Iterate (order is randomized!)
for key, value := range m {
    fmt.Printf("%s: %d\\n", key, value)
}
\`\`\`

### Map Gotchas

\`\`\`go
// Maps are NOT safe for concurrent access
// Use sync.Map or protect with sync.Mutex

// nil map — reads work, writes PANIC
var m map[string]int
_ = m["key"]  // ok, returns zero value
m["key"] = 1  // PANIC: assignment to nil map

// Maps are reference types
a := map[string]int{"x": 1}
b := a
b["x"] = 99
fmt.Println(a["x"]) // 99 — both point to same data
\`\`\`

### Common Patterns

\`\`\`go
// Set (unique collection)
seen := make(map[string]struct{})
seen["item"] = struct{}{}
if _, ok := seen["item"]; ok {
    fmt.Println("exists")
}

// Counting
freq := make(map[string]int)
for _, word := range words {
    freq[word]++
}

// Grouping
groups := make(map[string][]User)
for _, u := range users {
    groups[u.Role] = append(groups[u.Role], u)
}

// Ordered iteration (sort keys first)
keys := make([]string, 0, len(m))
for k := range m {
    keys = append(keys, k)
}
sort.Strings(keys)
for _, k := range keys {
    fmt.Printf("%s: %v\\n", k, m[k])
}
\`\`\`
`
  },
  {
    id: 7,
    module: "Data Structures",
    title: "Structs & Methods",
    slug: "structs-methods",
    description: "Learn Go structs: embedding for composition, struct tags, constructor patterns, functional options, and value vs pointer receiver guidelines.",
    difficulty: "beginner",
    duration: "25 min",
    content: `
## Structs

Structs are Go's primary way to define custom types with named fields.

### Defining & Creating Structs

\`\`\`go
type User struct {
    ID        int
    FirstName string
    LastName  string
    Email     string
    Active    bool
}

// Creating instances
u1 := User{
    ID:        1,
    FirstName: "Alice",
    LastName:  "Smith",
    Email:     "alice@example.com",
    Active:    true,
}

u2 := User{} // all zero values
u3 := new(User) // returns *User with zero values
\`\`\`

### Embedding (Composition over Inheritance)

\`\`\`go
type Address struct {
    Street string
    City   string
    State  string
    Zip    string
}

type Employee struct {
    User           // embedded — promotes fields & methods
    Address        // embedded
    Department string
    Salary     float64
}

e := Employee{
    User:       User{FirstName: "Bob", LastName: "Jones"},
    Address:    Address{City: "Portland", State: "OR"},
    Department: "Engineering",
    Salary:     120000,
}

// Access promoted fields directly
fmt.Println(e.FirstName)  // "Bob" — from User
fmt.Println(e.City)       // "Portland" — from Address
\`\`\`

### Tags (Metadata for Serialization)

\`\`\`go
type APIResponse struct {
    UserID    int    \\\`json:"user_id"\\\`
    FullName  string \\\`json:"full_name"\\\`
    Email     string \\\`json:"email,omitempty"\\\`
    Password  string \\\`json:"-"\\\`  // never serialize
    CreatedAt time.Time \\\`json:"created_at" db:"created_at"\\\`
}
\`\`\`

### Constructor Pattern

\`\`\`go
type Server struct {
    host    string
    port    int
    timeout time.Duration
    maxConn int
}

func NewServer(host string, port int) *Server {
    return &Server{
        host:    host,
        port:    port,
        timeout: 30 * time.Second,
        maxConn: 100,
    }
}
\`\`\`

### Functional Options Pattern

\`\`\`go
type Option func(*Server)

func WithTimeout(d time.Duration) Option {
    return func(s *Server) { s.timeout = d }
}

func WithMaxConn(n int) Option {
    return func(s *Server) { s.maxConn = n }
}

func NewServer(host string, port int, opts ...Option) *Server {
    s := &Server{
        host:    host,
        port:    port,
        timeout: 30 * time.Second,
        maxConn: 100,
    }
    for _, opt := range opts {
        opt(s)
    }
    return s
}

// Usage
srv := NewServer("localhost", 8080,
    WithTimeout(60*time.Second),
    WithMaxConn(500),
)
\`\`\`

### Value vs Pointer Receivers — Guidelines

\`\`\`go
// Use POINTER receiver when:
// - Method modifies the receiver
// - Struct is large (avoid copying)
// - Consistency — if one method needs pointer, use pointer for all

// Use VALUE receiver when:
// - Struct is small and read-only
// - You want immutability guarantees
// - Types like time.Time, small coordinate structs
\`\`\`
`
  },
  // ─── MODULE 3: INTERFACES & GENERICS ───
  {
    id: 8,
    module: "Interfaces & Generics",
    title: "Interfaces",
    slug: "interfaces",
    description: "Understand Go interfaces: implicit satisfaction, composition, type assertions, type switches, key stdlib interfaces, and the nil interface gotcha.",
    difficulty: "intermediate",
    duration: "30 min",
    content: `
## Interfaces

Interfaces in Go are **implicitly satisfied** — no \`implements\` keyword. If a type has the right methods, it satisfies the interface.

### Defining Interfaces

\`\`\`go
type Reader interface {
    Read(p []byte) (n int, err error)
}

type Writer interface {
    Write(p []byte) (n int, err error)
}

// Composition
type ReadWriter interface {
    Reader
    Writer
}
\`\`\`

### Implementing Interfaces

\`\`\`go
type FileReader struct {
    path string
}

// FileReader implicitly implements Reader
func (fr *FileReader) Read(p []byte) (int, error) {
    // implementation
    return len(p), nil
}

// Can be used anywhere Reader is expected
func process(r Reader) {
    buf := make([]byte, 1024)
    n, err := r.Read(buf)
    // ...
}
\`\`\`

### The Empty Interface

\`\`\`go
// any is an alias for interface{} (Go 1.18+)
func printAnything(v any) {
    fmt.Printf("Type: %T, Value: %v\\n", v, v)
}

printAnything(42)
printAnything("hello")
printAnything([]int{1, 2, 3})
\`\`\`

### Type Assertions & Type Switches

\`\`\`go
var i interface{} = "hello"

// Type assertion
s := i.(string)       // panics if wrong type
s, ok := i.(string)   // safe — ok is false if wrong

// Type switch
func describe(i interface{}) string {
    switch v := i.(type) {
    case string:
        return fmt.Sprintf("string of length %d", len(v))
    case int:
        return fmt.Sprintf("integer: %d", v)
    case bool:
        return fmt.Sprintf("boolean: %t", v)
    case nil:
        return "nil"
    default:
        return fmt.Sprintf("unknown: %T", v)
    }
}
\`\`\`

### Key Standard Library Interfaces

\`\`\`go
// io.Reader / io.Writer — the most important interfaces
// fmt.Stringer — custom string representation
type Stringer interface {
    String() string
}

// error interface
type error interface {
    Error() string
}

// sort.Interface
type Interface interface {
    Len() int
    Less(i, j int) bool
    Swap(i, j int)
}
\`\`\`

### Interface Design Principles

\`\`\`go
// 1. Keep interfaces small (1-3 methods)
// The bigger the interface, the weaker the abstraction.

// 2. Accept interfaces, return structs
func ProcessData(r io.Reader) *Result { ... }

// 3. Define interfaces where they're used, not where they're implemented
// package consumer
type Storage interface {
    Get(key string) ([]byte, error)
    Set(key string, value []byte) error
}

// 4. Don't export interfaces for testing only
// Use unexported interfaces in test files
\`\`\`

### Nil Interface Gotcha

\`\`\`go
type MyError struct{ msg string }
func (e *MyError) Error() string { return e.msg }

func mayFail() error {
    var err *MyError = nil
    // ...
    return err // returns non-nil interface holding nil pointer!
}

err := mayFail()
fmt.Println(err == nil) // false! Interface is not nil

// Fix: return nil explicitly
func mayFail() error {
    // ...
    return nil
}
\`\`\`
`
  },
  {
    id: 9,
    module: "Interfaces & Generics",
    title: "Generics",
    slug: "generics",
    description: "Master Go generics (1.18+): type parameters, constraints, generic types like Stack, and generic Map/Filter/Reduce utility functions.",
    difficulty: "intermediate",
    duration: "30 min",
    content: `
## Generics (Go 1.18+)

Generics allow you to write functions and types that work with multiple types while maintaining type safety.

### Type Parameters

\`\`\`go
// Generic function
func Min[T constraints.Ordered](a, b T) T {
    if a < b {
        return a
    }
    return b
}

Min(3, 5)       // int
Min(3.14, 2.71) // float64
Min("a", "b")   // string
\`\`\`

### Type Constraints

\`\`\`go
import "golang.org/x/exp/constraints"

// Built-in constraint interfaces
// any          — no constraint
// comparable   — supports == and !=
// constraints.Ordered — supports < > <= >=

// Custom constraints
type Number interface {
    ~int | ~int8 | ~int16 | ~int32 | ~int64 |
    ~float32 | ~float64
}

func Sum[T Number](nums []T) T {
    var total T
    for _, n := range nums {
        total += n
    }
    return total
}

// The ~ means "underlying type" — allows custom types
type Celsius float64
Sum([]Celsius{20.0, 25.5, 30.0}) // works!
\`\`\`

### Generic Types

\`\`\`go
// Generic Stack
type Stack[T any] struct {
    items []T
}

func (s *Stack[T]) Push(item T) {
    s.items = append(s.items, item)
}

func (s *Stack[T]) Pop() (T, bool) {
    if len(s.items) == 0 {
        var zero T
        return zero, false
    }
    item := s.items[len(s.items)-1]
    s.items = s.items[:len(s.items)-1]
    return item, true
}

// Usage
intStack := &Stack[int]{}
intStack.Push(1)
intStack.Push(2)
val, ok := intStack.Pop() // 2, true
\`\`\`

### Generic Map/Filter/Reduce

\`\`\`go
func Map[T, U any](s []T, fn func(T) U) []U {
    result := make([]U, len(s))
    for i, v := range s {
        result[i] = fn(v)
    }
    return result
}

func Filter[T any](s []T, fn func(T) bool) []T {
    var result []T
    for _, v := range s {
        if fn(v) {
            result = append(result, v)
        }
    }
    return result
}

func Reduce[T, U any](s []T, init U, fn func(U, T) U) U {
    acc := init
    for _, v := range s {
        acc = fn(acc, v)
    }
    return acc
}

// Usage
names := Map(users, func(u User) string { return u.Name })
adults := Filter(users, func(u User) bool { return u.Age >= 18 })
totalAge := Reduce(users, 0, func(sum int, u User) int {
    return sum + u.Age
})
\`\`\`

### When to Use Generics

\`\`\`go
// DO use generics for:
// - Container types (Stack, Queue, Set, Tree)
// - Utility functions (Map, Filter, Reduce, Min, Max)
// - When you'd otherwise use interface{} + type assertions

// DON'T use generics for:
// - When a simple interface works fine
// - When only one or two types are needed
// - To show off — simplicity first
\`\`\`
`
  },
  // ─── MODULE 4: CONCURRENCY ───
  {
    id: 10,
    module: "Concurrency",
    title: "Goroutines",
    slug: "goroutines",
    description: "Learn Go goroutines: launching lightweight threads, WaitGroups for synchronization, goroutine lifecycle rules, fan-out, and worker pool patterns.",
    difficulty: "intermediate",
    duration: "25 min",
    content: `
## Goroutines

Goroutines are lightweight threads managed by the Go runtime (~2KB initial stack, dynamically grows).

### Launching Goroutines

\`\`\`go
func main() {
    go sayHello("Alice")
    go sayHello("Bob")

    // main() must wait — otherwise program exits immediately
    time.Sleep(time.Second) // bad way to wait!
}

func sayHello(name string) {
    fmt.Printf("Hello, %s!\\n", name)
}
\`\`\`

### WaitGroups (Proper Synchronization)

\`\`\`go
func main() {
    var wg sync.WaitGroup

    urls := []string{
        "https://api.example.com/users",
        "https://api.example.com/posts",
        "https://api.example.com/comments",
    }

    for _, url := range urls {
        wg.Add(1)
        go func(u string) {
            defer wg.Done()
            resp, err := http.Get(u)
            if err != nil {
                log.Printf("Error fetching %s: %v", u, err)
                return
            }
            defer resp.Body.Close()
            fmt.Printf("%s: %d\\n", u, resp.StatusCode)
        }(url)
    }

    wg.Wait() // blocks until all goroutines call Done()
}
\`\`\`

### Goroutine Lifecycle Rules

\`\`\`go
// 1. The caller is responsible for goroutine lifecycle
// 2. Never start a goroutine you can't stop
// 3. Know when every goroutine will exit before writing the go statement

// BAD — goroutine leak
func leaky() {
    ch := make(chan int)
    go func() {
        val := <-ch // blocks forever if nothing sends
        fmt.Println(val)
    }()
    // function returns, goroutine leaks
}

// GOOD — cancellable goroutine
func proper(ctx context.Context) {
    go func() {
        for {
            select {
            case <-ctx.Done():
                return // clean exit
            default:
                doWork()
            }
        }
    }()
}
\`\`\`

### Goroutine Patterns

\`\`\`go
// Fan-out: launch N goroutines
func fanOut(tasks []Task) {
    var wg sync.WaitGroup
    for _, task := range tasks {
        wg.Add(1)
        go func(t Task) {
            defer wg.Done()
            process(t)
        }(task)
    }
    wg.Wait()
}

// Worker pool
func workerPool(tasks <-chan Task, numWorkers int) {
    var wg sync.WaitGroup
    for i := 0; i < numWorkers; i++ {
        wg.Add(1)
        go func() {
            defer wg.Done()
            for task := range tasks {
                process(task)
            }
        }()
    }
    wg.Wait()
}

// errgroup — goroutines with error propagation
import "golang.org/x/sync/errgroup"

func fetchAll(ctx context.Context, urls []string) error {
    g, ctx := errgroup.WithContext(ctx)
    for _, url := range urls {
        url := url // capture
        g.Go(func() error {
            return fetch(ctx, url)
        })
    }
    return g.Wait() // returns first error
}
\`\`\`
`
  },
  {
    id: 11,
    module: "Concurrency",
    title: "Channels",
    slug: "channels",
    description: "Master Go channels: buffered vs unbuffered, directional channels, select statements, pipelines, fan-in, semaphores, and done channel patterns.",
    difficulty: "intermediate",
    duration: "30 min",
    content: `
## Channels

Channels are Go's primary mechanism for goroutine communication — typed conduits for sending and receiving values.

> *"Don't communicate by sharing memory; share memory by communicating."*

### Channel Basics

\`\`\`go
// Unbuffered channel (synchronous)
ch := make(chan int)

// Buffered channel (async up to capacity)
ch := make(chan int, 10)

// Send
ch <- 42

// Receive
val := <-ch

// Close (only sender should close)
close(ch)

// Check if closed
val, ok := <-ch // ok is false if closed
\`\`\`

### Channel Direction (Restrict in Function Signatures)

\`\`\`go
// Send-only channel
func producer(ch chan<- int) {
    for i := 0; i < 10; i++ {
        ch <- i
    }
    close(ch)
}

// Receive-only channel
func consumer(ch <-chan int) {
    for val := range ch {
        fmt.Println(val)
    }
}
\`\`\`

### Select Statement

\`\`\`go
select {
case msg := <-msgCh:
    fmt.Println("Received:", msg)
case errMsg := <-errCh:
    fmt.Println("Error:", errMsg)
case <-time.After(5 * time.Second):
    fmt.Println("Timeout!")
case <-ctx.Done():
    fmt.Println("Cancelled")
    return
}

// Non-blocking with default
select {
case msg := <-ch:
    process(msg)
default:
    // ch not ready, do something else
}
\`\`\`

### Channel Patterns

\`\`\`go
// Pipeline
func generator(nums ...int) <-chan int {
    out := make(chan int)
    go func() {
        for _, n := range nums {
            out <- n
        }
        close(out)
    }()
    return out
}

func square(in <-chan int) <-chan int {
    out := make(chan int)
    go func() {
        for n := range in {
            out <- n * n
        }
        close(out)
    }()
    return out
}

// Usage: pipeline
for val := range square(generator(1, 2, 3, 4)) {
    fmt.Println(val) // 1, 4, 9, 16
}
\`\`\`

\`\`\`go
// Fan-in (merge multiple channels)
func merge(channels ...<-chan int) <-chan int {
    out := make(chan int)
    var wg sync.WaitGroup
    for _, ch := range channels {
        wg.Add(1)
        go func(c <-chan int) {
            defer wg.Done()
            for val := range c {
                out <- val
            }
        }(ch)
    }
    go func() {
        wg.Wait()
        close(out)
    }()
    return out
}
\`\`\`

\`\`\`go
// Semaphore (limit concurrency)
sem := make(chan struct{}, 10) // max 10 concurrent

for _, task := range tasks {
    sem <- struct{}{} // acquire
    go func(t Task) {
        defer func() { <-sem }() // release
        process(t)
    }(task)
}
\`\`\`

\`\`\`go
// Done channel (signal completion)
done := make(chan struct{})
go func() {
    defer close(done)
    doLongWork()
}()
<-done // wait for completion
\`\`\`
`
  },
  {
    id: 12,
    module: "Concurrency",
    title: "Sync Primitives & Context",
    slug: "sync-primitives-context",
    description: "Learn sync.Mutex, RWMutex, sync.Once, sync.Map, and the context package for cancellation, deadlines, and request-scoped values.",
    difficulty: "intermediate",
    duration: "30 min",
    content: `
## Sync Package & Context

### Mutex (Mutual Exclusion)

\`\`\`go
type SafeCounter struct {
    mu sync.Mutex
    v  map[string]int
}

func (c *SafeCounter) Inc(key string) {
    c.mu.Lock()
    defer c.mu.Unlock()
    c.v[key]++
}

func (c *SafeCounter) Value(key string) int {
    c.mu.Lock()
    defer c.mu.Unlock()
    return c.v[key]
}
\`\`\`

### RWMutex (Read-Write Lock)

\`\`\`go
type Cache struct {
    mu   sync.RWMutex
    data map[string]string
}

func (c *Cache) Get(key string) (string, bool) {
    c.mu.RLock()         // multiple readers allowed
    defer c.mu.RUnlock()
    val, ok := c.data[key]
    return val, ok
}

func (c *Cache) Set(key, value string) {
    c.mu.Lock()          // exclusive writer
    defer c.mu.Unlock()
    c.data[key] = value
}
\`\`\`

### sync.Once

\`\`\`go
var (
    instance *Database
    once     sync.Once
)

func GetDB() *Database {
    once.Do(func() {
        instance = connectToDatabase()
    })
    return instance
}
\`\`\`

### sync.Map (Concurrent Map)

\`\`\`go
var cache sync.Map

cache.Store("key", "value")

val, ok := cache.Load("key")
if ok {
    fmt.Println(val.(string))
}

cache.Range(func(key, value any) bool {
    fmt.Printf("%v: %v\\n", key, value)
    return true // continue iteration
})
\`\`\`

### Context — Cancellation, Deadlines, Values

\`\`\`go
// Context is passed as the FIRST parameter by convention
func fetchData(ctx context.Context, url string) ([]byte, error) {
    req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
    if err != nil {
        return nil, err
    }
    resp, err := http.DefaultClient.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    return io.ReadAll(resp.Body)
}
\`\`\`

\`\`\`go
// WithCancel
ctx, cancel := context.WithCancel(context.Background())
defer cancel() // always defer cancel

go func() {
    select {
    case <-ctx.Done():
        fmt.Println("Cancelled:", ctx.Err())
        return
    case result := <-resultCh:
        process(result)
    }
}()

// Cancel from parent
cancel()
\`\`\`

\`\`\`go
// WithTimeout / WithDeadline
ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
defer cancel()

result, err := fetchData(ctx, "https://api.example.com/data")
if errors.Is(err, context.DeadlineExceeded) {
    log.Println("Request timed out")
}
\`\`\`

\`\`\`go
// WithValue (use sparingly — for request-scoped data)
type contextKey string

const userIDKey contextKey = "userID"

ctx := context.WithValue(ctx, userIDKey, "user-123")

// Retrieve
if userID, ok := ctx.Value(userIDKey).(string); ok {
    fmt.Println("User:", userID)
}
\`\`\`

### Context Best Practices

- Always pass context as the first parameter
- Never store context in a struct
- Always call cancel() — use defer
- Don't pass nil context — use context.TODO()
- Use context.WithValue only for request-scoped data
`
  },
  // ─── MODULE 5: ERROR HANDLING ───
  {
    id: 13,
    module: "Error Handling",
    title: "Error Handling Patterns",
    slug: "error-handling-patterns",
    description: "Master Go error handling: custom error types, error wrapping with %w, sentinel errors, errors.Is/As, and production-grade error patterns.",
    difficulty: "intermediate",
    duration: "30 min",
    content: `
## Error Handling in Go

Go treats errors as values — not exceptions. This makes error paths explicit and forces you to handle them.

### The error Interface

\`\`\`go
type error interface {
    Error() string
}
\`\`\`

### Creating Errors

\`\`\`go
// Simple errors
err := errors.New("something went wrong")
err := fmt.Errorf("user %d not found", userID)

// Custom error types
type ValidationError struct {
    Field   string
    Message string
}

func (e *ValidationError) Error() string {
    return fmt.Sprintf("validation error: %s — %s", e.Field, e.Message)
}

func validateAge(age int) error {
    if age < 0 || age > 150 {
        return &ValidationError{
            Field:   "age",
            Message: "must be between 0 and 150",
        }
    }
    return nil
}
\`\`\`

### Error Wrapping (Go 1.13+)

\`\`\`go
// Wrap with context using %w verb
func readConfig(path string) (*Config, error) {
    data, err := os.ReadFile(path)
    if err != nil {
        return nil, fmt.Errorf("reading config %s: %w", path, err)
    }

    var cfg Config
    if err := json.Unmarshal(data, &cfg); err != nil {
        return nil, fmt.Errorf("parsing config: %w", err)
    }
    return &cfg, nil
}

// Unwrap and check
if errors.Is(err, os.ErrNotExist) {
    // handle missing file
}

var valErr *ValidationError
if errors.As(err, &valErr) {
    fmt.Printf("Field: %s, Message: %s\\n", valErr.Field, valErr.Message)
}
\`\`\`

### Sentinel Errors

\`\`\`go
// Package-level error values
var (
    ErrNotFound     = errors.New("not found")
    ErrUnauthorized = errors.New("unauthorized")
    ErrConflict     = errors.New("conflict")
)

func GetUser(id int) (*User, error) {
    user, ok := users[id]
    if !ok {
        return nil, fmt.Errorf("user %d: %w", id, ErrNotFound)
    }
    return user, nil
}

// Caller checks with errors.Is
_, err := GetUser(999)
if errors.Is(err, ErrNotFound) {
    http.Error(w, "User not found", 404)
}
\`\`\`

### Error Handling Patterns

\`\`\`go
// 1. Handle once — either handle or propagate, never both
// BAD
if err != nil {
    log.Println(err) // logged
    return err        // AND propagated — will be logged again!
}
// GOOD
if err != nil {
    return fmt.Errorf("doing X: %w", err) // propagate with context
}

// 2. Eliminate repetitive error handling
// Extract into helper
func must[T any](val T, err error) T {
    if err != nil {
        panic(err) // only use in init/tests
    }
    return val
}

// 3. Reduce error boilerplate with errWriter pattern
type errWriter struct {
    w   io.Writer
    err error
}

func (ew *errWriter) write(data []byte) {
    if ew.err != nil {
        return // skip if already errored
    }
    _, ew.err = ew.w.Write(data)
}
\`\`\`

### Production Error Pattern

\`\`\`go
// Domain error with code, message, and underlying cause
type AppError struct {
    Code    string
    Message string
    Err     error
}

func (e *AppError) Error() string { return e.Message }
func (e *AppError) Unwrap() error { return e.Err }

func NewAppError(code, msg string, err error) *AppError {
    return &AppError{Code: code, Message: msg, Err: err}
}

func (e *AppError) HTTPStatus() int {
    switch e.Code {
    case "NOT_FOUND":
        return 404
    case "UNAUTHORIZED":
        return 401
    case "VALIDATION":
        return 400
    default:
        return 500
    }
}
\`\`\`
`
  },
  // ─── MODULE 6: PACKAGES & MODULES ───
  {
    id: 14,
    module: "Packages & Modules",
    title: "Packages, Modules & Visibility",
    slug: "packages-modules-visibility",
    description: "Understand Go packages, modules, go.mod, visibility rules, standard project layout, the internal/ directory, and build tags.",
    difficulty: "intermediate",
    duration: "25 min",
    content: `
## Packages & Modules

### Package Basics

\`\`\`go
// Every Go file belongs to a package
package main  // executable
package user  // library

// Import
import (
    "fmt"
    "net/http"
    "github.com/yourname/project/internal/user"
)
\`\`\`

### Visibility (Exported vs Unexported)

\`\`\`go
// Uppercase = exported (public)
type User struct {      // accessible outside package
    Name string         // accessible
    age  int            // unexported (private to package)
}

func NewUser() *User {} // exported
func validate() {}      // unexported
\`\`\`

### Go Modules

\`\`\`bash
# Initialize a module
go mod init github.com/yourname/project

# Add dependency
go get github.com/gin-gonic/gin@latest

# Tidy — remove unused, add missing
go mod tidy

# Vendor dependencies (optional)
go mod vendor

# View dependency graph
go mod graph
\`\`\`

### go.mod File

\`\`\`go
module github.com/yourname/project

go 1.22

require (
    github.com/gin-gonic/gin v1.9.1
    github.com/jackc/pgx/v5 v5.5.0
)

require (
    // indirect dependencies auto-managed
    github.com/some/dep v1.0.0 // indirect
)
\`\`\`

### Project Layout (Standard)

\`\`\`
project/
├── cmd/
│   ├── api/
│   │   └── main.go          # API server entry point
│   └── worker/
│       └── main.go          # Background worker entry
├── internal/                 # Private packages (cannot be imported externally)
│   ├── user/
│   │   ├── handler.go
│   │   ├── service.go
│   │   ├── repository.go
│   │   └── model.go
│   ├── auth/
│   │   └── ...
│   └── middleware/
│       └── ...
├── pkg/                      # Public packages (can be imported)
│   └── validator/
│       └── validator.go
├── api/                      # OpenAPI specs, proto files
├── migrations/               # Database migrations
├── go.mod
├── go.sum
└── Makefile
\`\`\`

### internal/ Package

\`\`\`go
// The internal/ directory is enforced by the Go toolchain
// Packages under internal/ can only be imported by code
// within the parent of internal/

// ✓ project/cmd/api can import project/internal/user
// ✗ other-project cannot import project/internal/user
\`\`\`

### Build Tags

\`\`\`go
//go:build integration
// +build integration

package user_test

func TestUserIntegration(t *testing.T) {
    // only runs with: go test -tags integration
}
\`\`\`
`
  },
  // ─── MODULE 7: STANDARD LIBRARY ───
  {
    id: 15,
    module: "Standard Library",
    title: "Working with JSON",
    slug: "working-with-json",
    description: "Learn Go JSON encoding/decoding: struct tags, marshal/unmarshal, dynamic JSON with RawMessage, custom marshalers, and streaming JSON.",
    difficulty: "intermediate",
    duration: "25 min",
    content: `
## JSON in Go

Go's \`encoding/json\` package handles JSON marshaling and unmarshaling.

### Marshal (Go → JSON)

\`\`\`go
type User struct {
    ID       int       \\\`json:"id"\\\`
    Name     string    \\\`json:"name"\\\`
    Email    string    \\\`json:"email,omitempty"\\\`
    Password string    \\\`json:"-"\\\`
    Score    float64   \\\`json:"score,string"\\\`
    Tags     []string  \\\`json:"tags"\\\`
}

user := User{
    ID: 1, Name: "Alice", Email: "alice@example.com",
    Password: "secret", Score: 95.5, Tags: []string{"admin", "user"},
}

// Marshal
data, err := json.Marshal(user)
// {"id":1,"name":"Alice","email":"alice@example.com","score":"95.5","tags":["admin","user"]}

// Pretty print
data, err := json.MarshalIndent(user, "", "  ")
\`\`\`

### Unmarshal (JSON → Go)

\`\`\`go
jsonStr := \\\`{"id":1,"name":"Alice","tags":["admin"]}\\\`

var user User
err := json.Unmarshal([]byte(jsonStr), &user)

// From io.Reader (HTTP body, file, etc.)
err := json.NewDecoder(resp.Body).Decode(&user)
\`\`\`

### Dynamic JSON

\`\`\`go
// Unknown structure — use map
var data map[string]interface{}
json.Unmarshal(raw, &data)

// Access nested values
name := data["user"].(map[string]interface{})["name"].(string)

// json.RawMessage — delay parsing
type Event struct {
    Type    string          \\\`json:"type"\\\`
    Payload json.RawMessage \\\`json:"payload"\\\`
}

var event Event
json.Unmarshal(raw, &event)

switch event.Type {
case "user_created":
    var u User
    json.Unmarshal(event.Payload, &u)
case "order_placed":
    var o Order
    json.Unmarshal(event.Payload, &o)
}
\`\`\`

### Custom JSON Marshaling

\`\`\`go
type Timestamp time.Time

func (t Timestamp) MarshalJSON() ([]byte, error) {
    stamp := time.Time(t).Format("2006-01-02T15:04:05Z")
    return json.Marshal(stamp)
}

func (t *Timestamp) UnmarshalJSON(data []byte) error {
    var s string
    if err := json.Unmarshal(data, &s); err != nil {
        return err
    }
    parsed, err := time.Parse("2006-01-02T15:04:05Z", s)
    if err != nil {
        return err
    }
    *t = Timestamp(parsed)
    return nil
}
\`\`\`

### Streaming JSON

\`\`\`go
// Encoder writes directly to io.Writer
func writeJSON(w http.ResponseWriter, data any) error {
    w.Header().Set("Content-Type", "application/json")
    return json.NewEncoder(w).Encode(data)
}

// Decoder reads from io.Reader
func readJSON(r *http.Request, dst any) error {
    dec := json.NewDecoder(r.Body)
    dec.DisallowUnknownFields() // strict mode
    return dec.Decode(dst)
}
\`\`\`
`
  },
  {
    id: 16,
    module: "Standard Library",
    title: "HTTP Servers & Clients",
    slug: "http-servers-clients",
    description: "Build Go HTTP servers with net/http: routing (Go 1.22+), middleware chains, custom HTTP clients, and graceful shutdown patterns.",
    difficulty: "intermediate",
    duration: "35 min",
    content: `
## net/http — Servers & Clients

### Basic HTTP Server

\`\`\`go
func main() {
    mux := http.NewServeMux()

    mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
        w.WriteHeader(http.StatusOK)
        w.Write([]byte("OK"))
    })

    mux.HandleFunc("GET /users/{id}", getUser)
    mux.HandleFunc("POST /users", createUser)

    srv := &http.Server{
        Addr:         ":8080",
        Handler:      mux,
        ReadTimeout:  10 * time.Second,
        WriteTimeout: 10 * time.Second,
        IdleTimeout:  60 * time.Second,
    }

    log.Printf("Server listening on %s", srv.Addr)
    log.Fatal(srv.ListenAndServe())
}
\`\`\`

### Route Handling (Go 1.22+ Patterns)

\`\`\`go
func getUser(w http.ResponseWriter, r *http.Request) {
    id := r.PathValue("id") // Go 1.22+ path params

    user, err := userService.FindByID(r.Context(), id)
    if err != nil {
        http.Error(w, "User not found", http.StatusNotFound)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    json.NewEncoder(w).Encode(user)
}

func createUser(w http.ResponseWriter, r *http.Request) {
    var input CreateUserInput
    if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
        http.Error(w, "Invalid JSON", http.StatusBadRequest)
        return
    }

    user, err := userService.Create(r.Context(), input)
    if err != nil {
        http.Error(w, err.Error(), http.StatusInternalServerError)
        return
    }

    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(http.StatusCreated)
    json.NewEncoder(w).Encode(user)
}
\`\`\`

### Middleware

\`\`\`go
// Middleware signature
type Middleware func(http.Handler) http.Handler

func logging(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        next.ServeHTTP(w, r)
        log.Printf("%s %s %s", r.Method, r.URL.Path, time.Since(start))
    })
}

func auth(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        token := r.Header.Get("Authorization")
        if token == "" {
            http.Error(w, "Unauthorized", http.StatusUnauthorized)
            return
        }
        // validate token, add user to context
        next.ServeHTTP(w, r)
    })
}

// Chain middleware
handler := logging(auth(mux))
\`\`\`

### HTTP Client

\`\`\`go
// Custom client (ALWAYS configure timeouts)
client := &http.Client{
    Timeout: 10 * time.Second,
    Transport: &http.Transport{
        MaxIdleConns:        100,
        MaxIdleConnsPerHost: 10,
        IdleConnTimeout:     90 * time.Second,
    },
}

// GET request
resp, err := client.Get("https://api.example.com/users")
if err != nil {
    return err
}
defer resp.Body.Close()

// POST with JSON body
body, _ := json.Marshal(payload)
resp, err := client.Post(
    "https://api.example.com/users",
    "application/json",
    bytes.NewReader(body),
)

// Request with context and headers
req, err := http.NewRequestWithContext(ctx, "GET", url, nil)
req.Header.Set("Authorization", "Bearer "+token)
req.Header.Set("Accept", "application/json")
resp, err := client.Do(req)
\`\`\`

### Graceful Shutdown

\`\`\`go
func main() {
    srv := &http.Server{Addr: ":8080", Handler: mux}

    go func() {
        if err := srv.ListenAndServe(); err != http.ErrServerClosed {
            log.Fatalf("Server error: %v", err)
        }
    }()

    // Wait for interrupt signal
    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit

    log.Println("Shutting down...")
    ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
    defer cancel()

    if err := srv.Shutdown(ctx); err != nil {
        log.Fatalf("Forced shutdown: %v", err)
    }
    log.Println("Server stopped")
}
\`\`\`
`
  },
  {
    id: 17,
    module: "Standard Library",
    title: "File I/O & OS",
    slug: "file-io-os",
    description: "Master Go file I/O: reading and writing files, buffered I/O, filepath operations, directory walking, environment variables, and OS operations.",
    difficulty: "intermediate",
    duration: "20 min",
    content: `
## File I/O & OS Operations

### Reading Files

\`\`\`go
// Read entire file (small files)
data, err := os.ReadFile("config.json")
if err != nil {
    log.Fatal(err)
}

// Buffered reading (large files)
f, err := os.Open("large-file.log")
if err != nil {
    log.Fatal(err)
}
defer f.Close()

scanner := bufio.NewScanner(f)
for scanner.Scan() {
    line := scanner.Text()
    process(line)
}
if err := scanner.Err(); err != nil {
    log.Fatal(err)
}

// Read with io.Reader
reader := bufio.NewReader(f)
for {
    line, err := reader.ReadString('\\n')
    if err == io.EOF {
        break
    }
    if err != nil {
        log.Fatal(err)
    }
    process(line)
}
\`\`\`

### Writing Files

\`\`\`go
// Write entire file
err := os.WriteFile("output.txt", []byte("Hello\\n"), 0644)

// Buffered writing
f, err := os.Create("output.txt")
if err != nil {
    log.Fatal(err)
}
defer f.Close()

w := bufio.NewWriter(f)
fmt.Fprintln(w, "Line 1")
fmt.Fprintln(w, "Line 2")
w.Flush() // don't forget!

// Append mode
f, err := os.OpenFile("log.txt", os.O_APPEND|os.O_CREATE|os.O_WRONLY, 0644)
\`\`\`

### Working with Paths

\`\`\`go
import "path/filepath"

// Join paths (OS-aware)
p := filepath.Join("home", "user", "documents", "file.txt")

// Get directory and filename
dir := filepath.Dir(p)     // "home/user/documents"
base := filepath.Base(p)   // "file.txt"
ext := filepath.Ext(p)     // ".txt"

// Walk directory tree
filepath.WalkDir(".", func(path string, d fs.DirEntry, err error) error {
    if err != nil {
        return err
    }
    if !d.IsDir() && filepath.Ext(path) == ".go" {
        fmt.Println(path)
    }
    return nil
})
\`\`\`

### OS Operations

\`\`\`go
// Environment variables
port := os.Getenv("PORT")
if port == "" {
    port = "8080"
}

// Exec commands
cmd := exec.CommandContext(ctx, "git", "status")
output, err := cmd.CombinedOutput()

// Temp files
tmpFile, err := os.CreateTemp("", "prefix-*.txt")
defer os.Remove(tmpFile.Name())

// File info
info, err := os.Stat("file.txt")
if os.IsNotExist(err) {
    fmt.Println("File does not exist")
}
fmt.Println(info.Size(), info.ModTime(), info.Mode())
\`\`\`
`
  },
  // ─── MODULE 8: TESTING ───
  {
    id: 18,
    module: "Testing",
    title: "Unit Testing & Benchmarks",
    slug: "unit-testing-benchmarks",
    description: "Learn Go testing: table-driven tests, test helpers, subtests, parallel tests, mocking with interfaces, benchmarks, and the race detector.",
    difficulty: "intermediate",
    duration: "30 min",
    content: `
## Testing in Go

Go has a built-in testing framework — no third-party libraries needed.

### Basic Test

\`\`\`go
// user_test.go — must end in _test.go
package user

import "testing"

func TestAdd(t *testing.T) {
    got := Add(2, 3)
    want := 5
    if got != want {
        t.Errorf("Add(2, 3) = %d; want %d", got, want)
    }
}
\`\`\`

### Table-Driven Tests

\`\`\`go
func TestAdd(t *testing.T) {
    tests := []struct {
        name     string
        a, b     int
        expected int
    }{
        {"positive", 2, 3, 5},
        {"negative", -1, -2, -3},
        {"zero", 0, 0, 0},
        {"mixed", -5, 10, 5},
    }

    for _, tt := range tests {
        t.Run(tt.name, func(t *testing.T) {
            got := Add(tt.a, tt.b)
            if got != tt.expected {
                t.Errorf("Add(%d, %d) = %d; want %d",
                    tt.a, tt.b, got, tt.expected)
            }
        })
    }
}
\`\`\`

### Test Helpers

\`\`\`go
func setupTestDB(t *testing.T) *sql.DB {
    t.Helper() // marks this as a helper — errors report caller's line

    db, err := sql.Open("postgres", testDSN)
    if err != nil {
        t.Fatal(err)
    }

    t.Cleanup(func() {
        db.Close()
    })

    return db
}
\`\`\`

### Subtests & Parallel

\`\`\`go
func TestUserService(t *testing.T) {
    t.Run("Create", func(t *testing.T) {
        t.Parallel() // run in parallel
        // ...
    })

    t.Run("Delete", func(t *testing.T) {
        t.Parallel()
        // ...
    })
}
\`\`\`

### Mocking with Interfaces

\`\`\`go
// Define interface in consumer package
type UserRepository interface {
    FindByID(ctx context.Context, id string) (*User, error)
    Save(ctx context.Context, user *User) error
}

// Mock implementation for tests
type mockUserRepo struct {
    users map[string]*User
}

func (m *mockUserRepo) FindByID(_ context.Context, id string) (*User, error) {
    user, ok := m.users[id]
    if !ok {
        return nil, ErrNotFound
    }
    return user, nil
}

func (m *mockUserRepo) Save(_ context.Context, user *User) error {
    m.users[user.ID] = user
    return nil
}

func TestUserService_GetUser(t *testing.T) {
    repo := &mockUserRepo{
        users: map[string]*User{
            "1": {ID: "1", Name: "Alice"},
        },
    }
    svc := NewUserService(repo)
    user, err := svc.GetUser(context.Background(), "1")
    // assertions...
}
\`\`\`

### Benchmarks

\`\`\`go
func BenchmarkFibonacci(b *testing.B) {
    for i := 0; i < b.N; i++ {
        Fibonacci(20)
    }
}

// Run: go test -bench=. -benchmem
// Output:
// BenchmarkFibonacci-8  30000  45234 ns/op  0 B/op  0 allocs/op

func BenchmarkConcat(b *testing.B) {
    b.Run("Plus", func(b *testing.B) {
        for i := 0; i < b.N; i++ {
            s := ""
            for j := 0; j < 100; j++ {
                s += "a"
            }
        }
    })
    b.Run("Builder", func(b *testing.B) {
        for i := 0; i < b.N; i++ {
            var sb strings.Builder
            for j := 0; j < 100; j++ {
                sb.WriteString("a")
            }
            _ = sb.String()
        }
    })
}
\`\`\`

### Running Tests

\`\`\`bash
go test ./...                    # all packages
go test -v ./internal/user/...   # verbose, specific package
go test -run TestAdd ./...       # specific test
go test -count=1 ./...           # no cache
go test -race ./...              # race detector
go test -cover ./...             # coverage
go test -coverprofile=cover.out && go tool cover -html=cover.out
\`\`\`
`
  },
  // ─── MODULE 9: DATABASE ───
  {
    id: 19,
    module: "Database",
    title: "Database Access & SQL",
    slug: "database-access-sql",
    description: "Learn Go database access: database/sql, connection pooling, queries, transactions, pgx for PostgreSQL, and the repository pattern.",
    difficulty: "advanced",
    duration: "35 min",
    content: `
## Database Access

### database/sql (Standard Library)

\`\`\`go
import (
    "database/sql"
    _ "github.com/lib/pq" // PostgreSQL driver
)

func NewDB(dsn string) (*sql.DB, error) {
    db, err := sql.Open("postgres", dsn)
    if err != nil {
        return nil, err
    }

    // Configure connection pool
    db.SetMaxOpenConns(25)
    db.SetMaxIdleConns(10)
    db.SetConnMaxLifetime(5 * time.Minute)

    if err := db.Ping(); err != nil {
        return nil, err
    }
    return db, nil
}
\`\`\`

### Queries

\`\`\`go
// Single row
var user User
err := db.QueryRowContext(ctx,
    "SELECT id, name, email FROM users WHERE id = $1", id,
).Scan(&user.ID, &user.Name, &user.Email)

if errors.Is(err, sql.ErrNoRows) {
    return nil, ErrNotFound
}

// Multiple rows
rows, err := db.QueryContext(ctx,
    "SELECT id, name, email FROM users WHERE active = $1", true,
)
if err != nil {
    return nil, err
}
defer rows.Close()

var users []User
for rows.Next() {
    var u User
    if err := rows.Scan(&u.ID, &u.Name, &u.Email); err != nil {
        return nil, err
    }
    users = append(users, u)
}
if err := rows.Err(); err != nil {
    return nil, err
}
\`\`\`

### Exec (INSERT, UPDATE, DELETE)

\`\`\`go
result, err := db.ExecContext(ctx,
    "INSERT INTO users (name, email) VALUES ($1, $2)",
    user.Name, user.Email,
)
if err != nil {
    return err
}

id, _ := result.LastInsertId()
affected, _ := result.RowsAffected()
\`\`\`

### Transactions

\`\`\`go
func transferFunds(ctx context.Context, db *sql.DB, from, to int, amount float64) error {
    tx, err := db.BeginTx(ctx, nil)
    if err != nil {
        return err
    }
    defer tx.Rollback() // no-op if committed

    _, err = tx.ExecContext(ctx,
        "UPDATE accounts SET balance = balance - $1 WHERE id = $2", amount, from)
    if err != nil {
        return fmt.Errorf("debit: %w", err)
    }

    _, err = tx.ExecContext(ctx,
        "UPDATE accounts SET balance = balance + $1 WHERE id = $2", amount, to)
    if err != nil {
        return fmt.Errorf("credit: %w", err)
    }

    return tx.Commit()
}
\`\`\`

### pgx (Recommended for PostgreSQL)

\`\`\`go
import "github.com/jackc/pgx/v5/pgxpool"

pool, err := pgxpool.New(ctx, databaseURL)
defer pool.Close()

// Batch queries
batch := &pgx.Batch{}
batch.Queue("INSERT INTO events (type) VALUES ($1)", "click")
batch.Queue("UPDATE counters SET count = count + 1 WHERE name = $1", "clicks")

br := pool.SendBatch(ctx, batch)
defer br.Close()
\`\`\`

### Repository Pattern

\`\`\`go
type UserRepository struct {
    db *sql.DB
}

func NewUserRepository(db *sql.DB) *UserRepository {
    return &UserRepository{db: db}
}

func (r *UserRepository) FindByID(ctx context.Context, id string) (*User, error) {
    var u User
    err := r.db.QueryRowContext(ctx,
        \\\`SELECT id, name, email, created_at
         FROM users WHERE id = $1\\\`, id,
    ).Scan(&u.ID, &u.Name, &u.Email, &u.CreatedAt)

    if errors.Is(err, sql.ErrNoRows) {
        return nil, ErrNotFound
    }
    return &u, err
}

func (r *UserRepository) Create(ctx context.Context, u *User) error {
    _, err := r.db.ExecContext(ctx,
        \\\`INSERT INTO users (id, name, email, created_at)
         VALUES ($1, $2, $3, $4)\\\`,
        u.ID, u.Name, u.Email, time.Now(),
    )
    return err
}
\`\`\`
`
  },
  // ─── MODULE 10: ADVANCED PATTERNS ───
  {
    id: 20,
    module: "Advanced Patterns",
    title: "Design Patterns in Go",
    slug: "design-patterns",
    description: "Implement Go design patterns: dependency injection, builder, strategy, observer/event system, and circuit breaker for resilient services.",
    difficulty: "advanced",
    duration: "35 min",
    content: `
## Design Patterns in Go

### Dependency Injection

\`\`\`go
// Define dependencies as interfaces
type Logger interface {
    Info(msg string, args ...any)
    Error(msg string, args ...any)
}

type UserStore interface {
    Get(ctx context.Context, id string) (*User, error)
    Create(ctx context.Context, u *User) error
}

type EmailSender interface {
    Send(ctx context.Context, to, subject, body string) error
}

// Service depends on interfaces
type UserService struct {
    store  UserStore
    email  EmailSender
    logger Logger
}

func NewUserService(store UserStore, email EmailSender, logger Logger) *UserService {
    return &UserService{store: store, email: email, logger: logger}
}

func (s *UserService) Register(ctx context.Context, input RegisterInput) (*User, error) {
    user := &User{Name: input.Name, Email: input.Email}

    if err := s.store.Create(ctx, user); err != nil {
        s.logger.Error("failed to create user", "error", err)
        return nil, err
    }

    if err := s.email.Send(ctx, user.Email, "Welcome!", "..."); err != nil {
        s.logger.Error("failed to send welcome email", "error", err)
        // don't fail registration for email failure
    }

    return user, nil
}
\`\`\`

### Builder Pattern

\`\`\`go
type QueryBuilder struct {
    table      string
    conditions []string
    args       []any
    orderBy    string
    limit      int
}

func NewQuery(table string) *QueryBuilder {
    return &QueryBuilder{table: table}
}

func (q *QueryBuilder) Where(condition string, args ...any) *QueryBuilder {
    q.conditions = append(q.conditions, condition)
    q.args = append(q.args, args...)
    return q
}

func (q *QueryBuilder) OrderBy(field string) *QueryBuilder {
    q.orderBy = field
    return q
}

func (q *QueryBuilder) Limit(n int) *QueryBuilder {
    q.limit = n
    return q
}

func (q *QueryBuilder) Build() (string, []any) {
    query := fmt.Sprintf("SELECT * FROM %s", q.table)
    if len(q.conditions) > 0 {
        query += " WHERE " + strings.Join(q.conditions, " AND ")
    }
    if q.orderBy != "" {
        query += " ORDER BY " + q.orderBy
    }
    if q.limit > 0 {
        query += fmt.Sprintf(" LIMIT %d", q.limit)
    }
    return query, q.args
}

// Usage
query, args := NewQuery("users").
    Where("active = $1", true).
    Where("age > $2", 18).
    OrderBy("name").
    Limit(10).
    Build()
\`\`\`

### Strategy Pattern

\`\`\`go
type CompressionStrategy interface {
    Compress(data []byte) ([]byte, error)
    Decompress(data []byte) ([]byte, error)
}

type GzipCompression struct{}
type ZstdCompression struct{}

type FileProcessor struct {
    compression CompressionStrategy
}

func (p *FileProcessor) Save(path string, data []byte) error {
    compressed, err := p.compression.Compress(data)
    if err != nil {
        return err
    }
    return os.WriteFile(path, compressed, 0644)
}
\`\`\`

### Observer / Event System

\`\`\`go
type EventType string

type Event struct {
    Type    EventType
    Payload any
}

type Handler func(Event)

type EventBus struct {
    mu       sync.RWMutex
    handlers map[EventType][]Handler
}

func NewEventBus() *EventBus {
    return &EventBus{handlers: make(map[EventType][]Handler)}
}

func (eb *EventBus) Subscribe(eventType EventType, handler Handler) {
    eb.mu.Lock()
    defer eb.mu.Unlock()
    eb.handlers[eventType] = append(eb.handlers[eventType], handler)
}

func (eb *EventBus) Publish(event Event) {
    eb.mu.RLock()
    defer eb.mu.RUnlock()
    for _, handler := range eb.handlers[event.Type] {
        go handler(event) // async
    }
}
\`\`\`

### Circuit Breaker

\`\`\`go
type CircuitBreaker struct {
    mu          sync.Mutex
    failures    int
    threshold   int
    resetAfter  time.Duration
    lastFailure time.Time
    state       string // "closed", "open", "half-open"
}

func (cb *CircuitBreaker) Execute(fn func() error) error {
    cb.mu.Lock()
    if cb.state == "open" {
        if time.Since(cb.lastFailure) > cb.resetAfter {
            cb.state = "half-open"
        } else {
            cb.mu.Unlock()
            return errors.New("circuit breaker is open")
        }
    }
    cb.mu.Unlock()

    err := fn()

    cb.mu.Lock()
    defer cb.mu.Unlock()

    if err != nil {
        cb.failures++
        cb.lastFailure = time.Now()
        if cb.failures >= cb.threshold {
            cb.state = "open"
        }
        return err
    }

    cb.failures = 0
    cb.state = "closed"
    return nil
}
\`\`\`
`
  },
  {
    id: 21,
    module: "Advanced Patterns",
    title: "Reflection & Code Generation",
    slug: "reflection-code-generation",
    description: "Understand Go reflection, struct tag inspection, go:generate for code generation, go:embed for embedding files, and when to use reflection.",
    difficulty: "advanced",
    duration: "30 min",
    content: `
## Reflection & Code Generation

### reflect Package

\`\`\`go
import "reflect"

// Get type and value info
v := reflect.ValueOf(42)
t := reflect.TypeOf(42)

fmt.Println(t.Kind())    // int
fmt.Println(v.Int())     // 42

// Inspect struct fields
type User struct {
    Name  string \\\`json:"name" validate:"required"\\\`
    Email string \\\`json:"email" validate:"email"\\\`
    Age   int    \\\`json:"age" validate:"min=0,max=150"\\\`
}

t := reflect.TypeOf(User{})
for i := 0; i < t.NumField(); i++ {
    field := t.Field(i)
    fmt.Printf("Field: %s, Type: %s, JSON: %s\\n",
        field.Name, field.Type, field.Tag.Get("json"))
}
\`\`\`

### Practical: Simple Validator

\`\`\`go
func Validate(s any) []string {
    var errors []string
    v := reflect.ValueOf(s)
    t := v.Type()

    for i := 0; i < t.NumField(); i++ {
        field := t.Field(i)
        value := v.Field(i)
        tag := field.Tag.Get("validate")

        if tag == "" {
            continue
        }

        rules := strings.Split(tag, ",")
        for _, rule := range rules {
            switch {
            case rule == "required":
                if value.IsZero() {
                    errors = append(errors,
                        fmt.Sprintf("%s is required", field.Name))
                }
            case strings.HasPrefix(rule, "min="):
                min, _ := strconv.Atoi(strings.TrimPrefix(rule, "min="))
                if value.Kind() == reflect.Int && int(value.Int()) < min {
                    errors = append(errors,
                        fmt.Sprintf("%s must be >= %d", field.Name, min))
                }
            }
        }
    }
    return errors
}
\`\`\`

### When to Use Reflection

- Serialization/deserialization (encoding/json uses it)
- Validation frameworks
- ORM field mapping
- Dependency injection containers

### When NOT to Use Reflection

- When generics solve the problem
- In hot paths (reflection is slow)
- When the code would be clearer without it

### go:generate

\`\`\`go
//go:generate stringer -type=Color
type Color int

const (
    Red Color = iota
    Green
    Blue
)

// After running "go generate", a color_string.go file is created
// with a String() method for Color
\`\`\`

\`\`\`go
//go:generate mockgen -source=repository.go -destination=mock_repository.go -package=user
type Repository interface {
    FindByID(ctx context.Context, id string) (*User, error)
}
\`\`\`

### go:embed

\`\`\`go
import "embed"

//go:embed templates/*.html
var templates embed.FS

//go:embed version.txt
var version string

//go:embed static/*
var staticFiles embed.FS

func main() {
    tmpl, err := template.ParseFS(templates, "templates/*.html")

    // Serve embedded static files
    http.Handle("/static/",
        http.StripPrefix("/static/",
            http.FileServer(http.FS(staticFiles))))
}
\`\`\`
`
  },
  {
    id: 22,
    module: "Advanced Patterns",
    title: "Performance & Profiling",
    slug: "performance-profiling",
    description: "Master Go performance: pprof profiling, memory optimization, sync.Pool, struct padding, race detection, escape analysis, and benchmarking.",
    difficulty: "advanced",
    duration: "30 min",
    content: `
## Performance & Profiling

### pprof — Built-in Profiler

\`\`\`go
import _ "net/http/pprof"

// Add to your server
go func() {
    log.Println(http.ListenAndServe("localhost:6060", nil))
}()
\`\`\`

\`\`\`bash
# CPU profile
go tool pprof http://localhost:6060/debug/pprof/profile?seconds=30

# Memory profile
go tool pprof http://localhost:6060/debug/pprof/heap

# Goroutine dump
go tool pprof http://localhost:6060/debug/pprof/goroutine

# In pprof interactive:
top 10       # top 10 functions
list funcName # show annotated source
web          # open flame graph in browser
\`\`\`

### Memory Optimization

\`\`\`go
// 1. Preallocate slices
// BAD
var s []int
for i := 0; i < n; i++ {
    s = append(s, i) // multiple reallocations
}

// GOOD
s := make([]int, 0, n)
for i := 0; i < n; i++ {
    s = append(s, i) // no reallocation
}

// 2. Use sync.Pool for frequently allocated objects
var bufPool = sync.Pool{
    New: func() any {
        return new(bytes.Buffer)
    },
}

func process(data []byte) {
    buf := bufPool.Get().(*bytes.Buffer)
    defer func() {
        buf.Reset()
        bufPool.Put(buf)
    }()
    buf.Write(data)
    // use buf...
}

// 3. strings.Builder for string concatenation
var sb strings.Builder
for _, s := range parts {
    sb.WriteString(s)
}
result := sb.String()

// 4. Struct field ordering (reduce padding)
// BAD (24 bytes with padding)
type Bad struct {
    a bool    // 1 byte + 7 padding
    b int64   // 8 bytes
    c bool    // 1 byte + 7 padding
}

// GOOD (16 bytes)
type Good struct {
    b int64   // 8 bytes
    a bool    // 1 byte
    c bool    // 1 byte + 6 padding
}
\`\`\`

### Race Detector

\`\`\`bash
go test -race ./...
go run -race main.go
\`\`\`

\`\`\`go
// Common race condition
var counter int

// BAD — data race
for i := 0; i < 1000; i++ {
    go func() { counter++ }()
}

// GOOD — use atomic
var counter int64
for i := 0; i < 1000; i++ {
    go func() { atomic.AddInt64(&counter, 1) }()
}
\`\`\`

### Escape Analysis

\`\`\`bash
go build -gcflags="-m" ./...
# Shows what escapes to heap vs stays on stack
\`\`\`

\`\`\`go
// Stack allocation (fast)
func sum(a, b int) int {
    result := a + b // stays on stack
    return result
}

// Heap allocation (slower, needs GC)
func newUser(name string) *User {
    u := User{Name: name} // escapes to heap
    return &u
}
\`\`\`
`
  },
  // ─── MODULE 11: PRODUCTION ───
  {
    id: 23,
    module: "Production",
    title: "Logging & Observability",
    slug: "logging-observability",
    description: "Learn production Go logging with slog (Go 1.21+), structured logging best practices, Prometheus metrics, and health check endpoints.",
    difficulty: "advanced",
    duration: "25 min",
    content: `
## Logging & Observability

### slog (Go 1.21+ Standard Library)

\`\`\`go
import "log/slog"

// Default logger
slog.Info("user logged in",
    "user_id", "123",
    "ip", "192.168.1.1",
)
// Output: 2024-01-15T10:30:00Z INFO user logged in user_id=123 ip=192.168.1.1

// JSON handler (for production)
logger := slog.New(slog.NewJSONHandler(os.Stdout, &slog.HandlerOptions{
    Level: slog.LevelInfo,
}))
slog.SetDefault(logger)

// Output: {"time":"2024-01-15T10:30:00Z","level":"INFO","msg":"user logged in","user_id":"123"}
\`\`\`

### Structured Logging Best Practices

\`\`\`go
// Add context to logger
logger := slog.With(
    "service", "user-api",
    "version", version,
)

// Request-scoped logger
func handleRequest(w http.ResponseWriter, r *http.Request) {
    reqLogger := slog.With(
        "request_id", r.Header.Get("X-Request-ID"),
        "method", r.Method,
        "path", r.URL.Path,
    )

    reqLogger.Info("request started")
    // ... handle request
    reqLogger.Info("request completed", "status", 200, "duration_ms", elapsed)
}

// Log levels
slog.Debug("detailed debug info")    // development only
slog.Info("normal operation")        // business events
slog.Warn("something unexpected")    // degraded but working
slog.Error("operation failed", "error", err) // action needed
\`\`\`

### Metrics with Prometheus

\`\`\`go
import "github.com/prometheus/client_golang/prometheus"

var (
    httpRequestsTotal = prometheus.NewCounterVec(
        prometheus.CounterOpts{
            Name: "http_requests_total",
            Help: "Total number of HTTP requests",
        },
        []string{"method", "path", "status"},
    )

    httpRequestDuration = prometheus.NewHistogramVec(
        prometheus.HistogramOpts{
            Name:    "http_request_duration_seconds",
            Help:    "HTTP request duration in seconds",
            Buckets: prometheus.DefBuckets,
        },
        []string{"method", "path"},
    )
)

func init() {
    prometheus.MustRegister(httpRequestsTotal, httpRequestDuration)
}

// Middleware
func metricsMiddleware(next http.Handler) http.Handler {
    return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
        start := time.Now()
        wrapped := &responseWriter{ResponseWriter: w, statusCode: 200}

        next.ServeHTTP(wrapped, r)

        duration := time.Since(start).Seconds()
        httpRequestsTotal.WithLabelValues(
            r.Method, r.URL.Path, strconv.Itoa(wrapped.statusCode),
        ).Inc()
        httpRequestDuration.WithLabelValues(
            r.Method, r.URL.Path,
        ).Observe(duration)
    })
}
\`\`\`

### Health Checks

\`\`\`go
func healthHandler(db *sql.DB) http.HandlerFunc {
    return func(w http.ResponseWriter, r *http.Request) {
        ctx, cancel := context.WithTimeout(r.Context(), 2*time.Second)
        defer cancel()

        status := map[string]string{"status": "healthy"}

        if err := db.PingContext(ctx); err != nil {
            status["status"] = "unhealthy"
            status["database"] = err.Error()
            w.WriteHeader(http.StatusServiceUnavailable)
        }

        json.NewEncoder(w).Encode(status)
    }
}
\`\`\`
`
  },
  {
    id: 24,
    module: "Production",
    title: "Configuration & Deployment",
    slug: "configuration-deployment",
    description: "Deploy Go applications: configuration patterns, multi-stage Docker builds, Makefiles, build-time version injection, and cross-compilation.",
    difficulty: "advanced",
    duration: "25 min",
    content: `
## Configuration & Deployment

### Configuration Pattern

\`\`\`go
type Config struct {
    Server   ServerConfig
    Database DatabaseConfig
    Redis    RedisConfig
    Log      LogConfig
}

type ServerConfig struct {
    Host         string        \\\`env:"SERVER_HOST" envDefault:"0.0.0.0"\\\`
    Port         int           \\\`env:"SERVER_PORT" envDefault:"8080"\\\`
    ReadTimeout  time.Duration \\\`env:"SERVER_READ_TIMEOUT" envDefault:"10s"\\\`
    WriteTimeout time.Duration \\\`env:"SERVER_WRITE_TIMEOUT" envDefault:"10s"\\\`
}

type DatabaseConfig struct {
    URL             string \\\`env:"DATABASE_URL,required"\\\`
    MaxOpenConns    int    \\\`env:"DB_MAX_OPEN_CONNS" envDefault:"25"\\\`
    MaxIdleConns    int    \\\`env:"DB_MAX_IDLE_CONNS" envDefault:"10"\\\`
    ConnMaxLifetime time.Duration \\\`env:"DB_CONN_MAX_LIFETIME" envDefault:"5m"\\\`
}

// Load from environment
func LoadConfig() (*Config, error) {
    var cfg Config
    if err := env.Parse(&cfg); err != nil {
        return nil, fmt.Errorf("parsing config: %w", err)
    }
    return &cfg, nil
}
\`\`\`

### Dockerfile (Multi-stage Build)

\`\`\`dockerfile
# Build stage
FROM golang:1.22-alpine AS builder
WORKDIR /app
COPY go.mod go.sum ./
RUN go mod download
COPY . .
RUN CGO_ENABLED=0 GOOS=linux go build -ldflags="-s -w" -o /app/server ./cmd/api

# Runtime stage
FROM alpine:3.19
RUN apk --no-cache add ca-certificates tzdata
WORKDIR /app
COPY --from=builder /app/server .

EXPOSE 8080
USER nonroot:nonroot
ENTRYPOINT ["./server"]
\`\`\`

### Makefile

\`\`\`makefile
.PHONY: build run test lint migrate

APP_NAME := myapp
VERSION := $(shell git describe --tags --always)

build:
	CGO_ENABLED=0 go build -ldflags="-s -w -X main.version=$(VERSION)" \\
		-o bin/$(APP_NAME) ./cmd/api

run:
	go run ./cmd/api

test:
	go test -race -count=1 ./...

test-coverage:
	go test -race -coverprofile=coverage.out ./...
	go tool cover -html=coverage.out -o coverage.html

lint:
	golangci-lint run ./...

migrate-up:
	goose -dir migrations postgres "$(DATABASE_URL)" up

migrate-down:
	goose -dir migrations postgres "$(DATABASE_URL)" down

docker-build:
	docker build -t $(APP_NAME):$(VERSION) .

docker-run:
	docker run -p 8080:8080 --env-file .env $(APP_NAME):$(VERSION)
\`\`\`

### Build with Version Info

\`\`\`go
// main.go
var (
    version = "dev"
    commit  = "none"
    date    = "unknown"
)

func main() {
    slog.Info("starting server",
        "version", version,
        "commit", commit,
        "date", date,
    )
    // ...
}
\`\`\`

\`\`\`bash
go build -ldflags="-X main.version=v1.2.3 -X main.commit=$(git rev-parse HEAD) -X main.date=$(date -u +%Y-%m-%dT%H:%M:%SZ)" -o server ./cmd/api
\`\`\`

### Cross-Compilation

\`\`\`bash
# Build for multiple platforms
GOOS=linux   GOARCH=amd64 go build -o bin/app-linux-amd64
GOOS=linux   GOARCH=arm64 go build -o bin/app-linux-arm64
GOOS=darwin  GOARCH=amd64 go build -o bin/app-darwin-amd64
GOOS=darwin  GOARCH=arm64 go build -o bin/app-darwin-arm64
GOOS=windows GOARCH=amd64 go build -o bin/app-windows-amd64.exe
\`\`\`
`
  },
  {
    id: 25,
    module: "Production",
    title: "Building a Complete REST API",
    slug: "building-complete-rest-api",
    description: "Build a production-grade Go REST API: 3-layer architecture (handler, service, repository), project structure, routing, validation, and wiring.",
    difficulty: "advanced",
    duration: "45 min",
    content: `
## Building a Production REST API

Putting it all together — a production-grade API structure.

### Project Structure

\`\`\`
bookstore/
├── cmd/api/main.go
├── internal/
│   ├── book/
│   │   ├── model.go
│   │   ├── handler.go
│   │   ├── service.go
│   │   └── repository.go
│   ├── middleware/
│   │   ├── logging.go
│   │   ├── recovery.go
│   │   └── cors.go
│   └── server/
│       └── server.go
├── migrations/
├── go.mod
└── Makefile
\`\`\`

### Entry Point

\`\`\`go
// cmd/api/main.go
package main

func main() {
    ctx := context.Background()

    cfg, err := config.Load()
    if err != nil {
        log.Fatalf("loading config: %v", err)
    }

    // Initialize dependencies
    db, err := database.New(cfg.Database)
    if err != nil {
        log.Fatalf("connecting to database: %v", err)
    }
    defer db.Close()

    // Wire up layers
    bookRepo := book.NewRepository(db)
    bookSvc := book.NewService(bookRepo)
    bookHandler := book.NewHandler(bookSvc)

    // Setup server
    srv := server.New(cfg.Server, bookHandler)

    // Graceful shutdown
    go func() {
        slog.Info("server starting", "port", cfg.Server.Port)
        if err := srv.ListenAndServe(); err != http.ErrServerClosed {
            log.Fatalf("server error: %v", err)
        }
    }()

    quit := make(chan os.Signal, 1)
    signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)
    <-quit

    shutdownCtx, cancel := context.WithTimeout(ctx, 10*time.Second)
    defer cancel()
    srv.Shutdown(shutdownCtx)
}
\`\`\`

### Model

\`\`\`go
// internal/book/model.go
type Book struct {
    ID        string    \\\`json:"id"\\\`
    Title     string    \\\`json:"title"\\\`
    Author    string    \\\`json:"author"\\\`
    ISBN      string    \\\`json:"isbn"\\\`
    Price     float64   \\\`json:"price"\\\`
    CreatedAt time.Time \\\`json:"created_at"\\\`
    UpdatedAt time.Time \\\`json:"updated_at"\\\`
}

type CreateBookInput struct {
    Title  string  \\\`json:"title"\\\`
    Author string  \\\`json:"author"\\\`
    ISBN   string  \\\`json:"isbn"\\\`
    Price  float64 \\\`json:"price"\\\`
}

func (i *CreateBookInput) Validate() error {
    if i.Title == "" {
        return errors.New("title is required")
    }
    if i.Author == "" {
        return errors.New("author is required")
    }
    if i.Price < 0 {
        return errors.New("price must be non-negative")
    }
    return nil
}
\`\`\`

### Handler (HTTP Layer)

\`\`\`go
// internal/book/handler.go
type Handler struct {
    service *Service
}

func NewHandler(svc *Service) *Handler {
    return &Handler{service: svc}
}

func (h *Handler) RegisterRoutes(mux *http.ServeMux) {
    mux.HandleFunc("GET /api/books", h.List)
    mux.HandleFunc("GET /api/books/{id}", h.Get)
    mux.HandleFunc("POST /api/books", h.Create)
    mux.HandleFunc("PUT /api/books/{id}", h.Update)
    mux.HandleFunc("DELETE /api/books/{id}", h.Delete)
}

func (h *Handler) List(w http.ResponseWriter, r *http.Request) {
    books, err := h.service.List(r.Context())
    if err != nil {
        writeError(w, http.StatusInternalServerError, err.Error())
        return
    }
    writeJSON(w, http.StatusOK, books)
}

func (h *Handler) Create(w http.ResponseWriter, r *http.Request) {
    var input CreateBookInput
    if err := json.NewDecoder(r.Body).Decode(&input); err != nil {
        writeError(w, http.StatusBadRequest, "invalid request body")
        return
    }

    if err := input.Validate(); err != nil {
        writeError(w, http.StatusBadRequest, err.Error())
        return
    }

    book, err := h.service.Create(r.Context(), input)
    if err != nil {
        writeError(w, http.StatusInternalServerError, err.Error())
        return
    }

    writeJSON(w, http.StatusCreated, book)
}

func writeJSON(w http.ResponseWriter, status int, data any) {
    w.Header().Set("Content-Type", "application/json")
    w.WriteHeader(status)
    json.NewEncoder(w).Encode(data)
}

func writeError(w http.ResponseWriter, status int, message string) {
    writeJSON(w, status, map[string]string{"error": message})
}
\`\`\`

### Service (Business Logic)

\`\`\`go
// internal/book/service.go
type Service struct {
    repo *Repository
}

func NewService(repo *Repository) *Service {
    return &Service{repo: repo}
}

func (s *Service) Create(ctx context.Context, input CreateBookInput) (*Book, error) {
    book := &Book{
        ID:        uuid.New().String(),
        Title:     input.Title,
        Author:    input.Author,
        ISBN:      input.ISBN,
        Price:     input.Price,
        CreatedAt: time.Now(),
        UpdatedAt: time.Now(),
    }

    if err := s.repo.Create(ctx, book); err != nil {
        return nil, fmt.Errorf("creating book: %w", err)
    }
    return book, nil
}
\`\`\`

This 3-layer architecture (Handler → Service → Repository) gives you:
- **Testability** — mock any layer independently
- **Separation of concerns** — HTTP logic doesn't leak into business logic
- **Flexibility** — swap databases, add caching, etc. without touching handlers
`
  },
]

export const SITE_URL = 'https://gotutor.dev'
export const SITE_NAME = 'GoTutor - The Complete Go Programming Tutorial'
export const SITE_DESCRIPTION = 'Learn Go (Golang) from beginner to advanced with 25 in-depth lessons covering concurrency, interfaces, generics, testing, databases, and production deployment patterns.'

export const tutorialsBySlug = Object.fromEntries(tutorials.map(t => [t.slug, t]))

export default tutorials
