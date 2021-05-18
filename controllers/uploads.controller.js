const path = require('path');
const fs = require('fs');

const { response } = require("express");
const { v4: uuidv4 } = require ('uuid');
const { updateAvatar } = require("../helpers/updateAvatar");


const fileUpload = (req, res = response) => {

    const type = req.params.type;
    const id = req.params.id;

    // validate type of file
    const validTypes = ['hospitals','doctors','users'];
    if(!validTypes.includes(type)){
        return res.status(400).json({
            ok:false,
            msg:'Data type is not correct'
        })
    }
    // validate there is a file
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send({
            ok:false, 
            msg:'No files were uploaded.'
        });
      }
    
    // Process Image

    const file = req.files.image; 
    const fileNameSplit = file.name.split('.');
    const fileExtension = fileNameSplit[fileNameSplit.length - 1];

      // validate extension 
    const validExtension = ['png','jpg','jpeg','gif'];
    if (!validExtension.includes(fileExtension)){
        return res.status(400).json({
            ok:false,
            msg:'This extension is not allowed'
        })
    }

    // Name generate
    const fileName = `${uuidv4()}.${fileExtension}`;

    // Generate file Path
    const path = `./uploads/${type}/${fileName}`;

     // Use the mv() method to place the file somewhere on your server
     file.mv(path, (err) => {
        if (err){
            console.log(err)
            return res.status(500).json({
                ok: false,
                msg: 'Error to move image'
            })
        }

        // update image in DB
        updateAvatar(type, id, fileName);

        res.json({
            ok: true,
            msg:'file Uploaded',
            fileName: fileName,
            path
        });
    });
}

const returnImage = (req, res = response)=>{
    const type = req.params.type;
    const photo = req.params.image;

    const pathImg = path.join(__dirname,`../uploads/${type}/${photo}`);

    // image template
    if( fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathImg = path.join(__dirname,`../uploads/no-img.jpg`);
        res.sendFile(pathImg);
    }   
}

module.exports = { 
    fileUpload,
    returnImage
}