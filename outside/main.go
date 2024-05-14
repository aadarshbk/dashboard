package main

import (
    "encoding/json"
    "log"
    "net/http"
)

type Sale struct {
    Month  string  `json:"month"`
    Amount float64 `json:"amount"`
}

var sales = []Sale{
    {Month: "January", Amount: 1000},
    {Month: "February", Amount: 1500},
    {Month: "March", Amount: 2000},
    // Add more data for other months
}

func handleSales(w http.ResponseWriter, r *http.Request) {
    w.Header().Set("Content-Type", "application/json")
    if err := json.NewEncoder(w).Encode(sales); err != nil {
        log.Printf("error encoding response: %v", err)
        http.Error(w, "internal server error", http.StatusInternalServerError)
        return
    }
}

func main() {
    http.HandleFunc("/api/sales", handleSales)
    log.Fatal(http.ListenAndServe(":8080", nil))
} 