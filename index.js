
// Import depedencies
import express from "express";
import cors from 'cors';
import multer from "multer";
import {GoogleGenAI, createUserContent} from '@google/genai';
import 'dotenv/config';
import dotenv, { config } from 'dotenv';

import fs from 'fs';
import path from "path";
import { constants } from "buffer";
import { error } from "console";
// Inisialisasi App
// 
// deklarasi variabel javascript
// [const | let] [namaVariabel]= [value]
// [const] --> 1x declare, tidak bisa diubah lagi
// [let] --> 1x declare, tetapi bisa diubah(re-assignment)
dotenv.config()

// console.log(process.env.GEMINI_API_KEY, "ini adalah API key-nya si Google Gemini API");


const app = express();
const upload = multer({
    dest: 'uploads/'
}); //akan digunakan dalam recording

// Route End Point



// 

const PORT = 3000;


const ai = new GoogleGenAI({}); //instantiation menjadi object instance(OOP)


// Inisialisasi middleware
// contoh : app.use(nama middleware())
app.use(cors()); //inisialisasi CORS sebagai middleware
app.use(express.json());

// inisialisasi routing
// consoth : app.get(), app.post(), app.pull(), dll -- Bagian dari standar HTTP
// HTTP Method:
// GET, PUT, POST, PATCH, DELETE, OPTIONS, HEADER

// penulisan
// function biasa --> function namaFunction(){}
// arrow function --> [const namaFunction = ]()=>{}

// alur
// syncronous --> () => {}
// asyncronous --> async () => {}


app.post('/generate-text', async (req, res) => {
    // terima jeroannya, lalu cek disini
    const { prompt } = req.body; //destructuring

    // guard clause(satpam)
    if (!prompt || typeof prompt !== 'string') {
        res.status(400).json({
            success: false,
            message: 'Prompt harus berupa string!',
            data: null
        });

    }

    // jeroannya
    try {
        const aiResponse = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: [
                { text: prompt }
            ],
            // ini untuk config AI lebih jauh lagi
            config: {
                systemInstruction: "Harus dibalas dalam bahasa Manado"
            }
        });

        res.status(200).json({
            success: true,
            message: 'Berhasil dijawab sama Gemini nih!',
            data:aiResponse.text
        });
    } catch(e) {
        console.log(e)
        res.status(500).json({
            success: false,
            message:'Gagal ca, dpe server da masalah sto',
            data:null
        })
    }
});

// upload.single(formDataYangDicari: string)
// contoh : upoad.single('file) => yang dicari di FormData yang bernama 'file'
app.post('/generate-from-image', upload.single('image'), async(req, res) => {
    const { prompt = "describe this uploaded image."} = req.body;

    try{
        // Baca file gambar
        const image = await genAI.files.upload({
            file: req.file.path ,
            config:{
                mimeType: req.file.mimetype
            }
        });
        

        // sertakan dalam prompt
        const result = await genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents:[
                createUserContent([
                    prompt,
                    createpartfromUri(image.uri, image.mimeType),
                ]),
                
            ],
        });
        res.json({output:result.text});
    } catch(error){
        console.error("Error generating content:", error);
        res.status(500).json({ error: error.message});
    } finally{
        fs.unlinkSync(req.file.path);
    }
});

app.post('/generate-from-document', upload.single('document'), async(req,res)=>{
    const{prompt = "describe this uploaded document."} = req.body;
    try{
        const filePath = req.file.path;
        const buffer = fs.readFileSync(filePath);
        const base64Data = buffer.toString('base64');
        const mimeType = req.file.mimetype;

        const documentPart = {
            inlineData: {data:base64Data, mimeType}
        }

        const result = await genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents:[
                createUserContent([
                    prompt,
                    documentPart
                ]),
            ],
        });
        res.json({output:result.text});
    } catch(e) {
        console.error("Error generating content:", error);
        res.status(500).json({error:error.message});
    }finally{
        fs.unlinkSync(req.file.path);
    }
});

app.post('/generate-from-audio', upload.single('audio'), async(req,res)=>{
    const{prompt = "describe this uploaded audio."} = req.body;
    try{
        const audioBuffer = fs.readFileSync;
        const base64Audio = audioBuffer.toString('base64');
        const mimeType = req.file.mimetype;

        const audioPart = {
            inlineData: {data:base64Audio, mimeType}
        }

        const result = await genAI.models.generateContent({
            model: 'gemini-2.5-flash',
            contents:[
                createUserContent([
                    prompt,
                    audioPart
                ]),
            ],
        });
        res.json({output:result.text});
    } catch(e) {
        console.error("Error generating content:", error);
        res.status(500).json({error:error.message});
    }finally{
        fs.unlinkSync(req.file.path);
    }
});


// servernya harus di serve dulu
app.listen(PORT, ()=>{
    console.log('I Love You ' + PORT);
});