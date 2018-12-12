from collections import deque, defaultdict

def play_game(max_players, last_marble):
    scores = defaultdict(int)
    marble_circle = deque([0])

    for marble in range(1, last_marble + 1):
        if marble % 23 == 0:
            marble_circle.rotate(7)
            scores[marble % max_players] += marble + marble_circle.pop()
            marble_circle.rotate(-1)
        else:
            marble_circle.rotate(-1)
            marble_circle.append(marble)

    return max(scores.values()) if scores else 0

print("First solution is " + str(play_game(432, 71019)))
print("Second solution is " + str(play_game(432, 7101900)))