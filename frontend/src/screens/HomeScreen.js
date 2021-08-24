import React from "react";
import bloggingImg from "../assets/svg/blogging.svg";
import { Container } from "react-bootstrap";

const HomeScreen = () => {
  return (
    <Container className="text-center">
      <div className="home_img_container">
        <img src={bloggingImg} className="home_img py-10" alt="hr-mailer" />
      </div>

      <h2>HR-mailer</h2>
      <h4>Powerful mailing tool for HR</h4>
    </Container>
  );
};

export default HomeScreen;
