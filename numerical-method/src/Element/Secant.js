import {React, Component} from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form"
import './itrytodecsohard.css'

class Secant extends Component{
    constructor(){
        super();
        console.log("constructor called");
    }
    componentDidMount(){
        console.log("componentDidMount called");
    }
    getVariable(){
        //lib
        const math = require("mathjs")

        //var
        var equa = document.getElementById("equation").value;
        var X0 = document.getElementById("InputX0").value;
        var X1 = document.getElementById("InputX1").value;
        var condition = document.getElementById("econdition").value;
        var x0 = parseFloat(X0), x1 = parseFloat(X1)

        //test
        // var i = 1

        //calculate
        do {
            var fx0 = math.evaluate(equa,{x: x0})
            // var f1x0 = math.derivative(equa, 'x').evaluate({x: x0}) 
            var fx1 = math.evaluate(equa,{x: x1})
            // var f1x1 = math.derivative(equa, 'x').evaluate({x: x1})      //ดิฟ ไปหาวิธีมา
            var deltaX = fx1 * ((x0-x1)/(fx0-fx1))
            var ans = x1 - deltaX
            var e = Math.abs(deltaX/ans)
            x0 = x1
            x1 = ans

            // test
            // console.log("[Iteration",i,"]",x1)
            // i++

        } while(e > condition)
        
        //sent out
        document.getElementById("showAns").innerHTML = x1;
    }
    render(){
        return(
                <div>
                    <h3>Secant Method</h3>
                    <Form>
                    <Form.Label class = 'secoundHead' style={{margin:"1% auto"}}>
                                Input your number BABY :
                        </Form.Label>

                        <Form.Group class="mb-3">
                            {/* f(x) */}
                            <Row className="justify-content-md-center">
                                <Col column sm="auto">
                                    <Form.Label class = 'secoundHead' for ="equation" style={{margin:"12% auto"}}>f(x) : </Form.Label>
                                </Col>
                                {/* now edit here พยายามจัดหน้าอยู่*/}
                                <Col column sm ="auto">
                                    <Form.Control id="equation" type="text" placeholder="Enter equation" style={{width:"100%", margin:"1% left auto"}}></Form.Control>
                                </Col>
                            </Row>

                            <Form.Label class = 'secoundHead' style={{margin:"2% auto"}}> text </Form.Label>

                            {/* XL */}
                            <Row className="justify-content-md-center">
                                <Col column sm="auto">
                                    <Form.Label class = 'secoundHead' style={{margin:"30% auto"}}> X0 : </Form.Label>
                                </Col>
                                <Col column sm ="auto">
                                    <Form.Control id="InputX0" type="number" placeholder="Enter xL" style={{width:"100%", margin:"1% auto"}}></Form.Control>
                                </Col>
                            </Row>


                            {/* XR */}
                            <Row className="justify-content-md-center">
                                <Col column sm="auto">
                                <Form.Label class = 'secoundHead' style={{margin:"30% auto"}}> X1 : </Form.Label>
                                </Col>
                                <Col column sm ="auto">
                                    <Form.Control id="InputX1" type="number" placeholder="Enter xR" style={{width:"100%", margin:"1% auto"}}></Form.Control>
                                </Col>
                            </Row>

                            {/* error */}
                            <Form.Label class = 'secoundHead' style={{margin:"2% auto"}}> Input error: </Form.Label>

                            <Row className="justify-content-md-center">
                                <Col column sm="auto">
                                    <Form.Label class = 'secoundHead' for ="econdition" style={{margin:"30% auto"}}> e : </Form.Label>
                                </Col>
                                <Col column sm ="auto">
                                    <Form.Control id="econdition" type="number" placeholder="Enter error" style={{width:"100%", margin:"1% auto"}}></Form.Control>
                                </Col>
                            </Row>

                            <button type="button" class="btn btn-dark" style={{margin:"1% auto"}} onClick={this.getVariable}>Calculate</button>
                        </Form.Group>
                    </Form>
                    <h3>Root answer here lah:</h3>
                    <div class = 'secoundHead' id = "showAns"></div>
                </div>
        );
    }
}
export default Secant;