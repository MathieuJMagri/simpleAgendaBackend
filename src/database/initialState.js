/**
 * Used to define the desired schema for the database collections. 
 * A new empty database will be initialized with this starter dummy data to define the schema.
 * Model be modified to fit the desired schema as the application development progresses.
 */
export const initialState = {
    users:[{
        username:"jeffbezos",
        name:"User A",
        password:"1234",
        lastLogin: 21344555
    },{
        username:"markburger",
        name:"User B",
        password:"5678",
        lastLogin: 52352311
    }],
    tasks:[{
        name:"Complete ECSE428 Assignment",
        owner:"jeffbezos",
        course:"ECSE428",
        status:"IN_PROGRESS",
        dueDateTime:"2015-03-25T12:00:00Z"
    },{
        name:"Start ECSE420 Lab Report",
        owner:"markburger",
        course:"ECSE420",
        status:"NOT_STARTED",
        dueDateTime:"2015-03-25T12:00:00Z"
    }],
    courses:[{
        code:"ECSE428F21",
        ownerUser:"jeffbezos",
        name:"Software Engineering Practice",
        term:"FALL2021"
    },{
        code:"ECSE429F21",
        ownerUser:"jeffbezos",
        name:"Software Validation",
        term:"FALL2021"
    }]
};
