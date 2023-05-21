package main

import (
    "context"
    "encoding/json"
    "errors"
    "fmt"
    "net/http"
    "reflect"
    "regexp"
    "time"

    jwt "github.com/dgrijalva/jwt-go"
   // "github.com/olivere/elastic"
    elastic "gopkg.in/olivere/elastic.v6"

)

const (
    USER_INDEX = "user"
    USER_TYPE  = "user"
)

type User struct {
    Username string `json:"username"`
    Password string `json:"password"`
    Age      int64  `json:"age"`
    Gender   string `json:"gender"`
}

var mySigningKey = []byte("secret")
func checkUser(username, password string) error {
    client, err := elastic.NewClient(elastic.SetURL(ES_URL), elastic.SetSniff(false))
    if err != nil {
        return err
    }

    query := elastic.NewTermQuery("username", username)

    searchResult, err := client.Search().
        Index(USER_INDEX).
        Query(query).
        Pretty(true).
        Do(context.Background())
    if err != nil {
        return err
    }

    var utyp User
    for _, item := range searchResult.Each(reflect.TypeOf(utyp)) {
        if u, ok := item.(User); ok {
            if username == u.Username && password == u.Password {
                fmt.Printf("Login as %s\n", username)
                return nil
            }
        }
    }

    return errors.New("Wrong username or password")
}

func addUser(user User) error {
  client, err := elastic.NewClient(elastic.SetURL(ES_URL), elastic.SetSniff(false))
    if err != nil {
        return err
    }

    // select * from users where username = ?
    query := elastic.NewTermQuery("username", user.Username)

    searchResult, err := client.Search().
        Index(USER_INDEX).
        Query(query).
        Pretty(true).
        Do(context.Background())
    if err != nil {
        return err
    }

    if searchResult.TotalHits() > 0 {
        return errors.New("User already exists")
    }

    _, err = client.Index().
        Index(USER_INDEX).
        Type(USER_TYPE).
        Id(user.Username).
        BodyJson(user).
        Refresh("wait_for").
        Do(context.Background())
    if err != nil {
        return err
    }

    fmt.Printf("User is added: %s\n", user.Username)
    return nil
}

// Create a new token object, specifying signing method and the claims
// you would like it to contain.
token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
    "foo": "bar",
    "nbf": time.Date(2015, 10, 10, 12, 0, 0, 0, time.UTC).Unix(),
})

// Sign and get the complete encoded token as a string using the secret
tokenString, err := token.SignedString(hmacSampleSecret)

fmt.Println(tokenString, err)

func handlerLogin(w http.ResponseWriter, r *http.Request) {
    fmt.Println("Received one login request")
    w.Header().Set("Content-Type", "text/plain")
    w.Header().Set("Access-Control-Allow-Origin", "*")

    if r.Method == "OPTIONS" {
        return
    }

    decoder := json.NewDecoder(r.Body)
    var user User
    if err := decoder.Decode(&user); err != nil {
        http.Error(w, "Cannot decode user data from client", http.StatusBadRequest)
        fmt.Printf("Cannot decode user data from client %v.\n", err)
        return
    }

    if err := checkUser(user.Username, user.Password); err != nil {
        if err.Error() == "Wrong username or password" {
            http.Error(w, "Wrong username or password", http.StatusUnauthorized)
        } else {
            http.Error(w, "Failed to read from ElasticSearch", http.StatusInternalServerError)
        }
        return
    }

    token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
        "username": user.Username,
        "exp": time.Now().Add(time.Hour * 24).Unix(),
    })

    tokenString, err := token.SignedString(mySigningKey)
    if err != nil {
        http.Error(w, "Failed to generate token", http.StatusInternalServerError)
        fmt.Printf("Failed to generate token %v.\n", err)
        return
    }

    w.Write([]byte(tokenString))
}

func handlerSignup(w http.ResponseWriter, r *http.Request) {
    fmt.Println("Received one signup request")
    w.Header().Set("Content-Type", "text/plain")
    w.Header().Set("Access-Control-Allow-Origin", "*")

    if r.Method == "OPTIONS" {
        return
    }

    decoder := json.NewDecoder(r.Body)
    var user User
    if err := decoder.Decode(&user); err != nil {
        http.Error(w, "Cannot decode user data from client", http.StatusBadRequest)
        fmt.Printf("Cannot decode user data from client %v.\n", err)
        return
    }

    if user.Username == "" || user.Password == "" || !regexp.MustCompile (`^[a-z0-9_]+$`).MatchString(user.Username) {
        http.Error(w, "Invalid username or password", http.StatusBadRequest)
        fmt.Printf("Invalid username or password.\n")
        return
    }

    if err := addUser(user); err != nil {
        if err.Error() == "User already exists" {
            http.Error(w, "User already exists", http.StatusBadRequest)
        } else {
            http.Error(w, "Failed to save to ElasticSearch", http.StatusInternalServerError)
        }
        return
    }

    w.Write([]byte("User added successfully."))
}



/*
The code you provided seems to be a Go program that handles user authentication and registration using Elasticsearch and JSON Web Tokens (JWTs). It includes functions for checking user credentials, adding users, and handling HTTP requests for login and signup.

Here's a breakdown of the code:

Package and import statements: The code is part of the main package and imports necessary packages, including "net/http" for HTTP server functionality and "github.com/dgrijalva/jwt-go" for JWT handling.

Constants: The code defines constants for Elasticsearch index and type names.

User struct: It defines a User struct with fields for username, password, age, and gender. The struct tags (json:"...") specify how the struct should be serialized to JSON.

Global variables: The code declares a global variable mySigningKey, which represents the secret key used for signing JWTs.

checkUser function: It checks if a given username and password match a user stored in Elasticsearch. It establishes a connection to Elasticsearch, performs a search based on the username, and compares the retrieved user's credentials with the provided ones.

addUser function: It adds a new user to Elasticsearch. It checks if the user already exists, and if not, indexes the user data into Elasticsearch.

Token generation: The code creates a new JWT token with specific claims and signs it using the HMAC-SHA256 algorithm. The resulting token string is printed to the console.

handlerLogin function: It handles the login HTTP request. It decodes the user data from the request body, checks the user's credentials using the checkUser function, and generates a JWT token if the credentials are valid. The token is then returned to the client.

handlerSignup function: It handles the signup HTTP request. It decodes the user data from the request body, validates the username and password, adds the user to Elasticsearch using the addUser function, and sends a response indicating success or failure.
*/