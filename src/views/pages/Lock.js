/*!

=========================================================
* Black Dashboard PRO React - v1.2.4
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-pro-react
* Copyright 2024 Creative Tim (https://www.creative-tim.com)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Input,
  InputGroup,
  InputGroupText,
  Container,
  Col,
} from "reactstrap";

const Lock = () => {
  const [state, setState] = React.useState({});
  React.useEffect(() => {
    document.body.classList.toggle("lock-page");
    return function cleanup() {
      document.body.classList.toggle("lock-page");
    };
  });
  return (
    <>
      <div className="content">
        <Container>
          <Col className="ml-auto mr-auto" lg="4" md="6">
            <Card className="card-lock card-white text-center">
              <CardHeader>
                <img alt="..." src={require("assets/img/emilyz.jpg")} />
              </CardHeader>
              <CardBody>
                <CardTitle tag="h4">Joe Gardner</CardTitle>
                <InputGroup
                  className={classnames({
                    "input-group-focus": state.passFocus,
                  })}
                >
                  <InputGroup.Text>
                    <i className="tim-icons icon-lock-circle" />
                  </InputGroup.Text>
                  <Input
                    placeholder="Password"
                    type="text"
                    onFocus={(e) => setState({ ...state, passFocus: true })}
                    onBlur={(e) => setState({ ...state, passFocus: false })}
                  />
                </InputGroup>
              </CardBody>
              <CardFooter>
                <Button
                  className="btn-round"
                  color="primary"
                  href="#pablo"
                  size="lg"
                  onClick={(e) => e.preventDefault()}
                >
                  Unlock
                </Button>
              </CardFooter>
            </Card>
          </Col>
        </Container>
      </div>
    </>
  );
};

export default Lock;
