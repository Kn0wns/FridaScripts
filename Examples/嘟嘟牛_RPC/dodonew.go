package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"
)

func main() {
	parmas := getParams("16688889999", "a12345678")
	fmt.Println("[*] parmas :=> " + parmas)
	response := Login(parmas)
	fmt.Println("[*] response :=> " + response)
	plaintext := deCipher(response)
	fmt.Println("[*] response.deCipher :=> " + plaintext)

}

func getParams(use string, pwd string) string {
	client := &http.Client{}
	req, err := http.NewRequest("GET", "http://127.0.0.1:8080/getParams?user="+use+"&pwd="+pwd, nil)
	if err != nil {
		log.Fatal(err)
	}
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	bodyText, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	//fmt.Printf("%s\n", bodyText)
	return string(bodyText)
}

func Login(params string) string {
	client := &http.Client{}
	var data = strings.NewReader(params)
	req, err := http.NewRequest("POST", "http://api.dodovip.com/api/user/login", data)
	if err != nil {
		log.Fatal(err)
	}
	req.Header.Set("User-Agent", "Dalvik/2.1.0 (Linux; U; Android 10; Pixel Build/QP1A.191005.007.A3)")
	req.Header.Set("Content-Type", "application/json")
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	bodyText, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	//fmt.Printf("%s\n", bodyText)
	return string(bodyText)
}

func deCipher(cipherText string) string {
	client := &http.Client{}
	params := "{\"data\":\"" + cipherText + "\"}"
	data := strings.NewReader(params)
	//var data = strings.NewReader(`{"data":"2v+DC2gq7RuAC8PE5GZz5wH3/y9ZVcWhFwhDY9L19g9iEd075+Q7xwewvfIN0g0ec/NaaF43/S0="}`)
	req, err := http.NewRequest("POST", "http://127.0.0.1:8080/deCipher", data)
	if err != nil {
		log.Fatal(err)
	}
	req.Header.Set("User-Agent", "Apipost client Runtime/+https://www.apipost.cn/")
	req.Header.Set("Content-Type", "application/json")
	resp, err := client.Do(req)
	if err != nil {
		log.Fatal(err)
	}
	bodyText, err := ioutil.ReadAll(resp.Body)
	if err != nil {
		log.Fatal(err)
	}
	//fmt.Printf("%s\n", bodyText)
	return string(bodyText)
}
