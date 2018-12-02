package main
import (
	"fmt"
	"io/ioutil"
	"strings"
	"strconv"
)

var exists = struct{}{}

type set struct {
	m map[int]struct{}
}

func NewSet() *set {
	s := &set{}
	s.m = make(map[int]struct{})
	return s
}

func (s *set) Add(value int) {
    s.m[value] = exists
}

func (s *set) Remove(value int) {
    delete(s.m, value)
}

func (s *set) Contains(value int) bool {
    _, c := s.m[value]
    return c
}


func get_input() (data []string) {
	content, err := ioutil.ReadFile("day1_input.txt")
	if err != nil {
		return
	}
	return strings.Split(string(content), "\r\n")
}

func final_sum(input []string) (sum int) {
	for _, freq := range input {
		freq_int, err := strconv.Atoi(freq)
		if err != nil {
			fmt.Println(err)
		}
		sum += freq_int
	}
	return sum
}

func first_repeat_sum(input []string) (first_duplicate_sum int) {
	known_values := NewSet()
	known_values.Add(first_duplicate_sum)
	safe_to_add := 1

	for (safe_to_add == 1) {
		for _, freq := range input {
			freq_int, err := strconv.Atoi(freq)
			if err != nil {
				fmt.Println(err)
			}
			if safe_to_add == 1 {
				first_duplicate_sum += freq_int
			}
			if known_values.Contains(first_duplicate_sum) {
				safe_to_add = 0
			}

			known_values.Add(first_duplicate_sum)
		}
	}

	return first_duplicate_sum
}

func main() {
	data := get_input()
	fmt.Println("First solution is " + strconv.Itoa(final_sum(data)))
	fmt.Println("Second solution is " + strconv.Itoa(first_repeat_sum(data)))
}