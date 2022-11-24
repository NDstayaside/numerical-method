import {React, Component} from "react";
import { Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import './itrytodecsohard.css'

class LUdecom extends Component{
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
            A[index] = new Array(n);
        }

        for (let i = 0; i < n; i++) {
            for (let j = 0; j < n; j++) {
                var NUM = document.getElementById("inputA"+i+j+"").value;
                var num = parseInt(NUM)
                A[i][j] = num
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
        var mat = cloneArray(A)
        var lower = Array(n).fill(0).map(x => Array(n).fill(0));
        var upper = Array(n).fill(0).map(x => Array(n).fill(0));

        // Decomposing matrix into Upper and
        // Lower triangular matrix
        for(var i = 0; i < n; i++)
        {
            
            // Upper Triangular
            for(var k = i; k < n; k++)
            {
                
                // Summation of L(i, j) * U(j, k)
                var sum = 0;
                for(var j = 0; j < i; j++)
                sum += (lower[i][j] * upper[j][k]);

                // Evaluating U(i, k)
                upper[i][k] = mat[i][k] - sum;
            }

            // Lower Triangular
            for(var k = i; k < n; k++)
            {
                if (i == k)
                    lower[i][i] = 1;
                else
                {
                    var sum = 0;
                    for(var j = 0; j < i; j++)
                        sum += (lower[k][j] * upper[j][i]);

                    lower[k][i] = parseInt((mat[k][i] - sum) / upper[i][i]);
                }
            }
        }

        console.log("U")
        console.table(upper)
        console.log("L")
        console.table(lower)
        
        var X = math.lusolve(A,B)
        var x = cloneArray(X)
        console.log("LU mathjs")
        console.table(x)

        //show lower
        var lowerList = [];
        for(let i = 0; i < n; i++){
            {
                lowerList.push(<tr></tr>)
                for(let j = 0; j < n; j++){
                    lowerList.push(
                            <td style={{
                                padding: '10px',
                                border: 'solid 1px gray',
                              }}
                            >{lower[i][j]}</td>
                        )
                    }
            }
        }
        //show upper
        var upperList = [];
        for(let i = 0; i < n; i++){
            {
                upperList.push(<tr></tr>)
                for(let j = 0; j < n; j++){
                    upperList.push(
                            <td style={{
                                padding: '10px',
                                border: 'solid 1px gray',
                              }}
                            >{upper[i][j]}</td>
                        )
                    }
            }
        }

        //slove สมการ list
        var anslist = [];   //x
        anslist.push(<thead>
            <tr>
                <th> Xi </th>
                <th> Answer </th>
            </tr>
        </thead>)

        for(let i = 0; i < n; i++){
            x[i] = Number( x[i]).toFixed(5)
            anslist.push(<tr>
                <td >{i+1}</td>
                <td>{x[i]}</td>
            </tr>);
            
        }
        this.setState({
            N: n,
            L: lowerList,
            U: upperList,
            stat: anslist
        })
        
        //sent out
        // document.getElementById("showAns").innerHTML = ans; //"X1 = 0 <br> X2 = 2"
    }
    render(){
        return(
                <div>
                    <h3>LU Decomposition method</h3>
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
                                <th colspan={this.state.N}> Lower </th>
                            </tr>
                        </thead>
                        {/* <tbody> */}
                            {this.state.L}
                        {/* </tbody> */}
                    </Table>

                    <Table responsive="sm bordered" style={{width: "40%",margin: "1% auto"}}>
                        <thead>
                            <tr>
                                <th colspan={this.state.N}> Upper </th>
                            </tr>
                        </thead>
                        {/* <tbody> */}
                            {this.state.U}
                        {/* </tbody> */}
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
export default LUdecom;