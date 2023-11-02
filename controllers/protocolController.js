import fs from "fs";
import ffmpegPath from '@ffmpeg-installer/ffmpeg';


import ffmpeg from 'fluent-ffmpeg';

ffmpeg.setFfmpegPath(ffmpegPath.path);


export async function addMedia(req, res) {
    let date = req.body;
    let {file} = req;
    let filename = file.filename.split('.').slice(0, -1).join('.');
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