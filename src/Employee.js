import React, { Component } from 'react'
import { variables } from './Variables'
import { json } from 'react-router-dom'
import Department from './Department'
export default class Employee extends Component {

    constructor(props){
        super(props)
        this.state={
            departments:[],
            employees:[],
            modalTitle:"",
            EmployeeName:"",
            EmployeeId:0,
            Department:""
        }
    }

    refreshList(){
      fetch(variables.API_URL+'api/Employees')
      .then(response=>response.json())
      .then(data=>{
          this.setState({employees:data});
      })
        fetch(variables.API_URL+'api/Departments')
        .then(response=>response.json())
        .then(data=>{
            this.setState({departments:data});
        })
    }
    componentDidMount(){
        this.refreshList();
    }
    changeEmployeeName=(e)=>{
        this.setState({EmployeeName:e.target.value})
    }
    changeDepartmentName=(e)=>{
      this.setState({Department:e.target.value})
  }
    addClick(){
        this.setState({
            modalTitle:"Add Employee",
            EmployeeId:0,
            EmployeeName:"",
            Department:""
        });
    }
    editClick(emp){
       
        this.setState({
            modalTitle:"Edit Employee",
            EmployeeId:emp.EmpId,
            EmployeeName:emp.Name,
            Department:emp.DepartmentId
        });
    }
    createClick(){
        fetch(variables.API_URL+'api/Employees',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                Name:this.state.EmployeeName,
                DepartmentId:this.state.Department
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
    }
    updateClick(){
        fetch(variables.API_URL+'api/Employees/'+this.state.EmployeeId,{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                EmpId:this.state.EmployeeId,
                Name:this.state.EmployeeName,
                DepartmentId:this.state.Department
            })
        })
        .then((result)=>{
            this.refreshList();
        },(error)=>{
            alert(error);
        })
    }
    deleteClick(id){
        alert(id)
        if(window.confirm('Are you sure?')){
        fetch(variables.API_URL+'api/Employees/'+id,{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            }
        })
        .then((result)=>{
            this.refreshList();
        },(error)=>{
            alert('Failed');
        })
        }
    }
    render(){
        const {
            departments,
            employees,
            modalTitle,
            EmployeeId,
            EmployeeName,
            Department,
        }=this.state
  return (
    <div>
     <button type="button"
    className="btn btn-primary m-2 float-end"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
    onClick={()=>this.addClick()}>
        Add Department
    </button>
     <table className="table table-striped">
        <thead>
            <tr>
                <th>EmployeeId</th>

                <th>EmployeeName</th>   
                <th>Department</th>   
                <th>Options</th>         
            </tr>
        </thead>
        <tbody>
            {employees.map(emp=>
                <tr key={emp.EmpId}>
                      <td>{emp.Name}</td>  
                      <td>{emp.DepartmentId}</td>
                      <td>{emp.EmpId}</td>
                      <td>
                        <button type='button' className='btn btn-light mr-1'
                         data-bs-toggle="modal"
    data-bs-target="#exampleModal"
                        onClick={()=>this.editClick(emp)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
  <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
  <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
</svg>
                        </button>
                        <button type='button' className='btn btn-light mr-1'  onClick={()=>this.deleteClick(emp.EmpId)}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                        </svg>
                        </button>
                    
                     </td>  
                </tr>
            )}
        </tbody>
     </table>
     <div className="modal fade" id="exampleModal" tabIndex="-1" >
<div className="modal-dialog modal-lg modal-dialog-centered">
<div className="modal-content">
   <div className="modal-header">
       <h5 className="modal-title">{modalTitle}</h5>
       <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"
       ></button>
   </div>

   <div className="modal-body">
        <div className="input-group mb-3">
            <span className="input-group-text">Emp Name</span>
            <input type="text" className="form-control"
            value={EmployeeName}
            onChange={this.changeEmployeeName}/>
        </div>

        <div className="input-group mb-3">
            <span className="input-group-text">Department</span>
            <select className="form-select"
            onChange={this.changeDepartment}
            value={Department}>
                {departments.map(dep=><option key={dep.DepartmentId}>
                    {dep.DepartmentName}
                </option>)}
            </select>
        </div>


        {EmployeeId==0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.createClick()}
        >Create</button>
        :null}

        {EmployeeId!=0?
        <button type="button"
        className="btn btn-primary float-start"
        onClick={()=>this.updateClick()}
        >Update</button>
        :null}

   </div>

</div>
</div> 
</div>

    </div>
  )
}
}
