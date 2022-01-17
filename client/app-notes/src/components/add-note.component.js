import React, { Component } from "react";

import NoteSaveDataService from "../services/note.service";
import "./add-note.component.css";

export default class AddNote extends Component {
  constructor(props) {
    super(props);
    this.onChangeTitle = this.onChangeTitle.bind(this);
    this.onChangeContent = this.onChangeContent.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.newNote = this.newNote.bind(this);

    this.state = {
      id: null,
      title: "",
      content: "", 
      published: false,
      submitted: false
    };
  }

  onChangeTitle(e) {
    this.setState({
      title: e.target.value
    });
  }

  onChangeContent(e) {
    this.setState({
      content: e.target.value
    });
  }

  saveNote() {
    var data = {
      title: this.state.title,
      content: this.state.content
    };

    //functie pentru a obtine valoarea formularului(starea )si a trimite cererea POST catre Api-ul WEB
    NoteSaveDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          title: response.data.title,
          content: response.data.content,
          published: response.data.published,

          submitted: true
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newNote() {
    this.setState({
      id: null,
      title: "",
      content: "",
      published: false,

      submitted: false
    });
  }

  render() {
    // Pentru render()m, verificăm submittedstarea, dacă este adevărată, arătăm butonul Adaugă pentru a crea din nou o notita noua. În caz contrar, 
    //se va afișa un formular.
    return(
    <div className="submit-form">
    {this.state.submitted ? (
      <div>
        <h4>You submitted successfully!</h4>
        <button className="btn btn-success" onClick={this.newNote}>
          Add
        </button>
      </div>
    ) : (
      <div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            className="form-control"
            id="title"
            required
            value={this.state.title}
            onChange={this.onChangeTitle}
            name="title"
          />
        </div>

        <div className="form-group">
          <label htmlFor="content" id="labelContent">Content</label>
          <textarea
            type="textarea"
            className="form-control"
            data-provide="markdown"
            id="content"
            required
            value={this.state.content}
            onChange={this.onChangeContent}
            name="content"
          />
        </div>
        <div>
          <br></br>
          </div>

        <button onClick={this.saveNote} className="btn btn-success" id="btnSubmit">
          Submit
        </button>
      </div>
    )}
  </div>
);
  }
}