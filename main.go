package main

import (
	"html/template"
	"log"
	"net/http"
	"time"

	"github.com/gorilla/mux"
)

func main() {
	var templates = make(map[string]*template.Template)
	templates["index"] = loadTemplate("index")
	templates["ble"] = loadTemplate("ble")

	r := mux.NewRouter().StrictSlash(true)
	r.Use(loggingMiddleware)

	r.PathPrefix("/static/").Handler(http.StripPrefix("/static/", http.FileServer(http.Dir("static/"))))

	handler := NewHandler(templates)

	//http.HandleFunc("/",)
	// インデックス: 記事一覧を表示
	r.HandleFunc("/index", handler.IndexPage)
	// BLE確認用
	r.HandleFunc("/ble", handler.BluetoothOperationPage)

	// wavedata csv to json response
	r.HandleFunc("/wavedata", handler.WaveDataJSONFromCSV)

	srv := &http.Server{
		Handler: r,
		Addr:    ":8080",
		// Good practice: enforce timeouts for servers you create!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}
	log.Fatal(srv.ListenAndServe())
}

func loadTemplate(name string) *template.Template {
	t, err := template.ParseFiles(
		"template/"+name+".html",
		"template/_header.html",
		"template/_footer.html",
	)
	if err != nil {
		log.Fatalf("template error: %v", err)
	}
	return t
}

func loggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		t1 := time.Now()
		next.ServeHTTP(w, r)
		t2 := time.Now()
		t := t2.Sub(t1)
		log.Printf("[%s] %s %s", r.Method, r.URL, t.String())
	})
}
