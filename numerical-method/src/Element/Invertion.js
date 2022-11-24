import {React, Component} from "react";
import { Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import './itrytodecsohard.css'

class Invertion extends Component{
    constructor(){
        super();
        // console.log(this.state)
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
            return A.map((a)=> a.slice());
        }

        //var def
        var N = document.getElementById("matrixSize").value;
        var n = parseInt(N)
        

        //create array A
        var A = new Array(n)

        for (let index = 0; index < A.length; index++) {
            A[index] = new Array(n*2);
        }

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                var NUM = document.getElementById("inputA"+i+j+"").value;
                var num = parseInt(NUM)
                A[i][j] = num
            }
        }
        //I mt
        for (let i = 0; i < n; i++) {
            for (let j = n; j < n*2; j++) {
                if ( i+3 === j)
                    A[i][j] = 1
                else
                    A[i][j] = 0
            }
        }

        //create array B
        var B = new Array(n)

        for (let i = 0; i < n; i++) {
            var NUM = document.getElementById("inputB"+i).value;
            var num = parseInt(NUM)
            B[i] = num
        }
        // console.log(math.sum(A))    // test

        //calculate
        var calM = cloneArray(A)
        for (let c = 0; c < n; c++) {
            for (let i = 0; i < n; i++) { //ทำกับแถวถัดไป
                for (var j = 0; j < n*2; j++){
                    if ( i === j && calM[i][j] !== 1){
                        var toDiv = calM[i][j]
                        for (var k = 0; k < n*2; k++)
                            calM[i][k] = Number((calM[i][k] / toDiv).toFixed(5))
                    }
                    else if (calM[i][c] !== 0 && i !== c)   //ถ้าคอลัม c แถว i ไม่เท่ากับ c และมันยังไม่เป็น 0
                    {
                        var toMul = calM[i][c]
                        for (var k = 0; k < n*2; k++)
                            calM[i][k] = Number((calM[i][k] - (calM[c][k] * toMul)).toFixed(5))
                    }
                }
                console.table(calM)
            }
            //จบ 1 ตัว
        }

        // get inverse matrix - find a way to show them in web as a table
        var InverseMat = cloneArray(calM)
        for(let i = n-1; i >= 0; i--){
            InverseMat[i] = InverseMat[i].slice(n)
        }
        console.table(InverseMat)

        //inverse list
        var invMat = [];
        for(let i = 0; i < n; i++){
            {
                invMat.push(<tr></tr>)
                for(let j = 0; j < n; j++){
                    invMat.push(
                            <td style={{
                                padding: '10px',
                                border: 'solid 1px gray',
                              }}
                              >{InverseMat[i][j]}</td>
                        )
                    }
            }
        }
        

        //slove สมการ list
        var anslist = [];   //x
        var x = math.multiply(InverseMat,B)
        
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
            Istat: invMat,
            stat: anslist
        })
        
        //sent out
        // document.getElementById("showAns").innerHTML = ans; //"X1 = 0 <br> X2 = 2"
    }
    render(){
        return(
                <div>
                    <h3>Inversion method</h3>
                    <Form>
                        <Form.Group class="mb-3">
                            <Form.Label class = 'secoundHead' style={{margin:"1% auto"}}>
                                Input your matrix size
                            </Form.Label>
                            {/* f(x) */}
                            <Form.Control id="matrixSize" type="number" step="1" placeholder="Enter matrix size" style={{width:"35%", margin:"1% auto"}} onChange={this.createInputMatrix}></Form.Control>
                            
                            <div class = 'secoundHead' id = "generateMatrix"></div>

                            <button type="button" class="btn btn-dark" style={{margin:"1% auto"}} onClick={this.getVariable}>Calculate</button>
                        </Form.Group>
                    </Form>

                    {/* <h3>Root answer here lah:</h3> */}
                    <div class = 'secoundHead' id = "showAns"></div>

                    {/* Table */}
                    <Table responsive="sm bordered" style={{width: "40%",margin: "1% auto"}}>
                        <thead>
                            <tr>
                                <th colspan={this.state.N}> Inverse matrix </th>
                            </tr>
                        </thead>
                        {this.state.Istat}
                    </Table>

                    <Table responsive="sm">
                        {this.state.stat}
                        {/* <thead>
                            <tr>
                                <th> Xi </th>
                                <th> Answer </th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.stat}
                        </tbody> */}
                    </Table>

                </div>
        );
    }
}
export default Invertion;