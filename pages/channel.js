import Layout from '../components/Layout'
import ChannelGrid from '../components/ChannelGrid'
import PodCastList from '../components/PodCastList'
import Error from 'next/error'

export default class extends React.Component {

  static async getInitialProps({ query, res }) {
    let idChannel = query.id
      try{
        let [reqChannel, reqSeries, reqAudios] = await Promise.all([
          fetch(`https://api.audioboom.com/channels/${idChannel}`),
          fetch(`https://api.audioboom.com/channels/${idChannel}/child_channels`),
          fetch(`https://api.audioboom.com/channels/${idChannel}/audio_clips`)
        ])
        if(reqChannel.status >= 400){
          res.statusCode = reqChannel.status;
          return { channel: null, audioClips: null, series: null, statusCode: reqChannel.status }
        }
        let dataChannel = await reqChannel.json()
        let channel = dataChannel.body.channel
        let dataAudios = await reqAudios.json()
        let audioClips = dataAudios.body.audio_clips
        let dataSeries = await reqSeries.json()
        let series = dataSeries.body.channels
        return { channel, audioClips, series, statusCode: 200 }
      } catch(e){
        res.statusCode = reqChannel.status;
        return { channel: null, audioClips: null, series: null, statusCode: 503 }
      }
  }

  render() {
    const { channel, audioClips, series, statusCode } = this.props

    if(statusCode !== 200){
      return <Error statusCode={ statusCode }/>
    }

    return (
      <Layout title={ channel.title }>
        <div className="overlay">
          <div className="banner" style={{ backgroundImage: `url(${channel.urls.banner_image.original})` }}>
            <h1>{ channel.title }</h1>
          </div>
        </div>

        <div className="half">
          { series.length > 0 &&
            <ChannelGrid channels={ series } />
          }

          <PodCastList audioClips={ audioClips }/>
        </div>
        <style jsx>{`
          .half{
            display: grid;
            grid-template-column: 1fr 20%;
          }

          .banner {
            width: 100%;
            background-position: 50% 50%;
            height: 50vh;
            background-size: cover;
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: -1;
          }

          h1 {
            color: #fff;
            font-size: 4em;
            font-weight: 600;
            margin:0;
          }
        `}</style>
      </Layout>
    )
  }
}