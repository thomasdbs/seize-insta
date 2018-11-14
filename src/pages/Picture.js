import React, { Component } from "react";
import Menu from "../Menu";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";
import mergeImages from "merge-images";
import picture from "../img/bordures.png";

class Picture extends Component {
  constructor(props) {
    super(props);
    this.state = { file: null, imagePreviewUrl: null, border: true };
  }

  _handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    };

    reader.readAsDataURL(file);
  }

  changePicture = type => {
    const { border } = this.state;
    document
      .querySelector(`.select button[data-border="${type}"]`)
      .classList.add("active");
    document
      .querySelector(`.select button:not([data-border="${type}"])`)
      .classList.remove("active");
    document.querySelector(".select").dataset.select = type;
    this.setState({ border: !border });
  };

  _crop = () => {
    const { border } = this.state;
    var generated_picture = this.refs.cropper
      .getCroppedCanvas({
        width: 640,
        height: 640,
        imageSmoothingEnabled: true,
        imageSmoothingQuality: "high"
      })
      .toDataURL("image/png", 1.0);

    if (border) {
      mergeImages([
        {
          src: generated_picture,
          x: 0,
          y: 0
        },
        { src: picture, x: 95, y: 95 }
      ]).then(b64 => {
        document.querySelector("#link").href = b64;
        document.querySelector("#link").click();
      });
    } else {
      // document.querySelector("#img").src = generated_picture;
      document.querySelector("#link").href = generated_picture;
      document.querySelector("#link").click();
    }
  };

  render() {
    let { imagePreviewUrl, border } = this.state;
    let cropperClassname = "crop";
    if (border === true) {
      cropperClassname += " border";
    }

    return (
      <div className="container picture-container">
        <Menu />

        {imagePreviewUrl !== null ? (
          <div className={cropperClassname}>
            <Cropper
              ref="cropper"
              src={imagePreviewUrl}
              style={{ height: 640, width: 640 }}
              // Cropper.js options
              aspectRatio={1}
              guides={false}
              // dragMode="move"
              background={false}
              rotatable={false}
              scalable={false}
              zoomable={false}
              autoCropArea={1}
              modal={false}
              viewMode={3}
              minCropBoxWidth={640}
              minCropBoxHeight={640}
              minCanvasWidth={640}
              minCanvasHeight={640}
              toggleDragModeOnDblclick={false}
            />
          </div>
        ) : (
          <div className="import">
            <input type="file" onChange={e => this._handleImageChange(e)} />
            <button
              onClick={() => document.querySelector(".import input").click()}
            >
              Importer une photo
            </button>
          </div>
        )}

        {imagePreviewUrl !== null && (
          <div className="form">
            <div className="select" data-select="border">
              <button
                className="active"
                data-border="border"
                onClick={() => this.changePicture("border")}
              >
                Avec
              </button>
              <button
                data-border="no-border"
                onClick={() => this.changePicture("no-border")}
              >
                Sans
              </button>
            </div>
            <button className="submit" onClick={() => this._crop()}>
              Télécharger
            </button>
            <a href="" id="link" download="publication-insta.jpg" />
          </div>
        )}
      </div>
    );
  }
}

export default Picture;
