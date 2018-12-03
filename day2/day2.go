package main
import (
	"fmt"
	"io/ioutil"
	"strings"
	"strconv"
)

func get_input() (data []string) {
	content, err := ioutil.ReadFile("day2_input.txt")
	if err != nil {
		return
	}
	return strings.Split(string(content), "\r\n")
}

func calculate_checksum(input []string) (checksum int) {
	two_count := 0
	three_count := 0
	for _, box_id := range input {
		appearances := make(map[rune]int)
		for _, letter := range box_id {
			appearances[letter]++
		}

		two_seen := false
		three_seen := false
		for _, count := range appearances {
			if count == 2 && !two_seen {
				two_count++
				two_seen = true
			}
			if count == 3 && !three_seen {
				three_count++
				three_seen = true
			}
		}
	}
	return two_count * three_count
}

func correct_box_id(input []string) (correct string) {
	return "test"
}

func main() {
	fmt.Println("First solution is " + strconv.Itoa(calculate_checksum(get_input())))
	fmt.Println("Second solution is " + correct_box_id(get_input()))
}