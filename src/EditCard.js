import { useEffect } from "react";
import React from "react";
import "./EditCard.css"

function EditCard(props)
{
    const idRef = React.useRef();
    const nameRef = React.useRef();
    const roleRef = React.useRef();
    const departmentRef = React.useRef();

    const idError = React.useRef();
    const nameError = React.useRef();
    const roleError = React.useRef();
    const departmentError = React.useRef();
    


    function refreshEditSection()
    {
        idError.current.innerText = '';
        nameError.current.innerText = '';
        roleError.current.innerText = '';
        departmentError.current.innerText = '';
    }

    // validations
    function validation(prevId,id,name,role,department)
    {
        let flag = true;

        if(name === '')
        {
            nameError.current.innerText = 'Name field is required';
            flag = false;
        }
        else
            nameError.current.innerText = '';
            

        if(department === '')
        {
            departmentError.current.innerText = 'Department field is required';
            flag = false;
        }
        else
            departmentError.current.innerText = '';

        if(role === '')
        {
            roleError.current.innerText = 'Role field is required';
            flag = false;
        }
        else
           roleError.current.innerText = '';

        // validation of id
        if(id === '')
        {
            idError.current.innerText = 'ID field is required';
            flag = false;
        }
        else
        {
            if(id !== prevId)
            {
                if(props.validateId(id) === false)
                {
                    idError.current.innerText = "Id is already in use";
                    flag = false;
                }
                else
                {
                    idError.current.innerText = '';
                }
            }


        }

        return flag;
    }

    function editEmployee()
    {
        let prevId = props.eid;
        let id = idRef.current.value;
        let name = nameRef.current.value;
        let role = roleRef.current.value;
        let department = departmentRef.current.value;
        
        if(validation(prevId,id,name,role,department))
        {
            props.editFun(prevId,id,name,role,department);

            props.closeEditFun();
            refreshEditSection();
        }
    }

    useEffect(()=>{
        idRef.current.value = props.eid;
        nameRef.current.value = props.ename;
        roleRef.current.value = props.erole;
        departmentRef.current.value = props.edepartment;
    })


    return(
        <div className="edit-card">
            <div className="edit-container">
                <label htmlFor="id">Employee Id</label>
                <input type="text" id="id" placeholder="ex 101" ref={idRef}/>
                <span ref={idError}></span>

                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="ex John Snow" ref={nameRef}/>
                <span ref={nameError}></span>

                <label htmlFor="role">Role</label>
                <input type="text" id="role" placeholder="ex Web designer" ref={roleRef}/>
                <span ref={roleError}></span>

                <label htmlFor="department">Department</label>
                <input type="text" id="department" placeholder="ex Finanace" ref={departmentRef}/>
                <span ref={departmentError}></span>

                <div className="buttons">
                    <button onClick={editEmployee}>Edit</button>
                    <button onClick={()=>{props.closeEditFun(); refreshEditSection()}}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default EditCard;