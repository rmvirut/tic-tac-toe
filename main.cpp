#include <iostream>
#include <string>
using namespace std;

// This is a game of tic tac toe

int board[3][3];

/**
 *   |   |
 * 1 | 2 | 3
 *___|___|___
 *   |   |
 * 4 | 5 | 6
 *___|___|___
 *   |   |
 * 7 | 8 | 9
 *   |   |
 */
void printTable(int width, int height) {
	string three_spaces = "   ";
	string v_slash = "|";
	string h_dash = "___";

	int board_row = 0;

	for (int i = 0; i < 9; i++) {
		if (i == 2 || i == 5 ) {
			cout << h_dash << v_slash << h_dash << v_slash << h_dash << endl;
		} else if (i % 3 == 1) {
			cout << " " << board[board_row][0] << " " << v_slash << " "
					<< board[board_row][1] << " " << v_slash << " "
					<< board[board_row][2] << " " << endl;
			board_row++;
		} else {
			cout << three_spaces << v_slash << three_spaces << v_slash << endl;
		}

	}

	board_row = 1;
}

int main() {
	int b_width = 3;
	int b_height = 3;

	int count = 1;
	for (int i = 0; i < 3; i++) {
		for (int k = 0; k < 3; k++) {
			board[i][k] = count;
			count++;
		}
	}

	printTable(b_width, b_height);

	return 0;
}
