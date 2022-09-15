import FfmpegDemo from '@/views/ffmpeg-demo.vue'

const routes=[
  {
    path: '/',
    redirect: '/ffmpeg-demo',
    title:'index'
  },
  {
    path: '/ffmpeg-demo',
    name: 'FfmpegDemo',
    component: FfmpegDemo,
    title: 'FfmpegDemo'
  }
]

export default routes