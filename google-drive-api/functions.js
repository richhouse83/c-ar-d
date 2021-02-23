/* eslint-disable no-console */
const fs = require('fs');
const { google } = require('googleapis');
const { googleDriveApi } = require('./index');

function listFiles(auth) {
  const drive = google.drive({ version: 'v3', auth });
  drive.files.list(
    {
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)',
    },
    (err, res) => {
      if (err) return console.log(`The API returned an error: ${err}`);
      const {
        data: { files },
      } = res;
      if (files.length) {
        console.log('Files:');
        files.map((file) => console.log(`${file.name} (${file.id})`));
      } else {
        console.log('No files found.');
      }
      return null;
    },
  );
}

function listFilesByMimeType(auth, mimeType) {
  const drive = google.drive({ version: 'v3', auth });
  drive.files.list(
    {
      q: `mimeType='${mimeType}'`,
      pageSize: 10,
      fields: 'nextPageToken, files(id, name)',
    },
    (err, res) => {
      if (err) return console.log(`The API returned an error: ${err}`);
      const {
        data: { files },
      } = res;
      if (files.length) {
        console.log('Files:');
        files.map((file) => console.log(`${file.name} (${file.id})`));
      } else {
        console.log('No files found.');
      }
      return null;
    },
  );
}

function getFileById(auth, fileId) {
  const dest = fs.createWriteStream('./output.mp4');
  const drive = google.drive({ version: 'v3', auth });
  drive.files.get(
    {
      fileId,
      alt: 'media',
    },
    { responseType: 'stream' },
    (err, { data }) => {
      if (err) {
        console.log(err);
        return;
      }
      data
        .on('end', () => console.log('File Downloaded'))
        .on('error', (endErr) => {
          console.log(endErr);
          return process.exit();
        })
        .pipe(dest);
    },
  );
}

function getFileByName(auth, name) {
  const drive = google.drive({ version: 'v3', auth });
  drive.files.list(
    {
      q: `name='${name}'`,
      pageSize: 1,
      fields: 'nextPageToken, files(id, name)',
    },
    (err, res) => {
      if (err) return console.log(`The API returned an error: ${err}`);
      const {
        data: { files },
      } = res;
      if (files.length) {
        console.log('Found:');
        files.map((file) => {
          console.log(`${file.name} (${file.id})`);
          console.log('Downloading File');
          getFileById(auth, file.id);
          return null;
        });
      } else {
        console.log('No files found.');
      }
      return null;
    },
  );
}

function uploadFile(auth, fileName) {
  const uploadStream = fs.createReadStream(`./${fileName}`);
  const drive = google.drive({ version: 'v3', auth });
  console.log('Uploading...');
  drive.files.create(
    {
      resource: { name: fileName },
      uploadType: 'resumable',
      media: { mimeType: 'video/mp4', body: uploadStream },
    },
    (err, response) => {
      if (response.status !== 200) {
        console.log('Could not establish connection');
        return process.exit();
      }
      const { data } = response;
      console.log(`File ${data.name} successfully uploaded. ID: ${data.id}`);
      return null;
    },
  );
}

googleDriveApi(listFiles);

module.exports = {
  getFileByName,
  getFileById,
  listFiles,
  listFilesByMimeType,
  uploadFile,
};
