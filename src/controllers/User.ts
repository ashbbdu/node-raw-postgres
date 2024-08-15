import { Client } from 'pg';
import { Request, Response } from "express";


// Async function to insert data into a table
export const insertData  = async (req : Request , res : Response)=> {
    const {username , email , password} = req.body;
    const client =  new Client({
        connectionString : "postgresql://ashishsrivastava.bbdu:bZFRzrSa5n0s@ep-royal-fog-a53wfhib.us-east-2.aws.neon.tech/neondb?sslmode=require"
    });
    
    try {
        await client.connect()
        // const insertQuery = `INSERT INTO users (username , email , password) VALUES ('ash7q00asd7' , 'ashishsrivastava170071@asgmail.com' , 'abcde')`;
        const insertQuery = `INSERT INTO users (username , email , password) VALUES ($1 , $2, $3)`;
        const values = [username , email , password]
        const data = await client.query(insertQuery , values)
        console.log(data , "data"); 
        if(data.rowCount == 1) {
            return res.status(200).json({
                message : "User created Successfully !"
            })
        }
    } catch (error) {
        console.log(error , "error");
        
    } finally {
        await client.end()
    }
}

export const updateUser = async (req : Request , res : Response) => {
    try {
        // res.status(200).send("Updated Succesfully")
        console.log("Updated");
        
        
    } catch (error) {
        console.log(error);
        
    }
}

export const getAllUser = async (req : Request , res : Response) => {
    const client =  new Client({
        connectionString : "postgresql://ashishsrivastava.bbdu:bZFRzrSa5n0s@ep-royal-fog-a53wfhib.us-east-2.aws.neon.tech/neondb?sslmode=require"
    });
    try {
        await client.connect();
        // const usersQuery = `SELECT * FROM users`
        const userQuery = `SELECT 
        u.id,
        u.username,
        u.email,
        a.city,
        a.country,
        a.street,
        a.pincode,
        u.created_at
    FROM 
        Users u
   LEFT JOIN 
        addresses a 
    ON 
        u.id = a.user_id `
        const users = await client.query(userQuery);
        console.log(users , "users");
        return res.status(200).send({
            message : "Users fetched Successfully !",
            users : users.rows,
            totalUsers : users.rowCount
        })
    } catch (e) {
        console.log(e);
        
    }
    
}

export const getUser = async (req : Request , res : Response) => {
    const {id} = req.query;
    console.log(id);
    const client =  new Client({
        connectionString : "postgresql://ashishsrivastava.bbdu:bZFRzrSa5n0s@ep-royal-fog-a53wfhib.us-east-2.aws.neon.tech/neondb?sslmode=require"
    });
    try {
       await client.connect();
        // const userQurery = `SELECT * FROM users WHERE id = ${id}` // don't use this because of SQL Injection (Learn more about SQL injection)
        const userQurery = `SELECT * FROM users WHERE id = $1`
        const user = await client.query(userQurery , [id]);
        return res.status(200).send({
            message : "User fetched successfully !",
            user : user.rows[0]
        })
        
    } catch (e) {
        console.log(e);
        res.status(400).send({
            error : "Something went wrong !"
        })
    }
}


export const addAddress = async (req : Request , res : Response) => {
    const client =  new Client({
        connectionString : "postgresql://ashishsrivastava.bbdu:bZFRzrSa5n0s@ep-royal-fog-a53wfhib.us-east-2.aws.neon.tech/neondb?sslmode=require"
    });
    await client.connect();
    try {
        const { user_id ,city , country , street , pincode  } = req.body;
        // `INSERT INTO users (username , email , password) VALUES ($1 , $2, $3)`
        const addressQuery = `INSERT INTO addresses (user_id , city , country , street , pincode) VALUES ($1 , $2 , $3 , $4 , $5) `
        const values = [user_id ,city ,country , street , pincode]
        const address = await client.query(addressQuery , values );
        if(address?.rowCount != 0) {
            res.status(200).send({
                message : "Address Added Successfully !"
            })
        }
        
    } catch (e) {
        console.log(e);
        
    }
}