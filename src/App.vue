<template>
  <video
    :src="video"
    style="height:30vh;width:50vh"
    controls
  />
  <br>
  <button @click="transcode">
    Start
  </button>
  <p>{{ message }}</p>
  <button @click="revoke">
    revoke
  </button>
  <button @click="downloadFile(video)">
    downloadFile
  </button>
  <button @click="exit">
    exit
  </button>
</template>

<script>
import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { defineComponent, ref,onBeforeUnmount } from "vue";

export default defineComponent({
  name: "App",
  setup() {
    // app state
    const ffmpeg = createFFmpeg({
      log: true,
    });
    const message = ref("Click Start to Transcode");
    let video = ref(null);
    console.log('process.env.NODE_ENV',process.env.NODE_ENV)
    const file =
      process.env.NODE_ENV === "production"
        ? "http://localhost:8080/flame.avi"
        // ? "/vue-app/flame.avi"
        : "http://localhost:8080/flame.avi";
        // : "http://localhost:8080/1.ts";
    // methods
    async function transcode() {
      revoke()
      message.value = "Loading ffmeg-core.js";
      await ffmpeg.load();
      message.value = "Start transcoding";
      ffmpeg.FS("writeFile", "test.ts", await fetchFile(file));
      await ffmpeg.run("-i", "test.ts","-ss","1","-t","15", "test.mp4");
      // await ffmpeg.run("-i", "test.ts","-ss","10","-t","14", "test.mp4");
      message.value = "Complete transcoding";
      const data = ffmpeg.FS("readFile", "test.mp4");
      video.value = URL.createObjectURL(
        new Blob([data.buffer], { type: "video/mp4" })
      );
      exit()
    }
    async function revoke(){
      URL.revokeObjectURL(video.value)
    }
    async function exit(){
      try {
        ffmpeg.exit();
      } catch (error) {
        console.log('exit-error',error)
      }
    }    
    function downloadFile(downloadHref,fileName='down', fileType = '.mp4', target = '_self') {
      // 兼容不同浏览器的URL对象
      const url = window.URL || window.webkitURL || window.moxURL
      let link = document.createElement('a')
      link.href = downloadHref
      link.target = target
      link.style.display = 'none'
      link.setAttribute('download', fileName + fileType)
      document.body.appendChild(link)
      link.click();
      // 下载完成进行释放
      url.revokeObjectURL(downloadHref)
      document.body.removeChild(link);
    }
    onBeforeUnmount(() => {
      revoke()
      exit()
    })
    return {
      video,
      message,
      transcode,
      revoke,
      downloadFile,
      exit
    };
  },
});
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
