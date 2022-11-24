import {React, Component} from "react";
import Form from "react-bootstrap/Form";
import './itrytodecsohard.css'

class Lagrange extends Component{
    constructor(){
        super();
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
        //statement
        var N = document.getElementById("matrixSize").value
        var n = parseInt(N)
        var X = document.getElementById("getX").value;
        var x = parseInt(X)
        var sum = 0

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
            }
        }
        //console.table(mat)

        //calculate
        var sum = 0;
        for (var i = 0; i < n; i++) {
            var Li = 1
            for (var k = 0; k < n; k++){
                if(i !== k){
                    Li = Li * ((mat[k][0]-x)/(mat[k][0]-mat[i][0]))
                }
            }
            //console.log(sumMul)
            sum += mat[i][1] * Li 
        }
        

        var showans = ''
        showans += '<h3>Answer here lah:</h3>'
        showans += sum + '<br>'
        
        
        //sent out
        document.getElementById("showAns").innerHTML = showans;
    }
    render(){
        return(
            <div>
                <h3>Lagrange Interpolation</h3>
                <Form>
                        <Form.Group class="mb-3">
                            <Form.Label class = 'secoundHead' style={{margin:"1% auto"}}>
                                Input your matrix size
                            </Form.Label>
                            {/* f(x) */}
                            <Form.Control id="matrixSize" type="number" step="1" placeholder="Enter matrix size" style={{width:"35%", margin:"1% auto"}} onChange={this.createInputMatrix}></Form.Control>
                            
                            <div class = 'secoundHead' id = "generateMatrix"></div>

                            <Form.Control id="getX" type="number" step="1" placeholder="Enter x" style={{width:"35%", margin:"1% auto"}}></Form.Control>

                            <button type="button" class="btn btn-dark" style={{margin:"1% auto"}} onClick={this.getVariable}>Calculate</button>
                        </Form.Group>
                    </Form>
                <div id = 'showAns' class="showAnswer"></div>
            </div>
        )
    }
}
export default Lagrange;