const fs = require("fs");

/**
 * @param path Name wpuld be an arg
 * @param content take the data and add it
 * @param callback f
 * 
 */

// this exports for read a file
exports.readFileCallback =function(path,callback)
{
    fs.readFile(path,function(err,data)
    {
        if(err)
        {
            return callback(err,null);
        }
        
        return callback(null ,data.toString());
    })
}

// this exports for write a file
const writeFileCallback = function(path, content, callback) {
    
    fs.writeFile(path, content, function(err) {
        // If an error occurred, show it and return
        if(err) return console.error(err);
        console.log(content)
        callback(null, content);
        // Successfully wrote to the file!
    });
}

exports.writeFileCallback = writeFileCallback;

// module.exports = {
//     writeFileCallback
// }


// exports.readFilePromise = function (path) 
// {
//     return new Promise((resolve, reject) => 
//     {
//         fs.readFile(path,function(err,data)
//         {
//                 // return callback("node.js",null);
//                 if (err)
//                 {
//                     reject(err)
//                 }
//                 resolve(data.toString());
//          });
//             // return callback(null , data.toString());
//      });
//     // })
// }

exports.writeFilePromise =function (path,content)
{
    return new Promise((resolve,reject) =>
    {
        fs.writeFile(path,content,function(err,data)
        {
            if(err)
            {
                reject(err);
            }
           // resolve(data);
        });
    });
}

exports.appendFilePromise= function(path,content)
{
    return new Promise((resolve,reject) =>
    {
        fs.appendFile(path,content,function(err,data)
        {
            if(err)
            {
                reject(err);
            }
        });
    });
}


// this exports for append
exports.appendFileCallback = function (path, content, callback) {
    
    // fs.readFile(path,function(err,data)
    //     {
    //         if(err)
    //         {
    //             return callback("nodejs err ",null);
    //         }
    //         console.log(data.length);
    //         console.log(content);
    //         if(data.length)
    //          {
    //           fs.appendFile(path, "\b,"+content, function (err, data) {
    //             if (err)
    //              {
    //                 return callback("node.js", null);
    //                 }
    //            });
    //          } 
    //    else { 
           fs.appendFile(path, content, function (err, data) {
            if (err) 
            {
                return callback("node.js", null);
            }
         return callback(null , data);
           // callback(null, content);
        });
    }
    //  });
// }


// function sayHello(
//     path: PathLike | number,
//     options: { encoding?: string | null; flag?: string; } | string | undefined | null,
//     callback: (err: NodeJS.ErrnoException | null, data: string | Buffer) => void,
// ): void;



// this function calling for copy the containt of one file to another file using exoprts copyFile by CALLBACK
exports.copyFileCallback =function(path1,path2,callback){
    console.log(path1,path2);
    fs.copyFile (path1,path2,(err)=>
    {
        if(err) 
        {
            console.log('error');
        }
        console.log('source was copied to destinatioon');
    })
}

// this function calling for copy the containt of one file to another file using exoprts copyFile by PROMISE
exports.copyFilePromise = function(path1,path2)
{
    return new Promise ((resolve,reject)=>
    {
        fs.copyFile(path1,path2,function(err,data)
        {
            if(err)
            {
                reject(err)
            }
            
        });
    });
}

// chech the file is exist or not in the dir using callback
exports.exitsFileCallback = function(path,callback)
{
    //console.log(path);
    fs.exists(path,(exists)=>
    {
        if (exists) 
        {
            console.error('myfile already exists');
          } 
          else 
          {
              console.log("myfile not exists");
          }
           
    });
}

// <!--         <script type="text/javascript">
//             var myContacts = [
//                   { "name": "Parvez Ansari", "email": "ansariparvez@gmai.com", "mobile":"9998979695" },
//                   { "name": "Tayyeb Shaikh", "email": "tshaikh1981@gmai.com", "mobile":"9091929394" },
//                   { "name": "Ashfaque Shaikh", "email": "ashly786@gmai.com", "mobile":"8081828384" }
//                 ];
            
//             function generateDynamicTable(){
                
//                     var noOfContacts = myContacts.length;
                    
//                     if(noOfContacts>0){
                        
            
//                         // CREATE DYNAMIC TABLE.
//                         var table = document.createElement("table");
//                         table.style.width = '50%';
//                         table.setAttribute('border', '1');
//                         table.setAttribute('cellspacing', '0');
//                         table.setAttribute('cellpadding', '5');
                        
//                         // retrieve column header ('Name', 'Email', and 'Mobile')
            
//                         var col = []; // define an empty array
//                         for (var i = 0; i < noOfContacts; i++) {
//                             for (var key in myContacts[i]) {
//                                 if (col.indexOf(key) === -1) {
//                                     col.push(key);
//                                 }
//                             }
//                         }
                        
//                         // CREATE TABLE HEAD .
//                         var tHead = document.createElement("thead");	
                            
                        
//                         // CREATE ROW FOR TABLE HEAD .
//                         var hRow = document.createElement("tr");
                        
//                         // ADD COLUMN HEADER TO ROW OF TABLE HEAD.
//                         for (var i = 0; i < col.length; i++) {
//                                 var th = document.createElement("th");
//                                 th.innerHTML = col[i];
//                                 hRow.appendChild(th);
//                         }
//                         tHead.appendChild(hRow);
//                         table.appendChild(tHead);
                        
//                         // CREATE TABLE BODY .
//                         var tBody = document.createElement("tbody");	
                        
//                         // ADD COLUMN HEADER TO ROW OF TABLE HEAD.
//                         for (var i = 0; i < noOfContacts; i++) {
                        
//                                 var bRow = document.createElement("tr"); // CREATE ROW FOR EACH RECORD .
                                
                                
//                                 for (var j = 0; j < col.length; j++) {
//                                     var td = document.createElement("td");
//                                     td.innerHTML = myContacts[i][col[j]];
//                                     bRow.appendChild(td);
//                                 }
//                                 tBody.appendChild(bRow)
            
//                         }
//                         table.appendChild(tBody);	
                        
                        
//                         // FINALLY ADD THE NEWLY CREATED TABLE WITH JSON DATA TO A CONTAINER.
//                         var divContainer = document.getElementById("myContacts");
//                         divContainer.innerHTML = "";
//                         divContainer.appendChild(table);
                        
//                     }	
//                 }
            
//             </script> -->
