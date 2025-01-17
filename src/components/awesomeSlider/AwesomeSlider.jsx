import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";
import "react-awesome-slider/dist/custom-animations/cube-animation.css";
import "./AwesomeCarousel.css"; // Optional for additional custom styles

const AwesomeCarousel = () => {
  return (
    <AwesomeSlider animation="cubeAnimation" className="awesome-slider">
      <div
        style={{
          backgroundImage: "url('https://rb.gy/kb95ge')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div style={{ padding: "20px", color: "white", textAlign: "center" }}>
          <h1>Slide 1 Title</h1>
          <p>This is the content for Slide 1.</p>
        </div>
      </div>
      <div
        style={{
          backgroundImage: "url('https://rb.gy/kb95ge')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div style={{ padding: "20px", color: "white", textAlign: "center" }}>
          <h1>Slide 2 Title</h1>
          <p>This is the content for Slide 2.</p>
        </div>
      </div>
      <div
        style={{
          backgroundImage: "url('https://rb.gy/kb95ge')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div style={{ padding: "20px", color: "white", textAlign: "center" }}>
          <h1>Slide 3 Title</h1>
          <p>This is the content for Slide 3.</p>
        </div>
      </div>
    </AwesomeSlider>
  );
};

export default AwesomeCarousel;
