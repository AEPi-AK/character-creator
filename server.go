package main

import "net/http"

func main() {
	http.Handle("/", http.FileServer(http.Dir("./build")))
	err := http.ListenAndServe(":8000", nil)

	if err != nil {
		panic(err)
	}
}
