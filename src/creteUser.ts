import { Client } from "pg"
const client = new Client({
    // connectionString: "postgresql://postgres:mysecretpassword@localhost:5433/postgres"
    connectionString : "postgresql://ashishsrivastava.bbdu:bZFRzrSa5n0s@ep-royal-fog-a53wfhib.us-east-2.aws.neon.tech/neondb?sslmode=require"
})



const createUserTable = async () => {
    await client.connect();
    try {   
        const result = await client.query(`
        CREATE TABLE Users (
            id SERIAL PRIMARY KEY,
            username VARCHAR(50) UNIQUE NOT NULL,
            email VARCHAR(255) UNIQUE NOT NULL,
            profilePic VARCHAR (255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL,
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
        )
    `)
    console.log(result);
    }
    catch (e) {
        console.log(e ,"error");
        
    }
    
}
async function createAddressTable () {
    try {
        const result = await client.query(`
        CREATE TABLE addresses (
            id SERIAL PRIMARY KEY,
            user_id INTEGER NOT NULL,
            city VARCHAR(100) NOT NULL,
            country VARCHAR(100) NOT NULL,
            street VARCHAR(255) NOT NULL,
            pincode VARCHAR(20),
            created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );
        `)
        console.log(result);
        
    } catch (error) {
        console.log(error , "error");
        
    } 
}

async function createProfileDetailsTable () {
    try {
        const result = await client.query(`
            CREATE TABLE profileDetails (
                id SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                firstName VARCHAR(100) NOT NULL,
                lastName VARCHAR(100) NOT NULL,
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )
        `)
        console.log(result);
        
    }
 catch (error) {
    console.log(error);
    
}
}

createAddressTable()
createUserTable()
createProfileDetailsTable()