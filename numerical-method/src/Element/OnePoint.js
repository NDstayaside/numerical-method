import {React, Component} from "react";
import Form from "react-bootstrap/Form"
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './itrytodecsohard.css'

class OnePoint extends Component{
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
        var X1 = document.getElementById("InputX1").value;
        var condition = document.getElementById("econdition").value;
        var x1 = parseFloat(X1)

        //test
        var i = 1

        //calculate
        do {
            var xold = x1
            var x1 = math.evaluate(equa,{x: xold})
            var e = Math.abs((x1-xold)/x1)
            // test
            console.log("[Iteration",i,"]",x1)
            i++
        } while(e > condition && i < 1000)   //เผิ้อมันเยอะเกิน
        
        //sent out
        document.getElementById("showAns").innerHTML = x1;
    }
    render(){
        return(
                <div>
                    <h3>One Point Method</h3>
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

                            <Form.Label class = 'secoundHead' style={{margin:"2% auto"}}> Input your root X </Form.Label>

                            {/* X */}
                            <Row className="justify-content-md-center">
                                <Col column sm="auto">
                                    <Form.Label class = 'secoundHead' for ="InputX1" style={{margin:"30% auto"}}> X : </Form.Label>
                                </Col>
                                <Col column sm ="auto">
                                <Form.Control id="InputX1" type="number" placeholder="Enter x" style={{width:"100%", margin:"1% auto"}}></Form.Control>
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

                        {/* <Form.Group class="mb-3">
                            <Form.Label class = 'secoundHead'>
                                Input your number BABY :
                            </Form.Label>
                            <div>
                                <p>ทำให้ปุ่มกับข้อความอยู่แถวเดียวกันยังไงวะ</p>
                                <Form.Label class = 'secoundHead' for ="equation">f(x) : </Form.Label>
                                <Form.Control id="equation" type="text" placeholder="Enter equation" style={{width:"30%", margin:"1% auto"}}></Form.Control>
                                <Form.Label class = 'secoundHead'> X : </Form.Label>
                                <Form.Control id="InputX1" type="number" placeholder="Enter x" style={{width:"30%", margin:"1% auto"}}></Form.Control>
                                <button type="button" class="btn btn-dark" style={{margin:"1% auto"}} onClick={this.getVariable}>Calculate</button>
                            </div>
                            
                        </Form.Group> */}
                    </Form>
                    <h3>Root answer here lah:</h3>
                    <div class = 'secoundHead' id = "showAns"></div>
                </div>
        );
    }
}
export default OnePoint;