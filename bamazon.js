var mysql = require("mysql");
var inquirer = require ("inquirer");

var connection = mysql.createConnection({
    host: "Localhost",
    port:3306,
    user:"root",
    password:"101732",
    database:"bamazon"
})

connection.connect(function(err){
    if (err) throw error;
    console.log("Connected.");
    makeTable();

})

var makeTable = function(){
    connection.query("SELECT * FROM products", function (err,res){
        for(var i=0; i<res.length; i++){
            console.log(res[i].id+" || "+res[i].product+ " || "+ res[i].department+" || "+res[i].price+" || "+res[i].stock+"\n");
        }
        promptCustomer(res);
    })
}
    var promptCustomer = function(res){
        inquirer.prompt([{
            type:'input',
            name:'choice',
            message:"What would you like to purchase? [Quit by pressing 'Q']"        
        }]).then(function(answer){
            var correct = false;
            if(answer.choice.toUpperCase()=="Q"){
                process.exit();
            }
            for(var i=0;i<res.length;i++){
                if(res[i].product==answer.choice){
                    correct=true;
                    var product=answer.choice;
                    var id=i;
                    inquirer.prompt({
                        type:"input",
                        name: "quant",
                        message:"How many?",
                        validate: function (value){
                            if(isNaN(value)==false){
                                return true;
                            } else {
                                return false;
                            }
                        }
                    }).then (function(answer){
                        if((res[id].stock-answer.quant)>0){
                            connection.query("UPDATE products SET stock='"+(res[id].stock-answer.quant)+"' WHERE product='"+product+"'", function(err,res2){
                                console.log("Bought!");
                                makeTable();
                            })
                        } else {
                            console.log ("Invalid selection. Please try again.");
                            promptCustomer(res);
                        }
                    })
                            }
                          
            }
            if (i=res.length && correct==false){
                console.log("Not a valid selection!");
                promptCustomer(res);
            }
        })

    }
  

