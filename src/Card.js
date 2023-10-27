
import "./Card.css";

function Card(props)
{
    let {id = "123", name = "Abhishek Ainapur", department = "Technolgy", role = "Front-end eng"} = props;
    return(
            <div className="card">
                <div className="card-container">
                    <div className="image">
                    </div>
                    <div className="info">
                        
                            <p>Emp ID</p>
                            <h2>{id}</h2>

                            <p>Name</p>
                            <h2>{name}</h2>
                        
                            <p>Role</p>
                            <h2>{role}</h2>

                            <p>Department</p>
                            <h2>{department}</h2>
                        
                    </div>
                </div>
                <div style={{display:"flex"}}>
                    <button id="edit-button" onClick={()=>{props.editFun(id)}}>Edit</button>
                    <button id="delete-button" onClick={()=>{props.deleteFun(id)}}>Delete</button>
                </div>
            </div>
    );
}

export default Card;