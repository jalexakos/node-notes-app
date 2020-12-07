const fs = require('fs')
const chalk = require('chalk')

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if (!duplicateNote) {
        notes.push({
            title: title,
            body: body
        })
    
        saveNotes(notes)
        console.log(chalk.bgGreen.black('New note added!'))
    }else {
        console.log(chalk.bgRed('Note title taken!'))
    }


}

const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = () => {
    try {
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e) {
        return []
    }

}

const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((note) => {
        return note.title !== title
    })
    
    if (notesToKeep.length !== notes.length){
        console.log(chalk.bgGreen.black("Note removed:", title))
        saveNotes(notesToKeep)
    }else {
        console.log(chalk.bgRed("Couldn't find the note..."))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.inverse('Your Notes:'))
    notes.forEach(note => {
        console.log(chalk.blueBright(note.title))
    });
}

const readNote = (title) => {
    const notes = loadNotes()
    const findNote = notes.find((note) => note.title === title)
    if(findNote){
        console.log(chalk.inverse(findNote.title))
        console.log(findNote.body)
    }else{
        console.log(chalk.bgRed("Can't find the note!"))
    }

}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
};