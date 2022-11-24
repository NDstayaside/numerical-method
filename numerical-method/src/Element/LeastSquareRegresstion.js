import {React, Component} from "react";
import { Table } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import * as ReactDOM from "react-dom";
import ApexChart from "./ApexChart";
import './itrytodecsohard.css'

var xData = []
var yData = []
var RealyEachX = []
var matAsh = [];

class LeastSquareRegresstion extends Component{
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
        //var
        var N = document.getElementById("matrixSize").value;
        var MatString = ''
        var n = parseInt(N)

        if (N !== ''){
            MatString += "<div><Form.Label class = 'forMatrix' style={{margin:'1% auto'}}>Input x and y </Form.Label></div>"
        
            for (var i = 0; i < n; i++){
                MatString+="<input id='inputA"+i+0+"' type='number'  placeholder='x"+i+"' style='width:13%; margin:1% auto;'/>"
                MatString+="<span> </span>"
                MatString+="<input id='inputA"+i+1+"' type='number'  placeholder='y"+i+"' style='width:13%; margin:1% auto;'/>"
                MatString+="<br>"
            }
        }

        //sent out
        document.getElementById("generateMatrix").innerHTML = MatString;
    }
    getVariable(){
        xData = []
        yData = []
        RealyEachX = []
        //lib
        const math = require("mathjs");

        //chart
        const showchart = ReactDOM.createRoot(document.getElementById("showchart"));

        //statement
        var N = document.getElementById("matrixSize").value
        var n = parseInt(N)
        var M = document.getElementById("getM").value;
        var m = parseInt(M) + 1
        var X = document.getElementById("getX").value;
        var x = parseInt(X)

        //set matrix
        
        var mat = new Array(n);
        for(let i = 0; i < n; i++){
            mat[i] = new Array(2);
        }
        for (let i = 0; i < n; i++) {
            for (let j = 0; j < 2; j++) {
                var NUM = document.getElementById("inputA"+i+j+"").value
                var num = Number(NUM)
                mat[i][j] = num
                if(j === 0 )
                    xData.push(num)
                else
                    yData.push(num)
            }
        }
        // console.table(mat)

        //calculate to get matrix
        //matrixA
        var matA = new Array(m);
        for(let i = 0; i < m; i++){
            matA[i] = new Array(m);
        }
        for (var i = 0; i < m; i++) {
            for (var j = 0; j < m; j++){
                //find ค่า
                if(i === 0 && j === 0){
                    matA[i][j] = n
                }
                else{
                    var sum = 0;
                    for (var k = 0; k < mat.length; k++){
                        sum += math.pow(mat[k][0],i+j)
                    }
                    matA[i][j] = sum
                    //console.log("x^"+(i+j)+"= "+sum)
                }
            }
        }
        // console.table(matA)

        var matB = []
        //matrixB
        for (var i = 0; i < m; i++){
            var sum = 0;
            for (var k = 0; k < mat.length; k++){
                sum += math.pow(mat[k][0],i) * mat[k][1]
            }
            matB[i] = sum
            //console.log("x^"+(i+j)+"= "+sum)
        }
        // console.table(matB)

        //sentout matrixA
        matAsh = [];
        for(let i = 0; i < matA.length; i++){
            {
                matAsh.push(<tr></tr>)
                for(let j = 0; j < matA[i].length; j++){
                    matAsh.push(
                            <td style={{
                                padding: '10px',
                                border: 'solid 1px gray',
                              }}
                            >{matA[i][j]}</td>
                        )
                    }
            }
        }
        //sentout matrixB
        var matBsh = [];
        for(let i = 0; i < matB.length; i++){
            {
                matBsh.push(
                    <tr>
                        <td style={{
                            padding: '10px',
                            border: 'solid 1px gray',
                            }}
                        >{matB[i]}</td>
                    </tr>
                )
            }
        }
        
        //slove
        var xi = math.lusolve(matA,matB)
        // console.table(xi)

        //sent out xi
        var anslist = [];   //x
        anslist.push(<thead>
            <tr>
                <th> Xi </th>
                <th> Answer </th>
            </tr>
        </thead>)
        for(let i = 0; i < xi.length; i++){
            anslist.push(<tr>
                <td >{i+1}</td>
                <td>{xi[i]}</td>
            </tr>);
        }
        //chart

        //sent out x
        var showans = ''
        var ans = 0
        //show สมการ
        showans += '<h3>f(x) result:</h3>'
        for(let i = 0; i < xi.length; i++){
            if(i === xi.length - 1)
            showans += "(" + xi[i] + 'x^' + i +")"
            else
            showans += "(" + xi[i] + '*x^' + i + ") +"
        }
        showans += '<br>'

        //show answer
        showans += '<h3>Answer here lah:</h3>'
        for(let i = 0; i < xi.length; i++){
            ans += xi[i] * math.pow(x,i) 
            
        }
        showans += ans + '<br>'
        
        document.getElementById("showAns").innerHTML = showans;

        for(let i = 0; i < mat.length; i++){
            var sumYeachX = 0
            for (var j = 0; j < xi.length; j++){
                sumYeachX += xi[j] * math.pow(mat[i][0],j)
            }
            RealyEachX.push(sumYeachX)
        }

        console.table(xData)
        console.table(yData)
        console.table(RealyEachX)

        //usestate set
        this.setState({
            size: m,
            matAshow: matAsh,
            matBshow: matBsh,
            stat: anslist,
        })

        //showchart
        showchart.render(
            <div>
                <ApexChart data ={{datax: xData, datay :yData, realy: RealyEachX}}/>
            </div>
        )
        document.getElementById("showAns").innerHTML = showans;
    }
    render(){
        return(
            <div>
                <h3>Least Square Regresstion</h3>
                <Form>
                        <Form.Group class="mb-3">
                            <Form.Label class = 'secoundHead' style={{margin:"1% auto"}}>
                                Input your matrix size
                            </Form.Label>
                            {/* f(x) */}
                            <Form.Control id="matrixSize" type="number" step="1" placeholder="Enter matrix size" style={{width:"35%", margin:"1% auto"}} onChange={this.createInputMatrix}></Form.Control>
                            
                            <div class = 'secoundHead' id = "generateMatrix"></div>
                            <Form.Control id="getM" type="number" step="1" placeholder="Enter m" style={{width:"35%", margin:"1% auto"}}></Form.Control>
                            <Form.Control id="getX" type="number" step="1" placeholder="Enter x" style={{width:"35%", margin:"1% auto"}}></Form.Control>

                            <button type="button" class="btn btn-dark" style={{margin:"1% auto"}} onClick={this.getVariable}>Calculate</button>
                        </Form.Group>
                    </Form>

                    {/* Table */}
                    <Table responsive="sm bordered" style={{width: "30%",margin: "1% auto"}}>
                        <thead>
                            <tr>
                                <th colspan={this.state.size}> Matrix A </th>
                            </tr>
                        </thead>
                        {/* <tbody> */}
                            {this.state.matAshow}
                        {/* </tbody> */}
                    </Table>

                    <Table responsive="sm bordered" style={{width: "30%",margin: "1% auto"}}>
                        <thead>
                            <tr>
                                <th> Matrix B </th>
                            </tr>
                        </thead>
                        {/* <tbody> */}
                            {this.state.matBshow}
                        {/* </tbody> */}
                    </Table>

                    <Table responsive="sm">
                        {this.state.stat}
                    </Table>
                    <div id = 'showAns' class="showAnswer"></div>
                    <div id="showchart">
                        <ApexChart data ={{datax: xData, datay :yData, realy: RealyEachX}}/>
                    </div>

            </div>
        )
    }
}
export default LeastSquareRegresstion;