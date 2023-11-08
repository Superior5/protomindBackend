import fs from "fs";
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import Protocol from "../models/protocolModel.js";
import User from "../models/userModel.js";
import fetch from 'node-fetch';
import mongoose from 'mongoose';

import ffmpeg from 'fluent-ffmpeg';

ffmpeg.setFfmpegPath(ffmpegPath.path);


export async function addMedia(req, res) {
    let date = req.body;
    console.log('addMedia')
    let {file} = req;
    if(!file || !file.filename) {
      return res.json({
        msg: "Должен быть загружен файл",
      })
    }
    let filename = file.filename?.split('.').slice(0, -1).join('.');
    const mp4FilePath = `${file.destination}${filename}.mp4`;
    const wavFilePath = `uploads/audios/${filename}.wav`;
    
    
    try {
      ffmpeg(mp4FilePath)
      .output(wavFilePath)
      .audioCodec('pcm_s16le')
      .audioChannels(1)
      .format('wav')
      .on('end', () => {
        res.json({
          msg: "Файлы успешно загружены",
          links: {
            audio: wavFilePath,
            video: mp4FilePath
          }
        })
        
        return null;
      })
      .on('error', (err) => {
        console.error('Возникли ошибки с получением аудио:', err);
        res.json({
          msg: "Возникли ошибки с загрузкой данных",
          error: err,
        })
      })
      .run(); 
    } catch (error) {
       res.json({
        msg: 'Возникли проблемы с обработкой данных',
        error: err
       })

       return null;
    }
   
};



export async function addFile(req, res) {
  
  let {file} = req;

  res.json({
    filename: file?.filename
  })
 
};


export async function users(req, res) { 
  try {
      res.json({
          msg: 'ok',
      })
  } catch (error) {
      res.json({
          msg: 'not ok',
      })
  }
}



export async function getProtocols(req, res) {
  
  try {
    
    const protocols = await Protocol.find();
    console.log(protocols);
    res.json({
      protocols,
    })
    
  } catch (error) {
    console.log(error)
        res.status(400).json({
        message: 'Произошло ошибка при получении данных',
    })
  }
 
};

export async function getProtocol(req, res) {
  
  try {
    const protocolId = req.params.id;

    const protocol = await Protocol.findOne({
      _id: protocolId
    });
    const secretary = await User.findOne({_id: protocol.secretary})


    protocol.secretary = JSON.stringify({
        id: secretary._id,
        name: secretary.name,
        nickname: secretary.username,
    })

    console.log(protocol);

    return res.json({
      protocol,
    })
  
  } catch (error) {
    console.log(error)
        res.status(400).json({
        message: 'Произошло ошибка при получении данных',
    })
  }
 
};


async function getTranscribe(filepath) {

  const body = {filepath: 'C:/projects/backend/protomindBackend/uploads/audios/2023-11-06T12-30-18.746Z-WIN_20230610_10_22_04_Pro.wav'}
  const response = await fetch('http://127.0.0.1:8000/transcribe', {
    method: 'post',
    body: JSON.stringify(body),
    headers: {'Content-Type': 'application/json'}
  });

  console.log(await response.json())
  return await response.json();
};

export async function addProtocol(req, res) {
  
  try {
    let data = req.body;

    const {topic, subject, director,
          secretary, date, video, audio} = data;
    

    console.log(topic, subject, director,
      secretary, date, video, audio)
    
    console.log(audio);
    
    const protocol = new Protocol(
      {
        topic,
        subject,
        secretary,
        director,
        video,
        audio,
        date,
      }
    )
  
    await protocol.save();

    return res.json({
      message: 'Протокол успешно загружен',
  });
    
  } catch (error) {
    console.log(error)
        res.status(400).json({
        message: 'Ошибка при загрузке протокола, попробуйте обратится к сервису позже',
    })
  }
};