

import { Client } from "pg"
const client = new Client({
    // connectionString: "postgresql://postgres:mysecretpassword@localhost:5433/postgres"
    connectionString : "postgresql://ashishsrivastava.bbdu:bZFRzrSa5n0s@ep-royal-fog-a53wfhib.us-east-2.aws.neon.tech/neondb?sslmode=require"
})

const address = async () => {
    await client.connect();
    try {
        const result = await client.query(`
            CREATE TABLE Profile (
                id  SERIAL PRIMARY KEY,
                user_id INTEGER NOT NULL,
                country VARCHAR(100) NOT NULL,
                street VARCHAR(255) NOT NULL,
                pincode VARCHAR(20),
                created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
            )   
        `)
        console.log(result);
        
    } catch (e) {
        console.log(e);
        
    }
}

address()

