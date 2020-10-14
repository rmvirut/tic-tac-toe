#include <iostream>
#include <string>
#include <limits>
using namespace std;

// This is a game of tic tac toe

char board[3][3];

bool playerOne = false;

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
    
    //printing the board with a for-loop
    cout << "\n" << endl;
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
	cout << "\n" << endl;

	board_row = 1;
}

/**
 * 
 * 
 * @param b_location: the location on the board the player would like to place their next move
 * 
 */

bool addMove(int b_location){
    
    char symbol = 'x';
    
    if(playerOne == false){
        symbol = 'o';
    }
    
    switch (b_location){
        case 1:
            board[0][0] = symbol;
        break;
        case 2:
            board[0][1] = symbol;
        break;
        case 3:
            board[0][2] = symbol;
        break;
        case 4:
            board[1][0] = symbol;
        break;
        case 5:
            board[1][1] = symbol;
        break;
        case 6:
            board[1][2] = symbol;
        break;
        case 7:
            board[2][0] = symbol;
        break;
        case 8:
            board[2][1] = symbol;
        break;
        case 9:
            board[2][2] = symbol;
        break;
    }
    
    return true;
}

bool checkLocation(int b_location){
    
    return true;
}

int checkForWinner(int playerID){
    
    return 1;
}

bool playGame(int b_width, int b_height){
    
    char nextMove;
    
    cout.flush();
    
    cout << "Enter your next move:\t";
    
        cin >> nextMove;
        cout << nextMove;
    
    
    if(nextMove == 'e'){
        return false;
    }
    
    printTable(b_width, b_height);
	
	addMove(nextMove);
	
	printTable(b_width, b_height);
	
	return true;
}

int main() {
	int b_width = 3;
	int b_height = 3;
    char boardLabels[] = {'1', '2', '3', '4', '5', '6', '7', '8', '9'};
	int count = 0;
	for (int i = 0; i < 3; i++) {
		for (int k = 0; k < 3; k++) {
			board[i][k] = boardLabels[count];
			count++;
// 			cout << static_cast<char>(count) << endl;
		}
	}

bool endGame = false;

do {
    endGame = playGame(b_width, b_height);
    
} while(endGame == false);


	return 0;
}
