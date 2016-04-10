package main

import ( 
	"net/http"
	"fmt"
	"log"
	"encoding/json"

	"gopkg.in/mgo.v2"
	"gopkg.in/mgo.v2/bson"
	"github.com/gorilla/mux"
)

var (
	IsDrop = true
	c *mgo.Collection
)

func HandleCharacters(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	sha := vars["characterSha"]
	fmt.Fprintln(w, "Name:", sha)

	var results []Character
	err := c.Find(nil).All(&results)
	if err != nil {
		panic(err)
	}

	result := Character{}
	err = c.Find(bson.M{"name": sha}).One(&result)
	if err != nil {
		fmt.Fprintln(w, "Character not found!")
		return
	}

	resultString,_ := json.Marshal(result)
	fmt.Fprintln(w, "", string(resultString))
}

func Index(w http.ResponseWriter, r *http.Request) {
	http.FileServer(http.Dir("./build"))
}

func main() {

	session, err := mgo.Dial("mongodb://isaac:sucks@ds021650.mlab.com:21650/aepi-ak-booth-2016")
	if err != nil {
		panic(err)
	}

	defer session.Close()

	session.SetMode(mgo.Monotonic, true)

	// Drop Database
	if IsDrop {
		err = session.DB("aepi-ak-booth-2016").DropDatabase()
		if err != nil {
			panic(err)
		}
	}

	// Collection People
	c = session.DB("aepi-ak-booth-2016").C("people")

	// Index
	index := mgo.Index{
		Key:        []string{"name"},
		Unique:     true,
		DropDups:   true,
		Background: true,
		Sparse:     true,
	}

	err = c.EnsureIndex(index)
	if err != nil {
		panic(err)
	}

	// Insert Data
	err = c.Insert(&Character{Name: "Ale"}, &Character{Name: "Cla"})

	if err != nil {
		panic(err)
	}



	router := mux.NewRouter().StrictSlash(true)
	router.HandleFunc("/characters/{characterSha}", HandleCharacters)


	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./build"))) 
	log.Fatal(http.ListenAndServe(":8000", router))
}
