const express = require('express');
const router = express.Router();

var mysql = require('mysql');
var con = mysql.createConnection({host:'localhost',user:'root',password:'',database:'shoppingdb'});


// Error handling
const sendError = (err, res) => {
    response.status = 501;
    response.message = typeof err == 'object' ? err.message : err;
    res.status(501).json(response);
};

// Response handling
let response = {
    status: 200,
    data: [],
    message: null
};

var msg1="valid";
var msg2="invalid";
// Get users
router.get('/users', (req, res) => {
   	
	var sql = "select * from users";
	con.query(sql,function(err,rows){
		if(err) {
                sendError(err, res);
            }
		
		response.data = rows;
                res.json(response);
      
	
	})
});

router.post('/check', (req, res) => {

		var uname = req.body.uname;
		var pass = req.body.pass;
	var sql = "select * from users where Email='"+uname+"' and Password='"+pass+"';";
	con.query(sql,function(err,rows){
		if(err) throw err;	
		if(rows.length)
		{
			//response.data = rows;
            //res.json(response);
			res.json({'msg':msg1, data : rows })
			console.log(msg1);
		}
		else
		{
		res.json({'msg':msg2});
		}
		
	});
		
});

router.post('/UpdateUser', function (req, res) {
    
  var sql = "Update users set FullName = '"+ req.body.fullname +"',Email='"+ req.body.email +"', PhoneNumber='"+ req.body.phone+"' , Password ='"+ req.body.password+"',Role = '"+ req.body.role+"' , createddate ='"+ req.body.date +"' where id ='" + req.body.id +"'";
 // var sql = "Update users set FullName = '"+ req.body.fullname +"' where Id ='" + req.body.id +"'";
  //console.log(sql);
  con.query(sql, function (err, result) {
  if (err)
   throw err;
   console.log(err);
  console.log("1 record updated");
    res.json("1 record updated succesfully");
  });
});

router.post('/getuserbyId', function (req, res) {
 console.log( req.body.id);
  var sql = "Select * from users where id = '"+ req.body.id +"'";
  con.query(sql, function (err, result) {
  if (err)
   throw err;
  response.data = result;
  console.log(result);
  
  res.json(response);
  
  });
});




router.post('/registerUser', function (req, res) {
	console.log("hello")
var sql = "insert into users(FullName, Email, PhoneNumber, Password, Role, isDelete, createddate) values('"+ req.body.fullname +"' , '"+ req.body.email +"' , '"+ req.body.phone+"' , '"+ req.body.password +"' , '"+ req.body.role +"', 0 , '"+ req.body.date +"')";
  con.query(sql, function (err, result) {
  if (err)
   throw err;
  console.log("1 record Inserted");
  res.json("success");
  });
});


router.post('/addtoCart', function (req, res) {
	//console.log("hello")
	var sql1 = "DELETE FROM Productcart WHERE ProductID = (" + req.body.ProductID + ")";
	con.query(sql1, function (err, result) {
  if (err)
   throw err;
  console.log("1 record DELETE");
  //res.json("success");
  });
	
var sql = "insert into ProductCart (ProductID, quantity , CreatedDate) values('"+ req.body.ProductID +"' ,1,'"+ req.body.CreatedDate +"')"; 
	console.log(sql);
  con.query(sql, function (err, result) {
  if (err)
   throw err;
  console.log("1 record Inserted");
  res.json("success");
  });
});





router.post('/deletedata', function (req, res) {
  console.log(req.body.id);
  var sql = "Delete from users where id = '"+ req.body.id +"'";
  con.query(sql, function (err, result) {
  if (err)
   throw err;
  console.log("1 record deleted");
  
  });
});






// Get Produts
router.get('/Products', (req, res) => {
   	
	var sql = "select * from products";
	con.query(sql,function(err,rows){
		if(err) {
                sendError(err, res);
            }
		
		response.data = rows;
         res.json(response);
      
	
	})
});




router.post('/ProductbyId', function (req, res) {
 //console.log( req.body.id);
  var sql = "Select * from products where Id = '"+ req.body.Id +"'";
  con.query(sql, function (err, result) {
  if (err)
   throw err;
  response.data = result;
  //console.log(result);
  
  res.json(response);
  
  });
});

router.post('/deleteProduct', function (req, res) {
 // console.log(req.body.Id);
  var sql = "Delete from products where Id = '"+ req.body.Id +"'";
  con.query(sql, function (err, result) {
  if (err)
   throw err;
  console.log("1 record deleted");
  
  });
});

router.post('/addProduct', function (req, res) {
	//console.log("hello")
  
  var datetime = new Date();
var hours = datetime.getHours();
  var minutes = datetime.getMinutes();
  var seconds = datetime.getSeconds();
   var imageName = hours+'_'+minutes+'_'+seconds+'.jpeg';
		// var title = req.body.title1;
		 
		// var name1=req.body.data.name;
		 //console.log(name1);
		 //console.log(title);
		 var name = req.body.data.ImgName.value;
		 var base64Data = name.replace(/^data:image\/jpeg;base64,/, "");

		require("fs").writeFile('src/assets/images/prdImg/'+imageName, base64Data, 'base64', function(err) {
			console.log(err);
		});


var sql = "insert into products(Name, Description, Price, ImgName,Createddate,CategoryId) values('"+ req.body.data.Name +"' , '"+ req.body.data.Description +"' , '"+ req.body.data.Price+"' , '"+ imageName +"' , '"+ req.body.data.Createddate +"' , '"+ req.body.data.CategoryId +"')";
  console.log(sql);
  con.query(sql, function (err, result) {
  if (err)
   throw err;
  console.log("1 record Inserted");
  res.json("success");
  });
});


router.post('/updateProduct', function (req, res) {
	console.log("hello");
	var ddd =req.body.data.Id;
	console.log(ddd);
    var isImageUpdate = req.body.data.ImgName.value;
	  console.log(isImageUpdate);
	if (isImageUpdate != undefined) {
	var datetime = new Date();
	var hours = datetime.getHours();
	var minutes = datetime.getMinutes();
	var seconds = datetime.getSeconds();
	var imageName = hours+'_'+minutes+'_'+seconds+'.jpeg';
		
		 var name = req.body.data.ImgName.value;
		 var base64Data = name.replace(/^data:image\/jpeg;base64,/, "");

		require("fs").writeFile('src/assets/images/prdImg/'+imageName, base64Data, 'base64', function(err) {
			console.log(err);
		});


 var sql = "Update products set Name = '"+ req.body.data.Name +"',Description='"+ req.body.data.Description +"', Price='"+ req.body.data.Price+"' , ImgName ='"+ imageName +"',CategoryId ='"+ req.body.data.CategoryId +"',Createddate ='"+ req.body.data.Createddate +"' where Id ='" + req.body.data.Id +"'";

//var sql = "update products set Name= , Description, Price, ImgName,Createddate,CategoryId) values('"+ req.body.data.Name +"' , '"+ req.body.data.Description +"' , '"+ req.body.data.Price+"' , '"+ imageName +"' , '"+ req.body.data.Createddate +"' , '"+ req.body.data.CategoryId +"')";
  console.log(sql);
  con.query(sql, function (err, result) {
  if (err)
   throw err;
  console.log("1 record Inserted");
  res.json("success");
  });
  
} else 
	{
	var sql = "Update products set Name = '"+ req.body.data.Name +"',Description='"+ req.body.data.Description +"', Price='"+ req.body.data.Price+"',CategoryId ='"+ req.body.data.CategoryId +"',Createddate ='"+ req.body.data.Createddate +"' where Id ='" + req.body.data.Id +"'";

	//var sql = "update products set Name= , Description, Price, ImgName,Createddate,CategoryId) values('"+ req.body.data.Name +"' , '"+ req.body.data.Description +"' , '"+ req.body.data.Price+"' , '"+ imageName +"' , '"+ req.body.data.Createddate +"' , '"+ req.body.data.CategoryId +"')";
	console.log(sql);
	con.query(sql, function (err, result) {
	if (err)
	throw err;
	console.log("1 record Inserted");
	res.json("success");
		});
	}


  
});


// Get checkoutproducts
router.get('/checkoutproducts', (req, res) => {
   	
	var sql = "SELECT p.Id,p.Name,p.Description,p.Price,p.ImgName, quantity FROM productcart c INNER JOIN products p ON c.productid = p.id";
	con.query(sql,function(err,rows){
		if(err) {
                sendError(err, res);
            }		
		response.data = rows;
                res.json(response);     
	
	})
});


router.post('/deletecheckout', function (req, res) {
	 console.log(req.body.Id);
  var sql = "Delete from productcart where productid = '"+ req.body.Id +"'";
  con.query(sql, function (err, result) {
  if (err)
   throw err;
  console.log("1 record deleted");
  
  });
});


router.post('/Updatecheckout', function (req, res) {
	console.log(req.body.Quty);
  var sql = "update  productcart set quantity="+ req.body.Quty+  " where productid = '"+ req.body.data.Id +"'";
  con.query(sql, function (err, result) {
  if (err)
   throw err;
  console.log("1 record Update checkout");
  
  });
});


module.exports = router;