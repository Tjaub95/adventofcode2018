from functools import reduce

def get_input() -> list:
    with open("day1_input.txt", 'r') as content:
        return content.read().split("\n")

def final_sum(input: list) -> int:
    sum = lambda total,freq: int(total) + int(freq)
    return(reduce(sum, input))

def first_repeat_sum(input: list) -> int:
    sum = 0
    known_values = set()

    while True:
        for item in input:
            sum += int(item)
            if sum in known_values:
                return sum
            known_values.add(sum)

    return sum


data = get_input()

print("First solution is " + str(final_sum(input=data)))
print("Second solution is " + str(first_repeat_sum(input=data)))