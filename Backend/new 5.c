#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <unistd.h>
#include <sys/types.h>
#include <sys/ipc.h>
#include <sys/shm.h>
#include <time.h>

#define SHM_SIZE 1 // Size of shared memory segment in bytes
#define MAX_GUESSES 5 // Maximum number of guesses allowed

int main() {
    int shmid, count = 0, result;
    key_t key;
    char *shm, letter, guess[2];
    int correct = 0;
    
    // Generate a random letter
    srand(time(NULL));
    letter = 'A' + (rand() % 26);
    
    // Generate a unique key for the shared memory segment
    key = ftok(".", 's');
    
    // Create the shared memory segment
    shmid = shmget(key, SHM_SIZE, IPC_CREAT | 0666);
    if (shmid == -1) {
        perror("shmget");
        exit(1);
    }
    
    // Attach the shared memory segment to the process
    shm = shmat(shmid, NULL, 0);
    if (shm == (char *) -1) {
        perror("shmat");
        exit(1);
    }
    
    // Write the letter into the shared memory segment
   ```c
    memcpy(shm, &letter, sizeof(char));
    
    // Prompt the user to guess the letter
    while (count < MAX_GUESSES && !correct) {
        printf("Guess the letter: ");
        scanf("%s", guess);
        result = strcmp(guess, &letter);
        if (result == 0) {
            printf("Congratulations, you guessed the letter %c in %d moves!\n", letter, count + 1);
            correct = 1;
        } else if (result < 0) {
            printf("Your guess is too low.\n");
        } else {
            printf("Your guess is too high.\n");
        }
        count++;
    }
    
    // If the user has not guessed the correct letter in 5 moves, print the correct letter
    if (!correct) {
        printf("Sorry, you did not guess the correct letter in 5 moves. The correct letter was %c.\n", letter);
    }
    
    // Detach and remove the shared memory segment
    if (shmdt(shm) == -1) {
        perror("shmdt");
        exit(1);
    }
    if (shmctl(shmid, IPC_RMID, NULL) == -1) {
        perror("shmctl");
        exit(1);
    }
    
    return 0;
}