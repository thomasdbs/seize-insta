import React, { Component } from "react";
import { fabric } from "fabric";
import littlePicture from "../img/post-insta-citation.png";
import bigPicture from "../img/post-insta-citation-large.png";
import Menu from "../Menu";

class Quote extends Component {
  constructor(props) {
    super(props);
    this.state = { value: "" };
  }

  componentDidMount() {
    var canvas = new fabric.Canvas("c", {
      selection: false,
      hoverCursor: "default"
    });
    canvas.setDimensions({
      width: 640,
      height: 640
    });
    fabric.Image.fromURL(littlePicture, oImg => {
      oImg.set({ selectable: false, selection: false });
      canvas.add(oImg);
      canvas.centerObject(oImg);
      oImg.sendBackwards();
    });

    var text = new fabric.Text("", {
      selectable: false,
      dirty: true,
      textAlign: "center",
      fill: "#fff",
      lineHeight: 1,
      fontFamily: "Lato",
      fontWeight: 300,
      fontSize: 48
    });
    canvas.add(text);
    canvas.centerObject(text);

    document.getElementById("c").fabric = canvas;
  }

  componentDidUpdate() {
    this.updateCanvas();
  }

  updateCanvas = () => {
    const canvas = document.querySelector("#c").fabric;
    canvas.forEachObject(o => {
      if (o.get("type") === "text") {
        o.text = this.state.value;
        o.set({
          originX: "center"
        });
        canvas.centerObjectV(o);
        canvas.renderAll();
      }
    });
  };

  changePicture = type => {
    const canvas = document.querySelector("#c").fabric;
    canvas.forEachObject(o => {
      if (o.get("type") === "image") {
        if (type === "little") {
          o._element.src = littlePicture;
        } else {
          o._element.src = bigPicture;
        }
        canvas.centerObject(o);
        document
          .querySelector(`.select button[data-picture="${type}"]`)
          .classList.add("active");
        document
          .querySelector(`.select button:not([data-picture="${type}"])`)
          .classList.remove("active");
        document.querySelector(".select").dataset.select = type;
        document.querySelector(".canvas-container").classList.toggle("loading");
        setTimeout(() => {
          document
            .querySelector(".canvas-container")
            .classList.toggle("loading");
          canvas.renderAll();
        }, 2000);
      }
    });
  };

  download = () => {
    const canvas = document.querySelector("#c").fabric;
    // window.open(canvas.toDataURL("png"));
    document.querySelector("#link").href = canvas.toDataURL("image/jpg");
    document.querySelector("#link").click();
  };

  render() {
    return (
      <div className="container">
        <Menu />
        <canvas id="c" />
        {/* <img
          src="https://i.pinimg.com/originals/f4/a8/ac/f4a8ac1a2d768fdfbc73dd35f93a9292.jpg"
          alt=""
          id="my-image"
        /> */}

        <div className="form">
          <div className="select" data-select="little">
            <button
              className="active"
              data-picture="little"
              onClick={() => this.changePicture("little")}
            >
              Medium
            </button>
            <button
              data-picture="big"
              onClick={() => this.changePicture("big")}
            >
              Large
            </button>
          </div>
          <textarea
            value={this.state.value}
            onChange={e =>
              this.setState({ value: e.target.value.toUpperCase() })
            }
            rows="10"
            placeholder="Contenu de la publication"
          />
          <button className="submit" onClick={() => this.download()}>
            Télécharger
          </button>
          <a href="" id="link" download="publication-insta.jpg" />
        </div>
        {/* <img src={littlePicture} id="my-image" /> */}
      </div>
    );
  }
}

export default Quote;
