from itertools import combinations

def get_input() -> list:
    with open("day2_input.txt", 'r') as content:
        return content.read().split("\n")

def calculate_checksum(input: list) -> int:
    count_list = [0,0]
    for box_id in input:
        appearances = {}
        for letter in box_id:
            if letter not in appearances:
                appearances[letter] = 1
            else:
                appearances[letter] += 1
        
        if 2 in appearances.values():
            count_list[0] += 1
        if 3 in appearances.values():
            count_list[1] += 1

    return count_list[0] * count_list[1]

def correct_box_id(input: list) -> str:
    for box_id_a, box_id_b in combinations(input, 2):
      distance = sum(1 for letterA, letterB in zip(box_id_a, box_id_b) if letterA != letterB)
      if 1 == distance:
        common = [x for x in box_id_a if x in box_id_b]
        return ''.join(common)


print("First solution is " + str(calculate_checksum(get_input())))
print("Second solution is " + correct_box_id(get_input()))