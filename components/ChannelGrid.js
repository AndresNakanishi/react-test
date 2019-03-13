import Link from 'next/link'

export default class ChannelGrid extends React.Component{
    render(){
        const { channels } = this.props;

        return (
            <div className="channels">
                { 
                    channels.map((channel) => 
                        ( 
                            <Link key={channel.id} href={`/channel?id=${channel.id}`} prefetch>
                                <a className="channel">
                                    <img className="channel-img" src={channel.urls.logo_image.original} alt=""/>
									<div className="title-container">
										<h2>{channel.title}</h2>
									</div>
                                </a>
                            </Link> 
                        )
                    ) 
                }
                <style jsx> {`
					.channels {
						display: grid;
						grid-gap: 15px;
						padding: 15px;
						grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
					}

					.channel{
						display: block;
						border-radius: 3px;
						box-shadow: 0px 2px 6px rgba(0,0,0,0.15);
						margin-bottom: .5em;
						display: flex;
						flex-flow: column;
						justify-content: space-between;
						background: #333;
					}

					.channel-img{
						max-width: 100%;
						margin: 0;
					}

					.title-container{
						display:flex;
						justify-content: center;
						align-items: center;
						height: 100%;
					}

					h2 {
						color: white;
						margin:0;
						font-size: 14px;
						text-align: center;
					}

					a{
						text-decoration: none;
					}
				`} </style>
            </div>
        )
    }
}