// server/index.js
const keys = require("./keys")
const path = require("path");
const express = require("express");
const fs = require("fs");
const bodyParser = require("body-parser");
const mysql = require("mysql");
const PORT = process.env.PORT || 3001;


const connection = mysql.createConnection({
    host: keys.host,
    user: keys.user,
    password: keys.password,
    database: "kueski",
    ssl: {
        ca: fs.readFileSync(path.resolve(__dirname, "../DigiCertGlobalRootCA.crt.pem"))
    }
})

connection.connect();

const app = express();

app.use(bodyParser.json());

// Endpoint for /api/requests?type=:request_status
app.get("/api/requests", (req, res) => {
    const connection = mysql.createConnection({
        host: keys.host,
        user: keys.user,
        password: keys.password,
        database: "kueski",
        ssl: {
            ca: fs.readFileSync(path.resolve(__dirname, "../DigiCertGlobalRootCA.crt.pem"))
        }
    });
    request_status = req.query.type;
    if (request_status == "all"){
        sql = "SELECT * FROM requests;";
    } else {
        sql = "SELECT * FROM requests WHERE request_status = '" + request_status + "';";
    }
    connection.query(sql, (err, result, fields) => {
        if (err){
            console.log("Error: ", err);
        }
        console.log(result);
        for (i = 0; i < result.length; i++){
            if (result[i].request_status == "Complete" || result[i].request_status == "Rejected"){
                action = `<p>No action available</p>`;
            } else if (result[i].request_arco_right == "Access"){
                action = `<button variant="primary" class="btn btn-primary" onClick=mostrarModalAccess(${result[i].request_id}) style="font-size: 12px;"><i class fa fa-bars></i>Details</button>`;
            } else if (result[i].request_arco_right == "Rectify"){
                action = `<button type="button" class="btn btn-primary" onClick=mostrarModalRectify(${result[i].request_id}) style="font-size: 12px;"><i class fa fa-bars></i>Details</button>`;
            } else if (result[i].request_arco_right == "Cancel"){
                action = `<button type="button" class="btn btn-primary" onClick=mostrarModalCancel(${result[i].request_id}) style="font-size: 12px;"><i class fa fa-bars></i>Details</button>`;
            } else {
                action = `<button type="button" class="btn btn-primary" onClick=mostrarModalOppose(${result[i].request_id}) style="font-size: 12px;"><i class fa fa-bars></i>Details</button>`;
            }
            result[i].action = action;
        }
        res.json(result);
    })
});


// Endpoint for /api/request/:request_id
app.get("/api/request/:request_id", (req, res) => {
    request_id = req.params.request_id;
    sql = "SELECT * FROM requests INNER JOIN clients ON requests.client_id = clients.client_id WHERE request_id = " + request_id + ";";
    connection.query(sql, (err, result, fields) => {
        if (err){
            console.log("Error: ", err);
        }
        console.log(result);
        res.json(result);
    });
});

app.get("/api/admins", (req, res) => {
    sql = "SELECT * FROM administrator";
    connection.query(sql, (err, result, fields) => {
        if (err){
            console.log("Error: ", err);
        }
        console.log(result);
        res.json(result);
    });
});

app.get("/api/admins/:admin_number", (req, res) => {
    console.log(req.params.admin_number);
    sql = "SELECT * FROM administrator WHERE admin_employee_number = " + req.params.admin_number + ";";
    connection.query(sql, (err, result, fields) => {
        if (err){
            console.log("Error: ", err);
        }
        console.log(result);
        res.json(result);
    });
});

app.get("/api/admin/:admin_id", (req, res) => {

    admin_id = req.params.admin_id;
    sql = "SELECT * FROM administrator WHERE admin_id = " + admin_id + ";";
    connection.query(sql, (err, result, fields) => {
        if (err){
            console.log("Error: ", err);
        }
        console.log(result);
        res.json(result);
    });
});

app.get("/api/clients", (req, res) => {
        sql = "SELECT * FROM clients";
        connection.query(sql, (err, result, fields) => {
            if (err){
                console.log("Error: ", err);
            }
            console.log(result);
            res.json(result);
        });

});

app.put("/api/client/:client_id", (req, res) => {

    client_id = req.params.client_id;
    //connection.connect();
    sql = "UPDATE clients SET ";
    if(req.body.client_name != null){
        sql += "client_name = '" + req.body.client_name + "' ";
    }
    else if (req.body.client_first_last_name != null){
        sql += "client_first_last_name = '" + req.body.client_first_last_name + "' ";
    }
    else if (req.body.client_second_last_name != null){
        sql += "client_second_last_name = '" + req.body.client_second_last_name + "' ";
    }
    else if (req.body.client_born_date != null){
        sql += "client_born_date = '" + req.body.client_born_date + "' ";
    }
    else if (req.body.client_nationality != null){
        sql =+ "client_nationality '" + req.body.client_nationality + "' ";
    }
    else if (req.body.client_birth_state != null){
        sql += "client_birth_state = '" + req.body.client_birth_state + "' ";
    }
    else if (req.body.client_occupation != null){
        sql += "client_occupation = '" + req.body.client_occupation + "' ";
    }
    else if (req.body.client_curp != null){
        sql += "client_curp = '" + req.body.client_curp + "' ";
    }
    else if (req.body.client_gender != null){
        sql += "client_curp = '" + req.body.client_curp + "' ";
    }
    else if (req.body.client_phone != null){
        sql += "client_phone = '" + req.body.client_phone + "' ";
    }
    else if (req.body.client_email != null){
        sql += "client_email = '" + req.body.client_email + "' ";
    }
    else if (req.body.client_password != null){
        sql += "address_country = '" + req.body.address_country + "' ";
    }
    else if (req.body.address_state != null){
        sql += "address_state = '" + req.body.address_state + "' ";
    }
    else if (req.body.address_city != null){
        sql += "address_city = '" + req.body.address_city + "' ";
    }
    else if (req.body.address_street != null){
        sql += "address_street = '" + req.body.address_street + "' ";
    }
    else if (req.body.address_ext_number != null){
        sql += "address_ext_number = '" + req.body.address_ext_number + "' ";
    }
    else if (req.body.address_int_number != null){
        sql += "address_int_number = '" + req.body.address_int_number + "' ";
    }
    
    sql+= "WHERE client_id = " + client_id + ";";

            connection.query(sql, (err, result, fields) => {
        if (err){
            console.log("Error: ", err);
        }
        console.log(result);
        res.json(result);
    });
});

app.put("/api/requests/:request_id", (req, res) => {
    request_id = req.params.request_id;
    client_id = req.query.client;


    if (req.body.fields != null){
        sql = "UPDATE requests SET request_status = '" + req.body.request_status + "', admin_id = " + req.body.admin_id + " WHERE request_id = " + request_id + ";";
        connection.query(sql, (err, result, fields) => {
            if (err){
                console.log("Error: ", err);
            }
        });
        sql2 = "UPDATE clients SET " + req.body.fields + " = '" + req.body.changed + "' WHERE client_id = " + client_id + ";";
        connection.query(sql2, (err, result, fields) => {
            if (err){
                console.log("Error: ", err);
            }
            res.json({message: "Success!"});
        });
    }
    
    else if (req.body.oppose != null){
        sql = "UPDATE requests SET request_status = '" + req.body.request_status + "', admin_id = " + req.body.admin_id + " WHERE request_id = " + request_id + ";";
        connection.query(sql, (err, result, fields) => {
            if (err){
                console.log("Error: ", err);
            }
        });
        sql2 = "UPDATE clients SET client_is_blocked = true WHERE client_id = " + client_id + ";";
        connection.query(sql2, (err, result, fields) => {
            if (err){
                console.log("Error: ", err);
            }
            res.json({message: "Success!"});
        });
    }

    else{
        sql = "UPDATE requests SET request_status = '" + req.body.request_status + "', admin_id = " + req.body.admin_id + " WHERE request_id = " + request_id + ";";
        connection.query(sql, (err, result, fields) => {
            if (err){
                console.log("Error: ", err);
            }
            res.json({message: "Success!"});
        });
    }

});

app.delete("/api/client/:client_id", (req, res) => {
    const client_id = req.params.client_id;
    const sql = "DELETE FROM identification WHERE client_id = " + client_id + ";";
    const sql2 = "DELETE FROM requests WHERE client_id = " + client_id + ";";
    const sql3 = "DELETE FROM clients WHERE client_id = " + client_id + ";";
    connection.query(sql, (err, result, fields) => {
      if (err) {
        console.log("Error:", err);
        res.status(500).send("Error al eliminar la identificacion");
        return;
      }
      connection.query(sql2, (err, result, fields) => {
        if (err) {
          console.log("Error:", err);
          res.status(500).send("Error al eliminar el request");
          return;
        }
      });

      connection.query(sql3, (err, result, fields) => {
        if (err) {
          console.log("Error:", err);
          res.status(500).send("Error al eliminar el cliente");
          return;
        }
        res.json({message: "Success!"});
      });
    });
  });


app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});