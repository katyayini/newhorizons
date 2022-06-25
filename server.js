const express=require('express');
const fs=require('fs');
const path=require('path');

const PORT = process.env.port || 3001;

const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(express.static('public'));

// GET route for notes
app.get('/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/notes.html'))
);

// GET route for db.json
app.get('/api/notes', (req, res) =>
  res.sendFile(path.join(__dirname, '/db/db.json'))
);

// GET route for index.html
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

//POST route for adding notes
app.post("/api/notes", (req, res) => {
    let note = req.body;
    let noteLi = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
    let noteLen = (noteLi.length).toString();
    note.id = noteLen;
    noteLi.push(note);
 
    fs.writeFileSync("./db/db.json", JSON.stringify(noteLi));
    res.json(noteLi);
    })

    //Deleted route for deleting a note
    app.delete("/api/notes/:id", (req, res) => {
      let noteLi = JSON.parse(fs.readFileSync("./db/db.json", "utf8"));
      let nId = (req.params.id).toString();
      noteLi = noteLi.filter(selected =>{  //Creating a new array of notes
      return selected.id != nId;
      })
  
      fs.writeFileSync("./db/db.json", JSON.stringify(noteLi));//writing to db.json 
      res.json(noteLi);//displaying notes
  });
    

app.listen(PORT, () =>
  console.log(`App listening at http://localhost:${PORT}`)
);
