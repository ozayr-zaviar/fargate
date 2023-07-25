import chess
import json
from datetime import datetime, timedelta

def compute_moves():
    start_time = datetime.now()
    end_time = start_time + timedelta(seconds=0.2)
    board = chess.Board()
    legal_moves = list(board.legal_moves)
    turn = 0

    while datetime.now() < end_time and legal_moves:
        turn += 1
        move = legal_moves.pop()
        board.push(move)

        # Generate all legal moves for the new position
        legal_moves = list(board.legal_moves) + legal_moves

        # Undo the move to get back to the original position
        board.pop()

        # Save all moves in a JSON file
        with open('moves.txt', 'a') as f:
            json.dump({str(turn): str(move)}, f)


if __name__ == "__main__":
    compute_moves()
