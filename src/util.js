import randomWords from 'random-words'

const levelConditions = {
    easy: (length) => length === 3 || length === 4,
    medium: (length) => length === 5,
    hard: (length) => length >= 6
}

export const generateWord = (level) => {
    let word = randomWords()
    while (!levelConditions[level](word.length)) {
        word = randomWords()
    }
    return word
}