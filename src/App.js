import "./styles.css";

import AWS from "aws-sdk";

const S3_BUCKET = "xxxxxxxxxxxxxxxx";
const REGION = "xxxxxxxxxxxxxxxxxxxxx";

AWS.config.update({
  accessKeyId: "xxxxxxxxxxxxxxxxxxxxxxxxxx",
  secretAccessKey: "xxxxxxxxxxxxxxxxxxxxxxxxxxxx"
});

const myBucket = new AWS.S3({
  params: { Bucket: S3_BUCKET },
  region: REGION
});

export default function App() {
  const handleFileUpload = (file) => {
    
    const params = {
      ACL: "public-read",
      Body: file,
      Bucket: S3_BUCKET,
      Key: file.name,
      ContentType: file.type,
      StorageClass: 'REDUCED_REDUNDANCY'
    };
    var opts = {queueSize: 1, partSize: 1024 * 1024 * 5};

    myBucket
      .upload(params,opts)
      .on("httpUploadProgress", (evt) => {
        console.log("Uploaded :: " + parseInt((evt.loaded * 100) / evt.total)+'%');
        console.log("https://s3."+REGION+".amazonaws.com/"+S3_BUCKET+"/" + file.name);
      })
      .send((err) => {
        if (err) console.log(err);
      });
  };
  return (
    <div className="App">
      <h1>S3 upload</h1>

      <input
        type="file"
        onChange={(e) => handleFileUpload(e.target.files[0])}
      />
    </div>
  );
}
