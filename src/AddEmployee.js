import { useState } from "react";
import './AddEmployee.css';

import Card from "./Card";
import EditCard from "./EditCard";

function AddEmployee()
{
    const [list,setList] = useState([]); // state to store the list of employees
    const [filterList,setFilterList] = useState([]); // state array to store filter data
    const [name,setName] = useState(''); // state for name input
    const [role,setRole] = useState(''); // state for role input
    const [department,setDepartment] = useState(''); // state for department input
    const [id,setId] = useState(''); // state for id input
    const [width,setWidth] = useState('0px'); // state for dynamically changing the width
    const [buttonName,setButtonName] = useState('Add Employee'); // statr for name of button
    const [filterInput,setFilterInput] = useState(''); // state for storing filter input

    // error messages
    const [idError,setIdError] = useState('');
    const [nameError,setNameError] = useState('');
    const [roleError,setRoleError] = useState('');
    const [deptError,setDeptError] = useState('');

    //state object for edt
    const [editName,setEditName] = useState('');
    const [editId,setEditID] = useState('');
    const [editRole,setEditRole] = useState('');
    const [editDept,setEditDept] = useState('');
    const [editDisplay,setEditDisplay] = useState("none");

    const [isFilter,setIsFilter]  = useState(false); // (very imp) this is true when filter is applied and false when filter is removed
    // based on above state jsx is renderd

    // below jsx is displayed if isFilter state is false;
    let content1 = list.map(emp => {
        return <Card key={emp.id} id = {emp.id} name={emp.name} role={emp.role} department={emp.department} deleteFun={deleteEmployee} editFun = {editEmployee}/>
    });

    // below jsx is displayed if isFilter state is true;
    let content2 = filterList.map(emp => {
        return <Card key={emp.id} id = {emp.id} name={emp.name} role={emp.role} department={emp.department} deleteFun={deleteEmployee} editFun={editEmployee}/>
    });


    // this function filters the data with help of filter method of array
    function filterData()
    {
        let data = filterInput;
        setFilterList(list.filter(emp => {
            let str = `${emp.id} ${emp.name} ${emp.role} ${emp.department}`;

            str = str.toLowerCase();
            data = data.toLowerCase();

            return str.includes(data);
        }));

        // filter is on now so content2 will be rendered i.e filtered list is renderd
        setIsFilter(true);
    }

    // function to remove filter
    function removeFilter()
    {
        setFilterInput('');
        // filter is off now so content1 will be rendered i.e simple list is rendered
        setIsFilter(false);
    }

    // function for updating filter input value
    function changeFilterValue(event)
    {
        let value = event.target.value;
        setFilterInput(value);

        // below is the cool way of filtering
        // let data = filterInput;
        // setFilterList(list.filter(emp => {
        //     let str = `${emp.id} ${emp.name} ${emp.role} ${emp.department}`;

        //     str = str.toLowerCase();
        //     data = data.toLowerCase();

        //     return str.includes(data);
        // }));

        // setIsFilter(true);
    }

    // function for updating id input value
    function changeId(event)
    {
        let value = event.target.value;
        setId(value);
    }

    // function for updating name input value
    function changeName(event)
    {
        let value = event.target.value;
        setName(value);
    }

    // function for updating department input value
    function changeDeparment(event)
    {
        let value = event.target.value;
        setDepartment(value);
    }

    // function for updating role input value
    function changeRole(event)
    {
        let value = event.target.value;
        setRole(value);
    }

    // function to refresh add employee section

    function refreshAddSection()
    {
        setId('');
        setDepartment('');
        setName('');
        setRole('');

        setIdError('');
        setDeptError('');
        setNameError('');
        setRoleError('');
    }

    // function to insert new employee in list
    function addEmployee()
    {
        if(validation())
        {
        // here new employee is added with help of spread operator
            setList(prev => [...prev,{id: id, name: name, role: role, department: department}]);

            // once employee is added all input fields shoule be empty
            setName('');
            setId('');
            setDepartment('');
            setRole('');
        }
    }

    // function to dynamically show or unshow add employe form
    function showAddEmployee()
    {
        if(width === "350px") 
        {
            setWidth("0px");
            setButtonName("Add Employee");
            refreshAddSection();
        }
        else
        {
            setWidth("350px");
            setButtonName("Cancel");
        }

    }

    // function to delete employee
    function deleteEmployee(id)
    {
        if(window.confirm("Are you sure you want to delete"))
        {
            // filter method is used to delete employee
            setList(list.filter(emp=>{
                return emp.id !== id;
            }))

            setFilterList(filterList.filter(emp => {
                return emp.id !== id;
            }))
        }
    }

    function editEmployee(id)
    {
        let editEmp = list.filter(emp => {
            return emp.id === id;
        });

        let editable = editEmp[0];

        setEditDisplay("flex");
        
        console.log(editable);
        setEditID(editable.id);
        setEditName(editable.name);
        setEditRole(editable.role);
        setEditDept(editable.department);

    }

    function validateId(id)
    {
        let flag = true;

        list.forEach(emp => {
            if(emp.id === id)
            {
                flag = false;
            }

        });

        return flag;
    }

    function validation()
    {
        let flag = true;

        if(name === '')
        {
            setNameError("Name field is required");
            flag = false;
        }
        else
            setNameError('');

        if(id === '')
        {   
            setIdError("ID field is required");
            flag = false;
        }
        else
        {
            // validation of unique id
            list.forEach(emp => {
                if(emp.id === id)
                {
                    setIdError("Entered ID is already in use");
                    flag = false;
                }
                else
                {
                    setIdError('');
                }
            });
        }

        if(department === '')
        {
            setDeptError("Department field is required");
            flag = false;
        }
        else
            setDeptError('');

        if(role === '')
        {
            setRoleError("Role field is required");
            flag = false;
        }
        else
            setRoleError('');

        // validation of unique id

        

        return flag;
    }

    function closeEdit()
    {
        setEditDisplay("none");
    }

    // function to actually edit filter list
    function editListforEdit(previd,id,name,role,department)
    {
        setList(list.filter(emp=>{
            return emp.id !== previd;
        }));

        setList(prev => [...prev,{id:id,name:name,role:role,department:department}]);

        setFilterList(filterList.filter(emp=>{
            return emp.id !== previd;
        }))

        setFilterList(prev => [...prev,{id:id, name:name, role:role, department:department}]);
    }

    return(
        <div style={{height: "100vh"}}>
            <div className="head">
                <p>Employee Manager</p>
                <div>
                    <input type="text" onChange={changeFilterValue} value={filterInput} placeholder="Filter value"/>
                    <button className="filter-button" onClick={filterData}>Filter</button>
                    <button className="remove-filter-button" onClick={removeFilter}>x</button>
                </div>
            </div>

            <div style={{display:editDisplay, position:"fixed",left:"20px", bottom:"20px"}}>
                <EditCard eid={editId} ename={editName} edepartment={editDept} erole={editRole} closeEditFun={closeEdit} editFun = {editListforEdit} validateId={validateId}/>
            </div>

            <div className="add-employee-dailog" style={{width:width}}>
                <label htmlFor="id">Employee Id</label>
                <input type="text" id="id" placeholder="ex 101" value={id} onChange={changeId}/>
                <span>{idError}</span>

                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="ex John Snow" value={name} onChange={changeName}/>
                <span>{nameError}</span>

                <label htmlFor="role">Role</label>
                <input type="text" id="role" placeholder="ex Web designer" value={role} onChange={changeRole}/>
                <span>{roleError}</span>

                <label htmlFor="department">Department</label>
                <input type="text" id="department" placeholder="ex Finanace" value={department} onChange={changeDeparment}/>
                <span>{deptError}</span>

                <button onClick={addEmployee}>Add</button>
            </div>

            <div style ={{display: "flex", flexWrap: "wrap"}}>
                {/* Here based on isFilter value content is rendered */}
                {isFilter ? content2:content1}
            </div>
            <button id="add-button" onClick={showAddEmployee}>{buttonName}</button>
        </div>
        
    );
}

export default AddEmployee;