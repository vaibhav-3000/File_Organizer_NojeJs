// taking input in node.js
// node main.js takes indexes 0 and 1 respectively hence we slice till 2 
let inputArr=process.argv.slice(2);  
let fs=require("fs");
let path=require("path");
console.log(inputArr);

let types={
  media:["mp4","mkv"],
  archives:['zip','7z','rar','tar','gz','ar','iso','xz'],
  documents:['docx','doc','pdf','xlsx','xls','odt','ods','odp','odg','odf','txt','ps','tex'],
  app:['exe','dmg','pkg','deb']
};
// commands to implement:
// node main.js tree "directoryPath"
// node main.js organize "directoryPath"
// node.main.js help

let command=inputArr[0];
switch(command){
  case "tree":
    treeFn(inputArr[1]);
    break;
  case "organize":
    organizeFn(inputArr[1]);
    break;
  case "help":
    helpFn();
    break;
  default:
    console.log("invalid input");
    break;
}

function treeFn(dirPath){
  console.log("tree command executed");
}
function organizeFn(dirPath){
  console.log("organize command executed");
  //1. input->directory path given
  if(dirPath==undefined){
    console.log("give a path please:");
    return;
  }
  else{
    let doesExist=fs.existsSync(dirPath);
    let destPath;
    if(doesExist){
        //2. create ->organized files->directory
        destPath=path.join(dirPath,"organized_files");
        if(fs.existsSync(destPath)==false){
          fs.mkdirSync (destPath);
        }
          
    }
    else{
      console.log("Enter correct path please");
      return;
    }
    organizeHelper(dirPath,destPath);

  }


}
function organizeHelper(src,dest){
    //3. identify the categories of files in the input directory
  let childNames=fs.readdirSync(src);
  console.log(childNames);
  for(let i=0;i<childNames.length;i++){
    let childAddress=path.join(src,childNames[i]);
    let isFile=fs.lstatSync(childAddress).isFile();
    if(isFile){
      console.log(childNames[i]);
      let category=getCategory(childNames[i]);
        //4. copy/cut files to the organized directory inside their respective folders
      sendFiles(childAddress,dest,category);

    }
  }
}
function sendFiles(srcFilePath,dest,category){
  let categoryPath=path.join(dest,category);
  if(fs.existsSync(categoryPath)==false){
    fs.mkdirSync(categoryPath);
  }
  let fileName=path.basename(srcFilePath);
  let destFilePath=path.join(categoryPath,fileName);
  fs.copyFileSync(srcFilePath,destFilePath);
  console.log(fileName,"copied to",category);
}
function getCategory(name){
  let ext=path.extname(name);
  ext=ext.slice(1);//to remove .
  console.log(ext);
  for(let type in types){
    let cur=types[type];
    for(let i=0;i<cur.length;i++){
      if(ext==cur[i]){
        return type;
      }
    }
  }
  return "others";
}












function helpFn(){
  console.log(`
  LIST OF ALL THE COMMANDS:
   node main.js tree "directoryPath"
   node main.js organize "directoryPath"
   node.main.js help
  `);
}