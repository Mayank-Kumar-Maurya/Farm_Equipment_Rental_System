import React from "react";

function Slider() {
  return (
    <>
      <div id="carouselExampleCaptions" className="carousel slide">
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>

          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>

          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>

        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src="https://i.pinimg.com/736x/8b/94/00/8b9400e0ada98b434ca21c14c634f513.jpg"
              className="d-block w-100 slider-img"
              alt="Farm tractor"
            />

            <div className="carousel-caption d-none d-md-block">
              <h5>FARM EQUIPMENT RENTAL SYSTEM</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="https://tse2.mm.bing.net/th/id/OIP.fIZEUcswBLwLnum21Odu8QHaD7?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
              className="d-block w-100 slider-img"
              alt="Agricultural sprayer"
            />

            <div className="carousel-caption d-none d-md-block">
              <h5>FARM EQUIPMENT RENTAL SYSTEM</h5>
              <p>
                Some representative placeholder content for the second slide.
              </p>
            </div>
          </div>

          <div className="carousel-item">
            <img
              src="https://images.unsplash.com/photo-1614977645968-6db1d7798ac7?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8Y29tYmluZSUyMGhhcnZlc3RlcnxlbnwwfHwwfHx8MA%3D%3D"
              className="d-block w-100 slider-img"
              alt="Farm machinery"
            />

            <div className="carousel-caption d-none d-md-block">
              <h5>FARM EQUIPMENT RENTAL SYSTEM</h5>
              <p>
                Some representative placeholder content for the third slide.
              </p>
            </div>
          </div>
        </div>

        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>

        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </>
  );
}

export default Slider;
