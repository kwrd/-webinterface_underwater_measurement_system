package main

import (
	"encoding/csv"
	"encoding/json"
	"html/template"
	"log"
	"net/http"
	"os"
	"strconv"
)

type Handler struct {
	View map[string]*template.Template
}

func NewHandler(template map[string]*template.Template) *Handler {
	return &Handler{View: template}
}

func responseByJSON(w http.ResponseWriter, status int, data interface{}) {
	w.WriteHeader(status)
	json.NewEncoder(w).Encode(data)
	return
}

func (h *Handler) IndexPage(w http.ResponseWriter, r *http.Request) {
	if err := h.View["index"].Execute(w, struct{}{}); err != nil {
		log.Printf("failed to execute template: %v", err)
	}
}

func (h *Handler) BluetoothOperationPage(w http.ResponseWriter, r *http.Request) {
	if err := h.View["ble"].Execute(w, struct{}{}); err != nil {
		log.Printf("failed to execute template: %v", err)
	}
}

func (h *Handler) ChartPage(w http.ResponseWriter, r *http.Request) {
	if err := h.View["index"].Execute(w, struct{}{}); err != nil {
		log.Printf("failed to execute template: %v", err)
	}
}

func (h *Handler) WaveDataJSONFromCSV(w http.ResponseWriter, r *http.Request) {
	// とりあえず static/sample/samplewfdata.csvをjsonに変換
	waveData := struct {
		Time    []float64 `json:"time"`
		Voltage []float64 `json:"voltage"`
	}{
		Time:    []float64{},
		Voltage: []float64{},
	}

	csvFile, err := os.Open("static/sample/samplewfdata.csv")
	if err != nil {
		log.Printf("Failed to load csv: %v", err)
	}
	defer csvFile.Close()

	rcd := csv.NewReader(csvFile)
	records, err := rcd.ReadAll()
	if err != nil {
		log.Println(err)
		//os.Exit(1)
	}

	for _, e := range records {
		t, err := strconv.ParseFloat(e[0], 64)
		if err != nil {
			log.Println(err)
		}
		v, err := strconv.ParseFloat(e[1], 64)
		if err != nil {
			log.Println(err)
		}
		waveData.Time = append(waveData.Time, t)
		waveData.Voltage = append(waveData.Voltage, v)
	}
	//fmt.Println(waveData)
	responseByJSON(w, 200, waveData)
}
