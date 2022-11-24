import {React, Component} from "react";
import { Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import './itrytodecsohard.css'

class Cramer extends Component{
    constructor(){
        super();
        this.state = {};
        this.getVariable = this.getVariable.bind(this);
        console.log("constructor called");
    }
    componentDidMount(){
        console.log("componentDidMount called");
    }
    createInputMatrix(){
        //ถ้าลองไปใส่ form group ให้มันก่อนมันจะขึ้นมะ -> ไม่ขึ้นง้าบ

        //var
        var N = document.getElementById("matrixSize").value;
        var MatString = ''//"<Form><Form.Group >";
        var n = parseInt(N)

        if (N !== ''){
            MatString += "<div><Form.Label class = 'forMatrix' style={{margin:'1% auto'}}>Input your number to matrix</Form.Label></div>"
        
            for (var i = 0; i < n; i++){
                for (var j = 0; j < n; j++){
                    // MatString+="<Form.Control id='inputA"+i+j+"' type='number'  placeholder='a"+i+j+"'  style={{width:'35%'', margin:'1% auto'}}></Form.Control>"
                    MatString+="<input id='inputA"+i+j+"' type='number'  placeholder='a"+i+j+"' style='width:13%; margin:1% auto;'/>"
                }
                MatString+="<span> | </span>"
                // MatString+="<Form.Control id='inputB"+i+"' type='number'  placeholder='a"+i+"'  style={{width:'35%'', margin:'1% auto'}}></Form.Control>"
                MatString+="<input id='inputB"+i+"' type='number'  placeholder='b"+i+"' style='width:13%; margin:1% auto;'/>"
                MatString+="<br>"
            }
        }

        //sent out
        document.getElementById("generateMatrix").innerHTML = MatString;
    }
    
    getVariable(){
        //lib
        const math = require("mathjs")

        //f
        function cloneArray(A) {
            var B = []
            for (let i = 0; i < A.length; i++) {
                B[i] = A[i].slice()
            }
            return B
        }

        //var def
        var N = document.getElementById("matrixSize").value;
        var n = parseInt(N)
        

        //create array A
        var A = new Array(n)

        for (let index = 0; index < A.length; index++) {
            A[index] = new Array(n);
        }

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                var NUM = document.getElementById("inputA"+i+j+"").value;
                var num = parseInt(NUM)
                A[i][j] = num
            }
        }
        // console.log(math.sum(A))    // test

        //create array B
        var B = new Array(n)

        for (let i = 0; i < n; i++) {
            var NUM = document.getElementById("inputB"+i+"").value;
            var num = parseInt(NUM)
            B[i] = num
            
        }
        // console.log(math.sum(B))    // test

        //calculate
        var x = []
        for (let i = 0; i < n; i++) {
            //ยัด B ลง calM คอลัมป์ที่ i
            var calM = cloneArray(A)
            for (let j = 0; j < n; j++) {
                calM[j][i] = B[j]
            }
            // console.table(calM)
            // console.log(math.det(calM))   //จบ 1 ตัว
            // console.log(math.det(calM)/math.det(A))
            x.push(math.det(calM)/math.det(A))
        }

        //sent out
        var anslist = []
        anslist.push(<thead>
            <tr>
                <th> Xi </th>
                <th> Answer </th>
            </tr>
        </thead>)
        for(let i = 0; i < n; i++){
            x[i] = x[i].toFixed(5)
            anslist.push(<tr>
                <td >{i+1}</td>
                <td>{x[i]}</td>
            </tr>);
            
        }
        this.setState({
            N: n,
            stat: anslist
        })

        // document.getElementById("showAns").innerHTML = ans; //"X1 = 0 <br> X2 = 2"
    }
    render(){
        return(
            <div>
                <h3>Cramer method</h3>
                <Form>
                    <Form.Group class="mb-3">
                        <Form.Label class = 'secoundHead' style={{margin:"1% auto"}}>
                            Input your matrix size
                        </Form.Label>
                        {/* f(x) */}
                        <Form.Control id="matrixSize" type="number" step="1" placeholder="Enter matrix size" style={{width:"35%", margin:"1% auto"}} onChange={this.createInputMatrix}></Form.Control>
                        
                        {/* <Form.Label class = 'secoundHead' style={{margin:"1% auto"}}>
                            Input your number to matrix
                        </Form.Label> */}
                        
                        <div class = 'secoundHead' id = "generateMatrix"></div>

                        <button type="button" class="btn btn-dark" style={{margin:"1% auto"}} onClick={this.getVariable}>Calculate</button>
                    </Form.Group>
                </Form>

                {/* <h3>Root answer here lah:</h3> */}
                {/* <div class = 'secoundHead' id = "showAns"></div> */}
                <Table responsive="sm">
                    {this.state.stat}
                </Table>
            </div>
        );
    }
}
export default Cramer;