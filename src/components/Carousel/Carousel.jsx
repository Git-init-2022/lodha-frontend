import Carousel from 'react-bootstrap/Carousel';
import lodhapic5 from "../../assests/lodhapic5.jpg";
import lodha10 from "../../assests/lodha10.jpeg";
import lodhapic1 from "../../assests/lodhapic1.jpg";
import lodhapic2 from "../../assests/lodhapic2.jpg";
import lodhapic3 from "../../assests/lodhapic3.jpg";
import lodhapic from "../../assests/lodhapic.jpg";
import lodhapic4 from "../../assests/lodhapic4.jpg";

function Carousels() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={lodhapic5}
          alt="First slide"
          
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={lodha10}
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={lodhapic1}
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={lodhapic2}
          alt="Fourth slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={lodhapic3}
          alt="Fifth slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={lodhapic}
          alt="Sixth slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={lodhapic4}
          alt="Seventh slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Carousels;
