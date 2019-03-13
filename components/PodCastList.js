import Link from 'next/link'

export default class PodCastList extends React.Component{
    render(){
        const { audioClips } = this.props;

        return (
            <div className="clips">
                <h2>Últimos Podcasts</h2>
                { 
                    audioClips.map(
                        (clip) => (
                        <Link href={`/podcast?id=${clip.id}`} prefetch key={clip.id}>
                            <a className='podcast'>
                                <div className="img">
                                    <img src={ clip.urls.image } alt={clip.title} />
                                </div>
                                <div className="body">
                                    <h3>{ clip.title }</h3>
                                    <div className='meta'>
                                        { Math.ceil(clip.duration / 60) } minutes
                                    </div>
                                </div>
                            </a>
                        </Link>
                        )
                    )
                }
                <style jsx>{`
                    h2{
                        text-align: center;
                    }
                    .podcast {
                        text-decoration: none;
                        color: #333;
                        padding: 15px;
                        border-bottom: 1px solid rgba(0,0,0,0.2);
                        cursor: pointer;
                        display: flex;
                        justify-content: flex-start;
                    }
                    img{
                        max-height: 50px;
                        margin-right:10px;
                    }
                    .podcast:hover {
                        color: #000;
                    }
                    .podcast h3 {
                        margin: 0;
                    }
                    .podcast .meta {
                        color: #666;
                        margin-top: 0.5em;
                        font-size: 0.8em;
                    }
                `}</style>
            </div>
        )
    }
}