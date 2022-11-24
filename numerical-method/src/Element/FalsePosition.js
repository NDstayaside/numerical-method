import {React, Component} from "react";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from "react-bootstrap/Form"
import './itrytodecsohard.css'

class FalsePosition extends Component{
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
        var XL = document.getElementById("InputXL").value;
        var XR = document.getElementById("InputXR").value;
        var condition = document.getElementById("econdition").value;
        var xl = parseFloat(XL), xr = parseFloat(XR)

        //test
        // var i = 1

        //calculate
        do {
            var fxl = math.evaluate(equa,{x: xl})
            var fxr = math.evaluate(equa,{x: xr})
            var xm = (xl*fxr-xr*fxl)/(fxr-fxl)
            var fxm = math.evaluate(equa,{x: xm})
            var check = fxm*fxr
            if (check > 0){
                var e = Math.abs((xm-xr)/xm)
                xr = xm
            }
            else{
                var e = Math.abs((xm-xl)/xm)
                xl = xm
            }

            //test
            // console.log("[Iteration",i,"]",xm)
            // i++

        } while(e > condition)
        
        //sent out
        document.getElementById("showAns").innerHTML = xm;
    }
    render(){
        return(
                <div>
                    <h3>False-Position Method</h3>
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
                                    <Form.Label class = 'secoundHead' for ="InputXL" style={{margin:"30% auto"}}> Xl : </Form.Label>
                                </Col>
                                <Col column sm ="auto">
                                    <Form.Control id="InputXL" type="number" placeholder="Enter xL" style={{width:"100%", margin:"1% auto"}}></Form.Control>
                                </Col>
                            </Row>


                            {/* XR */}
                            <Row className="justify-content-md-center">
                                <Col column sm="auto">
                                <Form.Label class = 'secoundHead' for ="InputXR" style={{margin:"30% auto"}}> Xr : </Form.Label>
                                </Col>
                                <Col column sm ="auto">
                                    <Form.Control id="InputXR" type="number" placeholder="Enter xR" style={{width:"100%", margin:"1% auto"}}></Form.Control>
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
export default FalsePosition;